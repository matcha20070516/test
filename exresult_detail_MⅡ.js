window.onload = () => {
  const answers = JSON.parse(localStorage.getItem("exAnswers") || "[]");
  const correctAnswers = [
    "ぐうたら", "ごうこく", "すうしき", "こうつうひ", "もんばん",
    "はかい", "めのう", "ふはつ", "こたつ", "ゴルフ",
    "エデン", "2", "4", "カウント", "めんどり",
    "うせつ", "ハウス", "かいひ", "まるた", "くせ"
  ];
  const pointsPerQuestion = [
    2, 3, 4, 5, 4,
    3, 3, 6, 4, 5,
    4, 4, 6, 4, 4,
    8, 7, 8, 6, 10
  ];
  const tbody = document.querySelector("#detail-table tbody");
  let totalScore = 0;
  let correctCount = 0;

  for (let i = 0; i < correctAnswers.length; i++) {
    const tr = document.createElement("tr");

    const userAns = answers[i] || "";
    const isCorrect = userAns === correctAnswers[i];

    if (isCorrect) {
      tr.classList.add("correct");
      totalScore += pointsPerQuestion[i];
      correctCount++;
    } else {
      tr.classList.add("incorrect");
    }

    tr.innerHTML = `
    <td>第${i + 1}問</td>
    <td>${userAns || "（無記入）"}</td>
    <td>${correctAnswers[i]}</td>
    <td>${pointsPerQuestion[i]}</td>
    `;
    tbody.appendChild(tr);
  }

  document.getElementById("result-summary").textContent = `正解数：${correctCount} / ${correctAnswers.length} 問, 合計得点：${totalScore} 点`;
};

// 級判定関数
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

const backBtn = document.getElementById("back-to-result");
if (backBtn) {
  backBtn.addEventListener("click", () => {
    // 得点から級を判定して級別ページに戻る
    const score = localStorage.getItem("exScore") || "0";
    const grade = getGrade(score);
    const setName = "謎検模試_MⅡ";
    const shareUrl = `https://matcha20070516.github.io/TExAM/share/grade-${grade.num}.html`;
    
    const params = new URLSearchParams({
      grade: grade.name,
      score: score,
      set: setName,
      shareUrl: shareUrl
    });
    
    window.location.href = `exresult_grade${grade.num}.html?${params.toString()}`;
  });
}
