export const getDayKey = (currentUserId: string, weekDayISO: string) =>
  `${currentUserId}-${weekDayISO}`;
