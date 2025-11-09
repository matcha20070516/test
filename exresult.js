window.addEventListener("DOMContentLoaded", () => {
  const setName = localStorage.getItem("currentExamSet") || "";
  const prefix = `ex_${setName}_`;

  const username = localStorage.getItem(`${prefix}Username`) || "名無し";
  const score = localStorage.getItem(`${prefix}Score`) || localStorage.getItem("exScore") || "0";
  const displaySetName = localStorage.getItem(`${prefix}SetName`) || setName;

  document.getElementById("username").textContent = username;
  document.getElementById("score").textContent = score;
  document.getElementById("setname").textContent = displaySetName;

  // 経過時間取得＆表示
  const elapsedSec =
    Number(localStorage.getItem(`${prefix}ElapsedTime`)) ||
    Number(localStorage.getItem("exElapsedTime")) ||
    0;

  function formatTime(sec) {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}分${s}秒`;
  }
  document.getElementById("elapsedTimeDisplay").textContent = formatTime(elapsedSec);

  const reviewBtn = document.getElementById("review-btn");
  if (reviewBtn) {
    reviewBtn.addEventListener("click", () => {
      localStorage.setItem("exReviewMode", "true");
      localStorage.setItem("exCurrent", "1"); // 1問目から開始

      // 🔹 prefix付きの SetName を参照
      const currentExamSet = localStorage.getItem("currentExamSet");
      const setName = localStorage.getItem(`ex_${currentExamSet}_SetName`);

      let targetPage = "";
      switch (setName) {
        case "謎検模試_M":
          targetPage = "exproblem_set1.html";
          break;
        case "謎検模試_MⅡ":
          targetPage = "exproblem_set2.html";
          break;
        case "謎検模試_MⅢ":
          targetPage = "exproblem_set3.html";
          break;
        default:
          targetPage = "index.html"; // fallback
          break;
      }

      window.location.href = targetPage;
    });
  }

  // ホームに戻るボタンの処理
  const homeBtn = document.getElementById("home-btn");
  if (homeBtn) {
    homeBtn.addEventListener("click", () => {
      window.location.href = "index.html";
    });
  }

  const tweetText = encodeURIComponent(
    `『${displaySetName}』の結果は【${score}点】でした！ #謎解き #TExAM`
  );
  document.getElementById("share-link").href = `https://twitter.com/intent/tweet?text=${tweetText}`;

  // detailリンク（setNameを参照して分岐）
  let detailPage = "exresult_detail_M.html";
  if (setName === "謎検模試_M") {
    detailPage = "exresult_detail_M.html";
  } else if (setName === "謎検模試_MⅡ") {
    detailPage = "exresult_detail_test.html";
  } else if (setName === "謎検模試_MⅢ") {
    detailPage = "exresult_detail_set3.html";
  } else {
    // その他はデフォルト
    detailPage = "index.html";
  }
  const detailLink = document.getElementById("detail-link");
  if (detailLink) {
    detailLink.href = detailPage;
  }
});
