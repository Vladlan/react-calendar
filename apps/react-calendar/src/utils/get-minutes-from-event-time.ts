export const getMinutesFromEventTime = (t: string) => {
  const [h, m] = t.split(':');
  if (!h || !m) throw new Error('Wrong event time format');
  return Number.parseFloat(h) * 60 + Number.parseFloat(m);
};
