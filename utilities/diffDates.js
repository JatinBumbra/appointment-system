module.exports = (start, end) => {
  const diff = parseInt(end.slice(-2)) - parseInt(start.slice(-2));

  let dates = [];
  let i = 0;
  while (i <= diff) {
    dates.push(`${start.slice(0, 8)}${parseInt(start.slice(-2)) + i}`);
    i++;
  }
  return dates;
};
