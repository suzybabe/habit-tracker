// Built by hand because toISOString() uses UTC, which gives tomorrow's
// date if you check a habit late in the evening.
function toDateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return year + '-' + month + '-' + day;
}

function getStreak(completedDates) {
  const day = new Date();

  // Count from yesterday if today isn't checked yet, so the streak
  // doesn't reset to 0 every morning.
  if (!completedDates.includes(toDateKey(day))) {
    day.setDate(day.getDate() - 1);
  }

  let streak = 0;

  while (completedDates.includes(toDateKey(day))) {
    streak = streak + 1;
    day.setDate(day.getDate() - 1);
  }
  return streak;
}

// 12 weeks ending today, starting on a Sunday so each grid column is one week.
function getHeatmapDays() {
  const today = new Date();
  const firstDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());

  // Back to this week's Sunday, then 11 more weeks.
  // setDate handles negative values by rolling into the previous month.
  firstDay.setDate(firstDay.getDate() - today.getDay());
  firstDay.setDate(firstDay.getDate() - 11 * 7);

  const days = [];
  const day = new Date(firstDay);
  while (day <= today) {
    days.push(new Date(day)); // copy, since we keep mutating day
    day.setDate(day.getDate() + 1);
  }
  return days;
}
