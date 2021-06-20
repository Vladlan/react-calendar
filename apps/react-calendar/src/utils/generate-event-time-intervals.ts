const generateEventTimeIntervals = () => {
  const mins = ['00', '15', '30', '45'];
  const timeGaps = [];
  for (let i = 0; i <= 24; i++) {
    const hours = `${i < 10 ? 0 : ''}${i}`;
    if (i === 24) {
      timeGaps.push(`${hours}:${mins[0]}`);
      break;
    }
    mins.forEach((el) => {
      timeGaps.push(`${hours}:${el}`);
    });
  }
  return timeGaps;
};

export const EVENT_INTERVALS = generateEventTimeIntervals();
