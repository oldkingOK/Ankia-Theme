/*!
 * Ankia-Theme v1.7
 * https://ankia.top/
 *
 * Licensed Apache-2.0 © 东东
 */
async function fetchNote(noteId = null) {
  if (!noteId) {
    noteId = document.body.getAttribute("data-note-id");
  }

  const resp = await fetch(`api/notes/${noteId}`);

  return await resp.json();
}
document.addEventListener(
  "DOMContentLoaded",
  () => {
    const toggleMenuButton = document.getElementById("toggleMenuButton");
    const mobileMenuContainer = document.getElementById("mobileMenuContainer");
    const bloggerInfoCard = document.getElementById("bloggerInfoCard");
    const menuCard = document.getElementById("menuCard");
    const main = document.getElementById("main");

    let isCardsAdded = false;

    toggleMenuButton.addEventListener("click", () => {
      toggleMenuButton.classList.toggle("active");
      if (!isCardsAdded) {
        bloggerInfoCard.style.setProperty("display", "flex", "important");
        menuCard.style.setProperty("display", "flex", "important");
        mobileMenuContainer.appendChild(bloggerInfoCard);
        mobileMenuContainer.appendChild(menuCard);
        main.style.display = "none";
        isCardsAdded = true;
      } else {
        mobileMenuContainer.removeChild(bloggerInfoCard);
        mobileMenuContainer.removeChild(menuCard);
        main.style.display = "block";
        isCardsAdded = false;
      }

      mobileMenuContainer.classList.toggle("showMenu");
    });
  },
  false
);
document.addEventListener(
  "DOMContentLoaded",
  () => {
    var navigationItems = document.querySelectorAll(".navigationItemsStyle");
    // 为每个.navigationItemsStyle元素添加事件监听器
    navigationItems.forEach(function (item) {
      var button = item.querySelector(".menuLinkStyle");
      var dropDown = item.querySelector(".dropDownStyle");
      if (!button || !dropDown) {
        return;
      }
      var svgElement = button.querySelector("svg");
      let isHovering = false;

      button.addEventListener("mouseover", function () {
        isHovering = true;
        dropDown.style.display = "flex";

        svgElement.classList.add("unfolding");
      });

      button.addEventListener("mouseout", function () {
        isHovering = false;
        setTimeout(function () {
          if (!isHovering) {
            dropDown.style.display = "none";
            svgElement.classList.remove("unfolding");
          }
        }, 200);
      });

      dropDown.addEventListener("mouseover", function () {
        isHovering = true;
      });

      dropDown.addEventListener("mouseout", function () {
        isHovering = false;
        setTimeout(function () {
          if (!isHovering) {
            dropDown.style.display = "none";
            svgElement.classList.remove("unfolding");
          }
        }, 200);
      });
    });
  },
  false
);
document.addEventListener(
  "DOMContentLoaded",
  () => {
    var prevScrollPos = window.pageYOffset;
    const scrollDistance = 10;

    window.addEventListener('scroll', function() {
      var currentScrollPos = window.pageYOffset;
      const navigationBar = document.getElementById("navigationBar");
      if (prevScrollPos > currentScrollPos) {
        navigationBar.classList.remove("hide");
      } else if (
        currentScrollPos - prevScrollPos > scrollDistance &&
        !document.querySelector("#mobileMenuContainer.showMenu")
      ) {
        navigationBar.classList.add("hide");
      }

      prevScrollPos = currentScrollPos;
    });
  },
  false
);

document.addEventListener(
  "DOMContentLoaded",
  () => {
    const rewardBtn = document.getElementById("rewardBtn");
    const rewardImgContainer = document.getElementById("rewardImgContainer");
    if (rewardBtn) {
      rewardBtn.addEventListener("click", function () {
        if (rewardImgContainer.style.display === "flex") {
          rewardImgContainer.style.opacity = "0";
          setTimeout(function () {
            rewardImgContainer.style.display = "none";
            rewardImgContainer.style.flexWrap = "";
          }, 500);
        } else {
          rewardImgContainer.style.opacity = "1";
          rewardImgContainer.style.display = "flex";
          rewardImgContainer.style.flexWrap = "wrap";
        }
      });
    }
  },
  false
);

document.addEventListener(
  "DOMContentLoaded",
  () => {
    const toc = document.getElementById("toc");
    if (!toc) return;
    const tocHeight = toc.clientHeight;

    const sections = document.querySelectorAll(
      "#content h2, #content h3, #content h4, #content h5, #content h6"
    );
    const links = toc.querySelectorAll("a");

    links.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();

        const target = document.getElementById(
          link.getAttribute("href").slice(1)
        );
        if (target) target.scrollIntoView({ behavior: "smooth" });
      });
    });

    function changeLinkState() {
      let index = sections.length;
      while (--index && window.scrollY < sections[index].offsetTop) {}

      links.forEach((link) => link.classList.remove("tocActive"));
      links[index].classList.add("tocActive");
    }

    function scrollToc() {
      const toc = document.getElementById("toc-pane");
      const tocContent = document.getElementById("toc");
      const tocHeight = parseFloat(
        window.getComputedStyle(toc).getPropertyValue("max-height")
      );
      let activeElement = toc.querySelector(".tocActive");
      let activeElementPosition = activeElement.offsetTop;
      if (activeElementPosition > tocHeight - 50) {
        toc.scrollTo({ top: 9999, behavior: "smooth" });
      } else if (
        tocContent.offsetHeight - activeElementPosition >
        tocHeight - 50
      ) {
        toc.scrollTo({ top: 0, behavior: "smooth" });
      }
    }

    changeLinkState();
    window.addEventListener("scroll", () => {
      changeLinkState();
      setTimeout(scrollToc, 500);
    });
  },
  false
);

document.addEventListener(
  "DOMContentLoaded",
  () => {
    if (!document.queryCommandSupported("copy")) {
      return;
    }

    function flashCopyMessage(button, message) {
      button.textContent = message;
      setTimeout(function () {
        button.textContent = "Copy";
      }, 1000);
    }

    function selectText(node) {
      var selection = window.getSelection();
      var range = document.createRange();
      range.selectNodeContents(node);
      selection.removeAllRanges();
      selection.addRange(range);
      return selection;
    }

    function addCopyButton(container) {
      var copyButton = document.createElement("button");
      copyButton.className = "copyButtonStyle";
      copyButton.textContent = "Copy";
      copyButton.setAttribute("title", "复制");

      var codeElement = container.firstElementChild;
      copyButton.addEventListener("click", function () {
        try {
          var selection = selectText(codeElement);
          document.execCommand("copy");
          selection.removeAllRanges();

          flashCopyMessage(copyButton, "Copied!");
        } catch (error) {
          console && console.log(error);
          flashCopyMessage(copyButton, "Failed");
        }
      });

      container.appendChild(copyButton);
    }

    var preBlocks = document.querySelectorAll("pre");
    Array.prototype.forEach.call(preBlocks, addCopyButton);
  },
  false
);

document.addEventListener(
  "DOMContentLoaded",
  () => {
    //字数统计
    const content = document.getElementById("content");
    if (!content) {
      return;
    }
    const articleWordCount = document.getElementById("articleWordCount");
    articleWordCount.innerText = content.innerText
      .split(/[\s-+:,/\\]+/)
      .filter((chunk) => chunk !== "")
      .join("").length;
  },
  false
);

document.addEventListener(
  "DOMContentLoaded",
  () => {
    const searchInput = document.getElementById("searchInput");
    const searchResults = document.getElementById("searchResults");
    const searchContainer = document.getElementById("searchContainer");
    const searchButton = document.getElementById("searchButton");

    function buildResultItem(result) {
      return `<a class="searchItems" href="./${result.id}">
                    <div class="itemsTitle">${result.title}</div>
                </a>`;
    }
    function debounce(executor, delay) {
      let timeout;
      return function (...args) {
        const callback = () => {
          timeout = null;
          Reflect.apply(executor, null, args);
        };
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(callback, delay);
      };
    }

    async function performSearch() {
      const searchTerm = searchInput.value.trim();
      if (searchTerm !== "") {
        searchResults.innerHTML = "";

        const ancestor = document.body.dataset.ancestorNoteId;
        const query = searchInput.value;
        const resp = await fetch(
          `api/notes?search=${query}&ancestorNoteId=${ancestor}`
        );
        const json = await resp.json();
        const results = json.results;
        for (const result of results) {
          searchResults.innerHTML += buildResultItem(result);
        }
      }
    }
    searchButton.addEventListener("click", () => {
      searchContainer.style.display = "flex";
    });

    searchInput.addEventListener(
      "keyup",
      debounce(async () => {
        await performSearch();
      }, 400)
    );

    document.addEventListener("click", (event) => {
      if (
        !event.target.closest("#searchContainer") &&
        !event.target.closest("#searchButton")
      ) {
        searchContainer.style.display = "none";
      }
    });
  },
  false
);

document.addEventListener(
  "DOMContentLoaded",
  () => {
    //音乐播放器
    const playButtons = document.querySelectorAll(".playMusicButton");
    // 为每个按钮添加点击事件
    playButtons.forEach((button) => {
      button.addEventListener("click", function () {
        //用于判断是否是移动端
        const toggleMenuButton = document.getElementById("toggleMenuButton");
        var url = `//music.163.com/m/outchain/player?type=2&auto=1&height=32`;
        if (getComputedStyle(toggleMenuButton).display === "none") {
          url = `//music.163.com/outchain/player?type=2&auto=1&height=32`;
        }
        let oldPlayer = document.getElementById("musicPlayer");
        if (oldPlayer != null) {
          document.body.removeChild(oldPlayer);
        }
        const musicId = this.getAttribute("musicid");
        var musicPlayer = document.createElement("div");
        musicPlayer.id = "musicPlayer";

        musicPlayer.innerHTML = `<iframe frameborder="no" border="0" marginwidth="0" marginheight="0" width=298 height=52 src="${url}&id=${musicId}"></iframe>`;
        document.body.appendChild(musicPlayer);
      });
    });
  },
  false
);

// 首页
document.addEventListener(
  "DOMContentLoaded",
  () => {
    const header = document.querySelector("header");
    const cardContainers = document.querySelectorAll('.cardContainerStyle');
    const mainEle = document.getElementById("main");
    var mainPos = mainEle.offsetTop - parseInt(getComputedStyle(mainEle).marginTop);
    const onTopElement = document.getElementById("onTop");
    const onTopSvg = document.querySelector("#onTop svg");

    function scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    function scrollToMain() {
      mainPos = mainEle.offsetTop - parseInt(getComputedStyle(mainEle).marginTop);
      window.scrollTo({ top: mainPos, behavior: 'smooth' });
    }

    if (window.pageYOffset >= mainPos || !header) {
      cardContainers.forEach(element => {
        element.style.opacity = 1;
      });
      onTopSvg.classList.remove("rotate");
      onTopElement.addEventListener("click", scrollToTop);
    }
    if (!header) return;
    onTopElement.addEventListener("click", scrollToMain);

    var prevScrollPos = window.pageYOffset;
    var canScroll = true;
    var startScroll = function(pos) {
      if (!canScroll) {
        return;
      }
      canScroll = false;
      setTimeout(() => {
        canScroll = true;
      }, 1000);
      window.scrollTo({ top: pos, behavior: 'smooth'})
    }

    window.addEventListener('scroll', function(e) {
      mainPos = mainEle.offsetTop - parseInt(getComputedStyle(mainEle).marginTop);
      var currentScrollPos = window.pageYOffset;
      let isScrollUp = prevScrollPos > currentScrollPos;
      prevScrollPos = currentScrollPos;
      
      if (!isScrollUp && currentScrollPos < mainPos) {
        cardContainers.forEach(element => {
          element.style.opacity = 1;
        });
        onTopSvg.classList.remove("rotate");
        startScroll(mainPos);
        onTopElement.removeEventListener("click", scrollToMain);
        onTopElement.addEventListener("click", scrollToTop);
      } else if (isScrollUp && currentScrollPos < (mainPos / 2)) {
        cardContainers.forEach(element => {
          element.style.opacity = 0;
        });
        onTopSvg.classList.add("rotate");
        onTopElement.removeEventListener("click", scrollToTop);
        onTopElement.addEventListener("click", scrollToMain);
      }
    });
  },
  false
);

/**
 * 星空
 * 被多次转发，已找不到源出处。
 * https://blog.meta-code.top/2021/09/30/2021-7/
 */
document.addEventListener(
  "DOMContentLoaded",
  () => {
    function universe() {
      window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
      var windowWidth, windowHeight, starDensity, starCount, context, speedFactor = .05,
          canvasElement = document.getElementById("universe"),
          initialState = !0,
          giantColor = "180,184,240",
          starColor = "226,225,142",
          cometColor = "226,225,224",
          starsArray = [];
  
      function setCanvasSize() {
          windowWidth = window.innerWidth, windowHeight = window.innerHeight
          , starDensity = .02 // 密度
          , starCount = starDensity * windowWidth, canvasElement.setAttribute("width", windowWidth)
          , canvasElement.setAttribute("height", windowHeight)
      }
  
      function updateStars() {
          context.clearRect(0, 0, windowWidth, windowHeight);
          for (var t = starsArray.length, i = 0; i < t; i++) {
              var s = starsArray[i];
              s.move(), s.fadeIn(), s.fadeOut(), s.draw()
          }
      }
  
      function Star() {
          this.reset = function () {
              this.giant = isGiantOrComet(3)
              , this.comet = !this.giant && !initialState && isGiantOrComet(10)
              , this.x = randomInRange(0, windowWidth - 10)
              , this.y = randomInRange(0, windowHeight)
              , this.r = randomInRange(1.1, 2.6)
              , this.dx = randomInRange(speedFactor, 6 * speedFactor) + (this.comet + 1 - 1) * speedFactor * randomInRange(50, 120) + 2 * speedFactor
              , this.dy = -randomInRange(speedFactor, 6 * speedFactor) - (this.comet + 1 - 1) * speedFactor * randomInRange(50, 120)
              , this.fadingOut = null, this.fadingIn = !0, this.opacity = 0
              , this.opacityTresh = randomInRange(.2, 1 - .4 * (this.comet + 1 - 1))
              , this.do = randomInRange(5e-4, .002) + .001 * (this.comet + 1 - 1)
          }, this.fadeIn = function () {
              this.fadingIn && (this.fadingIn = !(this.opacity > this.opacityTresh), this.opacity += this.do)
          }, this.fadeOut = function () {
              this.fadingOut && (this.fadingOut = !(this.opacity < 0), this.opacity -= this.do / 2, (this.x > windowWidth || this.y < 0) && (this.fadingOut = !1, this.reset()))
          }, this.draw = function () {
              if (context.beginPath(), this.giant) 
                context.fillStyle = "rgba(" + giantColor + "," + this.opacity + ")", context.arc(this.x, this.y, 2, 0, 2 * Math.PI, !1);
              else if (false && this.comet) { // 取消彗星
                  context.fillStyle = "rgba(" + cometColor + "," + this.opacity + ")", context.arc(this.x, this.y, 1.5, 0, 2 * Math.PI, !1);
                  for (var t = 0; t < 30; t++) context.fillStyle = "rgba(" + cometColor + "," + (this.opacity - this.opacity / 20 * t) + ")", context.rect(this.x - this.dx / 4 * t, this.y - this.dy / 4 * t - 2, 2, 2), context.fill()
              } else context.fillStyle = "rgba(" + starColor + "," + this.opacity + ")", context.rect(this.x, this.y, this.r, this.r);
              context.closePath(), context.fill()
          }, this.move = function () {
              this.x += this.dx, this.y += this.dy, !1 === this.fadingOut && this.reset()
              , (this.x > windowWidth - windowWidth / 4 || this.y < 0) && (this.fadingOut = !0)
          }, setTimeout(function () {
              initialState = !1
          }, 50)
      }
  
      function isGiantOrComet(t) {
          return Math.floor(1e3 * Math.random()) + 1 < 10 * t
      }
  
      function randomInRange(t, i) {
          return Math.random() * (i - t) + t
      }
      setCanvasSize(), window.addEventListener("resize", setCanvasSize, !1),
          function () {
              context = canvasElement.getContext("2d");
              for (var t = 0; t < starCount; t++) starsArray[t] = new Star, starsArray[t].reset();
              updateStars()
          }(),
          function t() {
              updateStars(), window.requestAnimationFrame(t)
          }()
    };
    universe()
  },
  false
);

/**
 * 把 base64 当作拼音，然后用 Typed.js 实现打字效果
 * https://pinyin-pro.cn/use/pinyin.html
 * https://mattboldt.github.io/typed.js/docs/
 */
document.addEventListener(
  "DOMContentLoaded",
  () => {
    const header = document.querySelector("header");
    if (!header) return;

    // 每行字时间间隔（毫秒）
    const delay = 500;
    var raw = [];
    for (let p of document.getElementById("subtitle-strings").children) {
        raw.push(p.textContent);
    }

    // 小鹤双拼表
    const xiaohe = {'a':'aa','ai':'ai','an':'an','ang':'ah','ao':'ao','chuo':'io','cuo':'co','duo':'do','e':'ee','ei':'ei','en':'en','eng':'eg','er':'er','guo':'go','huo':'ho','kuo':'ko','luo':'lo','nuo':'no','o':'oo','ruo':'ro','shuo':'uo','suo':'so','tuo':'to','zhuo':'vo','zuo':'zo','bang':'bh','beng':'bg','bian':'bm','biao':'bn','bing':'bk','bai':'bd','ban':'bj','bao':'bc','bei':'bw','ben':'bf','bie':'bp','bin':'bb','ba':'ba','bi':'bi','bo':'bo','bu':'bu','cang':'ch','ceng':'cg','cong':'cs','cuan':'cr','cai':'cd','can':'cj','cao':'cc','cen':'cf','cou':'cz','cun':'cy','ca':'ca','ce':'ce','ci':'ci','cu':'cu','cui':'cv','chuang':'il','chang':'ih','cheng':'ig','chong':'is','chuan':'ir','chai':'id','chan':'ij','chao':'ic','chen':'if','chou':'iz','chua':'ix','chun':'iy','cha':'ia','che':'ie','chi':'ii','chu':'iu','chuai':'ik','chui':'iv','dang':'dh','deng':'dg','dian':'dm','diao':'dn','ding':'dk','dong':'ds','duan':'dr','dai':'dd','dan':'dj','dao':'dc','dei':'dw','den':'df','die':'dp','diu':'dq','dou':'dz','dun':'dy','da':'da','de':'de','di':'di','du':'du','dui':'dv','fang':'fh','feng':'fg','fan':'fj','fei':'fw','fen':'ff','fou':'fz','fa':'fa','fo':'fo','fu':'fu','guang':'gl','gang':'gh','geng':'gg','gong':'gs','guan':'gr','gai':'gd','gan':'gj','gao':'gc','gei':'gw','gen':'gf','gou':'gz','gua':'gx','gun':'gy','ga':'ga','ge':'ge','gu':'gu','guai':'gk','gui':'gv','huang':'hl','hang':'hh','heng':'hg','hong':'hs','huan':'hr','hai':'hd','han':'hj','hao':'hc','hei':'hw','hen':'hf','hou':'hz','hua':'hx','hun':'hy','ha':'ha','he':'he','hu':'hu','huai':'hk','hui':'hv','jian':'jm','jiao':'jn','jing':'jk','juan':'jr','jie':'jp','jin':'jb','jiu':'jq','jun':'jy','ji':'ji','ju':'ju','jia':'jx','jiang':'jl','jiong':'js','jue':'jt','kuang':'kl','kang':'kh','keng':'kg','kong':'ks','kuan':'kr','kai':'kd','kan':'kj','kao':'kc','kei':'kw','ken':'kf','kou':'kz','kua':'kx','kun':'ky','ka':'ka','ke':'ke','ku':'ku','kuai':'kk','kui':'kv','lang':'lh','leng':'lg','lian':'lm','liao':'ln','ling':'lk','long':'ls','luan':'lr','lai':'ld','lan':'lj','lao':'lc','lei':'lw','lie':'lp','lin':'lb','liu':'lq','lou':'lz','lun':'ly','la':'la','le':'le','li':'li','lu':'lu','lv':'lv','liang':'ll','lue':'lt','mang':'mh','meng':'mg','mian':'mm','miao':'mn','ming':'mk','mai':'md','man':'mj','mao':'mc','mei':'mw','men':'mf','mie':'mp','min':'mb','miu':'mq','mou':'mz','ma':'ma','me':'me','mi':'mi','mo':'mo','mu':'mu','nang':'nh','neng':'ng','nian':'nm','niao':'nn','ning':'nk','nong':'ns','nuan':'nr','nai':'nd','nan':'nj','nao':'nc','nei':'nw','nen':'nf','nie':'np','nin':'nb','niu':'nq','nou':'nz','nun':'ny','na':'na','ne':'ne','ni':'ni','nu':'nu','nv':'nv','niang':'nl','nue':'nt','ou':'ou','pang':'ph','peng':'pg','pian':'pm','piao':'pn','ping':'pk','pai':'pd','pan':'pj','pao':'pc','pei':'pw','pen':'pf','pie':'pp','pin':'pb','pou':'pz','pa':'pa','pi':'pi','po':'po','pu':'pu','qian':'qm','qiao':'qn','qing':'qk','quan':'qr','qie':'qp','qin':'qb','qiu':'qq','qun':'qy','qi':'qi','qu':'qu','qia':'qx','qiang':'ql','qiong':'qs','que':'qt','rang':'rh','reng':'rg','rong':'rs','ruan':'rr','ran':'rj','rao':'rc','ren':'rf','rou':'rz','run':'ry','re':'re','ri':'ri','ru':'ru','rui':'rv','sang':'sh','seng':'sg','song':'ss','suan':'sr','sai':'sd','san':'sj','sao':'sc','sen':'sf','sou':'sz','sun':'sy','sa':'sa','se':'se','si':'si','su':'su','sui':'sv','shuang':'ul','shang':'uh','sheng':'ug','shuan':'ur','shai':'ud','shan':'uj','shao':'uc','shei':'uw','shen':'uf','shou':'uz','shua':'ux','shun':'uy','sha':'ua','she':'ue','shi':'ui','shu':'uu','shui':'uv','shuai':'uk','tang':'th','teng':'tg','tian':'tm','tiao':'tn','ting':'tk','tong':'ts','tuan':'tr','tai':'td','tan':'tj','tao':'tc','tei':'tw','tie':'tp','tou':'tz','tun':'ty','ta':'ta','te':'te','ti':'ti','tu':'tu','tui':'tv','wang':'wh','weng':'wg','wai':'wd','wan':'wj','wei':'ww','wen':'wf','wa':'wa','wo':'wo','wu':'wu','xian':'xm','xiao':'xn','xing':'xk','xuan':'xr','xie':'xp','xin':'xb','xiu':'xq','xun':'xy','xi':'xi','xu':'xu','xiong':'xs','xiang':'xl','xia':'xx','xue':'xt','yang':'yh','ying':'yk','yong':'ys','yuan':'yr','yan':'yj','yao':'yc','yin':'yb','you':'yz','yun':'yy','ya':'ya','ye':'ye','yi':'yi','yo':'yo','yu':'yu','yue':'yt','zang':'zh','zeng':'zg','zong':'zs','zuan':'zr','zai':'zd','zan':'zj','zao':'zc','zei':'zw','zen':'zf','zou':'zz','zun':'zy','za':'za','ze':'ze','zi':'zi','zu':'zu','zui':'zv','zhuang':'vl','zhang':'vh','zheng':'vg','zhong':'vs','zhuan':'vr','zhai':'vd','zhan':'vj','zhao':'vc','zhei':'vw','zhen':'vf','zhou':'vz','zhua':'vx','zhun':'vy','zha':'va','zhe':'ve','zhi':'vi','zhu':'vu','zhuai':'vk','zhui':'vv','yv':'yv','lia':'lx','dia':'dx'}
    /**
     * 把拼音转换成小鹤双拼
     * @param {string} pinyin 单个拼音
     * @returns 
     */
    function getXiaohe(pinyin) {
      if (xiaohe[pinyin]) {
        return xiaohe[pinyin];
      } else {
        return pinyin;
      }
    }

    /**
     * 根据字符串，生成拼音序列
     * 比如：“这辈子就是被 CTF 害了”
     * 这        zhe
     * 这辈      这bei
     * 这辈子    这辈zi
     * 这辈子就  这辈子jiu
     * ...
     * @param {string} pinyinArray 翻译之后的拼音数组
     * @returns list of strings
     */
    function genStrs(pinyinArray) {
      var origin = [""];
      var pinyin = [""];
      for (let i = 0; i < pinyinArray.length; i++) {
        // 对于未翻译的，直接拼接
        if (pinyinArray[i][0].origin == pinyinArray[i][0].result) {
          origin[origin.length - 1] += pinyinArray[i][0].origin;
          pinyin[pinyin.length - 1] += pinyinArray[i][0].origin;
          continue;
        }
  
        // 拼音
        pinyin[pinyin.length - 1] += "<i><u>";
        for (let j = 0; j < pinyinArray[i].length; j++) {
          origin[origin.length - 1] += pinyinArray[i][j].origin;
          pinyin[pinyin.length - 1] += getXiaohe(pinyinArray[i][j].result);
        }
        pinyin[pinyin.length - 1] += "</u></i>";
        
        // 手动添加新行
        origin.push(origin[origin.length - 1]);
        pinyin.push(origin[pinyin.length - 1]);
      }
  
      return {
        origin: origin,
        pinyin: pinyin,
      };
    }

    // 这是一个使用 vercel 搭建的简单后端，用于获取拼音
    // https://github.com/oldkingOK/pinyin-server
    $.ajax({
      url: 'https://pinyin.oldkingok.cc/',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({
          raw: raw
      }),
      success: function(response) {
          let pinyin = response.pinyin;
          var origins = [];
          var strs = [];
          for (let i = 0; i < pinyin.length; i++) {
            let result = genStrs(pinyin[i]);
            origins = origins.concat(result.origin);
            strs = strs.concat(result.pinyin);

            strs.push(origins.at(-1) + "^" + delay);
            origins.push("");
          }

          var typed = new Typed('#subtitle', {
            strings: strs,
            typeSpeed: 70,
            backSpeed: 40,
            backDelay: 0,
            startDelay: 400, // 进首页之后的延迟
            loop: true,
          });
      
          // Typed.js 提供了 onStringTyped 接口触发于每行字打印结束
          // 但是并不能直接修改字符串，所以只能修改触发 onStringTyped 的 doneTyping
          var o_doneTyping = typed.doneTyping;
          typed.doneTyping = function(curString, curStrPos) {
            // 如果字符串以 ">" 结尾，说明是拼音，那就把对应的字替换上
            // 注意：这里暂时使用 "<" 进行定位，可能会出现 bug
            if (curString.slice(-1) == ">") {
              var newStr = origins[this.arrayPos];
              this.replaceText(newStr);
              curString = newStr;
              curStrPos = newStr.length;
            }
            o_doneTyping.apply(this, [curString, curStrPos]);
          }
      },
      error: function(xhr, status, error) {
          console.error('Error:', error);
      }
    });
  },
  false
);

// 图片点击放大
document.addEventListener(
  "DOMContentLoaded",
  () => {
    Fancybox.bind('#content img', {});
  },
  false
);