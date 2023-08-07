function solution(today, terms, privacies) {
  const termsDict = terms.reduce((dict, term) => {
    const [idx, range] = term.split(" ");
    return {
      ...dict,
      [idx]: Number(range),
    };
  }, {});

  const expiredPrivacies = privacies.map((privacy) => {
    const [earn, termIdx] = privacy.split(" ");
    let [yy, mm, dd] = earn.split(".").map((unit) => Number(unit));
    dd -= 1;
    if (dd === 0) {
      dd = 28;
      mm -= 1;
    }
    mm += termsDict[termIdx];

    yy += Math.floor(mm / 12);
    mm = mm % 12;
    if (mm === 0) {
      mm = 12;
      yy -= 1;
    }
    return [yy, mm, dd];
  });

  const result = [];
  expiredPrivacies.forEach((privacy, idx) => {
    const [c_yy, c_mm, c_dd] = today.split(".").map((unit) => Number(unit));
    const [yy, mm, dd] = privacy;

    if (yy > c_yy) return;
    if (yy === c_yy && mm > c_mm) return;
    if (yy === c_yy && mm === c_mm && dd >= c_dd) return;
    result.push(idx + 1);
  });
  return result;
}
