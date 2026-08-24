export type XianxiaEventType = "narration" | "dialogue" | "action" | "reaction";

export type XianxiaEvent = {
  type: XianxiaEventType;
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
  firstAppearance: string;
  featured?: boolean;
};

export type XianxiaMaterial = {
  id: string;
  content: string;
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
      kind: "hud";
      eyebrow: string;
      title: string;
      rows: Array<{ label: string; value: string; tone?: "normal" | "warning" }>;
      note?: string;
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
  materials: XianxiaMaterial[];
  exit: string;
};

export type XianxiaStory = {
  id: "immortal-sister";
  title: string;
  subtitle: string;
  logline: string;
  accent: string;
  playerRole: {
    id: string;
    name: string;
    displayRole: string;
    fixedCore: string;
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
  opening: {
    events: XianxiaEvent[];
    choices: XianxiaChoice[];
    usedMaterialId: string;
  };
  chapterBackgrounds?: Record<string, { video: string; poster?: string; label: string }>;
  chapterEndPreviews?: XianxiaChapterEndPreview[];
  backgroundMusic?: { src: string; title: string };
  mediaCues?: Record<string, XianxiaMediaCue[]>;
  segments: XianxiaSegment[];
  styleProfile: string;
};

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
      firstAppearance: "带着盖有仙门外务印的收税文书来到面铺，把勒索说成一次例行核验。",
      featured: false,
    },
  ],
  relationships: [
    { id: "r_shen_wen", roles: ["shen_yan", "wen_zhaoxue"], public: "闻照雪是与你同出一脉的师姐，也是在宗门身份之外长期照顾、理解你的人。", tension: "你早已想与她真正并肩；她也在意你，却习惯先用师姐身份替你挡下危险。" },
    { id: "r_shen_pei", roles: ["shen_yan", "pei_xingzhou"], public: "同门师兄弟，裴行舟公开照顾你的宗门生活。", tension: "你的天赋打乱了他多年经营的继承秩序，他要把嫉妒改写成合理程序。" },
  ],
  opening: {
    usedMaterialId: "immortal_ch01_s01_m01",
    choices: [
      { kind: "speech", text: "“既然师姐破费下注，那我便押太初，名字就叫‘照雪’。”" },
      { kind: "speech", text: "“灵剑择主随缘即可，我更好奇师姐刚才押了什么结果？”" },
    ],
    events: [
      {
        type: "narration",
        text: "北境天光难得这般透亮。授剑大典前一日的未时，主峰授剑院的露天石坪被白日晒得暖意微泛，几株古松将斑驳碎影拓在青石长案上。明日清晨，沉睡百年的绝世灵剑‘太初’便要在十二峰剑冢前公开择主，作为十二名候选者之一，你正坐在这方院落里歇息，耳边尽是山风穿过回廊的细碎声响。",
      },
      {
        type: "narration",
        text: "院门处一阵脚步声跌跌撞撞地打破了宁静。礼殿杂务弟子桑迟怀里死死抱着厚厚一沓描金剑谱与红木赌签，手里还拎着一支饱蘸朱砂的细毫笔，一路小跑过来，衣角差点带翻石案边的铜洗。他在长案另一头把东西一股脑放下，气喘吁吁地直抹额头的细汗。",
      },
      {
        type: "dialogue",
        person: "sang_chi",
        text: "师兄，总算逮着你了！礼殿和执事堂那帮同门已经为明日开出足足六副盘口，就差你自个儿这张定心签！你给句准话，明日剑冢里那十二柄候选灵剑，你觉着太初当真会挑你么？还有，若真被你领了回来，你打算给它改个什么名字？我可指着押你这一注换下半年的中品灵石呢！",
      },
      {
        type: "narration",
        text: "桑迟的话音还没落，院外青石小径上便传来一声带着笑意的轻咳。刚从洗剑池折返的闻照雪信步迈入院中，她一身素白道袍的袖口尚挽在小臂处，身上还带着洗剑池特有的冷泉水汽，眉眼间却全是松弛惬意的温和。早你十年入门的师姐几步走到石案旁，顺手将一盏刚晾好的热茶挪到你右手边，指尖轻触瓷盏边缘试了试温度。",
      },
      {
        type: "dialogue",
        person: "wen_zhaoxue",
        text: "别听桑迟胡闹。太初那是认主极挑剔的老脾气，你平日练剑总爱在收式时多挽半朵剑花，当年在试剑坪险些把长老的袍角削下一块，它若是真挑了你，怕是头一天就得嫌你手欠。不过——这热茶先喝了，洗剑池边风大，你昨夜练完剑又没穿避寒的坎肩，手腕的旧伤可还发酸？",
      },
      {
        type: "narration",
        text: "闻照雪一边说着，一边极其自然地扯过桑迟手里那张写满人名的红木赌签，拿指节轻轻敲了敲长案，眼底漾开几分大姐姐式的促狭笑意。她没有半点北境剑尊的架子，反倒当着桑迟的面，大大方方地从腰间解下一枚质地温润的青玉佩，‘啪嗒’一声按在桑迟带来的押注簿上。",
      },
      {
        type: "dialogue",
        person: "wen_zhaoxue",
        text: "喏，我也押一份。当年你刚入门那会儿，连拿柄木剑都嫌磨手，如今倒成了宗门上下议论最多的候选人。桑迟问你的话我也好奇，真要是太初选了你，你打算在剑柄上刻个什么正经名号？总不能还像小时候养的那只灵雀一样，叫什么‘飞雪’、‘滚圆’吧？",
      },
      {
        type: "narration",
        text: "阳光透过松针落在石案与赌签上，桑迟两眼放光地抓着朱砂笔眼巴巴瞧着你，闻照雪也微微侧过头，托着腮带着温软的笑意等你的答复。",
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
  styleProfile: "群像现实感仙侠。旁白以具体物件、工作与行动显出制度压力；对白自然、有关系感，允许轻微玩笑、打断和嘴硬。人物人设高于题材惯性，闻照雪不得写成冰冷仙子。",
};

export const xianxiaStories: Record<XianxiaStory["id"], XianxiaStory> = {
  "immortal-sister": immortalSister,
};

export function getXianxiaStory(id: string | undefined) {
  return id === "immortal-sister" ? immortalSister : undefined;
}
