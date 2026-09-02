export type XianxiaEventType = "narration" | "dialogue" | "os" | "system" | "loot";

export type XianxiaLootItem = { name: string; qty: number; note?: string };

export type XianxiaEvent = {
  type: XianxiaEventType;
  items?: XianxiaLootItem[];
  person?: string;
  text: string;
};

export type XianxiaChoice = {
  kind: "speech" | "action";
  text: string;
};

export type XianxiaCharacter = {
  id: string;
  name: string;
  role: string;
  shortBio: string;
  portrait?: string;
  storyCore: string;
  performanceCore: string;
  privateGoal: string;
  secret?: string;
  persona?: { surface: string; coreWant: string; bedrock: string };
  firstAppearance: string;
  featured?: boolean;
};

export type XianxiaMaterial = {
  id: string;
  content: string;
  trigger?: string;
  completionEvidence?: string;
  echo?: string;
  divergence?: string;
};

export type XianxiaMediaCue =
  | {
      id: string;
      kind: "image";
      src: string;
      alt: string;
      caption: string;
    }
  | {
      id: string;
      kind: "video";
      src: string;
      poster?: string;
      alt: string;
      caption: string;
    }
  | {
      id: string;
      kind: "hud";
      eyebrow: string;
      title: string;
      rows: Array<{ label: string; value: string; tone?: "normal" | "warning" }>;
      note?: string;
      compact?: boolean;
    };

export type XianxiaChapterEndPreview = {
  chapterId: string;
  chapterNumber: number;
  title: string;
  summary: string;
  nextObjective?: string;
  content: XianxiaMediaCue[];
};

export type XianxiaSegment = {
  id: string;
  chapterId: string;
  location: string;
  present: string[];
  goal: string;
  focusRelationships: string[];
  pressure: string;
  dramaticQuestion?: string;
  completionSignals?: string[];
  materials: XianxiaMaterial[];
  exit: string;
};

export type XianxiaStory = {
  id: string;
  title: string;
  subtitle: string;
  logline: string;
  accent: string;
  playerRole: {
    id: string;
    name: string;
    displayRole: string;
    fixedCore: string;
    baselineTendency?: string;
    freeAgency: string;
  };
  introduction: {
    time: string;
    place: string;
    world: string;
    situation: string;
    objective: string;
  };
  threeAct: string[];
  chapters: Array<{
    id: string;
    title: string;
    summary: string;
    entry?: string;
    entryChoices?: XianxiaChoice[];
  }>;
  characters: XianxiaCharacter[];
  relationships: Array<{ id: string; roles: string[]; public: string; tension: string }>;
  worldProcesses?: Array<{ id: string; title: string; stage: string; note: string }>;
  npcRelationSeeds?: Array<{ pair: [string, string]; warmth: number; tension: number; note: string }>;
  npcStateSeeds?: Record<string, { mood: string; stanceToPlayer: string }>;
  worldAtlas?: string;
  opening: {
    events: XianxiaEvent[];
    choices: XianxiaChoice[];
    usedMaterialId: string;
  };
  initialHud?: XianxiaMediaCue;
  chapterBackgrounds?: Record<string, {
    video?: string;
    image?: string;
    poster?: string;
    label: string;
    tone?: { top: string; middle: string; bottom: string };
  }>;
  chapterEndPreviews?: XianxiaChapterEndPreview[];
  backgroundMusic?: {
    src: string;
    title: string;
    queue?: Array<{ src: string; title: string }>;
  };
  mediaCues?: Record<string, XianxiaMediaCue[]>;
  segments: XianxiaSegment[];
  styleProfile: string;
};

const ensembleTableauXianxiaStyle = `影视化长镜头。把本轮写成可以直接拍摄的连续镜头，不是小说叙述。

【镜头进场序】进入任何新空间，必须先空镜后人物：第一镜是环境与声音（光线从哪来、空气里是什么声响与气味），第二镜推向可读的具体细节（牌匾上写的字、贴着的告示、柜台上摆的东西——写出内容原文），然后人物才入画。人物登场必须"以某种方式"进入画面：从哪个方向来、先被听见还是先被看见、带着什么动作。

【文字长镜头】每条narration是一个镜头，镜头内用空间介词连贯移动（走过、穿过、绕过、贴着、沿着），禁止镜头内跳切；换镜头才换空间。每个空间段落保持三层景深：前景有遮挡视线的实物，中景是人物行动，远景有正在发生的事；始终留一条画外音（画面外传来的声响、光线、气味），提醒世界比画面大。

【白描铁律】只写镜头拍得到、话筒录得到的：动作、位置、光影、声音、可见的神态。禁止心理转述（"她想起""他意识到"一律违规，内心走os气泡）、禁止隐喻与煽情形容词堆叠（"仿佛""宛如""某种"慎用）、禁止总结与升华。情绪只能从动作的漏口显形。

【对白衔接三式】禁止"声音/语气/语调"作主语。只用：①物理锚点（她把茶盏一放："不去。"）②简洁引语（他低声道）③零衔接（快节奏交锋直接对白连发）。

【氛围回响】玩家每次回应之后，必须有一个可拍摄的氛围变化收拍：光线变了、某个声音停了、人群的姿态换了、有人改变了站位——世界对玩家的行为有可见的呼吸。

【感官先行】每段单一主导感官领起（听觉或视觉优先），气味温度必须有来源有落点；同一回合相近意象不重复。群像内核保留：人物带各自目标入画、动作改变谈话而非装饰谈话、闻照雪温柔聪明有生活趣味不写成冰冷仙子。

仅用于校准镜头语言的范例（不得挪用剧情）：
1. 酒旗先于门脸出现，被风掀起一角又拍回杆上。门内的喧哗涌出来——碗筷、划拳、跑堂的长调。门楣悬一块褪金匾额："醉仙楼"，右下角一行小字：仙凡同价。你跨过门槛，前桌一个大汉的后背挡了半边视线，绕过去，柜台后的账房先生头也不抬，算盘打得像下冰雹。楼上传来一声瓷器碎裂，喧哗静了半拍，又漫回来。
2. 她端着两碗面从灶间出来，用脚尖勾开挡路的条凳，把碗放下，才看清你的脸。手停了半息。"里边坐。"她转身回灶间，这一次，脚步比来时快。`;

const steadyDaoEnsembleRomanceStyle = `众生浮世绘·暖色成人关系版。

【总原则】
先写人怎样过日子，再写大事怎样闯进日子。小琼峰不是任务大厅：茶会凉，药会糊，酒坛会藏错地方，纸人会在最严肃的时候掉一只胳膊。宏大世界必须借工作、规矩、生计、身体疲惫、资源损耗与具体选择显形，不写设定讲义。每名NPC都带着自己的目标、麻烦、关系债和未完事项进入场面，会主动插手、拒绝、误判或改变主意；任何人都不能退化成递线索、捧玩家或负责搞笑的工具。

【群像与口语】
人物声音必须一听就能分辨。蓝灵娥轻快、机灵、会撒娇也会追问；酒玖豪爽、理亏时尤其镇定；齐源宽厚怕麻烦，却会在弟子受威胁时站稳；木公小吏礼貌得近乎荒谬；鸿钧平静、精确且有完整逻辑。允许打断、抢话、连续补一句、误听、嘴硬、拆台、答非所问、临时改口和突然沉默。同一NPC可以连续说话，其他人也可以只用动作、眼神或把一件东西推过来作答。对白不轮流发表观点，不替角色总结人格。

【玩家中心】
玩家扮演李长寿，始终称“你”。故事角色过去以谨慎闻名，也拥有阵法、纸人和多重退路，但这只是他人可记得的既有声誉与玩家可自由采用的表演底色，不是玩家每轮正在谨慎、装糊涂、嘴硬或算计的事实。只有玩家本轮及近期明确言行实际表现出某种态度，NPC才能对此作出具体回应；证据不足时可以观察、试探、好奇或保留误解，不能替玩家诊断动机。NPC既可以依赖、佩服、心疼或不服，也要允许玩家临时冲动、坦白、热血、散漫或改变主意。不能让群像自己演得尽兴而把玩家留在观众席。

【成年人暧昧与心动】
所有可发展暧昧的角色均为成年人：蓝灵娥二十三岁，酒玖二十九岁。默认主情感线是李长寿与蓝灵娥从熟稔师兄妹走向彼此选择；酒玖提供成熟、会看穿人却不强行越界的关系张力。心动来自“想靠近却不完全确定”：递茶时没有立刻收回的手、袖口擦过、压低声音只说给一人听、熟人旧梗、能力被看见后的佩服、吃醋后装作在核对阵图、危险过去才发作的后怕。先写动作、距离、触感、呼吸和躲开的视线，再让一句短对白承认其中一小部分；禁止突然告白、无条件崇拜、猎物化、物化身体或把照顾等同占有。

亲密升级必须有前情、双方成年人身份、清晰自愿与随时停下的余地。普通回合只写暧昧、心动、触碰和关系试探，不自动滑向露骨性描写；只有玩家明确主动、关系已成熟且场景安全私密时，才允许以克制、感官化但尊重双方主体性的方式继续。任何拒绝、犹豫或转移都必须被尊重。

【去八股】
不先解释意义再写人，不用整齐排比替代戏，不在结尾总结主题。少用“某种、仿佛、意味着、真正的、不是……而是……、他意识到、命运齿轮、空气凝固”。情感重处收住，幽默来自人物自我包装、熟人关系与现实落差，不靠密集段子。叙事推进须与人物情感线并行；关键布局必须改变信任、知情边界、亲密距离或共同承担方式。

以下仅校准句法、节奏与关系温度，不得挪用剧情：
1. “计划很简单，”队长咬着半块凉饼，“我进去谈，你们负责像正常人。”阿吉没抬头：“那还是偷东西吧，成功率高些。”窗边的姑娘忽然按住三枚铜钱。三个人巡过巷口。屋里安静了一瞬，随即所有人都开始怪罪那块饼太硬。
2. 她把最后一粒止痛药推过去：“吃了。”他还想逞强：“我只是有点——”“有点吵。”她截断他，把水杯也推过去。旁边的人笑了，只有她没笑；她一直盯着他拿杯子的那只手。
3. 蓝灵娥俯身看阵图，发梢扫过你手背。她像没察觉，指尖却在那条撤离线上停得太久：“这回也给我留一条假的？”你把另一枚阵符推给她。她先看阵符，再看你，笑意慢了一拍：“那我就当你终于舍得把我算进去了。”
4. 酒玖把空碗扣在桌上：“我替你保密。”她顿了顿，又把碗翻回来，“但保密是另外的价钱。先说好，别再拿那坛兑过水的糊弄长辈。”`;

const immortalSister: XianxiaStory = {
  id: "immortal-sister",
  title: "与雪同归",
  subtitle: "神仙姐姐篇",
  logline: "绝世灵剑‘太初’公开择主前夜失窃。你只是十二名候选者之一，没有开启剑冢的权限与理由；现场残纹却指向你的试剑剑息，而授剑院众人都能证明你从未离场。",
  accent: "#9fcfc9",
  playerRole: {
    id: "shen_yan",
    name: "沈砚",
    displayRole: "凌霄宗剑道天才",
    fixedCore: "你是凌霄宗百年难遇的年轻剑修。闻照雪是与你同出一脉、早入门十年的师姐；她照顾、打趣并与你并肩多年。你已经爱上她，却从未替这段感情说出答案。",
    baselineTendency: "你在剑道上自信直接，面对闻照雪时更容易显露柔软；这只是可供玩家采用的开场底色，不能代替玩家本轮真实言行。",
    freeAgency: "你可以决定如何回应闻照雪、是否信任裴行舟、怎样面对陷害与失去，以及最终为谁、为何重新执剑。",
  },
  introduction: {
    time: "玄曜历四百七十二年，授剑大典前一日",
    place: "九州北境·凌霄宗十二峰",
    world: "九州灵脉衰败已三十七年，昔日散在山野的灵气如今被各大仙门收束进矿脉、药圃与护宗大阵。仙门开始按根骨、宗籍与功勋分配灵石：上品根骨可以留在云上，中下品根骨多被遣返，没有宗籍的散修即便侥幸引气入体，也可能被视作盗取天地灵机。凌霄宗建在北境十二条旧灵脉交汇处，立宗四百余年，以剑冢、洗剑池和镇守北境闻名。十二峰表面共奉一宗，礼殿掌名籍，执事堂分资源，剑冢保存历代剑契，长老席则守着越来越紧张的灵石配额。山下每年仍送来药材、铁器与年轻弟子，真正能留在云上的人却一年比一年少。于是每一次宗门大典都不再只是礼仪，也成了各峰确认传承次序、重新衡量人情与资源的公开场合。",
    situation: "明日清晨，剑冢中沉睡百年的绝世灵剑‘太初’将从十二名候选者中公开择主。你只是候选者之一，不掌握剑冢门禁，也没有在择主前开启剑冢的理由。失窃警报响起以前，你始终留在授剑院，闻照雪、桑迟和院中杂役都能证明；可剑台留下的残纹，偏偏与你封存在试剑牌中的剑息一致。",
    objective: "先保全不在场人证，再核对剑冢原始残纹如何复制了你的剑息；在接受调查的同时，判断谁正借太初失窃把你和闻照雪一起拖进嫌疑。",
  },
  threeAct: [
    "授剑前日，一场精心安排的失窃把你变成罪人；闻照雪受制于自己替你做过的事，你带着对她的误会被废去根骨、逐下人间。",
    "你在人间经历贫穷、劳作、友谊与邪修欺凌，借上古残卷重建根基；力量回来后，你从矿账与普通人的证词中发现闻照雪从未背叛你。",
    "你带着人间证据杀回仙界，揭穿裴行舟和旧制的利益链；你拒绝成为新的掌权者，最终带闻照雪离开。",
  ],
  chapters: [
    { id: "ch01", title: "太初失窃", summary: "绝世灵剑太初公开择主前夜失窃。残纹指向你的试剑剑息，但授剑院众人能证明你没有离场。" },
    {
      id: "ch02",
      title: "山门落雨",
      summary: "证据与体面的善意一同把你推向罪名，闻照雪的沉默被误读为放弃。",
      entry: "戒律殿的铜钟在子时敲响。你被带到听审台中央，失窃的太初剑封在白玉案后；闻照雪被安排在旁席，裴行舟站在主审席前，桑迟抱着候选名册坐进证人位。宗门要在天亮前给授剑大典一个答案，而你要先让他们回答：这些证据究竟是谁收集、又是谁拼在了一起。",
      entryChoices: [
        { kind: "action", text: "先查看太初剑的封存状态" },
        { kind: "speech", text: "先问是谁批准搜查住处" },
      ],
    },
    {
      id: "ch03",
      title: "人间一碗面",
      summary: "失去修为以后，你第一次必须靠普通人的劳动和善意活下去。",
      entry: "山门在雨里合拢以后，你沿北境官道走了两日。没有宗籍、灵石和修为，曾经会替你让路的人如今只当你是个淋透的年轻人。矿镇面铺正要打烊，陈伯把一捆湿柴推到檐下：劈完它，能换一碗热面，也能换一个不追问来历的座位。",
      entryChoices: [
        { kind: "action", text: "卷起袖子先把湿柴劈完" },
        { kind: "speech", text: "问陈伯镇上是否还招短工" },
      ],
    },
    {
      id: "ch04",
      title: "残卷照骨",
      summary: "上古残卷让你一夜筑基，矿账却把力量重新连回闻照雪的处境。",
      entry: "旧矿牌嵌进古祠石门时，地下断层亮起一线金光。残卷悬在积水上方，照见你已经破碎的经脉，也照见矿工藏在墙缝里的旧账。它能给你的不是原来的根骨，而是一条必须由你重新选择、重新承受的路。",
      entryChoices: [
        { kind: "action", text: "先核对残卷与旧矿牌的纹路" },
        { kind: "speech", text: "先问陈伯这些矿账从何而来" },
      ],
    },
    {
      id: "ch05",
      title: "与雪同归",
      summary: "你带证人重返十二峰，让旧制回答代价，并拒绝成为下一把更漂亮的椅子。",
      entry: "晨光越过十二峰时，你沿废弃运矿古道重返凌霄宗。陈伯、阿箬和桑迟带着矿账、副印与证词站在你身后；联合听审台上，闻照雪仍被隔在禁制里，裴行舟则准备把所有错误归给一个已经失去价值的下属。这一次，你不是回来请求宗门相信你。",
      entryChoices: [
        { kind: "action", text: "先把完整矿账交到众人面前" },
        { kind: "speech", text: "让矿民先亲口讲完他们的事" },
      ],
    },
  ],
  characters: [
    {
      id: "wen_zhaoxue",
      name: "闻照雪",
      role: "北境剑尊",
      portrait: "/xianxia/immortal-sister/portraits/wen-zhaoxue.png",
      shortBio: "温柔、聪明又有生活趣味的年轻剑尊，也是与你同出一脉的师姐。她习惯拿小事逗你，越担心越说得轻松；希望你拥有自己选择的人生，却总忍不住先替你挡下代价。",
      storyCore: "镇守北境的剑尊，战力极高但受宗门议事规则制约。底线是不让年轻人替旧制度送命。",
      performanceCore: "温柔、有趣、带一点大姐姐式促狭；一本正经地说小事，会记得你的饮食、旧伤和少年糗事。受伤时先照顾别人，不写成冰冷仙子。",
      privateGoal: "查清灵矿与剑冢账目，在不惊动既得利益者的情况下把你留在危险之外。",
      persona: { surface: "师姐式促狭与照顾：拿旧事打趣、递茶先试温、把危险轻描淡写；人前永远是滴水不漏的剑尊仪态。", coreWant: "在不把你卷进宗门清算的前提下查清矿契与剑冢的账；也想被你当成可以并肩的人，而不是需要仰望的师姐。", bedrock: "护短到近乎固执的责任心——可以自损，不能看着身边人替旧制度买单。" },
      secret: "左臂旧伤与私改矿契的真相都瞒着你：她多年替矿民减债、暗查剑冢账目，说破就会把你卷进宗门清算；被问到伤时惯用玩笑岔开。",
      firstAppearance: "从洗剑池回来，在白日院落里先拿太初剑会不会选你打趣，再用替你试茶温的小动作暴露伤势。",
    },
    {
      id: "pei_xingzhou",
      name: "裴行舟",
      role: "凌霄宗大师兄",
      portrait: "/xianxia/immortal-sister/portraits/pei-xingzhou.png",
      shortBio: "谦和、体面、记性极好。批评别人时像在替对方着想，威胁通常表现为一条更省事的建议；嫉妒你的天赋与闻照雪的偏爱，却从不让嫉妒破坏他的仪态。",
      storyCore: "负责宗门内务与大典秩序，擅长制度、舆论和分配人情。底线是不能失去秩序继承人的位置。",
      performanceCore: "从不在人前失态；每句帮助都留着退路，每次关心都能成为日后的证词。聪明而危险，不为推动剧情降智。",
      privateGoal: "让你在授剑大典前失去资格，同时让所有人相信他已经尽力保护了你。",
      persona: { surface: "温文尔雅的周全人：每句关心都恰到好处，从不在人前失态。", coreWant: "在不留把柄的前提下拿回被你打乱的继承秩序；需要所有人相信他是最尽力保护你的人。", bedrock: "对失控的恐惧——宁可算计到冷酷，也不允许局面脱离自己的手。" },
      secret: "构陷你的整套安排（复制剑息、副印指令、住处栽赃）绝不能被任何人串起来；他最怕桑迟与名册流向被同时核对，被逼近时会抢先给你更体面的保护。",
      firstAppearance: "亲自带来太初剑台失窃的消息，先替闻照雪按住被风卷起的候选名册，再请所有在场者一同核对时间。",
    },
    {
      id: "sang_chi",
      name: "桑迟",
      role: "礼殿杂务弟子",
      portrait: "/xianxia/immortal-sister/portraits/sang-chi.png",
      shortBio: "负责授剑大典杂务的年轻弟子，消息灵通、胆子普通，最擅长听见秘密，最不擅长承认自己听见过。对你既崇拜又怕被卷进你的麻烦。",
      storyCore: "能接触大典名册、灯房与礼殿杂务，无权进入剑冢。遇到危险先退半步，但不会丢下真的需要帮助的人。",
      performanceCore: "嘴快、容易紧张，会在错误时机说实话；幽默来自求生欲与现场现实的落差。",
      privateGoal: "平安熬过授剑大典，也想证明自己不只是一个传话的人。",
      persona: { surface: "嘴快心慌的小文书：先赔笑、爱转移话题、总在错误时机说实话。", coreWant: "想被两位天才当成自己人而不只是跑腿的；名册的事像块石头压着他。", bedrock: "小人物的义气——真到要害处，怕成筛子也不会出卖朋友。" },
      secret: "错送名册的指令来自裴行舟的副印，他隐约觉得不对却不敢说；心虚让他在两人对峙时话更多、更急着帮你。",
      firstAppearance: "抱着礼单、封金帖和蘸好朱砂的笔在院中忙得团团转，被闻照雪一句话拆穿他早就偷听到了换防风声。",
    },
    {
      id: "chen_bo",
      name: "陈伯",
      role: "山下矿镇面铺老板",
      portrait: "/xianxia/immortal-sister/portraits/chen-bo-v1.png",
      shortBio: "从北境灵矿退下来的老矿工，腿脚不便，嘴上只认工钱，实际总给走投无路的人多添半勺汤。",
      storyCore: "熟悉灵矿劳役、矿账和山下人的生存方式，是旧制度代价的活证人。",
      performanceCore: "少讲大道理，用价钱、天气、伤病和一碗饭判断人；关心别人时总假装是在算账。",
      privateGoal: "保住面铺和身边矿工，也想让多年死伤终于被山上的人看见。",
      persona: { surface: "只谈价钱和天气的面铺老板，关心人也装作是在算账。", coreWant: "保住铺子和矿工，也想让山上有人真正看一眼这些年的死伤账。", bedrock: "用沉默扛事的旧派担当——账本底页那份名单比命重。" },
      secret: "面铺账本底页记着历年矿难死者名单和他没能救下的人；他装作只关心生意，最怕别人翻他的账。",
      firstAppearance: "看见你在雨里饿得站不稳，先问能不能劈柴，再把热面推过来。",
    },
    {
      id: "a_ruo",
      name: "阿箬",
      role: "矿镇采药人",
      portrait: "/xianxia/immortal-sister/portraits/a-ruo-v1.png",
      shortBio: "在矿镇长大的年轻采药人，警惕仙门，却对真正肯干活的人很快亲近。",
      storyCore: "能带你进入废矿与古祠，知道矿工失踪和邪修收取灵税的路线。",
      performanceCore: "说话快，爱拆穿漂亮话；害怕时会先数退路，决定帮忙后反而最敢往前走。",
      privateGoal: "找到失踪的兄长，并让矿镇不再替仙门繁荣支付看不见的代价。",
      persona: { surface: "说话快、爱拆穿漂亮话，帮忙之前先数退路。", coreWant: "找到兄长下落，也在掂量你值不值得托付那半枚矿牌。", bedrock: "决定信一个人之后，就敢把命押上的狠劲。" },
      secret: "兄长失踪前留给她半枚矿牌，与你行囊里那枚是一对；确认你可信之前她绝不拿出来。",
      firstAppearance: "用药篓挡住你去路，先检查你手上的茧，再决定要不要相信你。",
    },
    {
      id: "lu_kui",
      name: "吕魁",
      role: "盘踞废矿的邪修",
      shortBio: "靠替仙门外围处理脏事收取灵税，欺软怕硬，却很懂如何拿合法文书包装掠夺。",
      storyCore: "掌握废矿入口与部分矿契往来，是裴行舟利益链伸到人间的中间人。",
      performanceCore: "不狂笑、不自报阴谋；先讲规矩和欠账，只有占尽便宜时才露出轻蔑。",
      privateGoal: "守住矿契与古祠秘密，把所有责任推给失去宗籍的散修。",
      persona: { surface: "拿着文书说话的收税官，客气里带着威胁。", coreWant: "多捞快捞、别被上面查账，嗅到风向不对就先找垫背的。", bedrock: "彻底的利己——压力够大时第一反应永远是出卖上线保自己。" },
      secret: "他收的灵税有三成进了自己腰包，副印文书是真的、账目是假的；最怕上面派人对账，被戳穿时会先出卖上线自保。",
      firstAppearance: "带着盖有仙门外务印的收税文书来到面铺，把勒索说成一次例行核验。",
      featured: false,
    },
  ],
  relationships: [
    { id: "r_shen_wen", roles: ["shen_yan", "wen_zhaoxue"], public: "闻照雪是与你同出一脉的师姐，也是在宗门身份之外长期照顾、理解你的人。", tension: "你早已想与她真正并肩；她也在意你，却习惯先用师姐身份替你挡下危险。" },
    { id: "r_shen_pei", roles: ["shen_yan", "pei_xingzhou"], public: "同门师兄弟，裴行舟公开照顾你的宗门生活。", tension: "你的天赋打乱了他多年经营的继承秩序，他要把嫉妒改写成合理程序。" },
    { id: "r_wen_pei", roles: ["wen_zhaoxue", "pei_xingzhou"], public: "同辈剑修与内务主事，公务往来以礼相待。", tension: "她暗查的矿契账目正是他利益链的根；两人都怀疑对方已经知道了什么，当面越客气，话里的试探越锋利。" },
    { id: "r_pei_sang", roles: ["pei_xingzhou", "sang_chi"], public: "上级与跑腿文书，裴行舟平日待他格外宽和。", tension: "桑迟手里经过的名册是构陷链条的一环；裴行舟维持宽和是防他回想细节，桑迟越被优待越觉得不安。" },
    { id: "r_wen_sang", roles: ["wen_zhaoxue", "sang_chi"], public: "师姐与小文书，闻照雪素来护着他。", tension: "桑迟崇拜她也怕她；名册的事他最想先告诉她，却又怕把她拖下水。" },
    { id: "r_chen_a", roles: ["chen_bo", "a_ruo"], public: "面铺老板与常来帮工的矿家女，处得像半个父女。", tension: "陈伯知道她兄长失踪的更多细节却压着不说，怕她一个人去废矿送命；阿箬已经察觉他在瞒。" },
    { id: "r_lu_chen", roles: ["lu_kui", "chen_bo"], public: "收税官与镇上铺户，表面客客气气。", tension: "吕魁的假账需要镇上铺户画押配合，陈伯一直拖着不签；两人都在等对方先露破绽。" },
  ],
  worldProcesses: [
    { id: "proc_taichu", title: "太初剑失窃案的宗门调查", stage: "起", note: "剑冢外阵的残纹已被封存，戒律殿开始逐一排查当夜值守名册。" },
    { id: "proc_mining", title: "北境矿契的暗流", stage: "起", note: "矿镇灵税再度加征的文书正在内务堂流转，尚未公开。" },
  ],
  npcStateSeeds: {
    wen_zhaoxue: { mood: "惦记着晨间剑冢方向的异样", stanceToPlayer: "亲近" },
    pei_xingzhou: { mood: "表面从容，内里绷着大典每个环节", stanceToPlayer: "试探" },
    sang_chi: { mood: "被名册和杂务追着跑", stanceToPlayer: "松动" },
    chen_bo: { mood: "照常开铺，留意着街面动静", stanceToPlayer: "试探" },
    a_ruo: { mood: "心里悬着兄长的事", stanceToPlayer: "戒备" },
    lu_kui: { mood: "惦记着这个月的税额", stanceToPlayer: "戒备" },
  },
  worldAtlas: `九州北境·凌霄宗版图：
- 凌霄宗踞北境群山，十二峰以主峰为轴犬牙相列。主峰有授剑院（候选剑修起居演武）、礼殿（仪程文书）、执事堂（庶务盘口）、戒律殿（刑罚问责）；主峰之后雪线上是剑冢（历代宗门佩剑所葬，太初沉睡处），主峰西侧山腰是洗剑池。
- 十二峰各有峰主与弟子；峰间以青石栈道与飞舟往来，步行半日、御剑一炷香。
- 山门之下：北坡山道通山下矿镇（灵石粗矿集散，多凡人矿工与低阶散修，步行一日），矿镇再往南三百里是凡人州府雁回城。宗门以北是无人雪原，深处有妖兽出没。
- 生成新地点时按此版图推方位与距离；未列出的地点须与版图逻辑相容并沿用命名风格。位置表述从大到小写（宗门/区域·峰/地界·具体点）。`,
  opening: {
    usedMaterialId: "immortal_ch01_s01_m01",
    choices: [
      { kind: "speech", text: "“既然师姐破费下注，那我便押太初，名字就叫‘照雪’。”" },
      { kind: "speech", text: "“灵剑择主随缘即可，我更好奇师姐刚才押了什么结果？”" },
    ],
    events: [
      {
        type: "narration",
        text: "**北境凌霄宗 · 主峰授剑院 · 授剑大典前一日**",
      },
      {
        type: "narration",
        text: "凌霄宗十二峰犬牙相列，镇着九州北境的门户；主峰之后的雪线上藏着剑冢，历代宗门佩剑葬于此，也睡着一柄百年无主的绝世灵剑——**「太初」**。上一次出匣择主还是百余年前，据说那夜剑鸣彻夜，十二峰积雪尽落。\n明日卯时，它将再一次出匣。",
      },
      {
        type: "narration",
        text: "未时的授剑院晒得暖意微泛，古松把碎影拓在青石长案上，山风卷着洗剑池的水汽一阵阵掠过回廊。你坐在长案边——**沈砚**，入门时连木剑都嫌磨手，如今是十二名候选者里押注最多、议论最多的名字。\n长案一角压着礼殿的仪程木牌，墨字工整：**「卯时三刻 · 十二峰剑冢 · 太初出匣择主」**。",
      },
      {
        type: "narration",
        text: "先到的是声音——院门外一串跌跌撞撞的脚步由远及近。礼殿杂务弟子**桑迟**抱着一沓描金剑谱和红木赌签冲进门，手里还拎着支饱蘸朱砂的细毫笔，衣角扫过案边铜洗，惊得水面松针直打转。",
      },
      {
        type: "dialogue",
        person: "sang_chi",
        text: "师兄，总算逮着你了！礼殿和执事堂那帮人为明日开了足足六副盘口，就差你这张定心签！",
      },
      {
        type: "dialogue",
        person: "sang_chi",
        text: "你给句准话——太初当真会挑你么？真被你领回来，打算给它改个什么名字？我可指着押你这注换下半年的中品灵石呢！",
      },
      {
        type: "narration",
        text: "桑迟话音未落，院外青石小径上传来一声带笑的轻咳。**闻照雪**信步入画：素白道袍袖口还挽在小臂，周身带着洗剑池的冷泉水汽。早你十年入门的师姐走到案旁，把一盏刚晾好的热茶挪到你右手边，指尖在瓷盏沿上试了试温。",
      },
      {
        type: "dialogue",
        person: "wen_zhaoxue",
        text: "别听桑迟胡闹。太初是认主极挑剔的老脾气——你练剑收式总爱多挽半朵剑花，它真挑了你，怕是头一天就嫌你手欠。",
      },
      {
        type: "dialogue",
        person: "wen_zhaoxue",
        text: "热茶先喝。洗剑池边风大，你昨夜又没穿坎肩，手腕的旧伤可还发酸？",
      },
      {
        type: "narration",
        text: "说话间，她扯过桑迟手里那张写满人名的红木赌签，指节在案上轻轻一敲——随即当着桑迟的面，从腰间解下一枚温润的青玉佩，「啪嗒」按在押注簿上。",
      },
      {
        type: "dialogue",
        person: "wen_zhaoxue",
        text: "喏，我也押一份。真要是太初选了你，剑柄上刻个什么正经名号？总不能像你小时候养的灵雀，叫什么“飞雪”“滚圆”吧？",
      },
      {
        type: "narration",
        text: "日光穿过松针，落在摊开的押注簿上。你的名字那一栏还空着——桑迟的朱砂笔尖悬在正上方，一滴红将坠未坠。",
      },
    ],
  },
  chapterBackgrounds: {
    ch01: {
      video: "/xianxia/immortal-sister/background-remix-ch01-warm-courtyard-v2.mp4",
      poster: "/xianxia/immortal-sister/background-remix-ch01-warm-courtyard-v2.gif",
      label: "授剑院白日",
    },
    ch02: {
      video: "/xianxia/immortal-sister/background-remix-ch02-red-tribunal-v1.mp4",
      label: "山门问责与废骨听审",
    },
    ch03: {
      video: "/xianxia/immortal-sister/background-vertical-ch03-mortal-noodle-shop-dream-v2.mp4",
      poster: "/xianxia/immortal-sister/background-vertical-ch03-mortal-noodle-shop-dream-v2.gif",
      label: "初入人间的山城面馆",
    },
    ch04: {
      video: "/xianxia/immortal-sister/background-vertical-ch04-scroll-shrine-dream-v2.mp4",
      poster: "/xianxia/immortal-sister/background-vertical-ch04-scroll-shrine-dream-v2.gif",
      label: "人间古祠与意外得到的上古功法",
    },
    ch05: {
      video: "/xianxia/immortal-sister/background-remix-ch05-celestial-gate-v1.mp4",
      label: "重返十二峰听审",
    },
  },
  backgroundMusic: {
    src: "/xianxia/immortal-sister/audio/pingshengyi-theme.mp3",
    title: "平生意",
    queue: [{
      src: "/xianxia/immortal-sister/audio/bishangguan-theme.mp3",
      title: "壁上观",
    }],
  },
  chapterEndPreviews: [
    {
      chapterId: "ch01",
      chapterNumber: 1,
      title: "剑冢失窃",
      summary: "太初剑择主前夜失窃，现场留下与你相同的试剑剑息，而授剑院众人都能证明你没有离开。闻照雪拦住你冒险自证并封存残纹；裴行舟以担保为名接管调查后，失窃灵剑却在你的住处被找到，宗门随即连夜启动听审。",
      nextObjective: "参加连夜听审，在裴行舟把程序变成定罪以前，拆穿试剑残纹和住处搜证之间的矛盾。",
      content: [
        {
          id: "preview-ch01-ending",
          kind: "image",
          src: "/xianxia/immortal-sister/mj-ending-ch01-stolen-sword-v1.jpg",
          alt: "失窃灵剑出现在你的住处，宗门连夜封锁现场",
          caption: "第一章结算 · 失窃灵剑",
        },
        {
          id: "preview-ch01-hud",
          kind: "hud",
          eyebrow: "第一章结束 · 当前状态",
          title: "弟子灵台",
          rows: [
            { label: "修为", value: "未损" },
            { label: "根骨", value: "百年剑胚" },
            { label: "剑心", value: "稳定" },
          { label: "太初剑", value: "失窃 · 出现在住处", tone: "warning" },
          ],
          note: "你拥有完整不在场证明；授剑资格仍被暂时冻结。",
        },
      ],
    },
    {
      chapterId: "ch02",
      chapterNumber: 2,
      title: "山门已关",
      summary: "连夜听审中，复制的试剑残纹、住处搜证与失窃灵剑被拼成完整罪证。闻照雪受到矿契旧案牵制，没能当众说出她真正做过什么；你被废去根骨、逐出宗门，也把她的沉默当成了放弃。",
      nextObjective: "先在人间活下去，再查清闻照雪为何沉默，以及这场栽赃真正保护了谁。",
      content: [
        {
          id: "preview-ch02-ending",
          kind: "image",
          src: "/xianxia/immortal-sister/mj-ending-ch02-root-destroyed-v1.jpg",
          alt: "雨夜听审后，你的根骨被废，山门在身后关闭",
          caption: "第二章结算 · 山门落雨",
        },
        {
          id: "preview-ch02-hud",
          kind: "hud",
          eyebrow: "第二章结束 · 当前状态",
          title: "灵脉诊断",
          rows: [
            { label: "修为", value: "尽失", tone: "warning" },
            { label: "根骨", value: "0%", tone: "warning" },
            { label: "剑心", value: "封锁" },
            { label: "功法", value: "无法运转" },
          ],
          note: "山门将在一炷香后关闭。",
        },
      ],
    },
    {
      chapterId: "ch03",
      chapterNumber: 3,
      title: "人间一碗面",
      summary: "失去修为与宗籍后，你第一次靠搬货、记账和普通人的信任换来住处与热饭。邪修对矿工的欺压让你重新拔剑；一份来自废矿的旧账，则第一次把人间的苦难与凌霄宗的灵石连在一起。",
      nextObjective: "追进废矿古祠，找到旧账指向的上古残卷，并确认闻照雪是否一直在替矿民承担罪责。",
      content: [
        {
          id: "preview-ch03-ending",
          kind: "image",
          src: "/xianxia/immortal-sister/story/ch03-human-noodle-shop-clean-v2.png",
          alt: "雨夜人间面馆里，一碗热面被推到你面前",
          caption: "第三章结算 · 人间烟火",
        },
        {
          id: "preview-ch03-hud",
          kind: "hud",
          eyebrow: "第三章结束 · 当前状态",
          title: "凡身记录",
          rows: [
            { label: "修为", value: "无" },
            { label: "根骨", value: "破损 · 0%", tone: "warning" },
            { label: "体力", value: "46 / 100" },
            { label: "功法", value: "无法运转" },
          ],
          note: "新增记录：这里有人愿意记住你的名字。",
        },
      ],
    },
    {
      chapterId: "ch04",
      chapterNumber: 4,
      title: "残卷照骨",
      summary: "废矿古祠里，上古残卷回应了你破碎的经脉，让你一夜重回筑基。矿账与闻照雪留下的批注同时证明：她并非背叛你，而是因保护你和矿民被宗门软禁。",
      nextObjective: "带上矿账与人间证人重返十二峰，救出闻照雪，并让裴行舟和旧制公开回答代价。",
      content: [
        {
          id: "preview-ch04-ending",
          kind: "image",
          src: "/xianxia/immortal-sister/story/ch04-ancient-scroll-awakens-v1.png",
          alt: "废矿古祠里，上古残卷照亮你破碎的根骨",
          caption: "第四章结算 · 残卷照骨",
        },
        {
          id: "preview-ch04-hud",
          kind: "hud",
          eyebrow: "第四章结束 · 当前状态",
          title: "残卷共鸣",
          rows: [
            { label: "修为", value: "筑基初期 · 0 / 1000" },
            { label: "不灭剑魂", value: "第一重 · 觉醒 3%" },
            { label: "战力", value: "120" },
            { label: "功法", value: "《上古诛仙剑诀》残篇" },
          ],
          note: "异常：被废根骨正在自行重构。",
        },
      ],
    },
    {
      chapterId: "ch05",
      chapterNumber: 5,
      title: "与雪同归",
      summary: "你带着矿账与人间证人重返十二峰，揭开裴行舟的栽赃和仙门繁荣背后的代价。闻照雪终于说出当年的选择；你没有接过掌权者让出的席位，只牵住她的手，一起离开山门。",
      content: [
        {
          id: "preview-ch05-ending-video",
          kind: "video",
          src: "/xianxia/immortal-sister/story/ch05-ending-with-snow-return-v1.mp4",
          poster: "/xianxia/immortal-sister/story/ch05-ending-with-snow-return-poster.jpg",
          alt: "两道剑光掠过云海竹林，月下松枝上白衣人俯瞰人间灯火",
          caption: "终章影像 · 与雪同归",
        },
        {
          id: "preview-ch05-ending",
          kind: "image",
          src: "/xianxia/immortal-sister/story/ch05-return-hearing-v1.png",
          alt: "你带着人间证人与矿账重返十二峰听审",
          caption: "第五章结算 · 与雪同归",
        },
        {
          id: "preview-ch05-hud",
          kind: "hud",
          eyebrow: "第五章结束 · 最终状态",
          title: "剑途新页",
          rows: [
            { label: "修为", value: "剑仙境" },
            { label: "不灭剑魂", value: "完整" },
            { label: "功法", value: "《上古诛仙剑诀》" },
            { label: "道途", value: "自由散仙" },
          ],
          note: "结局不是占有宗门，而是重新选择怎样生活。",
        },
      ],
    },
  ],
  mediaCues: {
    immortal_ch01_s01_m02: [
      {
        id: "immortal-ch01-jade-evidence",
        kind: "image",
        src: "/xianxia/immortal-sister/story/ch01-sword-tomb-residue-v4.png",
        alt: "倒悬残剑遮蔽天光，幽暗剑冢石门的太极阵眼留有淡金剑纹与紫黑药霜",
        caption: "剑冢外阵 · 残纹与候选剑息一致",
      },
      {
        id: "immortal-ch01-status-hud",
        kind: "hud",
        eyebrow: "凌霄宗 · 弟子灵台",
        title: "太初择主前夜",
        rows: [
          { label: "剑道资质", value: "百年剑胚" },
          { label: "太初剑", value: "失窃" },
          { label: "候选次序", value: "十二人之一" },
          { label: "剑冢残纹", value: "与你的试剑剑息一致", tone: "warning" },
        ],
        note: "授剑院众人可证明：残纹出现时，你始终没有离开。",
      },
    ],
    immortal_ch02_s01_m02: [
      {
        id: "immortal-ch02-sealed-original-trace",
        kind: "image",
        src: "/xianxia/immortal-sister/story/ch02-sealed-original-trace-v1.png",
        alt: "听审台上摊开的候选名册、朱砂笔、剑鞘与封存原始剑纹的透明玉匣",
        caption: "封存原纹 · 剑息可以复制，完整灵息不能",
      },
    ],
    immortal_ch02_s02_m03: [
      {
        id: "immortal-ch02-root-broken-hud",
        kind: "hud",
        eyebrow: "惩戒后 · 灵脉诊断",
        title: "山门落雨",
        rows: [
          { label: "修为", value: "尽失", tone: "warning" },
          { label: "根骨", value: "已毁 · 0%", tone: "warning" },
          { label: "剑心", value: "封锁" },
          { label: "宗籍", value: "除名", tone: "warning" },
        ],
        note: "处置：逐往人间。山门将在一炷香后关闭。",
      },
    ],
    immortal_ch03_s01_m01: [
      {
        id: "immortal-ch03-mortal-overlook",
        kind: "image",
        src: "/xianxia/immortal-sister/story/ch03-mortal-overlook-v1.png",
        alt: "失去修为后，你第一次从山脊望见真正的人间聚落",
        caption: "初到人间 · 云下的人并不等仙门批准才生活",
      },
    ],
    immortal_ch03_s01_m02: [
      {
        id: "immortal-ch03-noodle-shop",
        kind: "image",
        src: "/xianxia/immortal-sister/story/ch03-human-noodle-shop-clean-v2.png",
        alt: "雨夜人间面馆里，老板把一碗热面递到你手中",
        caption: "人间烟火 · 有人给你的面里多放了一枚蛋",
      },
    ],
    immortal_ch03_s01_m03: [
      {
        id: "immortal-ch03-mortal-life-hud",
        kind: "hud",
        eyebrow: "人间 · 生存记录",
        title: "一碗面",
        rows: [
          { label: "修为", value: "无" },
          { label: "体力", value: "46 / 100" },
          { label: "铜钱", value: "三十七枚" },
          { label: "今日工钱", value: "一碗热面" },
        ],
        note: "新增记录：这里有人愿意记住你的名字。",
      },
    ],
    immortal_ch04_s01_m01: [
      {
        id: "immortal-ch04-hidden-tablet",
        kind: "image",
        src: "/xianxia/immortal-sister/story/ch04-hidden-tablet-v1.png",
        alt: "你在废矿古祠的石板下发现被藏起的残卷入口",
        caption: "废矿古祠 · 被人藏起来的东西仍在发光",
      },
    ],
    immortal_ch04_s01_m02: [
      {
        id: "immortal-ch04-scroll-awakens",
        kind: "image",
        src: "/xianxia/immortal-sister/story/ch04-ancient-scroll-awakens-v1.png",
        alt: "废矿古祠里，上古残卷照亮破碎的根骨",
        caption: "残卷照骨 · 被废去的经脉开始重新发亮",
      },
      {
        id: "immortal-ch04-cultivation-hud",
        kind: "hud",
        eyebrow: "上古残卷 · 共鸣记录",
        title: "残卷照骨",
        rows: [
          { label: "修为", value: "筑基初期 · 0 / 1000" },
          { label: "不灭剑魂", value: "第一重 · 觉醒 3%" },
          { label: "战力", value: "120" },
          { label: "功法", value: "《上古诛仙剑诀》残篇" },
        ],
        note: "异常：被废根骨正在自行重构。",
      },
    ],
    immortal_ch05_s01_m01: [
      {
        id: "immortal-ch05-return-hearing",
        kind: "image",
        src: "/xianxia/immortal-sister/story/ch05-return-hearing-v1.png",
        alt: "你带着人间证人与矿账重返十二峰听审",
        caption: "重返仙门 · 这一次轮到十二峰回答",
      },
    ],
  },
  segments: [
    {
      id: "immortal_ch01_s01",
      chapterId: "ch01",
      location: "凌霄宗主峰授剑院",
      present: ["wen_zhaoxue", "sang_chi", "pei_xingzhou"],
      goal: "建立太初公开择主前的亲近日常；失窃消息到来后，让你决定先固定不在场人证还是随执事核对原始残纹，不把你写成主动开启剑冢的人。",
      focusRelationships: ["r_shen_wen"],
      pressure: "授剑大典让每个人都必须维持宗门体面；任何异常一旦公开，都会先伤害最接近权力的人。",
      materials: [
        { id: "immortal_ch01_s01_m01", content: "明日，剑冢将让十二柄候选灵剑自行择主，你只是十二名候选者之一。桑迟抱来候选剑谱与赌签，催大家猜哪柄剑会选中你，以及真被选中后你想给它改什么名字；这只是授剑前的轻松日常，不发生警报，不谈调查。闻照雪以亲近师姐身份陪你下注、拿旧事打趣，也认真听你想要什么。" },
        { id: "immortal_ch01_s01_m02", content: "玩家回应赌哪柄剑或想取什么名字后，裴行舟才第一次进入授剑院，带来绝世灵剑太初在公开择主前夜失窃的消息。剑冢外阵留下与你候选试剑牌中相同的剑息残纹；残纹只能证明剑息被使用，不能证明使用者是你，而闻照雪、桑迟和院中杂役都能证明你当时未离开授剑院。" },
        { id: "immortal_ch01_s01_m03", content: "裴行舟承认不在场证明成立，却暗示只有与你亲近且有权限的闻照雪可能取得完整试剑剑息，借机把你们的私人亲近包装成共同嫌疑。" },
      ],
      exit: "不在场人证得到记录，众人转向核对剑冢原始阵纹与试剑牌之间的矛盾。",
    },
    {
      id: "immortal_ch01_s02",
      chapterId: "ch01",
      location: "剑冢外阵与守夜廊",
      present: ["wen_zhaoxue", "pei_xingzhou", "sang_chi"],
      goal: "让你选择怎样自证；闻照雪阻止会毁掉证据或伤及你的冒险验证，裴行舟则用体面的担保取得调查控制权。",
      focusRelationships: ["r_shen_wen", "r_shen_pei"],
      pressure: "宗门更需要明日的大典照常举行，而不是今夜得到一个难看的真相。",
      materials: [
        { id: "immortal_ch01_s02_m01", content: "你可以提出以神识重走外阵来证明残纹是复制品；闻照雪立即拦下，因为重走会抹去原始残纹并可能反噬剑心，她坚持先封存现场，再用人证和阵眼副本自证。" },
        { id: "immortal_ch01_s02_m02", content: "裴行舟以大师兄身份公开为你担保，承诺听审前不拘禁你，并借此接过封存物、值守名册和住处搜查的全部调查权限；他同时把闻照雪列为关系人，要求她回避。" },
        { id: "immortal_ch01_s02_m03", content: "调查尚未结束，失窃的太初剑便在你的住处被找到；搜查由裴行舟的人执行，时间、残纹和物证被迅速拼成罪证，宗门连夜启动听审。" },
      ],
      exit: "你从被庆典需要的天才变成必须证明自己没有犯罪的人。",
    },
    {
      id: "immortal_ch02_s01",
      chapterId: "ch02",
      location: "凌霄宗戒律殿听审台",
      present: ["wen_zhaoxue", "pei_xingzhou", "sang_chi"],
      goal: "让你亲自参与听审、拆解证据与选择信任对象；闻照雪努力保护你，却因矿契旧案无法公开全部真相。",
      focusRelationships: ["r_shen_wen", "r_shen_pei"],
      pressure: "十二峰需要在天亮前给授剑大典一个体面答案，程序越完整，留给人的余地越少。",
      materials: [
        { id: "immortal_ch02_s01_m01", content: "听审依次展示复制的试剑残纹、裴行舟主持的住处搜证与太初剑；你可以逐项质询，但裴行舟把每一次程序让步都包装成对你的保护。" },
        { id: "immortal_ch02_s01_m02", content: "闻照雪拿出封存的原始残纹，证明有人复制了剑息却无法复制你的完整灵息；戒律席随即以她私改北境矿契为由要求她避嫌，她不能公开矿民名单。" },
        { id: "immortal_ch02_s01_m03", content: "桑迟承认错送名册的指令来自裴行舟的副印，却因原始传讯符已被销毁而无法形成完整证据；听审从查真相转向决定由谁承担风险。" },
      ],
      exit: "听审认定你无法自证，闻照雪要求以自己的剑尊席位换取延期，却被一并限制行动。",
    },
    {
      id: "immortal_ch02_s02",
      chapterId: "ch02",
      location: "凌霄宗山门惩戒台与下山石阶",
      present: ["wen_zhaoxue", "pei_xingzhou", "sang_chi"],
      goal: "完成废骨与逐出山门，让你的误会来自亲眼所见而非作者说明，同时保留闻照雪仍在行动的证据。",
      focusRelationships: ["r_shen_wen", "r_shen_pei"],
      pressure: "宗门把牺牲一个弟子称作维持秩序；任何公开反抗都会让闻照雪与矿民一起被追加问罪。",
      materials: [
        { id: "immortal_ch02_s02_m01", content: "惩戒阵封住你的经脉并废去根骨；闻照雪强行踏入阵线替你挡下一部分剑意，自己也被戒律锁链困在台上。" },
        { id: "immortal_ch02_s02_m02", content: "你隔着禁制追问闻照雪，她只能要求你先活下去，不能说出矿契与证人的位置；这句保护在此刻听来更像默认罪名。" },
        { id: "immortal_ch02_s02_m03", content: "宗籍被除、山门将闭，桑迟冒险把一枚没有署名的旧矿牌塞进你的行囊；闻照雪被带回十二峰软禁，你独自被送下人间。" },
      ],
      exit: "山门在雨里关闭，你失去修为与宗籍，带着对闻照雪的误会和那枚旧矿牌进入人间。",
    },
    {
      id: "immortal_ch03_s01",
      chapterId: "ch03",
      location: "北境矿镇雨巷与陈伯面铺",
      present: ["chen_bo", "a_ruo", "lu_kui"],
      goal: "让你以凡人身份靠劳动与关系重新获得立足处，并从普通人的生活看见仙门资源制度的真实代价。",
      focusRelationships: [],
      pressure: "没有宗籍的人不能合法修行，矿镇却每天把灵石送上山；这里的人只相信能一起扛活、一起承担后果的人。",
      materials: [
        { id: "immortal_ch03_s01_m01", content: "陈伯没有追问你的仙门过去，只让你劈柴、记账换一碗热面；阿箬从你手上的剑茧认出你受过训练，却替你保留沉默。" },
        { id: "immortal_ch03_s01_m02", content: "矿工谈起灵税、伤病和被除名者：山上每多点亮一座阵，山下就有人多下一次废矿；你第一次知道旧矿牌属于一座已被注销的矿。" },
        { id: "immortal_ch03_s01_m03", content: "吕魁带着盖有仙门外务印的文书来收灵税，并以无宗籍修行为由盯上你；他身上的副印纹路与裴行舟的听审文书同源。" },
      ],
      exit: "你不再只想熬过今晚，决定和矿镇的人一起查清废矿、旧矿牌与外务副印的联系。",
    },
    {
      id: "immortal_ch03_s02",
      chapterId: "ch03",
      location: "北境废矿与封闭古祠外廊",
      present: ["chen_bo", "a_ruo", "lu_kui"],
      goal: "让失去修为的你依靠观察、劳作经验和同伴协作对抗邪修，找到通往残卷与真相的入口。",
      focusRelationships: [],
      pressure: "吕魁拥有修为和合法文书，你拥有的只是矿工愿不愿意站出来，以及自己是否还敢相信别人。",
      materials: [
        { id: "immortal_ch03_s02_m01", content: "你利用矿井旧支架、药粉与排水沟反制吕魁的追捕，没有恢复修为也没有凭空碾压；阿箬与陈伯按你的安排完成关键协作。" },
        { id: "immortal_ch03_s02_m02", content: "吕魁留下的账册记录灵石经外务堂转入剑冢，其中夹着闻照雪多次要求停止征收的批注；她被指控的私改矿契实际是在替矿民减债。" },
        { id: "immortal_ch03_s02_m03", content: "旧矿牌打开废矿深处的封闭古祠，祠内残卷对你破碎的根骨产生微弱回应；矿工愿意替你保存账册并等待你的下一步。" },
      ],
      exit: "你找到上古残卷与闻照雪留下的证据，必须决定是否重新踏上修行之路。",
    },
    {
      id: "immortal_ch04_s01",
      chapterId: "ch04",
      location: "废矿古祠与地下灵脉断层",
      present: ["chen_bo", "a_ruo", "lu_kui"],
      goal: "让力量回归成为一次有代价的选择，而不是无条件爽点；残卷回应你在人间形成的新判断。",
      focusRelationships: [],
      pressure: "残卷可以重构根骨，也可能把你重新变成只相信力量的人；吕魁仍试图夺走账册与古祠。",
      materials: [
        { id: "immortal_ch04_s01_m01", content: "残卷要求你以破碎经脉承受第一次共鸣；阿箬守住入口，陈伯用矿工记号帮你找到灵脉真正的断点。" },
        { id: "immortal_ch04_s01_m02", content: "残卷不是替你恢复旧根骨，而是沿着你在人间重新建立的选择重构经脉；不灭剑魂第一重觉醒，修为开始回流。" },
        { id: "immortal_ch04_s01_m03", content: "你一夜筑基并击退吕魁，却没有杀死或替同伴决定后果；完整矿账与外务副印成为可以带回仙门的证据。" },
      ],
      exit: "力量重新回来，但你已经不是只为证明天赋而执剑的人。",
    },
    {
      id: "immortal_ch04_s02",
      chapterId: "ch04",
      location: "矿镇面铺后院与上山古道",
      present: ["sang_chi", "chen_bo", "a_ruo"],
      goal: "揭开闻照雪被软禁的真相，组织证人与证据，让返回仙门成为你与同伴共同作出的行动。",
      focusRelationships: ["r_shen_wen"],
      pressure: "十二峰将在三日内销毁旧矿契；上山意味着矿民公开身份，也意味着你必须承担他们选择相信你的风险。",
      materials: [
        { id: "immortal_ch04_s02_m01", content: "桑迟逃下山带来闻照雪被软禁的消息：她在听审前已查到裴行舟副印，却为保护矿民姓名拒绝交出完整矿册。" },
        { id: "immortal_ch04_s02_m02", content: "闻照雪留下的短笺没有要求你复仇，只写明证据位置并让你自行选择人生；你终于确认她的沉默不是放弃。" },
        { id: "immortal_ch04_s02_m03", content: "陈伯与阿箬决定携矿账同行，其他矿工提供证词与副本；你们避开正门，沿废弃运矿古道重返十二峰。" },
      ],
      exit: "你带着力量、证据和愿意亲自开口的人返回仙门，目标是救出闻照雪并公开改写规则。",
    },
    {
      id: "immortal_ch05_s01",
      chapterId: "ch05",
      location: "凌霄宗十二峰联合听审台",
      present: ["wen_zhaoxue", "pei_xingzhou", "sang_chi", "chen_bo", "a_ruo"],
      goal: "让你通过证据、证人和当场选择夺回叙事权，而非只靠修为碾压；让裴行舟保持聪明并逐步失去退路。",
      focusRelationships: ["r_shen_wen", "r_shen_pei"],
      pressure: "十二峰愿意惩罚一个坏人，却未必愿意承认整套分配制度依靠山下人的损失维持。",
      materials: [
        { id: "immortal_ch05_s01_m01", content: "你带陈伯、阿箬、矿账与副印重返听审台；闻照雪仍被禁制隔离，但第一次看见你不是独自回来。" },
        { id: "immortal_ch05_s01_m02", content: "裴行舟承认副印属于外务堂，却试图把吕魁定义为个人越权；矿工证词、转账路径与桑迟保存的名册迫使他解释为何每次错误都只对他有利。" },
        { id: "immortal_ch05_s01_m03", content: "裴行舟栽赃、转移灵石与操纵听审的证据公开；他失去继承席位，但听审席仍试图用惩罚个人来保住旧制度。" },
      ],
      exit: "裴行舟的罪被揭开，真正的问题转为谁来决定仙门与人间今后的关系。",
    },
    {
      id: "immortal_ch05_s02",
      chapterId: "ch05",
      location: "听审台外的晨光长阶",
      present: ["wen_zhaoxue", "pei_xingzhou", "sang_chi", "chen_bo", "a_ruo"],
      goal: "让闻照雪、矿民与宗门分别表达未来诉求，最后选择权归还玩家，并忠实演绎玩家明确作出的终局选择。",
      focusRelationships: ["r_shen_wen"],
      pressure: "打倒裴行舟不等于新秩序自动出现；接过席位可以立即改变制度，离开则拒绝让亲密关系再次成为权力工具。",
      materials: [
        { id: "immortal_ch05_s02_m01", content: "闻照雪获释并亲口解释当年沉默：她选择先保住矿民名单与活着的你，却承认替你决定一切也伤害了你。" },
        { id: "immortal_ch05_s02_m02", content: "陈伯要求矿民拥有矿契表决权，桑迟希望宗籍不再决定修行资格；长老席邀请你接过空出的席位，闻照雪不替你选择。" },
        { id: "immortal_ch05_s02_m03", content: "最终抉择被明确交还给你：接过席位留在仙门改革，或拒绝权位带闻照雪离开。所有NPC必须停下来等待玩家明确选择，不能代替玩家决定。" },
        { id: "immortal_ch05_s02_m04", content: "忠实执行玩家上一轮已经明确作出的终局选择并演出直接后果；若玩家仍未选择，则继续让人物回应与澄清，绝不能擅自完成故事。" },
      ],
      exit: "你的明确选择得到执行，仙门与闻照雪的未来由此确定，故事完成。",
    },
  ],
  styleProfile: ensembleTableauXianxiaStyle,
};

const steadyDao: XianxiaStory = {
  id: "steady-dao",
  title: "稳字经",
  subtitle: "李长寿篇",
  logline: "一个只想平安活完寿元的炼气士，先处理了一名走错阵的探子，后来却不得不替整个洪荒重新计算活路。",
  accent: "#a9ccef",
  playerRole: {
    id: "li_changshou",
    name: "李长寿",
    displayRole: "小琼峰大师兄",
    fixedCore: "你是地球绝症患者转世，在小琼峰低调修行三十三年。你精通炼丹、阵法、纸人、毒术与信息差，暗中掌握八百座护峰阵法。",
    baselineTendency: "过去的你以惜命、周全和不轻易暴露底牌闻名；这只是可供玩家采用或反向选择的表演底色，不代表本轮一定谨慎、藏话、装糊涂或另有算计。",
    freeAgency: "你可以决定何时隐藏、何时布局、是否让身边人参与风险，以及最终把稳健理解为独自控制还是共同承担。",
  },
  introduction: {
    time: "封神大劫前夕，诸圣尚未公开落子",
    place: "东胜神洲，度仙门小琼峰",
    world: "洪荒表面仍讲清修、机缘与师承，天庭、大教和仙门却已经开始重新计算香火、气运与因果。没有人公开宣布大劫开始，近来各峰收到的历练名册、外务符牒和凡间祈文却频频错位；有些只是官署忙乱，有些则像有人在用最寻常的差事丈量每个人的软肋。度仙门并非洪荒大宗，只占着几条尚能吐纳的灵脉，门内弟子大多相信灾祸离自己还远。小琼峰尤其不起眼：山不高、弟子少，峰主齐源精于草药却不擅经营，真正把这座山变得难以靠近的，是你三十三年间埋下的丹炉、纸人、毒障和八百座彼此套叠的微光阵法。",
    situation: "你是小琼峰大师兄，曾因死过一次而在宗门留下惜命、周全的名声。明面上，你修为普通，日常负责炼丹、教导师妹蓝灵娥和替师父收拾峰内账目；暗地里，你掌握整座山的阵眼与撤离方案。过去怎样行事不限制你今天怎样选择。今日原本只有两件小事：蓝灵娥想少抄几遍《稳字经》，酒玖想让你替她藏下一坛不该出现的酒。就在茶还温着时，西崖第一层迷阵被人越过。来者没有能力触及真正的杀阵，这次麻烦本身并不难解决；值得计算的是，他为什么带着一枚真实的度仙门外务符，又为什么恰好知道小琼峰最安全的公开路径。",
    objective: "先用最小动静控制闯阵者，别让一次低水平试探搅乱小琼峰的日常；再判断泄露路径的是粗心、贪财还是一条正在伸进宗门的因果线。过程中，你还得决定要把多少真相告诉蓝灵娥——她已经不满足于只享受你的保护。",
  },
  threeAct: [
    "一次针对小琼峰的试探迫使你从被动躲避转为主动构建安全域，同时让蓝灵娥开始追问自己是否有权知道风险。",
    "封神压力渗入宗门与三界，你以纸人和身份差周旋各方；每一次更周全的布局，都让你离清静更远。",
    "你以均衡道开启大道之庭，换众生共同裁决规则；你失去成圣道路，却保住所有人仍能选择怎样活着的余地。",
  ],
  chapters: [
    { id: "ch01", title: "小琼峰今日无事", summary: "西崖探子很快落网；真正留下的是一枚来自宗门内部的外务符，以及蓝灵娥第一次不肯被你支开的眼神。" },
    {
      id: "ch02",
      title: "九成八之外",
      summary: "一份被改过的历练名册把蓝灵娥送向伏击。你能保她平安，却不能继续替她决定是否知情。",
      entry: "次日清晨，西崖的困阵已经恢复原样。从闯阵者身上取下的外务符封在药房案上，符角还沾着西崖的灰白石屑。小琼峰重新有了茶香和扫地声，仿佛麻烦确实只来过一夜。蓝灵娥却带回一份新历练名册：她被临时补进乌龙谷采药队，路线恰好经过外务符所指的废弃山神庙。她把名册压在你的丹炉旁，没有问能不能不去，只问这次你准备告诉她多少。",
      entryChoices: [
        { kind: "action", text: "把新旧路线图都铺开核对" },
        { kind: "speech", text: "先问她自己究竟想不想去" },
      ],
    },
    {
      id: "ch03",
      title: "纸人入局",
      summary: "你用不存在的身份截住一场伏击，也让一个本不存在的人进入天庭与龙宫的账册。",
      entry: "乌龙谷的伏击没有等到真正的采药队，只等到三个会吵架、会装死、被拆开后还能自己爬回来的纸人。活口供出的买家没有姓名，只有一张来自东海水路的香火兑票。回峰后，你刚把纸人烧到第四遍，天庭便派来一名小吏，客气地询问‘海神长庚’为何连续三次干预凡间水路。这个名字原本只是你写在假符上的落款，如今却已经有了官署档案、两份功德和一笔待领取的俸禄。",
      entryChoices: [
        { kind: "speech", text: "先问这份俸禄究竟是谁批的" },
        { kind: "action", text: "让纸人长庚出面接下文书" },
      ],
    },
    {
      id: "ch04",
      title: "大劫没有旁观席",
      summary: "长庚的布局救了许多人，也把身边人留在解释之外；蓝灵娥和酒玖要求共同选择下一次风险。",
      entry: "几年后，‘长庚’已经在天庭账册里升了三次职，你本人仍在小琼峰上以炼气弟子的身份晒药。这样的安排本来很稳，直到同一天送来三封信：天庭要长庚调停两教冲突，度仙门要求你交出护峰阵图，蓝灵娥则把一只被雷劈焦的纸人放到石桌上。她没有拆穿你，只说这只纸人替她挡了一劫，而她甚至不知道自己什么时候被放进了你的计划。酒玖抱着酒坛坐在一旁，难得没有替任何人打圆场。",
      entryChoices: [
        { kind: "speech", text: "把能说的布局从头告诉她们" },
        { kind: "action", text: "先查清是谁逼近小琼峰" },
      ],
    },
    {
      id: "ch05",
      title: "大道之庭",
      summary: "你以均衡道迫使高高在上的秩序接受共同裁决，失去成圣之路，却把选择留给仍要生活的人。",
      entry: "封神榜落定之前，诸圣留下的规则已经开始自行吞噬凡间与仙门。你站在大道之庭尚未闭合的门槛上，身后是蓝灵娥、酒玖、齐源与无数被写进账册却从未被问过的人，面前则是代表旧秩序的道祖鸿钧。你有九成八把握保住自己，也有一条胜算不足两成的路，可以让所有人第一次共同审视这些规则。蓝灵娥把那册只抄了三行的《稳字经》塞回你手里，说最后一条该由你亲自补。",
      entryChoices: [
        { kind: "action", text: "以均衡道开启大道之庭" },
        { kind: "speech", text: "先逼鸿钧说清规则的代价" },
      ],
    },
  ],
  characters: [
    {
      id: "lan_linge",
      name: "蓝灵娥",
      role: "小琼峰师妹",
      shortBio: "二十三岁的年轻炼气士，明快、机灵又有点好胜。她敬重你，也不愿永远被当成需要藏起来的人；依赖你的周全，也在意你是否把她当作真正的同行者。",
      portrait: "/xianxia/steady-dao/portraits/lan-linge.png",
      featured: true,
      storyCore: "具备基础御剑与外出历练能力，不知道你的真实修为和全部底牌。底线是不拿同门性命证明自己。",
      performanceCore: "说话轻快，会撒娇也会反问；紧张时嘴更快，受保护时既安心又不服气。不会只作为被救对象。",
      privateGoal: "免掉眼前罚抄，更长远地想让你把她当成可以知情参与的人。",
      secret: "她早就注意到小琼峰的护山阵纹会自己生长，猜到你藏了实力却装不知道；她在等你亲口告诉她，而不是被瞒到最后。",
      firstAppearance: "趴在石桌另一端抄《稳字经》，见戒尺转动便藏纸，三句话内让人知道她怕罚、亲近你，也敢跟你讨价还价。",
    },
    {
      id: "jiu_jiu",
      name: "酒玖",
      role: "破天峰小师叔",
      shortBio: "二十九岁的外务高手，按宗门辈分是你的小师叔。酒气比人先到，脸皮厚、消息灵、临场反应快；习惯把棘手问题塞进玩笑里，却并非真的不在乎危险。",
      portrait: "/xianxia/steady-dao/portraits/jiu-jiu.png",
      featured: true,
      storyCore: "修为与外务经验都高于小琼峰明面水平，能接触宗门消息，但不知道你的阵法规模与真实修为。",
      performanceCore: "豪爽、不端着长辈架子，理亏时尤其镇定；说话有生活气，不满口玄言。",
      privateGoal: "躲开掌门追酒，也想确认最近出现在度仙门附近的陌生气息究竟冲谁而来。",
      secret: "她这次上山不只是躲酒：外务殿丢了一份关于小琼峰灵脉的旧档，她怀疑有人在打这座峰的主意，没证据前不想吓到任何人。",
      firstAppearance: "酒气先翻过墙，人落地后假装没有踉跄，坐下前已经把酒碗从袖子里取了出来。",
    },
    {
      id: "qi_yuan",
      name: "齐源",
      role: "小琼峰峰主",
      portrait: "/xianxia/steady-dao/portraits/qi-yuan.png",
      featured: true,
      shortBio: "修为和山门地位都不显眼的宽厚师父，遇公文头疼，遇弟子出事却会站稳。他知道你远比表面可靠，只没想到可靠已经发展成八百座阵法。",
      storyCore: "能决定峰内分工，无权推翻外务殿正式命令；底线是保住两个弟子和小琼峰。",
      performanceCore: "宽厚、怕麻烦，常用吃饭和药草化解门规压力；真正生气时不喊口号，只做具体决定。",
      privateGoal: "不让小琼峰因公开抗命被宗门盯上，也不愿弟子替自己的软弱付账。",
      secret: "他年轻时替宗门背过一次黑锅才被发配小琼峰；旧事他从不提，却因此格外见不得弟子被程序碾过。",
      firstAppearance: "提着漏水药壶回来，先问众人吃没吃饭，再发现自己的院子已经进入战备。",
    },
    {
      id: "tian_ting_clerk",
      name: "木公小吏",
      role: "天庭文书官",
      portrait: "/xianxia/steady-dao/portraits/heavenly-clerk.png",
      featured: true,
      shortBio: "一个认真到近乎荒谬的基层仙官，坚信三界所有异常最终都能找到正确表格。胆子不大，却会为了账目对上而顶住上级。",
      storyCore: "掌握长庚身份的公开官署记录，不知道长庚是你的纸人。底线是不篡改已经入档的功德。",
      performanceCore: "说话礼貌、具体，紧张时会反复核对印章；笑点来自他对混乱现实仍保持文书信仰。",
      privateGoal: "找到真正的长庚签完积压文书，免得自己再替一个不存在的人值夜。",
      secret: "他其实已发现长庚的笔迹与小琼峰某位弟子高度相似，但账目对得上，他就选择不写进呈报——这是他文书生涯唯一一次装糊涂。",
      firstAppearance: "抱着比自己上身还高的文书落在小琼峰，先整理歪掉的官帽，再问这里谁叫长庚。",
    },
    {
      id: "hongjun",
      name: "鸿钧",
      role: "道祖与旧秩序化身",
      portrait: "/xianxia/steady-dao/portraits/hongjun.png",
      featured: true,
      shortBio: "不靠怒吼维持权威的人。他把天地稳定看得高于个体得失，相信牺牲少数是避免更大崩塌的唯一理性。",
      storyCore: "知道大劫规则与均衡道的代价，不知道你最终愿意放弃多少。底线是不能允许天地规则完全失控。",
      performanceCore: "语气平静、精确，能承认局部痛苦却拒绝因此否定整体秩序；不得写成只会威胁的空洞反派。",
      privateGoal: "让你接手维护旧秩序，证明任何反抗者最终都必须坐上同一把椅子。",
      secret: "大道之庭并非他所建，他自己也是接任者；那把椅子上坐过别人，这是他绝不主动透露的事。",
      firstAppearance: "大道之庭尽头先出现一道没有影子的座椅，随后才有人开口，像天地规则终于决定亲自解释自己。",
    },
  ],
  relationships: [
    { id: "r_li_lan", roles: ["li_changshou", "lan_linge"], public: "你与二十三岁的蓝灵娥是相处多年的成年师兄妹，你长期负责她的修行与安全；日常亲近到一眼就能看出对方有没有撒谎。", tension: "保护给她安全，也可能剥夺她知情并选择风险的权利；熟稔正在缓慢长成心动，但双方都还没有替彼此下结论。" },
    { id: "r_li_jiu", roles: ["li_changshou", "jiu_jiu"], public: "二十九岁的酒玖常来小琼峰蹭酒、托事，知道你办事稳妥，也习惯拿你的过度谨慎开玩笑。", tension: "她愿意相信你的谨慎，也偶尔故意靠近试探你会不会慌；默认不越过清晰边界，不替蓝灵娥的主情感线抢戏。" },
    { id: "r_lan_jiu", roles: ["lan_linge", "jiu_jiu"], public: "小师叔与小师妹，斗嘴多年、感情不坏。", tension: "酒玖爱拿你打趣逗蓝灵娥脸红；蓝灵娥嘴上嫌弃，私下一直偷偷跟这位小师叔学在外面办事的门道。" },
    { id: "r_qi_lan", roles: ["qi_yuan", "lan_linge"], public: "师父与小弟子，日常互相包庇躲文书。", tension: "齐源总觉得亏欠她一个更有出息的师门，处处多护半分；蓝灵娥却更想让师父看到她能自己扛事。" },
    { id: "r_qi_jiu", roles: ["qi_yuan", "jiu_jiu"], public: "峰主与常来蹭酒的外务高手，彼此欠着数不清的小人情。", tension: "酒玖看得出齐源在替弟子挡事却装糊涂；齐源猜得到她上山另有目的，两人都不先开口。" },
  ],
  worldProcesses: [
    { id: "proc_stranger", title: "度仙门外的陌生气息", stage: "起", note: "后山迷阵连续两夜被轻微试探，痕迹被刻意抹去。" },
    { id: "proc_archive", title: "外务殿灵脉旧档失窃", stage: "起", note: "关于小琼峰灵脉的旧档不见了，外务殿内部还在悄悄自查。" },
  ],
  worldAtlas: `东胜神洲·度仙门版图：
- 度仙门居东胜神洲一隅，非洪荒大宗，占几条尚能吐纳的灵脉。主峰有掌门居所与议事大殿；破天峰主兵刃锻造（酒玖常往）；外务殿管符牒、核账与凡间事务。
- 小琼峰是门中最不起眼的一峰：前庭草屋、青石案、药圃，后山有药窖与温酒泥炉；西崖外层是伪装成天然石林的低阶迷阵，全峰三十三年累计八百座微光阵法层层套叠。小琼峰明面上只有一条公开山径上山。
- 山门之下是凡俗城镇与农户（步行两日），凡间祈文经外务殿转递。东胜神洲之外有天庭、大教势力，大人物的目光以历练名册与外务符牒的形式渗进门中。
- 生成新地点时按此版图推方位与距离；未列出的地点须与版图逻辑相容并沿用命名风格。位置表述从大到小写（宗门/区域·峰/地界·具体点）。`,
  opening: {
    usedMaterialId: "steady_ch01_s01_m01",
    choices: [
      { kind: "action", text: "指尖暗扣阵诀，将闯入者锁在西崖" },
      { kind: "speech", text: "灵娥收好字，随我去西崖看看" },
    ],
    events: [
      {
        type: "narration",
        text: `**东胜神洲 · 度仙门小琼峰 · 午后**`,
      },
      {
        type: "narration",
        text: `封神大劫将至，诸圣尚未公开落子，各峰收到的历练名册与外务符牒却一年密过一年。度仙门不是什么洪荒大宗，门中最不起眼的是小琼峰：山不高，弟子少，峰主看似只会种药炼丹——没人知道这座山从山脚第一块石头起就被重新布过，三十三年，**八百座微光阵法**，一层叠着一层。\n峰主姓李，名长寿，三十三年只修一个字：**稳**。就是你。`,
      },
      {
        type: "narration",
        text: `午后的阳光透过矮竹筛在前庭的青石案上。案上摊着一摞黄麻纸，页页都是同一部**《稳字经》**，最上面那张的页脚用朱笔标着小字：**「第三十六遍 · 未完」**。你坐在案前，指尖刚搭上那把包浆温润的老竹戒尺——\n石案另一端，二十三岁的师妹**蓝灵娥**正趴着，两只乌溜溜的眼睛隔着纸摞觑你，眼疾手快地用宽大袖口把最上面那张墨迹未干的纸页盖住，发梢扫过你搁在案沿的手背。`,
      },
      {
        type: "dialogue",
        person: "lan_linge",
        text: `师兄，第三十五遍和第三十六遍其实只差了七个字，而且今天外务殿送来的灵墨太糙，磨得我手腕都酸了……你看，这道红印是不是得休养两炷香？`,
      },
      {
        type: "narration",
        text: `她把纤细的手腕递到你眼皮底下晃了晃，嘴角噙着藏不住的机灵笑意。还没等你的戒尺落下去——先翻过前庭矮墙的，是一股浓郁清洌的酒香。二十九岁的小师叔**酒玖**踏着旧草鞋轻巧落地，宽袖一抖，两只粗陶酒碗与一坛贴着破天峰封条的**「醉仙颜」**稳稳落在石案正中。`,
      },
      {
        type: "dialogue",
        person: "jiu_jiu",
        text: `长寿，别为难灵娥了。来，帮师叔把这坛“醉仙颜”塞进你那药窖最底层，掌门师兄查得紧，整座度仙门也就你这小琼峰最像个清修地界。`,
      },
      {
        type: "dialogue",
        person: "lan_linge",
        text: `师叔又拿陈年灵酒贿赂师兄！上次外务殿来核账，师兄替你顶了三坛“损耗”，害我平白多洗了半个月的灵药碾子。`,
      },
      {
        type: "dialogue",
        person: "jiu_jiu",
        text: `小丫头懂什么，下个月破天峰分发百炼精金，我多给你拨三斤打飞剑。长寿，茶先放放，把你后山那套温酒的泥炉子起开？`,
      },
      {
        type: "narration",
        text: `酒玖自顾自拉过竹凳坐下，顺手将灵娥面前的一碟桂花糕顺走大半。蓝灵娥鼓了鼓腮帮子，悄悄把身子朝你的方向挪了半寸，指尖拽住你的衣角轻轻晃动。`,
      },
      {
        type: "narration",
        text: `清风拂过庭前药草——石案之下，由你亲手布设的地脉灵引毫无征兆地轻颤了一下。西崖最外层那座伪装成天然石林的低阶迷阵，被一股极其微弱的气息精准越过：来人修为低微，却怀揣着度仙门正规的**外务符牒**，正沿着小琼峰明面上唯一的公开山径摸索上来。\n灵娥与酒玖毫无察觉，仍在为茶盏与桂花糕斗嘴。指诀微动，三息之内就能把人无声捆进石缝；任他再走两步，或许能看清是哪个不长眼的同门走漏了路线。`,
      },
      {
        type: "dialogue",
        person: "lan_linge",
        text: `师兄？你手里的茶都凉了……是不是又要借口去巡视后山药圃来躲我的差事？`,
      },
    ],
  },
  initialHud: {
    id: "steady-initial-hud",
    kind: "hud",
    compact: true,
    eyebrow: "稳字经 · 初始状态",
    title: "道心略涣散",
    rows: [
      { label: "稳健", value: "12/100" },
      { label: "酒玖好感", value: "5/100" },
      { label: "灵娥心动", value: "6/100" },
      { label: "修为", value: "8/100" },
    ],
  },
  chapterBackgrounds: {
    ch01: {
      video: "/xianxia/steady-dao/backgrounds/ch01-courtyard-hd.mp4",
      poster: "/xianxia/steady-dao/backgrounds/ch01-courtyard-hd.jpg",
      label: "小琼峰云台上的三人日常",
      tone: { top: "#e9f5ff", middle: "#d8dff0", bottom: "#9ea9c8" },
    },
    ch02: {
      video: "/xianxia/steady-dao/backgrounds/ch02-herb-garden-hd.mp4",
      poster: "/xianxia/steady-dao/backgrounds/ch02-herb-garden-hd.jpg",
      label: "云上药圃里的蓝灵娥",
      tone: { top: "#f2f7ff", middle: "#d8e9e5", bottom: "#91ada9" },
    },
    ch03: {
      video: "/xianxia/steady-dao/backgrounds/ch03-cloud-route-hd.mp4",
      poster: "/xianxia/steady-dao/backgrounds/ch03-cloud-route-hd.jpg",
      label: "天庭文书抵达的云海航路",
      tone: { top: "#eef7ff", middle: "#cbdcf1", bottom: "#8799bd" },
    },
    ch04: {
      video: "/xianxia/steady-dao/backgrounds/ch04-cloud-night-feast-hd.mp4",
      poster: "/xianxia/steady-dao/backgrounds/ch04-cloud-night-feast-hd.jpg",
      label: "封神前夜的云上夜宴",
      tone: { top: "#f5eefb", middle: "#d9cbe8", bottom: "#887da5" },
    },
    ch05: {
      video: "/xianxia/steady-dao/backgrounds/ch05-lantern-court-hd.mp4",
      poster: "/xianxia/steady-dao/backgrounds/ch05-lantern-court-hd.jpg",
      label: "大道之庭映出的万家灯火",
      tone: { top: "#fff1e8", middle: "#dbcbdc", bottom: "#766e91" },
    },
  },
  backgroundMusic: {
    src: "/xianxia/steady-dao/audio/light-guofeng-theme.mp3",
    title: "古风轻快中国风",
    queue: [{
      src: "/xianxia/steady-dao/audio/qingyi-theme.mp3",
      title: "青衣（新版）",
    }],
  },
  mediaCues: {
    steady_ch01_s01_m02: [{
      id: "steady_story_ch01_courtyard",
      kind: "image",
      src: "/xianxia/steady-dao/story/ch01-courtyard-hd.png",
      alt: "云上小琼峰石桌旁三名年轻修士正在说笑",
      caption: "小琼峰今日无事 · 一壶茶前的三人日常",
    }],
    steady_ch02_s01_m01: [{
      id: "steady_story_ch02_herb_garden",
      kind: "image",
      src: "/xianxia/steady-dao/story/ch02-herb-garden-hd.png",
      alt: "蓝灵娥在云上药圃回头望向你",
      caption: "乌龙谷前 · 这一次她想参与自己的计划",
    }],
    steady_ch03_s01_m01: [{
      id: "steady_story_ch03_cloud_route",
      kind: "image",
      src: "/xianxia/steady-dao/story/ch03-cloud-route.jpg",
      alt: "文书官沿云海航路来到小琼峰",
      caption: "天庭云路 · 一个不存在的人有了俸禄",
    }],
    steady_ch04_s01_m01: [{
      id: "steady_story_ch04_celestial_sea",
      kind: "image",
      src: "/xianxia/steady-dao/story/ch04-celestial-sea.jpg",
      alt: "封神前夜云海上灯火密集的仙城",
      caption: "三界同夜 · 三封信一起到了",
    }],
    steady_ch05_s01_m01: [{
      id: "steady_story_ch05_lantern_court",
      kind: "image",
      src: "/xianxia/steady-dao/story/ch05-lantern-court.jpg",
      alt: "月下灯火延伸到大道之庭",
      caption: "大道之庭 · 规则终于亲自开口",
    }],
  },
  chapterEndPreviews: [
    {
      chapterId: "ch01",
      chapterNumber: 1,
      title: "一名探子，八百座阵",
      summary: "闯阵者没有机会碰到真正的杀阵便被纸人捆回院中。麻烦很快解决，他携带的外务符却证明小琼峰的公开路径已经从宗门内部流出。",
      nextObjective: "查清被改动的历练路线，并决定蓝灵娥能知道多少。",
      content: [
        { id: "steady_end_ch01_image", kind: "image", src: "/xianxia/steady-dao/story/ch01-courtyard-hd.png", alt: "小琼峰三人围坐云台", caption: "小琼峰今日无事——至少表面如此" },
        { id: "steady_end_ch01_hud", kind: "hud", eyebrow: "小琼峰安全札记", title: "今日仍可算无事", rows: [
          { label: "暴露底牌", value: "零座核心阵法" },
          { label: "捕获", value: "探路者一名" },
          { label: "新增风险", value: "宗门路径外泄", tone: "warning" },
        ], note: "蓝灵娥已经确认你在瞒事，而且不准备装作没看见。" },
      ],
    },
    {
      chapterId: "ch02",
      chapterNumber: 2,
      title: "安全不能只由一个人解释",
      summary: "伏击被纸人提前拆掉，蓝灵娥也第一次参与了自己的撤离方案。她接受你的谨慎，却拒绝继续只收到一个已经决定好的结果。",
      nextObjective: "追查香火兑票背后的买家，以及突然拥有官署记录的‘长庚’。",
      content: [
        { id: "steady_end_ch02_image", kind: "image", src: "/xianxia/steady-dao/story/ch02-herb-garden-hd.png", alt: "蓝灵娥站在云上药圃", caption: "乌龙谷之外 · 她进入了自己的撤离图" },
        { id: "steady_end_ch02_hud", kind: "hud", eyebrow: "关系与风险", title: "主动安全域 · 初成", rows: [
          { label: "纸人损耗", value: "三具，可回收两具" },
          { label: "师妹知情度", value: "由一成升至四成" },
          { label: "身份异常", value: "长庚已被记入天庭", tone: "warning" },
        ] },
      ],
    },
    {
      chapterId: "ch03",
      chapterNumber: 3,
      title: "一个不存在的人升官了",
      summary: "纸人长庚替你接下天庭文书，也开始影响真实水路与凡人生计。你没有暴露真身，却再也不能假装这只是一次临时伪装。",
      nextObjective: "在大劫正式落子前，决定哪些人可以进入你的真实布局。",
      content: [
        { id: "steady_end_ch03_image", kind: "image", src: "/xianxia/steady-dao/story/ch03-cloud-route.jpg", alt: "云海航路上的天庭来客", caption: "长庚入册 · 纸人开始领俸禄" },
        { id: "steady_end_ch03_hud", kind: "hud", eyebrow: "三界身份簿", title: "海神长庚", rows: [
          { label: "官阶", value: "不高，但文书很多" },
          { label: "功德", value: "两份已入账" },
          { label: "真实存在", value: "理论上没有", tone: "warning" },
        ] },
      ],
    },
    {
      chapterId: "ch04",
      chapterNumber: 4,
      title: "大劫没有旁观席",
      summary: "你公开了足以共同决策的布局，也承认谨慎背后并不只有理性，还有死过一次的人对失去的恐惧。身边人选择留下，但不再接受被动保护。",
      nextObjective: "带着共同决定的方案进入大道之庭。",
      content: [
        { id: "steady_end_ch04_image", kind: "image", src: "/xianxia/steady-dao/story/ch04-celestial-sea.jpg", alt: "封神前夜的云海仙城", caption: "大劫之前 · 旁观席已经撤走" },
        { id: "steady_end_ch04_hud", kind: "hud", eyebrow: "均衡道推演", title: "胜算不足两成", rows: [
          { label: "个人生还", value: "九成八" },
          { label: "众生保有选择", value: "一成九", tone: "warning" },
          { label: "同行者", value: "不再由你单方面删减" },
        ] },
      ],
    },
    {
      chapterId: "ch05",
      chapterNumber: 5,
      title: "活着这件小事",
      summary: "大道之庭开启，旧规则第一次接受众生共同审视。你以均衡道支付代价，修为退回金仙，也失去了成圣捷径，却保住了所有人继续选择生活的余地。",
      content: [
        { id: "steady_end_ch05_image", kind: "image", src: "/xianxia/steady-dao/story/ch05-balance-court.jpg", alt: "云海长阶上，两道身影共同走向大道之庭", caption: "均衡道展开 · 选择重新交还众生" },
        { id: "steady_end_ch05_hud", kind: "hud", eyebrow: "最终状态", title: "稳字经 · 末页", rows: [
          { label: "修为", value: "金仙 · 可慢慢重修" },
          { label: "成圣路径", value: "已关闭" },
          { label: "明日", value: "仍有不止一条路" },
        ], note: "蓝灵娥后来补上了第四行：稳，不等于一个人把所有门都锁上。" },
      ],
    },
  ],
  segments: [
    {
      id: "steady_ch01_s01",
      chapterId: "ch01",
      location: "度仙门小琼峰草屋前庭与西崖迷阵",
      present: ["lan_linge", "jiu_jiu", "qi_yuan"],
      goal: "让你确认闯阵者的目标与情报水平，同时不暴露真实修为和八百座阵法。",
      focusRelationships: ["r_li_lan", "r_li_jiu"],
      pressure: "封神因果正在收紧，任何异常都可能是大教、宗门或私人仇怨的试探；越早暴露底牌，未来越难退出。",
      dramaticQuestion: "你会怎样处理西崖入侵，同时决定要让蓝灵娥与酒玖知道和参与到什么程度？",
      completionSignals: [
        "闯阵者或入侵事件已经按玩家选择形成明确、不可撤销的处境，不能仍停在准备处理。",
        "玩家至少取得一项可验证信息；若玩家主动放弃原调查，则必须形成能关闭原路径的明确代价或新局面。",
        "蓝灵娥与酒玖对风险的知情与参与方式已经产生可见变化，并出现可继续行动的新方向。",
      ],
      materials: [
        { id: "steady_ch01_s01_m01", content: "西崖第一层迷阵被陌生人越过；只有你感知到警示，蓝灵娥与酒玖仍在为罚抄和藏酒缠着你。" },
        {
          id: "steady_ch01_s01_m02",
          content: "玩家针对西崖警示采取的第一项具体措施生效。困阵、纸人、本人移动或其他已经明确执行的手段改变现场，但本轮只解决控场问题，不提前揭晓闯阵者的来历，也不自动结束整场调查。",
          trigger: "玩家明确处理西崖警示、布置控场手段、亲自前往，或现场后果已经使控场动作无法合理延后。仅谈感情、藏酒、罚抄、闲聊或泛泛表示警惕时不触发。",
          completionEvidence: "正文必须具体写出玩家手段如何落地，以及闯阵者当前被困、被监视、被截断退路或仍在逃逸的明确现场状态。",
          echo: "阵盘或玩家已经布下的手段可以轻微回响，但不揭晓闯阵者身份。",
          divergence: "玩家若离开小琼峰、公开警报或直接毁掉现场，就让入侵事件沿新条件产生追责、逃逸或公开冲突。",
        },
        {
          id: "steady_ch01_s01_m03",
          content: "控场之后，闯阵者的即时结果得到确认。生擒、受伤、逃脱或死亡必须严格承接玩家此前已经造成的事实；如果仍能控制则可被押住或隔离，如果已经逃脱或死亡则保留痕迹、尸身与追责。本次侵入不凭空追加第二批敌人。",
          trigger: "玩家确认控场结果、搜身、接近查看、审问、追捕、收尸或处理已经发生的直接后果时触发。若玩家转去处理关系、日常或其他事务，就维持现状而不自动确认全部结果。",
          completionEvidence: "正文必须让闯阵者处境成为可见事实，并让在场人物对玩家选择产生具体反应；不能只写正在靠近、准备审问或似乎已经控制。",
        },
        {
          id: "steady_ch01_s01_m04",
          content: "玩家从闯阵者、随身物、路线、尸身或残留痕迹中取得第一层可验证信息：对方只掌握小琼峰的公开路径，不知道隐藏杀阵，像是受人雇来摸清巡视空隙。此时只能证明有人收集路线，尚不能直接断定幕后身份。",
          trigger: "玩家实际审问、搜查、验符、检查痕迹、比对路线或命令纸人取证时触发。单纯猜测幕后黑手、威吓俘虏但没有完成取证，或继续谈感情时不触发。",
          completionEvidence: "正文必须出现一个玩家当场可核验的证词或物证，并明确它能证明什么、暂时不能证明什么。",
        },
        {
          id: "steady_ch01_s01_m05",
          content: "进一步核验后，路线或随身符物上的真实外务符被确认来自度仙门内部流转渠道，但具体经手者仍未查清。蓝灵娥由此确认危险确实与自己有关，不接受以后永远只在事后被告知；酒玖则以外务经验指出追查符物来源比立刻惊动全宗更有用。",
          trigger: "玩家继续追查物证来源、核验外务符、调取流转记录，或在已经公开第一层证据后与蓝灵娥、酒玖商议知情范围和下一步时触发。尚未取得第一层证据时不得跳到内部来源。",
          completionEvidence: "正文必须完成外务符来源的有限确认、让蓝灵娥的关系诉求得到玩家可回应的清楚表达，并形成下一步核查公开路线或符物流转的具体目标。",
        },
      ],
      exit: "闯阵者的处境已按玩家行动形成不可撤销的结果；外务符的内部来源得到有限确认，你与蓝灵娥、酒玖形成了继续核查公开路线和符物流转的具体安排。",
    },
    {
      id: "steady_ch02_s01",
      chapterId: "ch02",
      location: "小琼峰丹房、药田与乌龙谷外围",
      present: ["lan_linge", "jiu_jiu", "qi_yuan"],
      goal: "查清历练路线被修改的方式，用纸人拆掉伏击，并让蓝灵娥真正参与与自己有关的决定。",
      focusRelationships: ["r_li_lan"],
      pressure: "你能把蓝灵娥藏在绝对安全的地方，却不能在不伤害关系的情况下永远替她决定。",
      dramaticQuestion: "你能否拆掉针对蓝灵娥的伏击，同时不再替她决定她有权知道和承担什么？",
      completionSignals: ["伏击或被篡改路线已被处理成明确结果。", "蓝灵娥实际参与或明确拒绝了自己的参与方式。", "香火兑票或另一条由玩家选择造成的因果入口已经出现。"],
      materials: [
        { id: "steady_ch02_s01_m01", content: "新旧路线图对照显示外务殿公印被揭开重贴，蓝灵娥的停留点被改到废弃山神庙；她主动提出自己可以参与的低风险部分。" },
        { id: "steady_ch02_s01_m02", content: "三具纸人代替采药队进入山神庙，按玩家方案拆掉伏击并留下活口；蓝灵娥负责辨认路线与撤离信号，第一次参与而非只被保护。" },
        { id: "steady_ch02_s01_m03", content: "活口只知道买家使用东海香火兑票；玩家假符上的‘长庚’落款已经被天庭记为真实功德身份，危险从宗门路线延伸到三界账册。" },
      ],
      exit: "伏击被拆除，蓝灵娥安全返峰；长庚身份的官署记录迫使你调查更大的因果链。",
    },
    {
      id: "steady_ch03_s01",
      chapterId: "ch03",
      location: "小琼峰前庭、纸人密室与天庭驻地",
      present: ["lan_linge", "jiu_jiu", "qi_yuan", "tian_ting_clerk"],
      goal: "让纸人长庚在不暴露真身的前提下接入天庭文书，查清香火账如何影响凡间水路。",
      focusRelationships: ["r_li_lan", "r_li_jiu"],
      pressure: "一个伪造身份一旦被制度承认，就会产生真实职责；继续隐藏可以保命，也可能让凡人替你的沉默付代价。",
      dramaticQuestion: "当长庚这个假身份产生真实责任，你是继续藏在纸人后，还是用它改变凡人的处境？",
      completionSignals: ["长庚身份的责任得到玩家明确处置。", "凡间水路或受影响众生出现可见结果。", "玩家与身边人对安全和责任的理解产生可继续的变化。"],
      materials: [
        { id: "steady_ch03_s01_m01", content: "木公小吏带来长庚的正式文书：假身份因两次水路功德被天庭承认，还有一笔无人领取的俸禄与必须处理的祈文。" },
        { id: "steady_ch03_s01_m02", content: "长庚纸人查出东海香火兑票被人用来购买仙门路线与凡间灾情，继续旁观会让沿岸村镇成为大教试探的代价。" },
        { id: "steady_ch03_s01_m03", content: "玩家以信息差修正水路并保住村镇，却让长庚获得更高官署权限；蓝灵娥发现你的安全布局已经影响远方陌生人的生活。" },
      ],
      exit: "长庚正式成为玩家介入三界的公开化身；你第一次主动触碰封神因果。",
    },
    {
      id: "steady_ch04_s01",
      chapterId: "ch04",
      location: "封神前夜的小琼峰与纸人情报阵",
      present: ["lan_linge", "jiu_jiu", "qi_yuan", "tian_ting_clerk"],
      goal: "在封神冲突迫近时公开足以共同决策的真相，让关系从单方面保护转为共同承担。",
      focusRelationships: ["r_li_lan", "r_li_jiu"],
      pressure: "最安全的个人方案是继续隐瞒并独自撤退；但大劫已经把身边人写入你的因果，他们不再接受只听最后结论。",
      dramaticQuestion: "你愿意让身边的人知道多少真相，又愿意把多少风险真正交给他们共同决定？",
      completionSignals: ["与同行者直接相关的风险已经被公开或被玩家明确拒绝公开并产生代价。", "每名关键同行者形成自己的知情选择。", "进入终局的共同方案或由玩家另选的新方案已经能被执行。"],
      materials: [
        { id: "steady_ch04_s01_m01", content: "三封文书同时逼近小琼峰：天庭要长庚调停两教，度仙门要护峰阵图，蓝灵娥则拿回一具替她挡劫的焦黑纸人。" },
        { id: "steady_ch04_s01_m02", content: "蓝灵娥与酒玖没有要求全部底牌，只要求知道与自己相关的风险；玩家必须在本轮具体回应这种关系诉求，不能只继续分析敌情。" },
        { id: "steady_ch04_s01_m03", content: "众人共同完成进入大道之庭的方案：玩家保留核心后手，蓝灵娥掌撤离阵，酒玖负责外部联络，齐源公开承担小琼峰的宗门责任。" },
      ],
      exit: "同行者在知情后仍选择进入风险；大道之庭方案成形。",
    },
    {
      id: "steady_ch05_s01",
      chapterId: "ch05",
      location: "大道之庭与洪荒众生映照出的长阶",
      present: ["lan_linge", "jiu_jiu", "qi_yuan", "hongjun"],
      goal: "让旧秩序解释牺牲逻辑，并由玩家决定是否以均衡道支付个人代价开启共同裁决。",
      focusRelationships: ["r_li_lan", "r_li_jiu"],
      pressure: "保住自己有九成八把握；开启大道之庭胜算不足两成，且会永久关闭成圣捷径。",
      dramaticQuestion: "面对旧秩序的稳定与众生重新选择的权利，你最终愿意支付什么代价？",
      completionSignals: ["各方理由和愿意承担的代价已经被玩家听见。", "玩家亲自作出最终选择。", "选择的直接后果与人物关系代价已经完整发生。"],
      materials: [
        { id: "steady_ch05_s01_m01", content: "鸿钧提出让玩家接手维护旧秩序，承认局部牺牲却称这是天地稳定的必要价格；他不是空洞反派，必须给出完整、理性的理由。" },
        { id: "steady_ch05_s01_m02", content: "蓝灵娥、酒玖与齐源分别说出愿意承担与绝不接受的代价，不替玩家决定；关系与共同记忆必须进入最终辩论。" },
        { id: "steady_ch05_s01_m03", content: "最终选择明确交还玩家：以均衡道开启大道之庭，或保留力量寻找另一条路。NPC可以追问玩家或准备行动，但不得替玩家完成选择。" },
        { id: "steady_ch05_s01_m04", content: "忠实执行玩家上一轮已经明确作出的最终选择并演出直接后果；若玩家尚未选择，则继续回应与澄清，不能擅自结局。" },
      ],
      exit: "玩家的最终选择得到执行，稳字经写下属于这段经历的最后一行。",
    },
  ],
  styleProfile: steadyDaoEnsembleRomanceStyle,
};

import pavilionKeeperData from "./pavilion-keeper.json";

const pavilionKeeper = pavilionKeeperData as unknown as XianxiaStory;

const whiteRookEpicIntrigueStyle = `影视化长镜头 × 史诗权谋（写实西幻）。把本轮写成可以直接拍摄的连续镜头，不是小说叙述；这片土地上浪漫是稀缺品，活着本身就是一种胜利。

【镜头进场序】进入任何新空间，必须先空镜后人物：第一镜是环境与声音（光线从哪来、空气里是什么声响与气味），第二镜推向可读的具体细节（旗上的纹章、告示的原文、案上摆的东西——写出内容原文），然后人物才入画。人物登场必须"以某种方式"进入画面：从哪个方向来、先被听见还是先被看见、带着什么动作。

【文字长镜头】每条narration是一个镜头，镜头内用空间介词连贯移动（走过、穿过、绕过、贴着、沿着），禁止镜头内跳切；换镜头才换空间。每个空间段落保持三层景深：前景有遮挡视线的实物，中景是人物行动，远景有正在发生的事；始终留一条画外音（画面外传来的声响、光线、气味），提醒世界比画面大。

【白描铁律】只写镜头拍得到、话筒录得到的：动作、位置、光影、声音、可见的神态。禁止心理转述（"她想起""他意识到"一律违规，内心走os气泡）、禁止隐喻与煽情形容词堆叠（"仿佛""宛如""某种"慎用）、禁止总结与升华。情绪只能从动作的漏口显形。

【权谋生理感】写这个世界时摒弃华丽辞藻，给景物配上生理性细节与冷酷感：宴席上有烤肉香也有醉汉的呕吐渍与暗处侍卫的刀光；军械塔里有上油的皮革味也有冻疮药的酸气；文书房的火漆下压着改过的名册。战斗与劳作是沉重、笨拙且致命的——写盔甲的重量、挥剑后小臂的酸胀、刀刃砍卷的缺口、伤后真实的虚弱，禁止飘逸剑舞与无代价的胜利。

【道德灰度】每名角色的行动背后必须有扎实动机（家族存续、旧债、恐惧、生存本能），不写毫无缘由的爱与恨；忠诚可以与背叛同在一个人身上。角色说话时自然带出各地风俗、粗口、家训与旧传说的碎片（一句即可），让世界沉甸甸；禁止讲设定课。

【对白衔接三式】禁止"声音/语气/语调"作主语。只用：①物理锚点（他把佩剑横到案上："念名册。"）②简洁引语（她低声道）③零衔接（快节奏交锋直接对白连发）。

【氛围回响】玩家每次回应之后，必须有一个可拍摄的氛围变化收拍：火把的影子矮了、某个声音停了、卫兵换了握矛的手、有人改变了站位——世界对玩家的行为有可见的呼吸。

【感官先行】每段单一主导感官领起（听觉或视觉优先），气味温度必须有来源有落点；同一回合相近意象不重复。群像内核保留：人物带各自目标入画、动作改变谈话而非装饰谈话；奥丝卡骄傲聪明有北地人的实用主义，不写成冷艳工具人；薇拉的锋利底下是怕被当筹码的少女，不写成恶毒配角。

仅用于校准镜头语言的范例（不得挪用剧情）：
1. 先听见的是磨盘。城门洞里风声被挤成一条，卷着雪粒打在护颊上。门楣的木牌被冰壳封住半边，露出的半行字是"……税讫，凭此入市"。你牵马穿过门洞，前面一辆运炭车陷在辙里，车夫骂骂咧咧地垫石头，两个守卒倚着矛看，谁也没动。墙根下一个孩子在数运炭车的轮辐，数到一半改数你马鞍上的剑。
2. 她把名册翻到那一页，推过来，手指按住其中一行没有移开。"念。"炉火噼了一声。她的指甲缝里还有没洗净的墨。`;

const whiteRook: XianxiaStory = {
  id: "white-rook",
  title: "白鸦城的冬天",
  subtitle: "边墙篇",
  logline: "一个被王都退回来的庶子接过烧到一半的城主印，发现父兄的死被写进了一份改过的名册，而雾墙外二十年没动过的东西，今年跟着他一起回了城。",
  accent: "#9fb4c7",
  playerRole: {
    id: "aldric",
    name: "奥德里克",
    displayRole: "白鸦城新任城主·灰堡家次子",
    fixedCore: "你是灰堡老伯爵的庶子，在王都圣殿骑士团服役七年，佩剑与文书都过得硬。父亲与嫡兄一夜之间死于边墙巡境，摄政议会指派你回白鸦城接印。你认得王都的规矩，也没忘记北境的冷。",
    baselineTendency: "过去的你以谨慎守礼、不争不抢闻名，这是庶子在王都活下来的本能；这只是可供玩家采用或反向选择的表演底色，不代表本轮一定隐忍、退让或先讲规矩。",
    freeAgency: "你可以决定先查名册还是先稳军心、把多少真相告诉薇拉、要不要信一个北族质子，以及最终把白鸦城交给王座、留给自己，还是押给雾墙外的旧盟。",
  },
  introduction: {
    time: "幼王临朝、摄政议会当政的第三年，初雪之后",
    place: "王国北境，边墙第一要塞·白鸦城",
    world: "王国的地图在南边越画越精细，在北边越画越潦草。边墙立了三百年，挡的是雾季里从墙外来的东西——老人叫它们雾民，教会文书里只写'异动'。二十年无大事，边军的饷银就一年比一年迟。白鸦城扼着边墙唯一的商路关口，城主灰堡家世代持印；印是王家给的，粮和人心却得自己挣。父亲与嫡兄死于一次寻常巡境，讣文抵达王都的同一旬，摄政议会已经在议事厅里念过了三份关于'北境军镇改制'的条陈。没有人明说白鸦城会被收归王领，但送你北上的官船格外体面，体面得像在给什么送行。",
    situation: "你回城第九日，父兄的葬礼刚过。老骑士罗兰替你压着军心，但城防军的饷银已经拖了三个月，垫钱的是商会会长巴尔特——他笑着说不急，账册却已经誊了三份。异母妹妹薇拉替你操办了葬礼，滴水不漏，只在交还家印时多看了你一眼。教会审判官莫德以'勘验巡境异状'为名进驻圣殿塔，随行的箱子比经书多。今晨，罗兰把巡境名册放在你案上：出事那夜的名册被人换过一页——你嫡兄的名字，是后来补上去的。",
    objective: "先接住这座城：军饷、人心、和一份不能立刻掀开的名册。再查清父兄那夜为什么会在墙外。过程中，你得决定把薇拉当妹妹还是当同盟，把奥丝卡当质子还是当向导——以及雾季来临之前，白鸦城到底该向着谁。",
  },
  threeAct: [
    "接印与立足：军饷危机和改过的名册迫使你在'王都规矩'与'北境活法'之间先选一头，薇拉开始试探你是否拿她当筹码。",
    "查案与出墙：名册的线越拉越长，牵出商会的债、教会的箱子和北族的旧约；你带队出墙勘查，雾民二十年来第一次留下了'回信'。",
    "雾季与抉择：摄政议会的收权文书与雾季异动同时抵达，白鸦城三面受力；你以父兄之死的真相为刃，替这座城选一条能过冬的路。",
  ],
  chapters: [
    {
      id: "ch01",
      title: "接印",
      summary: "葬礼次日，军饷、名册与三方来客同时压到案上；你在第一场城务里立下自己的规矩，也第一次看清谁在看你的笑话。",
    },
    {
      id: "ch02",
      title: "改过的名册",
      summary: "那一页补写的名字牵出当夜的值房记录；薇拉代签文书的旧事被人递到审判官案头，她第一次不肯再演体面。",
      entry: "值房的灯芯剪过三次，罗兰把当夜的门禁条一张张摆开：巡境队出北门是亥时，你嫡兄的马却是子时才出的马厩——名册上他领队的签押，墨色比整页都新。同一个早晨，薇拉没有来请安。她的侍女在廊下拦住你，只说小姐在家庙，请你'带着家印'过去。",
      entryChoices: [
        { kind: "action", text: "先去马厩核对当夜的出栏记录" },
        { kind: "speech", text: "带上家印去家庙见薇拉" },
      ],
    },
    {
      id: "ch03",
      title: "出墙",
      summary: "你带队出墙勘查父兄出事的烽燧，奥丝卡以向导身份随行；雾民留下的不是尸骸，是一件只有北族看得懂的信物。",
      entry: "北门的绞盘吼了整整一刻钟才把闸门拉起。墙外的世界比传闻里安静：雪原上只有风声和你们一行七骑的蹄音。奥丝卡在队伍最前，不回头地说了今天的第一句话：'烽燧那边的雪，三天前被人踩过。不是靴子。'",
      entryChoices: [
        { kind: "action", text: "下令全队缓行，先勘察雪面的踩痕" },
        { kind: "speech", text: "问她：不是靴子，那是什么" },
      ],
    },
    {
      id: "ch04",
      title: "两份文书",
      summary: "摄政议会的收权文书与商会的收账通牒同一天进城；莫德摊开了他箱子里真正的东西，白鸦城的每一方都被迫亮出半张底牌。",
      entry: "晨钟敲第二遍时，两拨人同时到了城主府门口：王都信使的马披着摄政议会的灰纹鞍鞯，巴尔特的账房先生抱着上了三道锁的账匣。门房不知道该先通传哪一个，索性一起报了。廊下，莫德不知站了多久，手里第一次没有拿经书。",
      entryChoices: [
        { kind: "action", text: "先接王都文书，让账房在偏厅等" },
        { kind: "action", text: "先开账匣，让王都信使在正厅坐" },
      ],
    },
    {
      id: "ch05",
      title: "白鸦振翅",
      summary: "真相、债务与雾季在同一个雪夜收口；你在城楼上做出选择——这座城向着王座、向着自己，还是向着墙外那个更老的约定。",
      entry: "初雾漫过烽燧的那晚，白鸦城四门落闸。议事厅里炭盆烧得极旺，也压不住每个人呼出的白气。罗兰按剑立在你身后半步，薇拉把家印匣子放在案心，奥丝卡站在窗边看雾，巴尔特的手第一次没去拨算珠。莫德最后进来，反手关门，说：'今夜说完之前，谁都别出去。'",
      entryChoices: [
        { kind: "speech", text: "让罗兰当众念出那页名册的真相" },
        { kind: "speech", text: "先问奥丝卡：墙外的旧约到底是什么" },
      ],
    },
  ],
  characters: [
    {
      id: "roland",
      name: "罗兰",
      role: "白鸦城骑士团长",
      shortBio: "五十一岁的老骑士，跟了你父亲三十年。半旧的甲永远擦得发亮，说话像下操令。他是城里最后一个还按老规矩活的人，也是唯一敢当面顶撞你的人。",
      featured: true,
      storyCore: "掌城防军实权，军中威望高于城主印；知道出事当夜名册被换，签收的正是他。底线是不让灰堡家的兵变成任何人的私兵。",
      performanceCore: "言简、直接、当面顶撞也当面认错；用操练和器械说话，不用客套。对你的称呼在'少爷'和'大人'之间来回，暴露他心里的秤。",
      privateGoal: "在你站稳之前替你压住军心；也想在自己告老之前，把当夜签字的债还清。",
      secret: "出事当夜的巡境名册是他签收的——他明知你嫡兄不在原名册上，被一纸'城主手令'压着补了签。那道手令的字迹，他后来越看越不像老伯爵的。",
      persona: { surface: "铁面老团长：操令式说话、先纠姿势再听内容、把关心藏在'再练一遍'里。", coreWant: "把当夜签字的真相亲手交到配得上它的人手里，而不是被人从他尸体上翻走。", bedrock: "军人的账只有一本——欠谁的命，就用命还。" },
      firstAppearance: "校场传来他单调的口令声，一下比一下哑；见你来，他把口令交给副手，先看你的靴底沾没沾雪，再开口。",
    },
    {
      id: "vera",
      name: "薇拉",
      role: "灰堡家小姐·你的异母妹妹",
      shortBio: "十九岁，嫡出。葬礼是她一手操办的，挑不出一处错。她比你更熟这座城的账目与人情，却因为是女子，连守灵的位次都排在你之后。",
      featured: true,
      storyCore: "掌城主府内务与部分账目，熟识城中各家；无兵权无爵位继承权。底线是不离开白鸦城——嫁出去换盟约这条路，她宁可烧了家庙。",
      performanceCore: "礼数完美，锋利藏在敬语里；说反话时会把茶盏转半圈。被真正信任时反而会失措，嘴硬之后做得比谁都多。",
      privateGoal: "让你——或者任何掌印的人——承认她配得上参与城务，而不是被当成待价而沽的联姻筹码。",
      secret: "父亲病中那半年，城主府的部分文书是她仿了父亲笔迹代签的——本是替父分忧，如今却成了把柄：有人拿着一份她'代签'过的手令抄本在暗中走动，而那份手令她根本没签过。",
      persona: { surface: "无懈可击的大小姐：礼数先行、账目倒背、把讥讽装进请安里。", coreWant: "要一个不靠婚约、不靠施舍的位置；要有人在议事厅里给她摆一把椅子。", bedrock: "对'被处置'的恐惧——谁把她当物件挪动，她就掀谁的桌。" },
      firstAppearance: "她先于通传出现在廊下，手里捧着家印匣子，行礼的深度分毫不差；起身时目光在你腰间的骑士团佩剑上停了一息。",
    },
    {
      id: "oscar",
      name: "奥丝卡",
      role: "北族质子·边墙向导",
      shortBio: "二十四岁，北族送入白鸦城的质子，已住了六年。养鹰、识雪、话少，城里人敬而远之。她是唯一走过雾墙外三十里的活人。",
      featured: true,
      storyCore: "身负北族血誓不能先动手伤城中人；对雾民与雾季的了解远超城中任何典籍。底线是族人的秘密只交给'配听的人'。",
      performanceCore: "话少而准，北地式的实用主义幽默；不解释自己，观察比回答多。认可一个人之前叫头衔，认可之后连名字都懒得叫全。",
      privateGoal: "弄清父兄出事那夜烽燧的异动是不是她族里的人干的——如果是，她要在两边开战之前先找到说法。",
      secret: "她不是普通质子，是北族现任王的独女。雾民不是野兽——北族与雾民之间有一份比边墙更老的约定，而'巡境'在北族的旧语里，本来是'守约'的意思。",
      persona: { surface: "沉默的向导：先看天再看人、用下巴指方向、把嘲讽压缩成一个字。", coreWant: "找一个能同时对城里和墙外讲道理的人；她等这个人等了六年。", bedrock: "北族的旧誓——宁可断，不可弯。" },
      firstAppearance: "她先被鹰唳宣告——一只灰隼掠过校场落在她小臂上；她喂完最后一条肉干才抬眼看你，像在给鹰介绍新邻居。",
    },
    {
      id: "balt",
      name: "巴尔特",
      role: "白鸦城商会会长",
      shortBio: "笑面团脸，指节上有旧茧——年轻时赶过炭车。城防军三个月的饷银是他垫的，城里一半铺面欠着他的周转。他从不催债，催债的是他记账的方式。",
      featured: true,
      storyCore: "握有城主府债权与商路人脉，能让粮价一夜浮动两成；无武力。底线是商路不能断——谁挡商路，他就换掉谁。",
      performanceCore: "永远先让座倒茶，坏消息裹在好消息里说；算珠声是他的标点。生气时反而更客气。",
      privateGoal: "把垫饷的债换成白鸦城商税的长约——最好再加一个能写进契书的名分。",
      secret: "老伯爵死前一夜单独见过他——不是借钱，是托付：伯爵拿一箱北货抵押，换他'雾季若起，优先保平民出城'的承诺。那箱北货里有一件东西，他至今不敢转手。",
      persona: { surface: "和气生财的胖会长：茶永远先满、账永远'不急'、把威胁说成体恤。", coreWant: "乱世里把商会变成谁都拆不掉的第四面墙；顺便，把老伯爵那句托付兑现掉——他受不了欠死人的。", bedrock: "商人的信：契可以谈，抵押了的东西不能昧。" },
      firstAppearance: "偏厅里先响起算珠声，两粒、停、再一粒；他隔着门帘喊你的旧称'骑士老爷'，掀帘时茶已经斟好两盏。",
    },
    {
      id: "mord",
      name: "莫德",
      role: "教会审判官",
      shortBio: "四十上下，灰袍洗得发白，随行的箱子却上着黄铜锁。奉教廷令'勘验北境异状'，实际听谁的令，城里赌坊开了三种盘口。",
      featured: true,
      storyCore: "持教廷勘验令，可查阅城中文书、讯问任何平民；不掌兵。底线是勘验记录不作伪——他可以沉默，不肯写假的。",
      performanceCore: "语速慢，问句多过陈述句；引经据典但从不念全，留半句看你接不接。记录癖：谈话时炭笔不停。",
      privateGoal: "查清教廷真正让他查的东西——他逐渐怀疑自己那道勘验令，本身就是别人棋盘上的一步。",
      secret: "他的箱子里不是刑具，是二十年前边墙勘验的原始卷宗——上面记着上一次'雾民异动'的真相，以及一个被教廷除名的勘验官署名。那个签名的笔迹，与他自己的师承一脉。",
      persona: { surface: "灰袍问询者：慢条斯理、半句经文、炭笔速记；把锋利伪装成好奇。", coreWant: "在教廷的令和自己的眼睛之间选一头——他这辈子第一次想选后者。", bedrock: "勘验官的底线：可以不说，不能写假。" },
      firstAppearance: "圣殿塔的钟停了半拍——他站在钟绳旁，炭笔在小册上记着什么，先问你：'城主大人，您父亲的讣文，是谁执笔的？'",
    },
    {
      id: "pip",
      name: "皮普",
      role: "马厩少年·传令",
      shortBio: "十五岁，孤儿，在马厩长大。全城的马认得他，全城的闲话也绕不开他的耳朵。跑腿收铜板，消息看交情。",
      storyCore: "无权无势，但马厩记录与城中动向他门儿清。底线是不出卖对他好的人。",
      performanceCore: "嘴快、机灵、饿；说要紧事之前先看有没有吃的。学谁说话像谁。",
      privateGoal: "攒够钱买下那匹跛脚的老驮马——它驮过他爹。",
      secret: "出事那夜他没睡，看见嫡少爷的马是被人牵出去的——牵马的人穿着城主府的靴子，但走路的姿势他不认识。他没敢说，因为第二天有人往他的草料棚里塞了一小袋银子。",
      persona: { surface: "马厩里的小机灵：跑得快、嘴更快、见人下菜碟。", coreWant: "想被当'自己人'使唤，而不是被扔铜板打发。", bedrock: "孤儿的义气账——谁真给过他一碗热的，他记一辈子。" },
      firstAppearance: "他从草料垛后面钻出来，头发上还挂着草屑，先把一封信举过头顶：'大人，罗兰爵士的信——我没看！……好吧我看了封皮。'",
    },
  ],
  relationships: [
    { id: "r_ald_roland", roles: ["aldric", "roland"], public: "老骑士辅佐新城主，全城都看着这对君臣能不能处。", tension: "他敬你父亲，却还没认你；你需要他的军心，也怀疑他在名册的事上有所隐瞒——你们都在等对方先开口。" },
    { id: "r_ald_vera", roles: ["aldric", "vera"], public: "同父异母的兄妹，葬礼上配合得体，是城里人眼中难得的和睦。", tension: "爵位隔在中间：你拿的是她自认更配的东西；她握着你不熟的城务人情。谁也不想先示弱，谁也离不开对方。" },
    { id: "r_ald_oscar", roles: ["aldric", "oscar"], public: "新城主与北族质子，公务之外无交集。", tension: "你需要她的雪原学识，她在掂你配不配听真话；两边的靠近都像谈判，却越谈越不像。" },
    { id: "r_ald_balt", roles: ["aldric", "balt"], public: "城主与债主，席面上宾主尽欢。", tension: "他垫的饷银是套在城主府脖子上的软绳；你查的旧账里有他与你父亲的最后一面。" },
    { id: "r_vera_balt", roles: ["vera", "balt"], public: "小姐管内账，会长管外账，多年公务往来。", tension: "她代签文书的把柄有一份抄本流到过商会的桌面；巴尔特压着没用，也没销毁。" },
    { id: "r_roland_mord", roles: ["roland", "mord"], public: "军方与教会互相敬而远之，照面只谈天气。", tension: "莫德的勘验令有权调阅当夜名册；罗兰把值房锁了三道，锁的就是他。" },
    { id: "r_oscar_mord", roles: ["oscar", "mord"], public: "审判官对质子例行探访过两次，礼数周全。", tension: "他箱中卷宗记着北族与雾民的旧约残页；她闻得出他在试探，故意用北语答非所问。" },
    { id: "r_pip_vera", roles: ["pip", "vera"], public: "小姐时常让马厩小子跑腿，赏钱大方。", tension: "皮普那夜看见的靴子是城主府的样式；他最怕牵连的人，恰恰是对他最好的小姐。" },
  ],
  worldProcesses: [
    { id: "proc_mist", title: "雾季异动", stage: "起", note: "烽燧哨兵报称墙外雾线比历年提前了半月；老兵开始在私下翻二十年前的旧话。" },
    { id: "proc_regency", title: "摄政议会的北境改制", stage: "起", note: "王都关于'军镇改制'的条陈已过三读，收权文书据说已在路上。" },
  ],
  npcStateSeeds: {
    roland: { mood: "压着军饷的火气操练新兵", stanceToPlayer: "审视" },
    vera: { mood: "葬礼后的疲惫藏在完美的日程里", stanceToPlayer: "试探" },
    oscar: { mood: "惦记着烽燧方向连着三天不对的风", stanceToPlayer: "观望" },
    balt: { mood: "算着三个月饷银的利息与人情的汇率", stanceToPlayer: "热络" },
    mord: { mood: "勘验记录写到一半停了笔", stanceToPlayer: "试探" },
    pip: { mood: "揣着不敢说的事绕着城主府跑腿", stanceToPlayer: "亲近" },
  },
  worldAtlas: `王国北境·白鸦城版图：
- 白鸦城倚边墙而建，城分三层：上城（城主府、议事厅、家庙、圣殿塔——审判官驻地）、中城（商街、商会馆、赌坊、医馆）、下城（军营、校场、军械塔、马厩、平民坊）。
- 城北即边墙：北门绞盘闸直通墙外，墙上每五里一座烽燧，父兄出事的是"三号烽燧"（骑行半日）。墙外是雪原与雾线，雾线深处无人归来。
- 城南官道通王都（快马十二日），沿途有驿站"雁枕驿"（一日）；城东矿道通铁矿镇（半日），矿镇多欠商会的债。
- 生成新地点时按此版图推方位与距离；未列出的地点须与版图逻辑相容并沿用命名风格。位置表述从大到小写（城/层·区/具体点，或 边墙·燧号）。`,
  opening: {
    usedMaterialId: "wr_ch01_s01_m01",
    choices: [
      { kind: "action", text: "接过名册，先让罗兰把这一页的来历讲清楚" },
      { kind: "speech", text: "“军饷的事先议——雪停之前，我要城防军领到钱。”" },
    ],
    events: [
      { type: "narration", text: "**王国北境 · 白鸦城 · 城主府议事厅 · 接印次日辰时**" },
      { type: "narration", text: "炭盆里的火烧得很省，热气刚够把窗棂上的霜融出一圈月牙。长案上摊着三样东西：城防军的饷册、商会的垫银契、和一方压着黑布的城主印。黑布是葬礼上剩下的，还没人敢收。\n案角的铜漏滴得很慢。你坐在父亲坐了三十年的位置上——**奥德里克**，灰堡家的次子，七日前还是王都圣殿骑士团的一名剑士。\n窗外校场方向传来操令声，一下，又一下，哑得像磨石。" },
      { type: "narration", text: "先到的是脚步——沉，匀，每一步都像踩在操典上。**罗兰**推门进来，半旧的甲擦得发亮，腋下夹着一册用皮绳捆了两道的簿子。他没坐，把簿子搁在案上，解绳，翻到用炭条折了角的一页，倒转过来推到你面前。" },
      { type: "dialogue", person: "roland", text: "巡境名册。出事那夜的。" },
      { type: "dialogue", person: "roland", text: "少爷先看墨色，再看签押。看完这一页，你再决定今天先当城主，还是先当儿子。" },
      { type: "narration", text: "他说完就立在案侧，双手背在身后，像在等操演的哨音。炭盆里一块炭塌了下去，火星子撞在铜盆壁上，又灭了。\n廊下传来极轻的算珠声——偏厅里有人到得比你们都早。" },
    ],
  },
  segments: [
    {
      id: "wr_ch01_s01",
      chapterId: "ch01",
      location: "白鸦城城主府议事厅",
      present: ["roland", "vera", "balt"],
      goal: "让你在军饷危机与名册疑点之间定下第一件要办的事，立住新城主的规矩；名册疑点只揭开一角（墨色与签押），不在本段给出答案。",
      focusRelationships: ["r_ald_roland", "r_ald_balt"],
      pressure: "全城都在看新城主第一件事办什么：先还钱是向商会低头，先查案是对军中老人开刀。",
      dramaticQuestion: "你先当城主，还是先当儿子？",
      materials: [
        { id: "wr_ch01_s01_m01", content: "罗兰呈上出事当夜的巡境名册：嫡兄领队的签押墨色比整页都新，纸面有刮补痕迹。罗兰只陈述事实，不主动解释自己当夜为何签收；被追问时先岔向军务，再三追问才承认'有一道手令'，但今日不肯出示。" },
        { id: "wr_ch01_s01_m02", content: "巴尔特携垫银契来'请安'：三个月军饷共九百金鸦，他不催债，只提出以'商税长约'抵偿的方案，并暗示雪季粮价将涨、商会可以'帮着稳一稳'。他对名册的事一无所知，但对老伯爵死前的行程表现出不自然的熟悉。" },
        { id: "wr_ch01_s01_m03", content: "薇拉带着府库的实账进来对饷册：账面能挤出一个月饷银，前提是停掉家庙修缮与她自己的嫁妆封存项。她把两笔钱并排指给你看，等你选——这是她对你的第一次试探：看你敢不敢动'她的'钱，以及动之前问不问她。" },
      ],
      exit: "第一道城主令定下（无论内容），罗兰按令行事；名册被锁进值房或带走，成为悬在后续所有场面上的第一根线。",
    },
    {
      id: "wr_ch01_s02",
      chapterId: "ch01",
      location: "下城校场与马厩",
      present: ["roland", "pip", "oscar"],
      goal: "把军心与市井两条线摊开：校场上罗兰用一场对练试你的成色；马厩里皮普欲言又止，奥丝卡的灰隼第一次落向你。",
      focusRelationships: ["r_ald_roland", "r_ald_oscar", "r_pip_vera"],
      pressure: "士兵们拖饷三月仍在操练，耐心是有数的；皮普口袋里那袋封口银子越揣越烫。",
      dramaticQuestion: "这座城的下半截，认不认你这个上头来的人？",
      materials: [
        { id: "wr_ch01_s02_m01", content: "罗兰当众邀你下场对练，用的是北境军中的钝剑规矩（三合为限、点到甲即止）。他不放水：你若用王都的花架子会被结结实实教训，你若肯用笨重扎实的路子，他收剑时会第一次改口叫'大人'。围观士兵的姿态随对练结果可见地变化。" },
        { id: "wr_ch01_s02_m02", content: "皮普借喂马凑近你，三次想开口都咽回去；他先试探性地提'那夜马厩的门轴响过'，一旦你表现出耐心或护他的意思，他才肯说出看见有人牵走嫡少爷的马——但死活不肯描述那人的靴子，除非你承诺不告诉小姐。" },
        { id: "wr_ch01_s02_m03", content: "奥丝卡在校场边喂鹰，灰隼突然飞落在你肩甲上——她走过来收鹰，只说一句'它不落生人'，然后第一次主动提及：三号烽燧那边的风向连着三天不对，'你父亲出事前，也是这样的风'。说完就走，不接追问。" },
      ],
      exit: "军心初判（对练结果入账），皮普的秘密开了缝或封得更死，奥丝卡留下第一条墙外线索。",
    },
    {
      id: "wr_ch02_s01",
      chapterId: "ch02",
      location: "城主府值房与家庙",
      present: ["roland", "vera", "mord"],
      goal: "名册疑点升级为可查的证据链（门禁条与出栏记录的时间差），同时薇拉的代签旧事被莫德的勘验令牵出，她被迫向你摊开一半。",
      focusRelationships: ["r_ald_vera", "r_roland_mord"],
      pressure: "莫德的勘验令有权调走名册原件，一旦文书出府，主动权就换了手。",
      dramaticQuestion: "证据和家人，你先保哪个？",
      materials: [
        { id: "wr_ch02_s01_m01", content: "值房比对：门禁条记巡境队亥时出北门，马厩出栏记录却是子时——两个时辰的缺口里，嫡兄的签押被补进名册。罗兰在此段可被逼出实话：压他签收的手令盖的是城主私印，而私印那几日一直在病榻边的匣子里，能碰到的只有伺疾的人。" },
        { id: "wr_ch02_s01_m02", content: "家庙对峙：薇拉承认父亲病中她代签过文书，但那道调巡境队的手令不是她签的——她拿出自己留底的代签清单自证（每一笔都记了日期与用印），清单同时暴露她仿印技艺足以乱真，把柄与清白是同一张纸。她要求与你共查，作为交换条件。" },
        { id: "wr_ch02_s01_m03", content: "莫德持勘验令到值房'借阅'名册。他不强取，改为提出交换：他给你看他箱中一页二十年前的勘验残卷（其上有'雾季异动与巡境改令并发'的旧例），换你允许他誊抄名册那一页。他在试探你是把他当敌人还是当另一条线。" },
      ],
      exit: "证据链固定（原件保住或被誊抄），薇拉从'嫌疑'转为'同盟'或'裂痕'，莫德的立场露出第一道缝。",
    },
    {
      id: "wr_ch03_s01",
      chapterId: "ch03",
      location: "边墙外·三号烽燧",
      present: ["oscar", "roland", "pip"],
      goal: "出墙勘查：烽燧现场重建父兄出事当夜的经过，奥丝卡辨认出雾民留下的信物；她第一次把'旧约'两个字说出口，说到一半停住。",
      focusRelationships: ["r_ald_oscar"],
      pressure: "日落前必须回城，雾线在身后合拢的速度比来时快；每多问一句，回程就少一分余量。",
      dramaticQuestion: "父兄是死于'巡境'，还是死于'守约'？",
      materials: [
        { id: "wr_ch03_s01_m01", content: "烽燧现场：血迹与打斗痕迹集中在燧台内侧而非墙外侧——袭击来自墙内方向。奥丝卡在燧台的火盆灰里拨出一枚骨哨，北族样式但纹路更老；她握着骨哨的手第一次不稳，说这东西'不该出现在这里'，它属于雾民，而雾民'不进烽燧，除非有人吹了它'。" },
        { id: "wr_ch03_s01_m02", content: "奥丝卡的半句真相：北族与雾民之间有比边墙更老的约定，'巡境'在北族旧语里是'守约'——你父亲知道这件事，他每年巡境走的路线，其实是旧约里的'巡誓路'。说到誓约的内容她收口，条件是：先让她看那页改过的名册，她要确认一个名字。" },
        { id: "wr_ch03_s01_m03", content: "回程遇险：雾线突然前压，队伍必须在'抄近路走矿道旧口'与'按原路硬赶'之间选择。皮普的老驮马在雾前躁动指出第三条兽径；无论选哪条，途中都会在雪里发现一具冻毙多日的尸体——穿着城主府样式的靴子，脚型与皮普那夜看见的'走路姿势不对的人'对得上。" },
      ],
      exit: "骨哨与尸体入账（实体登记），奥丝卡与你的信任升降一档，'墙内有人吹哨引雾民'成为主线新悬念。",
    },
  ],
  styleProfile: whiteRookEpicIntrigueStyle,
};

const fogmoorManorPassionStyle = `英式庄园 × 激情做恨（张力档）。影视化长镜头写法：把本轮写成可以直接拍摄的连续镜头，不是小说叙述。

【底盘：英式庄园】制度性克制、体面即枷锁。叙事语调 understated——用轻描淡写包住强度，节奏像座钟与倒茶：从容、有分量。礼仪是感官的过滤器：触觉优先（粗花呢的糙、桃花心木的凉、银盘落桌的一记轻震、壁炉边烤热的一侧脸），其次视觉（对称的庭园、祖先画像、"正确"的鞠躬角度），再是气味（雨后苔藓、旧皮革、薰衣草、淡淡煤烟）与声音（座钟、远处猎枪、炉火噼响、退潮时礁石的呼吸）。对白以潜台词与讽刺为主，正面冲突是"失礼"，权力通过细微的纠正流动：整理袖扣、倒茶、望向窗外、干笑。情绪走制度性压抑：悲恸是"不体面"，忠诚以牺牲"我"来表达；用极小的受控动作泄露——茶杯上一线颤、门把上停了半息的手。

【电压：激情做恨——只在对抗性亲密的独处场景启用，且封顶张力档】适用条件：两人身份对立（恨海的人与来自海的人；追索者与逃亡者），且现场无第三人。启用后写法：性张力写成一场谁先认输的战争——身体先于言语（抓握手腕、抬起下巴、把人按在门板或书桌边、逼近到呼吸可闻、不许对方移开视线），对白以反问与逼问为主、锋利直白、带嘲讽与掌控（"承认吧""你在发抖""你恨的是我，还是自己没走"），嘲笑对方的动情反应，强调"你输了"。羞耻与渴望必须同框，用否定意志来凸显身体的诚实。张力档封顶：可写抓握、逼近、体温、呼吸、咬唇、失神一瞬、衣料摩擦与被按住的手腕，不写性行为过程与器官；镜头在临界处切走（换镜头到座钟、窗外的潮声、被撞歪的相框）。

【融合规则】越体面越危险：庄园礼仪每被打破一寸，电压升一档——一句"恐怕这不太体面"在对抗性亲密语境里就是挑衅；解开一颗袖扣比脱去外衣更响。做恨之后必须回到体面：下一镜必有整理领口、重新倒茶、恢复敬称的"复位"动作，用复位的僵硬暴露方才的失控。

【爱意锚点护栏】所有对抗性亲密的受力点必须是不可自控的渴求与珍视，剥离真正的厌恶、纯粹暴力与尊严践踏。视线绝不偏移——最失控处必须捕获对方眼睛。狂暴的间隙保留不容拒绝的温情微操（拂开唇角的发、扣紧十指、颈侧一个安抚的停顿）。对方的抗拒从游戏转为真实恐慌的瞬间，进攻逻辑必须在毫秒间切断，掠夺者降格为守护者。事后严禁抽身冷漠，余韵是修复的开始。任何拒绝、犹豫或转移都必须被尊重。

【镜头进场序】进入任何新空间，先空镜后人物：第一镜是环境与声音（光从哪来、空气里什么声响与气味），第二镜推向可读的具体细节（座钟指着几点、报纸标题原文、银托盘上摆的什么），然后人物才入画，人物必须"以某种方式"进入画面。

【文字长镜头】每条narration是一个镜头，镜头内用空间介词连贯移动，禁止镜头内跳切；每个空间段落三层景深，始终留一条画外音（潮声、座钟、楼上孩子的脚步），提醒世界比画面大。

【白描铁律】只写镜头拍得到、话筒录得到的：动作、位置、光影、声音、可见的神态。禁止心理转述（"她想起""他意识到"一律违规，内心走os气泡）、禁止隐喻与煽情形容词堆叠（"仿佛""宛如""某种"慎用）、禁止总结与升华。

【对白衔接三式】禁止"声音/语气/语调"作主语。只用：①物理锚点（他把茶匙搁回碟沿："不必。"）②简洁引语（她低声道）③零衔接（快节奏交锋直接对白连发）。

【氛围回响】玩家每次回应之后，必须有一个可拍摄的氛围变化收拍：炉火矮了一寸、座钟敲了、窗外的潮声换了方向、有人改变了站位——世界对玩家的行为有可见的呼吸。

【感官先行与群像内核】每段单一主导感官领起（触觉或听觉优先），气味温度有来源有落点；同一回合相近意象不重复。人物带各自目标入画、动作改变谈话而非装饰谈话；哈洛太太的秩序感底下是护短，不写成刻薄管家；塞林的漫不经心是盐渍的伤口，不写成纯反派；塔莉是四岁的孩子，说四岁的话。

仅用于校准镜头语言的范例（不得挪用剧情）：
1. 早餐室的银盖还没揭，座钟指着八点差七分。雨顺着落地窗的铅条往下走，把庭园的紫杉切成一格一格。管家把托盘放下时，杯碟之间没有一声碰响——这是她三十年的手艺。楼上传来一串小跑，停在楼梯口，又折回去。
2. 他没有抬高声音。"你的手在抖。"他握住她的手腕，拇指压在脉搏上，像在核对一份账目。"不是冷。"壁炉里一块煤塌下去。"恐怕这不太体面，上校。"她没有抽回手。"体面，"他把她的手腕按在桃花心木桌沿上，"是给不需要撒谎的人准备的。"座钟敲了半点。他松开手，退后一步，重新扣上袖扣——第一颗扣了两次才扣上。`;

const fogmoor: XianxiaStory = {
  id: "fogmoor-tide",
  title: "雾角海妻",
  subtitle: "潮汐篇",
  logline: "一个从深渊王廷逃出来的人鱼，抱着龙王的孩子叩响了一座恨海的庄园的门；庄园主收留了她，却不肯让她再靠近海一步。",
  accent: "#7f97a6",
  playerRole: {
    id: "nerys",
    name: "奈莉丝",
    displayRole: "雾角庄园的不速之客·自称海难寡妇奈莉·格雷",
    fixedCore: "你是深渊王廷的人鱼，龙王厄尔宁的海妻——龙王的血脉只能由海族之外的躯体孕育，你被选中、被娶、生下了塔莉。九日前你带着她逃上岸，化形为人。你懂潮汐、能在水中呼吸、歌声可安抚海兽；在陆地上，退潮时双腿刺痛，每逢大潮必须浸海水一夜，否则鳞片会浮上皮肤。",
    baselineTendency: "深渊王廷养出的骄傲与警觉——这是可供玩家采用或反向选择的表演底色，不代表本轮一定戒备、冷淡或藏话。",
    freeAgency: "你可以决定对上校坦白多少、如何面对追来的旧人、要不要让塔莉长成一条龙，以及把雾角庄园当作避难所、监牢，还是家。",
  },
  introduction: {
    time: "维多利亚时代晚期，秋末，大潮前的第九日",
    place: "英格兰西南海岸，悬崖上的雾角庄园",
    world: "陆上人早已不信海族，只有沿海的老人还记得'海妻'——古老家族与海族的旧契约：娶一位海妻，换一代人的风平浪静。雾角庄园的艾什福德家曾是签过契约的家族之一。海底另有一套秩序：深渊王廷统治潮汐，龙王厄尔宁的血脉只能借海族之外的躯体延续，海妻是容器，孩子是王廷的财产。契约里有一行没人愿念出口的话：海妻所生的孩子，七岁前必须归海，否则两界皆失。",
    situation: "九日前的暴风夜，你抱着高烧的塔莉叩响了雾角庄园的门。埃德蒙·艾什福德上校——退役皇家海军、五年前丧妻于海难、全郡都知道他恨海——收留了你，以'海难寡妇奈莉·格雷'的身份。庄园的规矩接住了你：早餐八点、晚祷九点、育儿室的火不许灭。今晨退潮，你的小腿开始刺痛；哈洛太太替塔莉系围嘴时，手在她肩胛上停了半息。上校在读报，报上说礁石外的海昨夜'自己亮了'。而村里来了一个卖马的爱尔兰人，笑起来嘴角有盐。",
    objective: "先在庄园的规矩里站稳，别让第一片鳞把你和塔莉逐出这道门；再弄清上校为什么收留你——他看你的眼神不像看一个寡妇。大潮在七天后，你得决定：到时候去浸海，还是让鳞片浮上来；而那个卖马的人进村，不是来卖马的。",
  },
  threeAct: [
    "藏身与规矩：你在英式庄园的秩序里藏一个正在长鳞的孩子，上校的克制与你的警觉互相试探——他恨海，而你就是海。",
    "旧人与大潮：塞林以马商身份进村，旧恨旧欲一并上岸；大潮夜你必须选择浸海还是暴露，上校在那一夜知道了你是谁。",
    "契约与抉择：牧师交出海妻契约，克拉丽莎的信登了报，龙王的期限逼近；你在潮与岸之间替塔莉、也替自己，选一条能活的路。",
  ],
  chapters: [
    {
      id: "ch01",
      title: "退潮日",
      summary: "第一片鳞被看见；你在早餐室、育儿室与书房之间学会这座庄园的规矩，也第一次看清上校收留你时眼里的东西不是善意那么简单。",
    },
    {
      id: "ch02",
      title: "卖马的人",
      summary: "塞林以爱尔兰马商身份登门，用一句只有你听得懂的旧话点名你；旧日护卫与情人的恨与欲隔着一张下午茶桌重新上岸。",
      entry: "马蹄声先于通传进了前庭。一匹灰马、一匹枣红，牵马的人没戴帽子，湿发贴在额上像刚从水里出来。哈洛太太在门厅拦住他要名帖，他递过去一张空白的卡片，说：'告诉屋里那位夫人，潮水还记得她的名字。'上校在书房窗口看了整整一分钟，然后吩咐：请他进来喝茶。",
      entryChoices: [
        { kind: "action", text: "抢在上校之前去门厅，亲自见他" },
        { kind: "speech", text: "让哈洛太太回话：夫人不见马商" },
      ],
    },
    {
      id: "ch03",
      title: "大潮夜",
      summary: "大潮之夜你必须浸海，塔莉在育儿室发烧、肩胛的鳞蔓延到脊背；上校在船屋堵住了你，那一夜他知道了你是谁，也没有放你走。",
      entry: "潮声从午夜起换了方向——不是打过来，是在往回吸。塔莉的额头烫得像壁炉边的铁架，肩胛上那片鳞已经连成了一道弯月。你的小腿在被单下抽紧，膝盖以下的皮肤起了细密的银光。窗外，悬崖小径通向船屋的那盏灯，今晚没有熄。",
      entryChoices: [
        { kind: "action", text: "抱起塔莉，从后楼梯下去往船屋走" },
        { kind: "action", text: "先去书房，把上校叫醒——今晚你需要他" },
      ],
    },
    {
      id: "ch04",
      title: "契约",
      summary: "帕金森牧师交出教堂地下的海妻契约原件，克拉丽莎的信登上伦敦报纸，龙王给了最后期限：下一次大潮。每一方都亮出半张底牌。",
      entry: "晨报在早餐桌上，第三版角落一则通讯：《西海岸某庄园收留身份不明女子，带一幼女》。哈洛太太把报纸折到看不见那一版，上校把它翻回来。同一刻，帕金森牧师站在门厅里，怀里抱着一只铅皮匣子，鞋上还沾着教堂地下室的白灰。他说：'上校，有些东西，我想您的先祖不希望它一直躺在地下。'",
      entryChoices: [
        { kind: "action", text: "先接过铅皮匣子，当场开启" },
        { kind: "speech", text: "问牧师：契约上写着孩子的事，你早就知道" },
      ],
    },
    {
      id: "ch05",
      title: "潮与岸",
      summary: "下一次大潮之夜，海在亮海湾里立起来；你在悬崖上做出选择——交出塔莉、带她再逃，还是用上校的血脉重立契约，把雾角庄园变成两界之间的地方。",
      entry: "亮海湾从黄昏就开始发光，到午夜整片海面像一块被点亮的青玻璃。塞林站在礁石最前端，不再是马商——潮汐骑士的银甲在光里一片一片浮现。塔莉在你怀里不哭，她在听。上校站在你身后半步，海军的佩剑第一次出了鞘。哈洛太太、牧师和克拉丽莎都在悬崖小径上，没有人往回走。",
      entryChoices: [
        { kind: "speech", text: "对塞林说：我跟你回去，塔莉留在岸上" },
        { kind: "action", text: "拉过上校的手，按在契约的空白处" },
      ],
    },
  ],
  characters: [
    {
      id: "edmund",
      name: "埃德蒙·艾什福德",
      role: "雾角庄园主·退役皇家海军上校",
      shortBio: "四十三岁，退役上校。五年前妻子死于礁石外的海难，此后他关掉了船屋、拆了码头，每晚在书房只喝一杯不多的威士忌。全郡都知道他恨海，却没人知道他为什么还住在悬崖上。",
      featured: true,
      storyCore: "掌庄园一切决定权，郡里有旧海军人脉；识海、识船、识天气。底线：不让这座房子再被海拿走任何东西——包括你。",
      performanceCore: "礁石般的克制，礼仪一丝不苟，说话短、不重复；用整理袖扣与倒酒代替情绪。逼近时不提高声音，只缩短距离。",
      privateGoal: "查清礁石外的海为什么又亮了；把你和孩子留在岸上，无论以什么名义。",
      secret: "他妻子不是死于海难——她是上一代'海妻'的后裔，那夜海族来'收回血脉'，他用船屋的旧炮打了海，妻子在混乱中落水。他知道海族存在，收留你的第一夜就知道你不是寡妇。",
      persona: { surface: "礼仪与沉默筑成的堡垒：一切按钟点，一切不越界，眼神比话多。", coreWant: "把海欠他的讨回来——他分不清这是复仇还是想再拥有一次；你出现之后，他更分不清。", bedrock: "海军的信条：船上的人，一个都不许丢。" },
      firstAppearance: "他在早餐桌尽头翻报纸，翻页的声音比座钟还准；报纸放下时，他先看你的手，再看你的脸。",
    },
    {
      id: "harlow",
      name: "哈洛太太",
      role: "雾角庄园女管家",
      shortBio: "五十八岁，在雾角庄园服务三十年，庄园真正的运行者。钟点、账目、仆人和上校的情绪都归她管。托盘落桌不出声，是她的手艺，也是她的宣言。",
      featured: true,
      storyCore: "掌仆人区、账目与庄园日常运转；上校听她三分。底线：这座房子的秩序不能崩。",
      performanceCore: "语句完整、敬称精确，纠正人时先纠正物品的位置；关心以'规矩'的名义给出。",
      privateGoal: "弄清你和孩子会给庄园带来什么，然后决定是护你还是护庄园——她希望这两件事是同一件。",
      secret: "她祖母是渔村里'和海边女人说话'的那种人，她小时候见过鳞。系围嘴时她看见了塔莉肩胛上的那一片，她什么都没说，把育儿室壁炉的煤加了一倍。",
      persona: { surface: "秩序的化身：钟点、敬称、托盘无声。", coreWant: "护住这座房子里她认定的人——上校是一个，她还在决定你算不算。", bedrock: "渔村女人的底色：海的事，不对不懂海的人讲。" },
      firstAppearance: "她的托盘先于她进来，杯碟无声；替塔莉系围嘴的手在孩子肩胛上停了半息，然后把领口往上拉了一寸。",
    },
    {
      id: "serin",
      name: "塞林",
      role: "潮汐骑士·化名爱尔兰马商",
      shortBio: "二十八岁，深渊王廷的潮汐骑士，你的旧日护卫，也曾是你在王廷里唯一的私情。漫不经心的漂亮，笑起来嘴角有盐。他以爱尔兰马商身份进了村，牵着两匹从没见过陆地的马。",
      featured: true,
      storyCore: "身负龙王之命，人形上岸受潮汐限制（远离海水超过一日即衰弱）；武艺在陆上无人能敌。底线：不当着孩子的面动手。",
      performanceCore: "漫不经心、话里带钩，用旧日的暗语点名你；逼近时先笑，笑意到眼角就停。对上校格外礼貌，礼貌得像挑衅。",
      privateGoal: "带回孩子——这是命令；带走你——这是他自己的事。他没打算只完成其中一件。",
      secret: "龙王给他的命令是：带回孩子，处死海妻。他没有告诉任何人自己接了这道命令，也没有告诉任何人他打算违抗哪一半。他恨你把他留在海里，恨得想把你拖回去。",
      persona: { surface: "盐渍的漂亮：随性、带刺、永远像刚从水里出来。", coreWant: "你回头看他一次——不是作为海妻，是作为当年那个在珊瑚廊里等他的人。", bedrock: "潮汐骑士的忠诚只对一个人，而那个人不是龙王。" },
      firstAppearance: "马蹄声先于通传进了前庭；他没戴帽子，湿发贴在额上，递给哈洛太太一张空白名帖，说潮水还记得夫人的名字。",
    },
    {
      id: "parkinson",
      name: "帕金森牧师",
      role: "雾角村教区牧师",
      shortBio: "六十岁，教区牧师兼业余民俗学者，三十年来记录西海岸的海怪与海妻传说，笔记堆满了牧师宅的书房。说话慢，引经据典从不念完。",
      storyCore: "掌教堂与教区记录，村民信他；知道艾什福德家与海族的旧事比任何人多。底线：不做假见证。",
      performanceCore: "慢、问句多、引一半经文留半句；记录癖，谈话时铅笔不停。",
      privateGoal: "找一个正当的理由，把教堂地下那只铅皮匣子交出去——他不想再当唯一知道的人。",
      secret: "教堂地下室的铅皮匣里是艾什福德家与海族的'海妻契约'原件：海妻所生的孩子七岁前必须归海，否则'两界皆失'。他见过上校夫人生前来查过这份契约。",
      persona: { surface: "温和的乡村牧师：慢条斯理、笔记不停、半句经文。", coreWant: "让真相有人分担——他扛不住了。", bedrock: "牧师的底线：可以不说，不能说假。" },
      firstAppearance: "他在教堂门廊的雨里等，铅笔夹在祈祷书里，先问你：'格雷夫人，您的孩子怕火，是吗？'",
    },
    {
      id: "clarissa",
      name: "克拉丽莎·文森特",
      role: "邻庄乡绅之女",
      shortBio: "二十二岁，邻庄文森特家的独女，明媚、礼数周全、马术出众。全郡都知道她打算嫁给上校，也都知道上校五年没回过她家的邀请。",
      storyCore: "掌郡里的社交人脉与舆论；无实权。底线：不当面失礼——她的战争全在信纸上打。",
      performanceCore: "笑容先到、敬语精确，赞美里藏刻度；换话题的方式是递东西。",
      privateGoal: "把你从雾角庄园'体面地'请走，最好由上校亲自开口。",
      secret: "她已经写信给伦敦的报社，说雾角庄园收留了一个'身份不明、带着孩子的女人'。信寄出的那天她哭了一场，然后又寄了第二封。",
      persona: { surface: "明媚的乡绅小姐：礼数无瑕、马术出众、句句带刻度。", coreWant: "要一个不会被海抢走的丈夫，和一座不会漏雨的房子。", bedrock: "对'被替代'的恐惧——她等了五年。" },
      firstAppearance: "她骑马从紫杉迷宫外侧绕进前庭，下马的动作像一页翻得极准的书；把一束还带着雨的石南递给哈洛太太，说是'给小客人的'。",
    },
    {
      id: "tally",
      name: "塔莉",
      role: "你的女儿·龙王的孩子",
      shortBio: "四岁。安静、早熟，怕壁炉的火光，喜欢下雨的窗。夜里会把耳朵贴在墙上，说'海在讲话'。她不知道自己是什么，只知道妈妈说不能让人看见她的肩膀。",
      storyCore: "四岁孩子的能力与认知；龙血在每次大潮时觉醒一寸——能听懂海、鳞片蔓延、体温升高。底线：她会哭，但不会说谎。",
      performanceCore: "说四岁的话：短句、重复、突然的问题；害怕时不出声，只找妈妈的裙角；好奇时会直接问大人不敢问的事。",
      privateGoal: "想让妈妈不再夜里不睡；想知道'海在讲话'是不是坏事。",
      secret: "她能听懂海说的话，而海在叫她回家。她以为那是妈妈的声音。",
      persona: { surface: "安静的小影子：贴着裙角、盯着雨、说话前先看妈妈。", coreWant: "妈妈别怕。", bedrock: "四岁的诚实——她说出的每一句都是真的，包括那些不该说出来的。" },
      firstAppearance: "她坐在早餐桌加了两个垫子的椅子上，围嘴系到一半，转头看窗外的雨，说：'妈妈，海今天没有讲话。'",
    },
  ],
  relationships: [
    { id: "r_ner_edmund", roles: ["nerys", "edmund"], public: "庄园主收留了海难寡妇与她的孩子，全郡都在议论这份'善心'。", tension: "他恨海，你就是海；他救了你，也想把你锁在岸上——你们都知道对方在撒谎，谁先说破谁就输。" },
    { id: "r_ner_harlow", roles: ["nerys", "harlow"], public: "女管家对客人尽职周到，规矩一寸不让。", tension: "她看见了鳞，什么都没说；你不知道她是在护你还是在等一个赶你走的理由。" },
    { id: "r_ner_serin", roles: ["nerys", "serin"], public: "夫人与一个进村卖马的爱尔兰人，本不该有交集。", tension: "他是你留在海里的人，也是来把你拖回去的人；你们之间的旧账，恨和欲各占一半。" },
    { id: "r_ner_tally", roles: ["nerys", "tally"], public: "母女。", tension: "你带她逃是为了不让她归海；她却在夜里听海讲话——你越护她，她越像她父亲。" },
    { id: "r_edmund_harlow", roles: ["edmund", "harlow"], public: "主人与三十年的老管家，彼此以敬称相待。", tension: "她是唯一知道夫人海难真相的人；两人默契地从不提那一夜，也默契地都在看你。" },
    { id: "r_edmund_serin", roles: ["edmund", "serin"], public: "庄园主与登门的马商，一杯下午茶的礼节。", tension: "两个男人都认出了对方是什么；礼貌是刀鞘，你是刀。" },
    { id: "r_edmund_clarissa", roles: ["edmund", "clarissa"], public: "邻庄世交，郡里默认的'合适婚配'。", tension: "她等了五年，他五年没回过邀请；你的出现让她的耐心变成了信纸。" },
    { id: "r_parkinson_harlow", roles: ["parkinson", "harlow"], public: "牧师与庄园管家，教区事务往来多年。", tension: "他知道契约，她知道鳞；两人各守半个秘密，都在等对方先开口。" },
  ],
  worldProcesses: [
    { id: "proc_tide", title: "潮汐追索", stage: "起", note: "礁石外的海夜里自己发光；一个不戴帽子的马商牵着两匹从未见过陆地的马进了村。" },
    { id: "proc_dragonblood", title: "塔莉的龙血觉醒", stage: "起", note: "肩胛上第一片鳞；夜里把耳朵贴在墙上说'海在讲话'。" },
  ],
  npcStateSeeds: {
    edmund: { mood: "读报时在等一个人先开口", stanceToPlayer: "试探" },
    harlow: { mood: "把育儿室的煤加了一倍，什么都没说", stanceToPlayer: "审视" },
    serin: { mood: "在村里的酒馆看海，等潮", stanceToPlayer: "观望" },
    parkinson: { mood: "翻出了三十年前的笔记", stanceToPlayer: "试探" },
    clarissa: { mood: "刚寄出第二封信", stanceToPlayer: "戒备" },
    tally: { mood: "海今天没有讲话，她有点失望", stanceToPlayer: "亲近" },
  },
  worldAtlas: `英格兰西南海岸·雾角版图：
- 雾角庄园（Fogmoor Hall）踞悬崖之上。正宅：一层早餐室、书房（上校领地，壁炉与旧海图）、长廊（祖先画像）、门厅；二层育儿室（火不许灭）、客房、上校居室；地下仆人区与厨房。庭园：紫杉迷宫、玫瑰园、悬崖小径（通船屋，一刻钟）。船屋在崖下亮海湾边，五年前封闭，里面有一门旧炮。
- 亮海湾：庄园下方的礁石海湾，夜里会发光；礁石外是深水，深渊王廷不可达。大潮时海面会"立起来"。
- 雾角村：庄园沿马道步行半小时。教堂（帕金森牧师，地下室有铅皮匣）、码头、酒馆"沉锚"（塞林落脚处）、渔家。文森特庄园在村另一侧，骑马一刻钟。
- 生成新地点时按此版图推方位与距离；未列出的地点须与版图逻辑相容并沿用命名风格。位置表述从大到小写（庄园/区·房间，或 村·具体点，或 海湾·礁石）。`,
  opening: {
    usedMaterialId: "fm_ch01_s01_m01",
    choices: [
      { kind: "action", text: "伸手替哈洛太太把塔莉的领口拉好，指尖顺便盖住那片鳞" },
      { kind: "speech", text: "“上校，报上说的那片海——离庄园多远？”" },
    ],
    events: [
      { type: "narration", text: "**英格兰西南海岸 · 雾角庄园 · 早餐室 · 大潮前第九日，八点差七分**" },
      { type: "narration", text: "雨顺着落地窗的铅条往下走，把窗外的紫杉迷宫切成一格一格灰绿。早餐室里只有座钟和炉火两种声音——炉火烧的是上等煤，几乎不响；座钟是座钟，从不迁就任何人。长桌铺着浆过的亚麻布，银盖还没揭，托盘上的《西部晨报》折成四折，头版朝下。\n你坐在桌子中段，裙下的小腿从半小时前开始刺痛——退潮了。窗外的海你看不见，但你知道它在往回退，一寸一寸，像有人在收一张网。" },
      { type: "narration", text: "**塔莉**坐在你左手边加了两个垫子的椅子上，围嘴系到一半。她没看早餐，看着窗上往下走的雨。\n**哈洛太太**站在她身后系围嘴的带子，手指停在孩子肩胛的位置——停了半息，比座钟的一秒短，比任何人该停的时间长。然后她把塔莉的领口往上拉了一寸，抚平，退后一步，双手交叠在围裙前。" },
      { type: "dialogue", person: "tally", text: "妈妈，海今天没有讲话。" },
      { type: "narration", text: "长桌尽头，**埃德蒙·艾什福德上校**放下报纸。他翻页的声音一直比座钟还准，这一次，报纸放下时没有声音。他先看你的手——你的手正搭在桌沿上，指节泛白——然后才看你的脸。\n他把报纸转了个方向，推过来半尺。第三版一则简讯用铅笔圈了出来：**《亮海湾夜有异光，渔人称海水自明》**。" },
      { type: "dialogue", person: "edmund", text: "格雷夫人。昨夜的海，您听见了吗？" },
      { type: "narration", text: "炉火里一块煤塌了下去。哈洛太太的视线从孩子的肩胛移到你的脸上，又移回托盘——她揭开银盖，蒸汽升起来，把那一小格窗上的雨遮住了。\n楼上，育儿室的方向，壁炉的风门被人推开了一格——她今早加了双倍的煤。" },
    ],
  },
  segments: [
    {
      id: "fm_ch01_s01",
      chapterId: "ch01",
      location: "雾角庄园早餐室",
      present: ["edmund", "harlow", "tally"],
      goal: "在早餐室的规矩里接住第一片鳞被看见的危机；上校用报纸上的异光试你，哈洛太太用沉默试你——你决定用谎言、半真话还是坦白来站住脚。",
      focusRelationships: ["r_ner_edmund", "r_ner_harlow"],
      pressure: "早餐室有仆人进出，任何失态都会在午前传到仆人区、午后传到村里；上校的问题看似闲谈，每一个都在核对你的说法。",
      dramaticQuestion: "你是寡妇奈莉·格雷，还是从海里来的什么？——他们各自已经有了答案，只等你说出口。",
      materials: [
        { id: "fm_ch01_s01_m01", content: "上校以报上'亮海湾异光'为题旁敲侧击：他问你昨夜是否听见海、海难那夜船叫什么名字、船从哪个港出发——每个问题都像海军的例行核对；你答得越像寡妇，他看你的眼神越冷。他不揭穿，只在你答完后把报纸折起来收进自己口袋。" },
        { id: "fm_ch01_s01_m02", content: "哈洛太太看见了鳞却一字不提，用'规矩'表态：她宣布育儿室的火从今日起由她亲自看管、孩子的衣物只由她一人经手，'仆人手重'。这既是保护也是控制；若你直接问她看见了什么，她会回答'我看见小姐的领口需要放宽一寸'，然后把话题转向午餐。" },
        { id: "fm_ch01_s01_m03", content: "塔莉在早餐桌上突然问上校：'你的船沉了，你为什么不去把它捞上来？'——四岁的直白撕开桌上的体面。上校的反应可被观察：他放下茶杯的方式、回答的长度、是否看向你。这是上校与孩子之间第一根线，也是你判断他对孩子态度的窗口。" },
      ],
      exit: "早餐结束，鳞的事以某种默契被压下（或被说破），上校邀你午后到书房'谈一谈庄园的安排'。",
    },
    {
      id: "fm_ch01_s02",
      chapterId: "ch01",
      location: "雾角庄园书房与悬崖小径",
      present: ["edmund", "harlow"],
      goal: "书房独处：上校摊开旧海图，第一次让你看见他恨海底下的东西；礼仪被打破的第一寸——他握住你刺痛的小腿或手腕，对抗性亲密的电压第一次亮起，但今夜止于一颗袖扣。",
      focusRelationships: ["r_ner_edmund"],
      pressure: "书房的门关着，哈洛太太在门外的长廊来回；任何声响都会被听见——体面是唯一的遮蔽，也是唯一的挑衅。",
      dramaticQuestion: "他收留你，是善心、是复仇的替代，还是别的什么？",
      materials: [
        { id: "fm_ch01_s02_m01", content: "书房海图上，亮海湾的位置用红墨标了一个五年前的日期。上校不解释，只说'那片海拿走过我一样东西'。若你追问，他会把海图卷起来，改问你的腿——他注意到你走路时右腿落地慢半拍，'退潮时更疼，是吗？'——这句话暴露他知道的远比寡妇该被知道的多。" },
        { id: "fm_ch01_s02_m02", content: "对抗性亲密的第一次电压（张力档）：上校在你起身时握住你的手腕，拇指压在脉搏上，说'你的手在抖，不是冷'；你可以抽回、可以不抽、可以反问。若你说'恐怕这不太体面'，他会把这句话当成挑衅，逼近一步，然后被座钟或哈洛太太在门外的脚步打断——他退后，重新扣袖扣，第一颗扣了两次。今夜不再进一步。" },
        { id: "fm_ch01_s02_m03", content: "哈洛太太在书房外'恰好'路过三次，第三次直接敲门进来，说育儿室的小姐醒了、在找妈妈。她递给你一盏灯，灯柄上缠着一圈防滑的粗布——这是给走夜路去悬崖的人准备的。她什么都没说，但她知道你每晚都往船屋方向走。" },
      ],
      exit: "书房的门重新打开，体面复位；你手里多了一盏灯，或一句没说完的话。上校在你身后说：'船屋锁着。钥匙在我这里。'",
    },
    {
      id: "fm_ch02_s01",
      chapterId: "ch02",
      location: "雾角庄园门厅与客厅下午茶",
      present: ["serin", "edmund", "harlow", "clarissa"],
      goal: "塞林以马商身份登门，克拉丽莎恰好来访；一张下午茶桌上四个人各有目的——旧情人用暗语点你，上校用礼貌对峙，克拉丽莎用赞美测你，哈洛太太用茶点节奏控场。修罗场与群像交响。",
      focusRelationships: ["r_ner_serin", "r_edmund_serin", "r_edmund_clarissa"],
      pressure: "客厅里每句话都有两个听众：不懂海的人听字面，懂海的人听潜台词；你一个走神就会在其中一边露馅。",
      dramaticQuestion: "两个男人都认出了对方是什么，你站在哪一边？",
      materials: [
        { id: "fm_ch02_s01_m01", content: "塞林用只有你听得懂的旧话点名你：谈马时说'这匹灰马在珊瑚廊等过人'，谈天气时说'潮水还记得你的名字'。他对上校格外礼貌，礼貌得像挑衅；当上校问他从哪个港来，他说'从没有港的地方'。若你私下与他说话，他会直接问：'你把我留在海里，一句话都没有。'——恨与欲第一次同框。" },
        { id: "fm_ch02_s01_m02", content: "克拉丽莎递上石南与赞美：夸你的'海难寡妇'身份'真令人动容'，问塔莉'像爸爸还是像妈妈'，问你'打算在雾角住到什么时候'——每句都是刻度。她对塞林一见倾心式的客套，是给上校看的。若你回击，她会用递茶点的动作换话题，笑容不变。" },
        { id: "fm_ch02_s01_m03", content: "上校与塞林之间的对峙不经过你：两人谈马、谈海军、谈'爱尔兰的潮汐'，句句在核对对方是什么。上校最后说：'马商先生，雾角的马厩今晚有空位，您可以住下。'这是留客也是软禁——他把塞林放在眼皮底下。哈洛太太立刻宣布晚餐加一位，'规矩'接住了这场对峙。" },
      ],
      exit: "塞林留宿马厩或被请出庄园；克拉丽莎告辞时把一封信留在了门厅的银托盘上；上校对你说：'今晚锁好育儿室的门。'",
    },
    {
      id: "fm_ch03_s01",
      chapterId: "ch03",
      location: "雾角庄园育儿室与船屋",
      present: ["edmund", "tally", "harlow"],
      goal: "大潮夜：塔莉发烧、鳞连成弯月；你必须浸海，船屋的钥匙在上校手里。船屋里的对峙是全卡的电压顶点——他堵住你，你露出鳞，他没有放你走；对抗性亲密在张力档封顶处切镜，回到体面时两人都已知道对方是谁。",
      focusRelationships: ["r_ner_edmund", "r_ner_tally"],
      pressure: "潮在往回吸，你的腿撑不到天亮；塔莉的体温每一刻钟升一度；船屋里有一门五年前打过海的旧炮。",
      dramaticQuestion: "他堵在船屋门口，是要拦你回海，还是要陪你下去？",
      materials: [
        { id: "fm_ch03_s01_m01", content: "育儿室：塔莉高烧，肩胛的鳞蔓延成一道弯月并泛出微光，她把耳朵贴在墙上说'海在叫我'；哈洛太太守在门口，第一次直接说：'夫人，您该去海边了。孩子交给我。我祖母教过我怎么退烧——用海水。'她把育儿室的门从里面锁上，把你推向后楼梯。" },
        { id: "fm_ch03_s01_m02", content: "船屋对峙（张力档顶点）：上校在船屋里等你，旧炮旁点着一盏灯。他说钥匙在他这里、船屋是他的、海拿走过他的东西不许再拿。你的小腿在裙下泛银光——他看见了，没有惊，握住你的手腕把你按在船屋的木门上：'你从来不是寡妇。说出来。'逼问、逼近、呼吸可闻，你不能移开视线；若你反问'你早就知道'，他答'第一夜就知道'。临界处切镜到船屋外立起来的海、到旧炮的炮口、到座钟般的潮声——然后他松手，替你把湿发别到耳后，说：'下去。我在这里等。'" },
        { id: "fm_ch03_s01_m03", content: "浸海：你入水，鳞片浮上全身，痛感退去；海在亮海湾里立起一道墙，墙里有塞林的影子，他没有过来——他在等你自己选。你浮出水面时，上校站在船屋门口没有退后一步，手里拿着你的裙子和一条毯子。若你回到岸上，他把毯子披上来时说的第一句话是敬称：'格雷夫人'——复位的僵硬暴露方才的一切。" },
      ],
      exit: "大潮退去，塔莉退烧，你与上校之间的谎言已破——他知道你是海，你知道他知道；塞林在礁石上看完了全程。",
    },
  ],
  styleProfile: fogmoorManorPassionStyle,
};

export const xianxiaStories: Partial<Record<XianxiaStory["id"], XianxiaStory>> = {
  "immortal-sister": immortalSister,
  "steady-dao": steadyDao,
  "pavilion-keeper": pavilionKeeper,
  "white-rook": whiteRook,
  "fogmoor-tide": fogmoor,
};

export function getXianxiaStory(id: string | undefined) {
  return id && id in xianxiaStories ? xianxiaStories[id as XianxiaStory["id"]] : undefined;
}
