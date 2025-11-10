
// ページ読み込み時に受験済みチェックマークを表示 & 過去データ送信
window.addEventListener('DOMContentLoaded', () => {
  updateExamStatus();
  adjustViewportHeight();
  initSlider();
  initModalClose();
  
  // 過去データの自動送信をチェック
  checkAndSubmitPastData();
});

// 受験済みステータスを更新
function updateExamStatus() {
  const selectElement = document.getElementById("set");
  const options = selectElement.querySelectorAll("option");
  
  options.forEach(option => {
    const setName = option.value;
    const isCompleted = localStorage.getItem(`${setName}_completed`) === "true";
    
    // 既存のテキストから✅を削除
    let text = option.textContent.replace(" ✅", "");
    
    // 受験済みなら✅を追加
    if (isCompleted) {
      option.textContent = text + " ✅";
      option.style.color = "#4caf50";
    } else {
      option.textContent = text;
      option.style.color = "";
    }
  });
}

function start() {
  const name = document.getElementById("name").value.trim();
  const set = document.getElementById("set").value;

  if (!name) {
    alert("名前を入力してください");
    return;
  }

  // 受験完了済みチェック（新形式のキーで確認）
  const isCompleted = localStorage.getItem(`${set}_completed`) === "true";
  const isLocked = localStorage.getItem("ex_" + set + "_ResultLocked") === "true" || 
                   localStorage.getItem("exResultLocked") === "true";
  
  if (isCompleted && isLocked) {
    alert("この模試は既に受験済みです。結果画面に移動します。");
    
    localStorage.setItem("currentExamSet", set);
    
    const score = localStorage.getItem("ex_" + set + "_Score") || 
                  localStorage.getItem("exScore") || "0";
    const grade = getGrade(parseInt(score));
    const shareUrl = `https://matcha20070516.github.io/TExAM/share/grade-${grade.num}.html`;
    
    const params = new URLSearchParams({
      grade: grade.name,
      score: score,
      set: set,
      shareUrl: shareUrl
    });
    
    window.location.href = `exresult_grade${grade.num}.html?${params.toString()}`;
    return;
  }

  const prefix = `ex_${set}`;

  // 途中データがあるかチェック
  const hasSavedData = localStorage.getItem("exCurrent") || localStorage.getItem("exStartTime");
  
  if (hasSavedData) {
    // 途中から再開
    alert("前回中断された状態から再開します。");
  } else {
    // 新規開始の場合のみFreshStartフラグを立てる
    localStorage.setItem(`${prefix}_FreshStart`, "true");
    localStorage.setItem("exFreshStart", "true");
  }

  // 名前を新旧両形式で保存
  localStorage.setItem(`${prefix}_Username`, name);
  localStorage.setItem("exUsername", name);
  localStorage.setItem(`${prefix}_SetName`, set);
  localStorage.setItem("currentExamSet", set);

  window.location.href = "exrule.html";
}

// 級判定関数（index.jsでも必要）
function getGrade(score) {
  const s = parseInt(score);
  if (s === 100) return { name: "1級", num: 1 };
  if (s >= 90) return { name: "準1級", num: 2 };
  if (s >= 80) return { name: "2級", num: 3 };
  if (s >= 70) return { name: "準2級", num: 4 };
  if (s >= 60) return { name: "3級", num: 5 };
  if (s >= 50) return { name: "4級", num: 6 };
  if (s >= 40) return { name: "5級", num: 7 };
  if (s >= 30) return { name: "6級", num: 8 };
  if (s >= 20) return { name: "7級", num: 9 };
  return { name: "8級", num: 10 };
}

const slideDescriptions = [
  `①名前を入力しましょう。<br>
  ②遊ぶ模試セットを選びましょう。受験済のセットには✅がつきます<br>
  ③決定ボタンを押してルール説明を読みましょう。`,

  `残り時間-残り時間が0になると自動的に終了します。<br>
問題番号-現在表示されている問題が何問目か表示しています。<br>
チャプター-番号をクリック・タップすることでその問題へジャンプできます。 色と解答欄について　赤…解答形式が異なる　緑…解答済み　灰…無記入<br
◁・▷-一問ごとの移動ができます。パソコンであれば矢印キーでも可。<br>
解答欄-解答形式が異なる場合赤くなります。<br>
解答形式-異なる場合赤くなります。ひらがな・カタカナ・半角数字が主な形式です。<br>
配点-各問題の配点が分かります。配点を見ながら問題の取捨選択をしてもいいかも。<br>
終了ボタン-途中で全て解き終わった場合押すと結果に遷移します。`,

  `上から最初に入力した名前、受験した模試セット、あなたの得点、得点に応じた級（謎検準拠）、経過時間が表示されます。<br>
解答詳細-各問題の解答の比較・解説リンクが見れます。<br>
見返しボタン-終了後に問題を見ることができます。時間内に解けなかった問題を解く際に利用ください。<br>
ホームボタン-ホームページに戻ります。続けて他の模試もどうぞ！`,
];

const totalSlides = slideDescriptions.length;
let currentSlide = 0;
function updateSlide() {
  const howtoImg = document.getElementById('howtoImg');
  const slideDesc = document.getElementById('slideDesc');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  
  if (howtoImg) howtoImg.src = `Howto${currentSlide + 1}.png`;
  if (slideDesc) slideDesc.innerHTML = slideDescriptions[currentSlide];
  if (prevBtn) prevBtn.disabled = currentSlide === 0;
  if (nextBtn) nextBtn.disabled = currentSlide === totalSlides - 1;
  renderIndicator();
}

function renderIndicator() {
  const indicator = document.getElementById('indicator');
  if (!indicator) return;
  
  indicator.innerHTML = '';
  for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement('div');
    dot.className = 'dot' + (i === currentSlide ? ' active' : '');
    indicator.appendChild(dot);
  }
}

function initSlider() {
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  
  if (prevBtn) {
    prevBtn.onclick = function() {
      if (currentSlide > 0) { currentSlide--; updateSlide(); }
    };
  }
  
  if (nextBtn) {
    nextBtn.onclick = function() {
      if (currentSlide < totalSlides - 1) { currentSlide++; updateSlide(); }
    };
  }
  
  updateSlide();
}

function initModalClose() {
  const modalHelp = document.getElementById('modalHelp');
  const modalContent = document.querySelector('.modal-content');
  
  if (modalHelp && modalContent) {
    // モーダル背景クリックで閉じる
    modalHelp.addEventListener('click', function (e) {
      if (e.target === modalHelp) {
        closeHelp();
      }
    });
    
    // モーダル内クリックは閉じない
    modalContent.addEventListener('click', function (e) {
      e.stopPropagation();
    });
  }
}

function openHelp() {
  const modal = document.getElementById('modalHelp');
  if (modal) {
    modal.classList.add('show');
    currentSlide = 0;
    updateSlide();
  }
}

function closeHelp() {
  const modal = document.getElementById('modalHelp');
  if (modal) {
    modal.classList.remove('show');
  }
}

function adjustViewportHeight() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}

window.addEventListener('resize', adjustViewportHeight);
window.addEventListener('load', adjustViewportHeight);
