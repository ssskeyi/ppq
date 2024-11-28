// 角色数据
const characters = [
  {
    name: "李星云",
    image: "pic/李星云.png",
    blessing:
      "天命所归，非人力所能左右。愿你能够坚守本心，无论何时何地都能保持那份纯真与勇敢。祝你生日快乐，愿你的道路越走越宽广。",
    title: "不良帅",
  },
  {
    name: "姬如雪",
    image: "pic/姬如雪.png",
    blessing:
      "愿你一生光明磊落，心如止水。在人生的道路上，无论是风平浪静还是波涛汹涌，都能保持内心的平静与坚定。生日快乐，愿你的美丽与智慧并存。",
    title: "玄女",
  },
  {
    name: "张子凡",
    image: "pic/张子凡.png",
    blessing:
      "愿你永葆赤子之心，不忘初心。在这个纷繁复杂的世界里，愿你能找到属于自己的那片天地。生日快乐，愿你的每一步都踏得坚实。",
    title: "不良人",
  },
  {
    name: "陆林轩",
    image: "pic/陆林轩.png",
    blessing:
      "愿你心怀天下，志存高远。即使身处逆境，也能保持乐观豁达的心态，以不变应万变。生日快乐，愿你的人生如同一首动听的曲子，悠扬而美好。",
    title: "幻音坊主",
  },
  {
    name: "袁天罡",
    image: "pic/袁天罡.png",
    blessing:
      "上知天文，下知地理。愿你拥有洞察世事的能力，无论面对何种挑战都能从容应对。生日快乐，愿你的一生充满智慧与光辉。",
    title: "不良帅",
  },
  {
    name: "常宣灵",
    image: "pic/常宣灵.png",
    blessing:
      "愿你心中有爱，眼中含笑。在人生的旅途中，无论是高山还是低谷，都能保持一颗平常心，享受生活的每一刻。生日快乐，愿你所遇皆为美好。",
    title: "通文馆女侠",
  },
];

// 初始化函数
function init() {
  createCharacterCards();
  arrangeCards();
}

// 生成角色卡片
function createCharacterCards() {
  const wrapper = document.querySelector(".card-wrapper");

  characters.forEach((char, index) => {
    const card = document.createElement("div");
    card.className = "character-card";
    const rotation = index * (360 / characters.length);

    // 判断是否是背面的卡片（rotation 在90度到270度之间的卡片）
    const isBackface = rotation > 90 && rotation < 270;

    // 修改初始变换方式
    card.style.transform = `rotateY(${rotation}deg) translateZ(400px)`;

    // 调整卡片内容的HTML结构，根据位置决定正反面顺序
    const frontContent = `
        <div class="card-front">
            <img src="${char.image}" alt="${char.name}">
            <h3>${char.name}</h3>
            <p class="title">${char.title}</p>
        </div>
    `;

    const backContent = `
        <div class="card-back">
            <h3>${char.name}的祝福</h3>
            <p class="blessing">${char.blessing}</p>
        </div>
    `;

    // 根据位置决定内容顺序
    card.innerHTML = `
        <div class="card-inner">
            ${
              isBackface
                ? backContent + frontContent
                : frontContent + backContent
            }
        </div>
    `;

    // 点击事件处理
    card.addEventListener("click", () => {
      // 确保陆林轩的卡片也能翻转
      if (char.name === "陆林轩") {
        card.querySelector(".card-inner").style.transform =
          card.querySelector(".card-inner").style.transform ===
          "rotateY(180deg)"
            ? "rotateY(0deg)"
            : "rotateY(180deg)";
      } else {
        card.classList.toggle("flipped");
      }
    });

    wrapper.appendChild(card);
  });
}

// 相册旋转功能
let currentRotation = 0;
function arrangeCards() {
  const wrapper = document.querySelector(".card-wrapper");
  wrapper.style.transform = `translate(-50%, -50%) rotateY(${currentRotation}deg)`;
}

// 键盘控制
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") {
    currentRotation += 60;
    arrangeCards();
  } else if (e.key === "ArrowRight") {
    currentRotation -= 60;
    arrangeCards();
  }
});

// 添加鼠标拖动和触摸控制
let isDragging = false;
let startX = 0;
let startRotation = 0;

// 鼠标控制
document.addEventListener("mousedown", (e) => {
  isDragging = true;
  startX = e.clientX;
  startRotation = currentRotation;
});

document.addEventListener("mousemove", (e) => {
  if (!isDragging) return;

  const deltaX = e.clientX - startX;
  currentRotation = startRotation + deltaX * 0.5; // 调整旋转速度
  arrangeCards();
});

document.addEventListener("mouseup", () => {
  isDragging = false;
});

// 触摸控制
document.addEventListener("touchstart", (e) => {
  isDragging = true;
  startX = e.touches[0].clientX;
  startRotation = currentRotation;
});

document.addEventListener("touchmove", (e) => {
  if (!isDragging) return;

  const deltaX = e.touches[0].clientX - startX;
  currentRotation = startRotation + deltaX * 0.5;
  arrangeCards();
});

document.addEventListener("touchend", () => {
  isDragging = false;
});

// 添加自动旋转功能
let isAutoRotating = false;
function toggleAutoRotate() {
  isAutoRotating = !isAutoRotating;
  if (isAutoRotating) {
    autoRotate();
  }
}

function autoRotate() {
  if (!isAutoRotating) return;

  currentRotation += 0.5; // 调整自动旋转速度
  arrangeCards();
  requestAnimationFrame(autoRotate);
}

// 添加按钮到HTML
const controlButtons = document.createElement("div");
controlButtons.className = "control-buttons";
controlButtons.innerHTML = `
    <button onclick="currentRotation -= 60; arrangeCards();">←</button>
    <button onclick="toggleAutoRotate()">自动旋转</button>
    <button onclick="currentRotation += 60; arrangeCards();">→</button>
`;
document.querySelector(".album-container").appendChild(controlButtons);

// 页面加载完成后初始化
window.addEventListener("load", init);
