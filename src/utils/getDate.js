export const getDate = (line) => {
  const monthNames = ['jan', 'feb', 'mar', 'apr', 'may', 'jun',
    'jul', 'aug', 'sep', 'oct', 'nov', 'dec',
  ];
  return `${line.slice(8, 10)} ${monthNames[line.slice(5, 7) - 1]}. ${line.slice(0, 4)}`;
};
