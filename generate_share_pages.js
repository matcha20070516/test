// 共有専用ページ生成スクリプト
const fs = require('fs');

const grades = [
  { num: 1, name: '1級', img: 'result1.PNG' },
  { num: 2, name: '準1級', img: 'result2.PNG' },
  { num: 3, name: '2級', img: 'result3.PNG' },
  { num: 4, name: '準2級', img: 'result4.PNG' },
  { num: 5, name: '3級', img: 'result5.PNG' },
  { num: 6, name: '4級', img: 'result6.PNG' },
  { num: 7, name: '5級', img: 'result7.PNG' },
  { num: 8, name: '6級', img: 'result8.PNG' },
  { num: 9, name: '7級', img: 'result9.PNG' },
  { num: 10, name: '8級', img: 'result10.PNG' }
];

const template = `<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>TExAM - {{GRADE_NAME}}合格</title>
  
  <!-- OGP設定 -->
  <meta property="og:title" content="謎検模試 - {{GRADE_NAME}}合格！" />
  <meta property="og:description" content="TExAMで{{GRADE_NAME}}に合格しました！あなたも挑戦してみませんか？" />
  <meta property="og:image" content="https://matcha20070516.github.io/TExAM/{{IMAGE}}" />
  <meta property="og:url" content="https://matcha20070516.github.io/TExAM/" />
  <meta property="og:type" content="website" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="謎検模試 - {{GRADE_NAME}}合格！" />
  <meta name="twitter:description" content="{{GRADE_NAME}}合格！" />
  <meta name="twitter:image" content="https://matcha20070516.github.io/TExAM/{{IMAGE}}" />
  
  <script>
    // 即座にindexにリダイレクト
    window.location.href = "/TExAM/index.html";
  </script>
</head>
<body>
  <p>リダイレクト中...</p>
</body>
</html>`;

// shareディレクトリを作成
if (!fs.existsSync('share')) {
  fs.mkdirSync('share');
}

// 10ファイル生成
grades.forEach(grade => {
  const html = template
    .replace(/{{GRADE_NAME}}/g, grade.name)
    .replace(/{{IMAGE}}/g, grade.img);
  
  const filename = `share/grade-${grade.num}.html`;
  fs.writeFileSync(filename, html);
  console.log(`✅ ${filename} を生成しました`);
});

console.log('\n🎉 共有用ページ10ファイルの生成が完了しました！');
