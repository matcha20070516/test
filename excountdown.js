const countdownEl = document.getElementById("countdown");
let count = 3;

const timer = setInterval(() => {
    count--;
    if (count > 0) {
        countdownEl.textContent = count;
        countdownEl.style.animation = "none";
        countdownEl.offsetHeight; // reflow
        countdownEl.style.animation = null;
    } else if (count === 0) {
        countdownEl.textContent = "開始！";
    } else {
        clearInterval(timer);

        // ✅ 正しいキーで取得
        const selectedSet = localStorage.getItem('currentExamSet');

        let targetPage = '';
        switch (selectedSet) {
            case '謎検模試_M':
                targetPage = 'exproblem_set1.html';
                break;
            case '謎検模試_MII':
                targetPage = 'exproblem_set2.html';
                break;
            case '謎検模試_set3':
                targetPage = 'exproblem_set3.html';
                break;
            default:
                targetPage = 'index.html'; // fallback
                break;
        }

        window.location.href = targetPage;
    }
}, 1000);
