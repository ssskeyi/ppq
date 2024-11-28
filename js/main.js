// 角色数据
const characters = [
  {
    name: "李星云",
    image: "pic/ycb.jpg",
    blessing:
      "身为天命之子，我李星云在此祝你：愿你如剑般锋芒毕露，似风般自由洒脱！前方的道路由你做主，生日快乐！",
    title: "天命之子",
  },
  {
    name: "姬如雪",
    image: "pic/ycb.jpg",
    blessing:
      "愿你眉目如画，内心坚强，前程似锦！愿你如梅傲雪，似莲出淤。生日快乐，未来可期！",
    title: "冰雪圣女",
  },
  {
    name: "张子凡",
    image: "pic/ycb.jpg",
    blessing:
      "愿你初心不改，梦想成真！像我一样，永远保持赤子之心。祝你生日快乐，前程似锦！",
    title: "通文馆主",
  },
  {
    name: "陆林轩",
    image: "pic/ycb.jpg",
    blessing:
      "愿你如我一般洒脱不羁，却始终心怀善念。生日快乐，愿你的人生如同利剑出鞘，锋芒毕露！",
    title: "幻音坊主",
  },
  {
    name: "温琴师",
    image: "pic/ycb.jpg",
    blessing:
      "以琴会友，以乐传情。愿你如天籁般纯净，如清泉般欢快。生日快乐，愿美妙音符伴你前行！",
    title: "琴师",
  },
  {
    name: "张玉堂",
    image: "pic/ycb.jpg",
    blessing:
      "愿你胸怀天下，心系苍生。像我一样永远保持赤诚之心。祝你生日快乐，愿你的未来光明似火！",
    title: "通文馆大弟子",
  },
];

// 初始化函数
function init() {
  const startBtn = document.querySelector(".start-btn");
  startBtn.addEventListener("click", startAlbum);

  // 生成角色卡片
  createCharacterCards();
}

// 开始相册展示
function startAlbum() {
  document.querySelector(".intro-section").style.display = "none";
  document.querySelector(".album-container").style.display = "block";

  // 触发3D动画
  arrangeCards();
}

// 生成角色卡片
function createCharacterCards() {
  const wrapper = document.querySelector(".card-wrapper");

  characters.forEach((char, index) => {
    const card = document.createElement("div");
    card.className = "character-card";
    // 调整translateZ的距离，使卡片更靠近中心
    const rotation = index * (360 / characters.length);
    card.style.transform = `rotateY(${rotation}deg) translateZ(400px)`;

    card.innerHTML = `
      <div class="card-inner">
        <div class="card-front">
          <img src="${char.image}" alt="${char.name}">
          <h3>${char.name}</h3>
          <p class="title">${char.title}</p>
        </div>
        <div class="card-back">
          <h3>${char.name}的祝福</h3>
          <p class="blessing">${char.blessing}</p>
        </div>
      </div>
    `;

    // 添加点击事件
    card.addEventListener("click", () => {
      card.classList.toggle("flipped");
    });

    wrapper.appendChild(card);
  });
}

// 添加相册旋转功能
let currentRotation = 0;
function arrangeCards() {
  const wrapper = document.querySelector(".card-wrapper");
  wrapper.style.transform = `rotateY(${currentRotation}deg)`;
}

// 添加键盘控制
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") {
    currentRotation += 60;
    arrangeCards();
  } else if (e.key === "ArrowRight") {
    currentRotation -= 60;
    arrangeCards();
  }
});

// 页面加载完成后初始化
window.addEventListener("load", init);
