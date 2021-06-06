export const getMinutesFromEventStartTime = (t: string) => {
  const [h, m] = t.split(':');
  return Number.parseFloat(h) * 60 + Number.parseFloat(m);
};
