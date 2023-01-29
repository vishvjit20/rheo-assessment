export const convertNumberToExcelText = (n) => {
  let result = "";
  while (n > 0) {
    let char = String.fromCharCode(65 + ((n - 1) % 26));
    result = char + result;
    n = ~~((n - 1) / 26);
  }
  return result;
};
