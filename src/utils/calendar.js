export default function (currentMonth, currentYear) {
  const calculateNumber = (incrementor, dayIndex, getWhat) => {
    const someday = new Date(currentYear, currentMonth + incrementor, dayIndex);
    return someday[getWhat]();
  }
  const firstDay = calculateNumber(0, 1, 'getDay');
  const lastDayOfPrevMonth = calculateNumber(0, 0, 'getDate');
  const lastDayOfThisMonth = calculateNumber(1, 0, 'getDate');
  const calendar = {
    prev: [],
    current: [],
    next: []
  };
  for (let i = 1; i <= 42; i++) {
    if (i <= firstDay) {
      calendar.prev.push(i + lastDayOfPrevMonth - firstDay);
    } else if (i > (lastDayOfThisMonth + firstDay)) {
      calendar.next.push(i - lastDayOfThisMonth - firstDay)
    } else {
      calendar.current.push(i - firstDay);
    }
  }
  return calendar;
};
