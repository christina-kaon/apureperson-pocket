import { callStoryModel } from "../../../model-client";
import {
  getXianxiaStory,
  type XianxiaChoice,
  type XianxiaEvent,
  type XianxiaStory,
} from "../../../xianxia/story-packages";

type ClientState = {
  segmentIndex?: number;
  materialIndex?: number;
  turnsSinceMaterial?: number;
};

type HistoryEntry = {
  kind?: "player" | "event";
  person?: string;
  type?: string;
  text?: string;
};

type TurnResult = {
  events: XianxiaEvent[];
  choices: XianxiaChoice[];
};

const eventTypes = new Set(["narration", "dialogue", "action", "reaction"]);

function finiteIndex(value: unknown, fallback = 0) {
  return Number.isInteger(value) && Number(value) >= 0 ? Number(value) : fallback;
}

function cleanHistory(value: unknown): HistoryEntry[] {
  if (!Array.isArray(value)) return [];
  return value.flatMap((entry) => {
    if (!entry || typeof entry !== "object") return [];
    const item = entry as Record<string, unknown>;
    if (typeof item.text !== "string" || !item.text.trim()) return [];
    return [{
      kind: item.kind === "player" ? "player" as const : "event" as const,
      ...(typeof item.person === "string" ? { person: item.person } : {}),
      ...(typeof item.type === "string" ? { type: item.type } : {}),
      text: item.text.trim().slice(0, 1200),
    }];
  }).slice(-24);
}

function normalizeTurn(value: unknown, story: XianxiaStory, present: string[]): TurnResult | null {
  if (!value || typeof value !== "object") return null;
  const item = value as Record<string, unknown>;
  if (!Array.isArray(item.events) || !Array.isArray(item.choices)) return null;
  const presentSet = new Set(present);
  const events = item.events.flatMap((raw): XianxiaEvent[] => {
    if (!raw || typeof raw !== "object") return [];
    const event = raw as Record<string, unknown>;
    const text = typeof event.text === "string" ? event.text.trim() : "";
    if (!text || !eventTypes.has(String(event.type))) return [];
    if (event.type === "narration") return [{ type: "narration", text }];
    const person = typeof event.person === "string" ? event.person : "";
    if (!presentSet.has(person) || person === story.playerRole.id) {
      // A useful stage direction should not force a full scene regeneration
      // merely because the model omitted or mistyped its actor id.
      return [{ type: "narration", text }];
    }
    return [{ type: event.type as XianxiaEvent["type"], person, text }];
  }).slice(0, 7);
  if (events.length < 5) return null;

  const choices = item.choices.flatMap((raw): XianxiaChoice[] => {
    if (!raw || typeof raw !== "object") return [];
    const choice = raw as Record<string, unknown>;
    const text = typeof choice.text === "string" ? choice.text.trim() : "";
    if ((choice.kind !== "speech" && choice.kind !== "action") || [...text].length < 2) return [];
    return [{ kind: choice.kind, text: [...text].slice(0, 24).join("") }];
  }).slice(0, 2);
  if (choices.length !== 2) return null;
  return { events, choices };
}

function promptForTurn(args: {
  story: XianxiaStory;
  input: string;
  inputKind: string;
  history: HistoryEntry[];
  segmentIndex: number;
  material: { content: string } | null;
}) {
  const { story, input, inputKind, history, segmentIndex, material } = args;
  const segment = story.segments[segmentIndex];
  const presentCharacters = story.characters
    .filter((character) => segment.present.includes(character.id))
    .map((character) => ({
      id: character.id,
      name: character.name,
      story_core: character.storyCore,
      performance_core: character.performanceCore,
      private_goal: character.privateGoal,
      first_appearance: character.firstAppearance,
    }));
  const focusRelationships = story.relationships.filter((relationship) =>
    segment.focusRelationships.includes(relationship.id)
  );
  const runtimePacket = {
    story: {
      title: story.title,
      logline: story.logline,
      public_setting: story.introduction,
      chapters: story.chapters,
    },
    player_role: story.playerRole,
    scene: {
      id: segment.id,
      chapter_id: segment.chapterId,
      location: segment.location,
      goal: segment.goal,
      pressure: segment.pressure,
      exit: segment.exit,
    },
    present_characters: presentCharacters,
    focus_relationships: focusRelationships,
    recent_visible_events: history,
    turn_scope: material ? "single_canon_change" : "relationship_only",
    approved_material: material,
  };

  return `你是互动仙侠故事的现场导演和群聊编剧。

固定底线：
1. 玩家扮演${story.playerRole.displayRole}，玩家可见叙述始终用“你”，绝不把${story.playerRole.name}写成NPC发言者，也不替玩家补写本轮言行、心理与决定。
2. 人物不能为推进剧情降智；NPC只依据当前场景、近期可见内容和各自知识行动。
3. STYLE只改变表达，不改变正史、人物能力、关系与玩家行动权。
4. NPC有自己的目标，会主动做事，也会彼此回应；不按人数轮流发表完整立场。
5. 严守现场空间连续性：所有行动都发生在scene.location与recent_visible_events已经建立的空间。没有明确移动时，院落不能突然写成屋内，室外人物不能无过渡出现在窗边或室内炉火旁。
6. 严守说话者人称：玩家输入中的“我/我的”指玩家；NPC回应时必须切换到自己的说话视角，用“我”称NPC自己、用“你”称玩家。例如玩家说“跟我走”，NPC应回答“我跟你走”或“跟你走”，绝不能照抄成“跟我走”而颠倒双方身份。

文风：
${story.styleProfile}

当前运行包：
${JSON.stringify(runtimePacket)}

玩家本轮输入类型：${inputKind}
玩家本轮明确提交：${JSON.stringify(input)}

生成规则：
- 输出5至7个按真实时间连续的events，正文合计约800至1000个中文字符；这是一段完整短剧场景，不是短回复。
- 前两个events内让真正听见或看见的人具体承接玩家输入，不复述后立刻转移话题。
- 玩家必须是场面的行动中心：NPC的判断、请求、试探、照顾或阻拦要落到“你现在能决定什么”。
- 每轮同时包含前景行动、中景人物关系与远景世界压力，产生事实、人物、关系或世界运行方式上的探索收益。
- relationship_only时只消化眼前已经出现的信号：让NPC回应玩家、确认彼此态度、检查已有迹象，并可自然透露人物背景或世界运行方式。不得升级危险，不出现袭击、伤亡、抓捕、第二批敌人或新的幕后黑手；现实动作可以变化，但外部威胁必须仍停留在“即将发生、尚未落下”的状态。
- single_canon_change时只把approved_material演成一个主要正史变化；先在events中出现，不能首次塞进choice，也不能顺手增加第二个转折。
- 对话像具体关系中的真人，允许打断、改口、嘴硬、答非所问和连续补话；旁白写动作、空间、物件与后果，禁止先总结主题再让人物举例。
- 正文中不要使用角色ID、字段名、material、goal、pressure、关系焦点等导演术语。
- 恰好两个choices，每项8至24个中文字符，kind独立取speech或action；两项都是玩家此刻能直接做出的、方向实质相反的言行，不加“你/玩家/动作：”前缀，不泄露正文尚未公开的信息。
- 只输出JSON，不输出解释、思维过程、导演计划、摘要或状态。

输出结构：
{"events":[{"type":"narration","text":"现场正文"},{"type":"dialogue","person":"present角色id","text":"说出口的话"}],"choices":[{"kind":"speech","text":"玩家言行"},{"kind":"action","text":"相反方向言行"}]}`;
}

export async function POST(request: Request) {
  try {
    const body = await request.json() as {
      storyId?: string;
      input?: string;
      inputKind?: string;
      fromChoice?: boolean;
      history?: unknown;
      state?: ClientState;
    };
    const story = getXianxiaStory(body.storyId);
    const input = body.input?.trim();
    if (!story || !input) return Response.json({ error: "story_or_input_missing" }, { status: 400 });

    let segmentIndex = Math.min(finiteIndex(body.state?.segmentIndex), story.segments.length - 1);
    let materialIndex = finiteIndex(body.state?.materialIndex, 1);
    let turnsSinceMaterial = finiteIndex(body.state?.turnsSinceMaterial);

    while (segmentIndex < story.segments.length - 1
      && materialIndex >= story.segments[segmentIndex].materials.length) {
      segmentIndex += 1;
      materialIndex = 0;
      turnsSinceMaterial = 0;
    }

    const segment = story.segments[segmentIndex];
    const pendingMaterial = segment.materials[materialIndex];
    // A freshly revealed material needs one full turn of human reaction before
    // the next canon beat arrives. Clicking a suggested choice expresses player
    // intent; it does not buy an automatic plot escalation.
    const isFinalChoiceResolution = pendingMaterial?.id === "immortal_ch05_s02_m04";
    const explicitFreeformEnding = /离开|留下|改革|接任|接过|拒绝|带.{0,6}走|一起走|重建|解散/.test(input);
    const endingChoiceReady = body.fromChoice === true || explicitFreeformEnding;
    const openingNamingResolved = segment.id === "immortal_ch01_s01"
      && materialIndex === 1;
    const shouldAdvance = Boolean(pendingMaterial)
      && (turnsSinceMaterial >= 1 || openingNamingResolved)
      && (!isFinalChoiceResolution || endingChoiceReady);
    const approvedMaterial = shouldAdvance ? { content: pendingMaterial.content } : null;
    const history = cleanHistory(body.history);
    const inputKind = body.inputKind === "action" || body.inputKind === "speech" ? body.inputKind : "freeform";

    const raw = await callStoryModel(
        promptForTurn({ story, input, inputKind, history, segmentIndex, material: approvedMaterial }),
        "生成本轮仙侠互动场景，只输出JSON。",
        0.62,
        4800,
        {
          stage: "prompt3",
          requestTimeoutMs: 32000,
          validate: (value) => normalizeTurn(value, story, segment.present)
            ? true
            : { ok: false, reason: "xianxia_turn_shape_invalid" },
        },
      );
    const result = normalizeTurn(raw, story, segment.present);
    if (!result) throw new Error("prompt3_shape_invalid_after_validation");

    const materialCommitted = Boolean(approvedMaterial);
    const nextState = materialCommitted
      ? { segmentIndex, materialIndex: materialIndex + 1, turnsSinceMaterial: 0 }
      : { segmentIndex, materialIndex, turnsSinceMaterial: turnsSinceMaterial + 1 };
    const nextSegment = story.segments[segmentIndex + 1];
    const chapterCompleted = materialCommitted
      && materialIndex === segment.materials.length - 1
      && (!nextSegment || nextSegment.chapterId !== segment.chapterId);
    const chapterComplete = chapterCompleted
      ? story.chapterEndPreviews?.find((preview) => preview.chapterId === segment.chapterId)
      : undefined;

    return Response.json({
      ...result,
      source: "model",
      state: nextState,
      current: { segmentId: segment.id, chapterId: segment.chapterId, location: segment.location },
      chapterComplete,
      nextChapterId: chapterComplete ? nextSegment?.chapterId : undefined,
      mediaCues: materialCommitted && pendingMaterial
        ? story.mediaCues?.[pendingMaterial.id] ?? []
        : [],
    });
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : "xianxia_turn_failed" }, { status: 502 });
  }
}
