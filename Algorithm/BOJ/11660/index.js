const fs = require("fs");

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");
const [n, m] = input[0].split(" ").map((str) => Number(str));

const mat = input
  .filter((_, rowNum) => 1 <= rowNum && rowNum <= n)
  .map((row) => row.split(" ").map((col) => Number(col)));

const accMat = Array.from({ length: n }, () =>
  Array.from({ length: n }, () => 0)
);

for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    accMat[i][j] =
      mat[i][j] +
      (accMat[i]?.[j - 1] ?? 0) +
      (accMat[i - 1]?.[j] ?? 0) -
      (accMat[i - 1]?.[j - 1] ?? 0);
  }
}

let result = [];

for (let i = 1; i <= m; i++) {
  const [x1, y1, x2, y2] = input[n + i].split(" ").map((pos) => pos - 1);
  result.push(
    accMat[x2][y2] -
      (accMat[x1 - 1]?.[y2] ?? 0) -
      (accMat[x2][y1 - 1] ?? 0) +
      (accMat[x1 - 1]?.[y1 - 1] ?? 0)
  );
}

console.log(result.join("\n"));
