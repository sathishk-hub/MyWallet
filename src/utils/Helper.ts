function getMonths(): Array<string> {
  return [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
}

function getCurrentMonthIndex(): number {
  return getMonths().indexOf(
    new Date(Date.now()).toLocaleString('en-US', {
      month: 'long',
    }),
  );
}

export default {getMonths, getCurrentMonthIndex};
