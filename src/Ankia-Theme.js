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
    const mainPos = mainEle.offsetTop - parseInt(getComputedStyle(mainEle).marginTop);
    const onTopElement = document.getElementById("onTop");
    const onTopSvg = document.querySelector("#onTop svg");

    function scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    function scrollToMain() {
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
 */
document.addEventListener(
  "DOMContentLoaded",
  () => {
    const header = document.querySelector("header");
    if (!header) return;

    /**
     * 根据字符串，生成拼音序列
     * 比如：“这辈子就是被 CTF 害了”
     * zhe
     * 这bei
     * 这辈zi
     * 这辈子jiu
     * ...
     * @param {string} str 
     * @returns 
     */
    function genStrs(str) {
      var res = [];
      var pinyin = pinyinPro.pinyin(str, { toneType: 'none' });

      // 使用 pinyin-pro 处理出来的拼音，原字符串中的 " " 会变成连续的两个空字符
      // 将其转换回空格
      let arr = pinyin.split(" ");
      let result = arr.reduce((acc, curr) => {
        if (curr !== '') return [...acc, curr];
        if (acc.length > 0 && acc[acc.length - 1] === ' ') return acc;
        return [...acc, ' '];
      }, []);
      
      // 处理字符串
      // 将有拼音的字符的拼音加上下划线和斜体
      // 没有拼音的字符就原样输出
      for (let i = 0; ; i++) {
        let buf = "";
        
        // 跳过没有拼音的字符
        while (i < (str.length) && result[i] == str[i]) {
          buf += str[i];
          i++;
        }
        if (i < str.length) {
          res.push(str.slice(0, i) + "<i><u>" + result[i] + "</u></i>");
        } else {
          res.push(str);
          break;
        }
      }

      return res;
    }
    
    var strs = genStrs('这辈子就是被 CTF 害了');
    
    var typed = new Typed('#subtitle', {
      strings: strs,
      typeSpeed: 50,
      backSpeed: 30,
      backDelay: 0,
      startDelay: 0,
    });
    var o_doneTyping = typed.doneTyping;
    // 提供的接口不够实现功能，所以重写doneTyping方法
    typed.doneTyping = function(curString, curStrPos) {
      // 如果字符串以 ">" 结尾，说明是拼音，那就把对应的字替换上
      // 注意：这里暂时使用 "<" 进行定位，可能会出现 bug
      if (this.arrayPos != strs.length - 1 && curString.slice(-1) == ">") {
        var newStr = this.strings[this.arrayPos+1].slice(0, curString.indexOf("<") + 1);
        this.replaceText(newStr);
        curString = newStr;
        curStrPos = newStr.length;
      }
      o_doneTyping.apply(this, [curString, curStrPos]);
    }
  },
  false
);