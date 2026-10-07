const DATA_URL = "data/readings.json";
const GLOSSARY_URL = "data/glossary.json";
const STORAGE_KEY = "weekly-reading-adventures-state-v1";

const stepTitles = [
  { zh: "音频盲听", en: "First listen" },
  { zh: "看文本听音频", en: "Listen with text" },
  { zh: "精读文本", en: "Close reading" },
  { zh: "普通跟读", en: "Repeat after audio" },
  { zh: "影子跟读", en: "Shadow reading" },
  { zh: "复述输出", en: "Retell" },
  { zh: "隔天复习", en: "Next-day review" }
];

const studyGuides = {
  1: {
    summary: {
      en: "This story is about Mia learning to use a simple summer schedule so her day feels calmer and more meaningful.",
      zh: "这个故事讲的是Mia学会用一个简单的暑假计划，让一天更清楚、更有意义。"
    },
    structure: {
      en: "Problem: Mia loses track of her first summer day. Help: Grandma gives her a notebook. Change: Mia makes a small plan and understands where her day went.",
      zh: "问题：Mia第一天过得很散。帮助：奶奶给她一本笔记本。变化：Mia做了小计划，也知道自己的一天去了哪里。"
    },
    close: [
      "P1 sets up the problem: a slow summer day slips away. / 第1段提出问题：暑假的一天不知不觉过去。",
      "P2 introduces the tool: Grandma's secret schedule. / 第2段引出工具：奶奶给的秘密计划。",
      "P3 explains how Mia makes the schedule flexible. / 第3段说明Mia怎样做一个不紧绷的计划。",
      "P4 shows the schedule working in order. / 第4段按顺序展示计划开始起作用。",
      "P5 concludes the change in Mia's feeling. / 第5段总结Mia心态的变化。"
    ],
    logic: "Sequence words and time clues guide the story: first Monday, that night, next morning, first, then, after lunch, by bedtime. / 时间顺序推动故事：第一个周一、那天晚上、第二天早上、首先、然后、午饭后、睡前。",
    retell: {
      en: "Mia wasted her first summer day and felt unhappy. Grandma gave her a notebook for a secret schedule. Mia planned a few simple things, helped Leo, and felt better because she knew where her day had gone.",
      zh: "Mia第一个暑假日子过得很散，心里不太舒服。奶奶给她一本笔记本做秘密计划。Mia安排了几件简单的事，还帮助了Leo，最后感觉更好了，因为她知道自己的一天做了什么。"
    }
  },
  2: {
    summary: {
      en: "Noah and Ava observe fireflies after dinner and learn that fireflies use light to communicate.",
      zh: "Noah和Ava晚饭后观察萤火虫，知道萤火虫会用光来交流。"
    },
    structure: {
      en: "Observation starts with a jar, changes into careful watching, then becomes a science question for tomorrow.",
      zh: "故事从拿罐子开始，转为认真观察，最后留下一个明天继续研究的科学问题。"
    },
    close: [
      "P1 creates the scene and the visual image of blinking lights. / 第1段建立场景和闪光画面。",
      "P2 changes the action from catching to watching. / 第2段把行动从捕捉变成观察。",
      "P3 gives observation details. / 第3段呈现观察到的细节。",
      "P4 explains the science. / 第4段解释科学知识。",
      "P5 shows a cause and effect: turning off the lamp makes lights easier to see. / 第5段呈现因果：关灯后更容易看见萤火虫。",
      "P6 ends with a new question. / 第6段以新问题结尾。"
    ],
    logic: "Cause and effect is central: bright yards make signals harder to see; darker yards make firefly lights clearer. / 核心逻辑是因果：院子太亮会影响萤火虫看信号，变暗后光更清楚。",
    retell: {
      en: "Noah wanted to catch a firefly, but Ava suggested watching instead. They noticed different blinking patterns. After they turned off the porch lamp, more lights appeared, and Noah ended with a new question.",
      zh: "Noah本来想抓萤火虫，但Ava建议观察。两人发现萤火虫有不同的闪光方式。关掉门廊灯后，更多光出现了，Noah最后提出了新的问题。"
    }
  },
  3: {
    summary: {
      en: "Ellis writes a postcard during a train trip and describes how the view changes from city scenes to countryside and mountains.",
      zh: "Ellis在火车上写明信片，描述窗外景色从城市变成乡村和山景。"
    },
    structure: {
      en: "The postcard moves like the train: city, fields, tunnel, lake, mountains, and a small station.",
      zh: "明信片像火车一样往前走：城市、田野、隧道、湖、山和小车站。"
    },
    close: [
      "Opening names the receiver and the writing situation. / 开头交代收信人和写信场景。",
      "Middle paragraphs describe changing window views. / 中间几段描写车窗外不断变化的景色。",
      "The tunnel paragraph gives the strongest moment. / 隧道那段是最有画面感的重点。",
      "Closing tells where Ellis will arrive. / 结尾说明Ellis即将到达哪里。"
    ],
    logic: "The text uses order and comparison: each window is like a page in a picture book. / 文章用顺序和比喻组织内容：每扇窗都像图画书的一页。",
    retell: {
      en: "Ellis writes to Sam from a shaking train table. The view changes from buildings to fields, a tunnel, a bright lake, and blue mountains. Ellis is excited to arrive at Aunt Nora's small station and look for the cat.",
      zh: "Ellis在摇晃的火车桌上给Sam写信。窗外从高楼变成田野、隧道、明亮的湖和蓝色的山。Ellis期待到Nora阿姨的小车站，先找那只猫。"
    }
  },
  4: {
    summary: {
      en: "This how-to text explains how to build a small museum at home on a rainy day.",
      zh: "这篇说明文讲怎样在雨天在家做一个小博物馆。"
    },
    structure: {
      en: "The steps are choose a space, collect objects, write labels, arrange objects, invite visitors, and change the museum later.",
      zh: "步骤是选择空间、收集物品、写标签、摆放物品、邀请参观者，之后还可以更新博物馆。"
    },
    close: [
      "P1 introduces the idea and simple materials. / 第1段介绍想法和简单材料。",
      "P2-P6 give ordered steps. / 第2到第6段按顺序给步骤。",
      "P7 ends with the bigger idea: objects hold stories. / 第7段用更大的想法收束：物品承载故事。"
    ],
    logic: "Sequence words organize the text: first, next, after that, then, finally. / 顺序词组织全文：first, next, after that, then, finally。",
    retell: {
      en: "To make a rainy-day museum, choose a table, collect objects with stories, write labels, arrange them, and invite visitors. The museum can change when you find new stories.",
      zh: "做雨天小博物馆时，先选一张桌子，收集有故事的物品，写标签，摆好，再邀请别人参观。以后有新故事，还可以继续更新。"
    }
  },
  5: {
    summary: {
      en: "Jonah solves the mystery of his missing blue bucket by following clues and ends up making new friends.",
      zh: "Jonah通过线索找到了丢失的蓝桶，最后还交到了新朋友。"
    },
    structure: {
      en: "Problem: bucket missing. Clues: wet sand, shells, scraping sound. Solution: the bucket was borrowed by mistake.",
      zh: "问题：桶不见了。线索：湿沙、贝壳碎片、刮擦声。解决：别人误以为没人要，借走了桶。"
    },
    close: [
      "Opening shows the bucket and why it matters. / 开头说明桶和它的重要性。",
      "Middle builds the mystery through clues. / 中间用线索推进谜题。",
      "Ending changes the problem into cooperation. / 结尾把问题变成合作。"
    ],
    logic: "Evidence drives the story. Jonah does not guess; he follows clues. / 证据推动故事。Jonah不是乱猜，而是跟着线索走。",
    retell: {
      en: "Jonah's blue bucket disappeared at the beach. He followed wet sand, shell pieces, and a scraping sound. He found a girl using it by mistake, shared it with her, and they built a better castle together.",
      zh: "Jonah的蓝桶在海边不见了。他跟着湿沙、贝壳碎片和刮擦声找过去，发现一个女孩误用了他的桶。最后他们一起分享桶，做出了更好的沙堡。"
    }
  },
  6: {
    summary: {
      en: "This nonfiction text compares breakfasts from different places and shows that food can tell stories about culture.",
      zh: "这篇非虚构文章比较不同地方的早餐，说明食物也能讲出文化故事。"
    },
    structure: {
      en: "The text starts with a general idea, gives examples from four places, then explains what they have in common.",
      zh: "文章先给总观点，再举四个地方的例子，最后总结共同点。"
    },
    close: [
      "P1 gives the main idea. / 第1段提出主旨。",
      "P2-P5 compare examples from Japan, Mexico, France, and Kenya. / 第2到第5段比较日本、墨西哥、法国、肯尼亚的例子。",
      "P6 summarizes similarities and cultural meaning. / 第6段总结相同点和文化意义。"
    ],
    logic: "Compare and contrast is central: same job, different foods, shared grains and family time. / 核心是比较对比：功能相同，食物不同，但都常有谷物和家庭时间。",
    retell: {
      en: "Breakfast gives people energy, but it looks different around the world. Japan, Mexico, France, and Kenya have different morning foods. Many breakfasts still share grains, family, and a story about local life.",
      zh: "早餐给人早晨的能量，但世界各地的早餐不一样。日本、墨西哥、法国和肯尼亚的早餐各有特色。不过许多早餐都有谷物、家庭和当地生活的故事。"
    }
  },
  7: {
    summary: {
      en: "Ruby and Max stop arguing about winning and learn to care for the whole garden together.",
      zh: "Ruby和Max不再争谁会赢，而是学会一起照顾整个花园。"
    },
    structure: {
      en: "The play begins with competition, shifts when Mrs. Chen asks a guiding question, and ends with cooperation.",
      zh: "剧本从竞争开始，Mrs. Chen的问题让他们转变，最后以合作结束。"
    },
    close: [
      "Opening dialogue shows Ruby and Max competing. / 开头对话显示两人在竞争。",
      "Mrs. Chen redirects attention to the garden's needs. / Mrs. Chen把注意力引向花园真正需要什么。",
      "Ending shows a fair swap and shared care. / 结尾展示公平交换和共同照料。"
    ],
    logic: "Contrast shows character change: winning at first, caring by the end. / 对比体现人物变化：开始想赢，最后懂得照料。",
    retell: {
      en: "Ruby wanted her tomatoes to win, and Max wanted his sunflower to win. Mrs. Chen helped them notice the whole garden. They supported the beans and watered the lettuce, so cooperation became more important than winning.",
      zh: "Ruby想让番茄赢，Max想让向日葵赢。Mrs. Chen让他们看到整个花园的需要。两人扶豆藤、浇生菜，最后明白合作比输赢更重要。"
    }
  },
  8: {
    summary: {
      en: "Lila visits a magical cloud library and learns that stories move into people when they read and share them.",
      zh: "Lila来到神奇的云朵图书馆，知道故事会在被阅读和分享后进入人们心里。"
    },
    structure: {
      en: "Fantasy door, question, magical book, discovery, and new idea form the story path.",
      zh: "幻想之门、问题、魔法书、发现和新想法构成故事路线。"
    },
    close: [
      "Opening turns clouds into imagination. / 开头把云变成想象入口。",
      "Middle builds the fantasy library rules. / 中间建立云朵图书馆的规则。",
      "Ending explains the theme: stories move into people. / 结尾点出主题：故事会进入人们心里。"
    ],
    logic: "The story uses question and answer: Lila asks where stories go, and the ending answers it. / 文章用问答逻辑：Lila问故事去了哪里，结尾给出答案。",
    retell: {
      en: "Lila sees a cloud open like a door and enters a cloud library. She brings a question instead of a card. After reading a magical book, she learns that stories do not stay still; they move into people.",
      zh: "Lila看到一朵云像门一样打开，进入云朵图书馆。她没有借书卡，就带了一个问题。读完一本神奇的书后，她明白故事不会停在原地，而会进入人们心里。"
    }
  }
};

const questionReferences = {
  1: [
    { answerZh: "Mia学会用简单计划帮助自己享受并记住暑假的一天。", evidence: "By bedtime, Mia had not done everything, but she knew where her day had gone.", evidenceZh: "到睡前，Mia虽然没有完成所有事，但她知道自己的一天去了哪里。", paragraph: 4 },
    { answerZh: "她先给罗勒浇水。", evidence: "First, she watered the basil.", evidenceZh: "首先，她给罗勒浇水。", paragraph: 3 },
    { answerZh: "因为这是Mia给自己做的计划。", evidence: "It is secret because you make it for yourself.", evidenceZh: "它秘密，是因为这是你给自己做的。", paragraph: 1 },
    { answerZh: "她更平静，也更清楚自己的一天怎么安排。", evidence: "she knew where her day had gone", evidenceZh: "她知道自己的一天去了哪里。", paragraph: 4 }
  ],
  2: [
    { answerZh: "院子变暗，萤火虫的光更明显，花园附近出现了更多光。", evidence: "The yard became darker, and the green sparks seemed brighter. More lights appeared near the garden.", evidenceZh: "院子变暗，绿色的光点看起来更亮，花园附近出现了更多光。", paragraph: 4 },
    { answerZh: "萤火虫是一种甲虫。", evidence: "Fireflies are beetles, not flies.", evidenceZh: "萤火虫是甲虫，不是苍蝇。", paragraph: 3 },
    { answerZh: "她想不打扰萤火虫，只观察它们。", evidence: "We can watch without keeping them", evidenceZh: "我们可以观察，而不是把它们留下来。", paragraph: 1 },
    { answerZh: "observe 的意思是认真观察并注意细节。", evidence: "Ava drew dots in her notebook. Soon she noticed", evidenceZh: "Ava画下点，很快她注意到……", paragraph: 2 }
  ],
  3: [
    { answerZh: "是的。窗外从城市高楼变成田野、牛、山和小车站。", evidence: "At first, the windows showed tall buildings... Now I can see fields, stone walls, and cows", evidenceZh: "一开始窗外是高楼……现在能看到田野、石墙和牛。", paragraph: 1 },
    { answerZh: "阳光照在湖面上，车厢里的人都抬头看。", evidence: "When we came out, the sun flashed on a lake.", evidenceZh: "出来时，阳光在湖面上一闪。", paragraph: 3 },
    { answerZh: "意思是车窗外的景色像图画书一样一页页变化。", evidence: "Every window is a page.", evidenceZh: "每一扇窗都是一页。", paragraph: 2 },
    { answerZh: "Ellis想先找那只困困的猫。", evidence: "I will look for the cat first.", evidenceZh: "我会先找那只猫。", paragraph: 5 }
  ],
  4: [
    { answerZh: "收集物品后，要给它们写简短有帮助的标签。", evidence: "After that, write labels.", evidenceZh: "之后，写标签。", paragraph: 3 },
    { answerZh: "可以是桌子、纸、布、物品、标签或门票。", evidence: "You need a table, some paper, and things that have stories.", evidenceZh: "你需要一张桌子、一些纸和有故事的东西。", paragraph: 0 },
    { answerZh: "主要目的是说明怎样在雨天做一个家里的小博物馆。", evidence: "A rainy day can feel small, but a museum can make it bigger.", evidenceZh: "雨天可能让人觉得空间很小，但博物馆可以让它变大。", paragraph: 0 },
    { answerZh: "因为这样每件物品更容易看清，也显得重要。", evidence: "Leave space between them so each object feels important.", evidenceZh: "物品之间留出空间，这样每件物品都显得重要。", paragraph: 4 }
  ],
  5: [
    { answerZh: "湿沙线、贝壳碎片和刮擦声都可以作为线索。", evidence: "First, a line of wet sand... Second, tiny shell pieces... Third, he heard a scraping sound", evidenceZh: "第一，一条湿沙线……第二，小贝壳碎片……第三，他听到刮擦声。", paragraph: 4 },
    { answerZh: "他在戴黄帽子的女孩旁边找到了桶。", evidence: "stopped beside a girl in a yellow hat. She was filling his blue bucket", evidenceZh: "停在一个戴黄帽子的女孩旁边。她正在用他的蓝桶装贝壳。", paragraph: 5 },
    { answerZh: "女孩以为桶没人要，而且她自己的桶坏了。", evidence: "I thought someone left it... Mine broke.", evidenceZh: "我以为是别人留下的……我的坏了。", paragraph: 7 },
    { answerZh: "Jonah有了两个新伙伴，城堡也有了贝壳窗户。", evidence: "the castle had strong walls, shell windows, and two new builders", evidenceZh: "城堡有了坚固的墙、贝壳窗户和两个新建造者。", paragraph: 10 }
  ],
  6: [
    { answerZh: "很多早餐都用谷物，也常和家人一起吃。", evidence: "Many use grains... Many are eaten with family.", evidenceZh: "许多早餐使用谷物……许多早餐和家人一起吃。", paragraph: 5 },
    { answerZh: "墨西哥的 chilaquiles 可能会用前一天的薄饼。", evidence: "It is a good way to use tortillas from the day before", evidenceZh: "这是使用前一天薄饼的好方法。", paragraph: 2 },
    { answerZh: "法国早餐更轻，日本早餐更热、更咸、更有饱腹感。", evidence: "This breakfast is lighter than the Japanese meal", evidenceZh: "这种早餐比日本早餐更轻。", paragraph: 3 },
    { answerZh: "不同早餐有共同点，也能告诉我们人们怎样生活。", evidence: "each breakfast tells a small story about where people live and what they value", evidenceZh: "每种早餐都讲述人们住在哪里、重视什么的小故事。", paragraph: 5 }
  ],
  7: [
    { answerZh: "她想让Ruby和Max停止争论，注意整个花园需要什么。", evidence: "What does the garden need most today?", evidenceZh: "今天花园最需要什么？", paragraph: 9 },
    { answerZh: "豆藤倒下来了。", evidence: "The bean vines are falling over.", evidenceZh: "豆藤倒下来了。", paragraph: 13 },
    { answerZh: "他们从竞争变成合作，开始关心整个花园。", evidence: "two gardeners had stopped counting wins. They were counting what still needed care.", evidenceZh: "两个园丁不再数胜利，而是在数还有什么需要照料。", paragraph: 23 },
    { answerZh: "合作和照料比赢更重要。", evidence: "A garden show is one day. A garden is every day.", evidenceZh: "花园展只有一天，花园却是每一天。", paragraph: 15 }
  ],
  8: [
    { answerZh: "主题是故事在被阅读和分享后会继续影响别人。", evidence: "Stories do not stay put... They move into people.", evidenceZh: "故事不会停在原地……它们会进入人们心里。", paragraph: 11 },
    { answerZh: "她需要带来一个好问题。", evidence: "Then bring a question", evidenceZh: "那就带来一个问题。", paragraph: 4 },
    { answerZh: "因为她想在灵感飘走之前写下或画下新的想法。", evidence: "before the idea floated away", evidenceZh: "在想法飘走之前。", paragraph: 12 },
    { answerZh: "云门、薄雾书架、会低语的书或云朵图书馆都不可能真实发生。", evidence: "Inside the cloud was a room with shelves.", evidenceZh: "云里面有一个带书架的房间。", paragraph: 1 }
  ]
};

let data;
let glossaryData;
let activeWeek = 1;
let activeStep = 1;
let state = loadState();

const appShell = document.getElementById("appShell");
const loadingState = document.getElementById("loadingState");
const weekSelect = document.getElementById("weekSelect");
const weekList = document.getElementById("weekList");
const stepList = document.getElementById("stepList");
const weekKicker = document.getElementById("weekKicker");
const readingTitle = document.getElementById("readingTitle");
const readingMeta = document.getElementById("readingMeta");
const readingAudio = document.getElementById("readingAudio");
const audioStatus = document.getElementById("audioStatus");
const stepWorkspace = document.getElementById("stepWorkspace");
const storyText = document.getElementById("storyText");
const textModeHint = document.getElementById("textModeHint");
const dictionarySearch = document.getElementById("dictionarySearch");
const dictionaryList = document.getElementById("dictionaryList");
const questionList = document.getElementById("questionList");

init();

async function init() {
  try {
    const [readingResponse, glossaryResponse] = await Promise.all([
      fetch(DATA_URL),
      fetch(GLOSSARY_URL)
    ]);
    if (!readingResponse.ok) {
      throw new Error(`Could not load ${DATA_URL}`);
    }
    if (!glossaryResponse.ok) {
      throw new Error(`Could not load ${GLOSSARY_URL}`);
    }
    data = await readingResponse.json();
    glossaryData = await glossaryResponse.json();
    activeWeek = data.readings[0].week;
    render();
    bindEvents();
    loadingState.hidden = true;
    appShell.hidden = false;
  } catch (error) {
    loadingState.textContent = "无法加载阅读数据。请通过本地服务器打开页面。Could not load the reading data. Please open this page through a local server.";
    console.error(error);
  }
}

function bindEvents() {
  weekSelect.addEventListener("change", () => {
    activeWeek = Number(weekSelect.value);
    dictionarySearch.value = "";
    activeStep = stateForWeek().activeStep || 1;
    render();
  });

  weekList.addEventListener("click", (event) => {
    const button = event.target.closest("[data-week]");
    if (!button) return;
    activeWeek = Number(button.dataset.week);
    dictionarySearch.value = "";
    activeStep = stateForWeek().activeStep || 1;
    render();
  });

  stepList?.addEventListener("click", (event) => {
    const button = event.target.closest("[data-step]");
    if (!button) return;
    setActiveStep(Number(button.dataset.step));
  });

  document.body.addEventListener("click", (event) => {
    const answerButton = event.target.closest("[data-answer]");
    if (answerButton) {
      toggleAnswer(Number(answerButton.dataset.answer));
      return;
    }

    const completeButton = event.target.closest("[data-complete-step]");
    if (completeButton) {
      toggleComplete(activeStep);
      return;
    }

    const speedButton = event.target.closest("[data-speed]");
    if (speedButton) {
      setSpeed(Number(speedButton.dataset.speed));
      return;
    }

    const sentenceButton = event.target.closest("[data-sentence-action]");
    if (sentenceButton) {
      moveSentence(sentenceButton.dataset.sentenceAction);
      return;
    }

    const flipButton = event.target.closest("[data-flip]");
    if (flipButton) {
      toggleFlip(flipButton.dataset.flip);
      return;
    }

    const evidenceButton = event.target.closest("[data-evidence]");
    if (evidenceButton) {
      showEvidence(Number(evidenceButton.dataset.evidence));
      return;
    }

    const masterButton = event.target.closest("[data-master-word]");
    if (masterButton) {
      toggleMasteredTerm(masterButton.dataset.masterWord);
    }
  });

  dictionarySearch.addEventListener("input", () => {
    renderDictionary(currentReading());
  });

  readingAudio.addEventListener("error", () => {
    audioStatus.textContent = "音频加载失败，请确认 MP3 文件存在。Audio could not load; check the MP3 file path.";
  });
}

function render() {
  const reading = currentReading();
  const weekState = stateForWeek();
  activeStep = weekState.activeStep || activeStep;

  renderWeekControls();
  renderHeader(reading);
  renderAudio(reading);
  renderStepList();
  renderStepWorkspace(reading);
  renderStory(reading);
  renderDictionary(reading);
  renderQuestions(reading);
}

function renderWeekControls() {
  weekSelect.innerHTML = data.readings
    .map((reading) => `<option value="${reading.week}">第${reading.week}周 · Week ${reading.week}: ${escapeHtml(reading.title)}</option>`)
    .join("");
  weekSelect.value = String(activeWeek);

  weekList.innerHTML = data.readings
    .map((reading) => {
      const isActive = reading.week === activeWeek ? " active" : "";
      return `
        <button class="week-button${isActive}" type="button" data-week="${reading.week}">
          <span class="week-number">第${reading.week}周 · Week ${reading.week}</span>
          <span class="week-title">${escapeHtml(reading.title)}</span>
          <span class="week-date">${escapeHtml(formatWeekRange(reading.week))}</span>
        </button>
      `;
    })
    .join("");
}

function renderHeader(reading) {
  weekKicker.textContent = `第${reading.week}周 · Week ${reading.week} · ${formatWeekRange(reading.week)}`;
  readingTitle.textContent = reading.title;
  readingMeta.textContent = `${reading.genre} · ${reading.theme} · ${reading.wordCount} words`;
}

function renderAudio(reading) {
  if (readingAudio.getAttribute("src") !== reading.audioSrc) {
    readingAudio.src = reading.audioSrc;
    readingAudio.load();
    audioStatus.textContent = "播放完整朗读。Play the full reading.";
  }
  readingAudio.playbackRate = Number(stateForWeek().speed || 1);

  document.querySelectorAll(".speed-btn").forEach((button) => {
    button.classList.toggle("active", Number(button.dataset.speed) === Number(stateForWeek().speed || 1));
  });
}

function renderStepList() {
  if (!stepList) return;
  stepList.innerHTML = data.standardInstructions
    .map((instruction) => {
      const title = stepTitles[instruction.step - 1];
      return `
        <li class="guide-step">
          <span class="step-index">${instruction.step}</span>
          <span>
            <span class="step-name">${title.zh}</span>
            <span class="step-en">${title.en}</span>
          </span>
        </li>
      `;
    })
    .join("");
}

function renderStepWorkspace(reading) {
  const guide = studyGuides[reading.week];

  stepWorkspace.innerHTML = `
    <p class="oral-note">不用书写，听完和读完后口头说一说即可。No writing is needed; say your ideas aloud.</p>
    <div class="reference-grid">
      ${flipCard("guide-main-idea", "大意参考", "Main idea", guide.summary.zh, guide.summary.en)}
      ${flipCard("guide-retell", "复述参考", "Retell", guide.retell.zh, guide.retell.en)}
    </div>
  `;
}

function renderStepTool(reading) {
  const guide = studyGuides[reading.week];
  if (activeStep === 1) {
    return `
      <p class="oral-note">口述即可，不需要书写。先听完再翻看参考。Say it aloud. No writing is needed.</p>
      <div class="reference-grid">
        ${flipCard("step1-summary", "大意参考", "Main idea reference", guide.summary.zh, guide.summary.en)}
        ${flipCard("step1-structure", "结构参考", "Structure reference", guide.structure.zh, guide.structure.en)}
      </div>
    `;
  }

  if (activeStep === 2) {
    const glossaryPreview = glossaryForWeek(reading.week).slice(0, 4).map((entry) => `${entry.term}: ${entry.zh}`).join(" / ");
    const hardSentence = longestSentence(reading.paragraphs);
    return `
      <p class="oral-note">这一遍只需要边听边看，心里留意难点；不用写。Listen and notice; no written marking is required.</p>
      <div class="reference-grid">
        ${flipCard("step2-words", "可能卡住的词", "Words that may block listening", `本篇可重点留意：${glossaryPreview}`, `Watch these words and phrases: ${glossaryPreview}`)}
        ${flipCard("step2-hard", "长句参考", "Long sentence reference", "如果一句话信息很多，可以先找主语和动作，再看补充信息。", hardSentence)}
        ${flipCard("step2-why", "为什么听不懂", "Why it may be hard to hear", "常见原因：连读、弱读、专有名词、句子太长、脑中还没形成画面。", "Common reasons: linking, weak forms, names, long sentences, or not having a clear picture yet.")}
      </div>
    `;
  }

  if (activeStep === 3) {
    return `
      <p class="oral-note">精读时口头说出段落作用和逻辑关系，再翻卡核对。Close-read aloud, then flip the cards to check.</p>
      <div class="reference-list">
        ${flipCard("step3-roles", "段落作用", "Paragraph roles", guide.close.join("\n"), guide.close.join("\n"))}
        ${flipCard("step3-logic", "逻辑关系", "Text logic", guide.logic, guide.logic)}
      </div>
    `;
  }

  if (activeStep === 4) {
    return renderSentencePractice(reading, "听一句，暂停，然后模仿一句。重点关注发音、重音、语调、停顿、连读和弱读。Listen to one sentence, pause, then imitate it.");
  }

  if (activeStep === 5) {
    return `
      <p class="small-note">使用音频旁边的倍速按钮。可以先慢速，再回到正常速度。跟丢时不要回头补，继续下一句。Use the speed buttons near the audio player. If you fall behind, continue with the next sentence.</p>
      ${renderSentencePractice(reading, "影子跟读目标：比音频慢半秒到两秒跟读。Shadow reading target: stay half a second to two seconds behind the speaker.")}
      <div class="reference-grid">
        ${flipCard("step5-tip", "影子跟读提醒", "Shadowing tip", "跟丢时不要回头补，直接跟下一句；可以先用0.75x或0.8x。", "Do not go back when you fall behind. Continue with the next sentence. Start at 0.75x or 0.8x if needed.")}
      </div>
    `;
  }

  if (activeStep === 6) {
    return `
      <p class="oral-note">口头复述即可。可以先中文，再尝试英文。Retell aloud; Chinese first is fine.</p>
      <div class="reference-grid">
        ${flipCard("step6-retell", "复述参考", "Retell reference", guide.retell.zh, guide.retell.en)}
        ${flipCard("step6-starters", "英文开头句", "English starters", "This article is about... / The author says... / One example is... / I think...", "This article is about... The author says... One example is... I think...")}
      </div>
    `;
  }

  return `
    <div class="reference-grid">
      ${flipCard("step7-review", "隔天复习顺序", "Next-day review order", "先口头回忆内容，再不看文本听一遍，最后选一小段跟读或影子跟读。", "First recall the text aloud, then listen once without the text, then choose one short part for repeat-after-audio or shadow reading.")}
      ${flipCard("step7-target", "复习目标", "Review target", "不用重新完整精读；目标是确认还记得大意、关键词和一小段声音。", "No full close reading is needed. The goal is to keep the main idea, key words, and one short sound pattern active.")}
    </div>
  `;
}

function renderSentencePractice(reading, note) {
  const sentences = splitSentences(reading.paragraphs);
  const weekState = stateForWeek();
  const index = Math.min(weekState.practiceIndex || 0, sentences.length - 1);
  return `
    <div class="sentence-practice">
      <p class="small-note">${escapeHtml(note)}</p>
      <div class="sentence-card">${escapeHtml(sentences[index])}</div>
      <div class="sentence-controls">
        <button class="sentence-button" type="button" data-sentence-action="prev">上一句 · Previous</button>
        <button class="sentence-button" type="button" data-sentence-action="next">下一句 · Next</button>
        <span class="small-note">第${index + 1}句 / Sentence ${index + 1} of ${sentences.length}</span>
      </div>
      ${flipCard(`step${activeStep}-voice-tip`, "模仿重点", "Imitation focus", "先模仿停顿和重音，再关注连读和弱读；不用追求一开始就很快。", "Copy pauses and stress first, then listen for linking and weak forms. Do not chase speed at the beginning.")}
    </div>
  `;
}

function renderStory(reading) {
  const highlightedQuestion = stateForWeek().highlightEvidence;
  const evidenceRef = Number.isInteger(highlightedQuestion)
    ? questionReferences[reading.week]?.[highlightedQuestion]
    : undefined;

  textModeHint.textContent = evidenceRef
    ? "已定位题目证据。Evidence is highlighted in the text."
    : "可以先听一遍，也可以直接阅读。Listen first, or read at your own pace.";
  storyText.innerHTML = reading.paragraphs
    .map((paragraph, index) => `<p data-paragraph="${index}">${renderParagraphWithEvidence(paragraph, evidenceRef, index)}</p>`)
    .join("");
}

function renderDictionary(reading) {
  const entries = glossaryForWeek(reading.week);
  const query = dictionarySearch.value.trim().toLowerCase();
  const mastered = stateForWeek().masteredTerms || {};
  const filtered = entries.filter((entry) => {
    const haystack = `${entry.term} ${entry.definition} ${entry.zh} ${entry.example}`.toLowerCase();
    return haystack.includes(query);
  });

  dictionaryList.innerHTML = filtered.map((entry) => {
    const isMastered = mastered[entry.term];
    return `
      <article class="dictionary-card${isMastered ? " mastered" : ""}">
        <div>
          <h4>${escapeHtml(entry.term)}</h4>
          <p class="dictionary-zh">${escapeHtml(entry.zh)}</p>
          <p>${escapeHtml(entry.definition)}</p>
          <p class="dictionary-example">${escapeHtml(entry.example)}</p>
        </div>
        <div class="dictionary-actions">
          <button class="chip-button" type="button" data-master-word="${escapeHtml(entry.term)}">${isMastered ? "已掌握 · Mastered" : "标记掌握 · Mark mastered"}</button>
        </div>
      </article>
    `;
  }).join("") || `<div class="empty-note">没有找到匹配生词。No matching words.</div>`;
}

function renderQuestions(reading) {
  const answers = stateForWeek().answers || {};
  questionList.innerHTML = reading.questions
    .map((question, index) => {
      const show = answers[index] ? " show" : "";
      const reference = questionReferences[reading.week]?.[index];
      return `
        <div class="question-card">
          <div class="question-type">${escapeHtml(question.type)}</div>
          <p>${index + 1}. ${escapeHtml(question.prompt)}</p>
          <div class="question-actions">
            <button class="answer-button" type="button" data-answer="${index}">
              ${answers[index] ? "收起参考答案 · Hide answer" : "翻参考答案 · Flip answer"}
            </button>
            <button class="answer-button evidence-button" type="button" data-evidence="${index}">
              回原文看证据 · Show evidence
            </button>
          </div>
          <div class="answer-box${show}">
            <strong>参考答案 · Reference answer</strong>
            <span>${escapeHtml(question.answer)}</span>
            ${reference ? `<span>${escapeHtml(reference.answerZh)}</span>` : ""}
            ${reference ? `
              <strong>证据 · Evidence</strong>
              <span>“${escapeHtml(reference.evidence)}”</span>
              <span>${escapeHtml(reference.evidenceZh)}</span>
            ` : ""}
          </div>
        </div>
      `;
    })
    .join("");
}

function flipCard(key, titleZh, titleEn, backZh, backEn) {
  const isFlipped = Boolean(stateForWeek().flipped?.[key]);
  const body = isFlipped ? referenceText(backZh, backEn) : "点击翻看参考 · Flip for reference";
  return `
    <button class="flip-card${isFlipped ? " is-flipped" : ""}" type="button" data-flip="${escapeHtml(key)}" aria-pressed="${isFlipped}">
      <span class="flip-card-title">
        <span>${escapeHtml(titleZh)}</span>
        <span>${escapeHtml(titleEn)}</span>
      </span>
      <span class="${isFlipped ? "reference-text" : "flip-hint"}">${body}</span>
    </button>
  `;
}

function setActiveStep(step) {
  activeStep = step;
  stateForWeek().activeStep = step;
  saveState();
  render();
}

function toggleComplete(step) {
  const weekState = stateForWeek();
  weekState.completed ||= {};
  weekState.completed[step] = !weekState.completed[step];
  saveState();
  render();
}

function toggleAnswer(index) {
  const weekState = stateForWeek();
  weekState.answers ||= {};
  weekState.answers[index] = !weekState.answers[index];
  saveState();
  renderQuestions(currentReading());
}

function toggleFlip(key) {
  const weekState = stateForWeek();
  weekState.flipped ||= {};
  weekState.flipped[key] = !weekState.flipped[key];
  saveState();
  renderStepWorkspace(currentReading());
}

function showEvidence(index) {
  const weekState = stateForWeek();
  weekState.highlightEvidence = index;
  saveState();
  render();
  requestAnimationFrame(() => {
    const target = document.getElementById("evidence-target") || storyText;
    target.scrollIntoView({ behavior: "smooth", block: "center" });
  });
}

function setSpeed(speed) {
  const weekState = stateForWeek();
  weekState.speed = speed;
  saveState();
  renderAudio(currentReading());
}

function moveSentence(action) {
  const sentences = splitSentences(currentReading().paragraphs);
  const weekState = stateForWeek();
  const current = weekState.practiceIndex || 0;
  weekState.practiceIndex = action === "next"
    ? Math.min(current + 1, sentences.length - 1)
    : Math.max(current - 1, 0);
  saveState();
  renderStepWorkspace(currentReading());
}

function toggleMasteredTerm(term) {
  const weekState = stateForWeek();
  weekState.masteredTerms ||= {};
  weekState.masteredTerms[term] = !weekState.masteredTerms[term];
  saveState();
  renderDictionary(currentReading());
}

function currentReading() {
  return data.readings.find((reading) => reading.week === activeWeek) || data.readings[0];
}

function glossaryForWeek(week) {
  return glossaryData.weeks.find((item) => item.week === week)?.entries || [];
}

function stateForWeek() {
  state.weeks ||= {};
  state.weeks[activeWeek] ||= {
    activeStep,
    completed: {},
    answers: {},
    masteredTerms: {},
    flipped: {},
    speed: 1,
    practiceIndex: 0,
    highlightEvidence: null
  };
  return state.weeks[activeWeek];
}

function loadState() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || { weeks: {} };
  } catch {
    return { weeks: {} };
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function splitSentences(paragraphs) {
  return paragraphs
    .join(" ")
    .replace(/\s+/g, " ")
    .match(/[^.!?]+(?:[.!?]+["']?|$)/g)
    ?.map((sentence) => sentence.trim())
    .filter(Boolean) || [];
}

function longestSentence(paragraphs) {
  return splitSentences(paragraphs)
    .reduce((longest, sentence) => sentence.length > longest.length ? sentence : longest, "");
}

function renderParagraphWithEvidence(paragraph, evidenceRef, index) {
  if (!evidenceRef || evidenceRef.paragraph !== index) {
    return escapeHtml(paragraph);
  }
  return renderHighlightedEvidence(paragraph, evidenceRef.evidence);
}

function renderHighlightedEvidence(paragraph, evidence) {
  const exactIndex = paragraph.indexOf(evidence);
  if (exactIndex >= 0) {
    return [
      escapeHtml(paragraph.slice(0, exactIndex)),
      `<mark class="evidence-highlight" id="evidence-target">${escapeHtml(evidence)}</mark>`,
      escapeHtml(paragraph.slice(exactIndex + evidence.length))
    ].join("");
  }

  const parts = evidence.split("...").map((part) => part.trim()).filter(Boolean);
  if (parts.length > 1) {
    const start = paragraph.indexOf(parts[0]);
    const endPart = parts[parts.length - 1];
    const end = paragraph.indexOf(endPart, Math.max(start, 0));
    if (start >= 0 && end >= start) {
      const endIndex = end + endPart.length;
      return [
        escapeHtml(paragraph.slice(0, start)),
        `<mark class="evidence-highlight" id="evidence-target">${escapeHtml(paragraph.slice(start, endIndex))}</mark>`,
        escapeHtml(paragraph.slice(endIndex))
      ].join("");
    }
  }

  return `<mark class="evidence-highlight" id="evidence-target">${escapeHtml(paragraph)}</mark>`;
}

function referenceText(zh, en) {
  if (zh === en) {
    return escapeHtml(zh).replaceAll("\n", "<br>");
  }
  return `${escapeHtml(zh).replaceAll("\n", "<br>")}<br><br>${escapeHtml(en).replaceAll("\n", "<br>")}`;
}

function formatWeekRange(week) {
  const start = new Date(`${data.scheduleStartDate}T00:00:00`);
  start.setDate(start.getDate() + (week - 1) * 7);
  const end = new Date(start);
  end.setDate(start.getDate() + 6);
  return `${formatShortDate(start)}-${formatShortDate(end)}`;
}

function formatShortDate(date) {
  return `${date.getMonth() + 1}.${date.getDate()}`;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
