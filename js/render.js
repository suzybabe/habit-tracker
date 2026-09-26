// The list is cleared and rebuilt from the habits array on every change.

function renderHabits(habits, emptyText) {
  const habitList = document.querySelector('#habit-list');
  const emptyMessage = document.querySelector('#empty-message');
  emptyMessage.textContent = emptyText;

  const todayKey = toDateKey(new Date());
  const heatmapDays = getHeatmapDays();

  habitList.innerHTML = '';

  for (const habit of habits) {
    const item = createHabitItem(habit, todayKey, heatmapDays);
    habitList.append(item);
  }

  if (habits.length === 0) {
    emptyMessage.hidden = false;
  } else {
    emptyMessage.hidden = true;
  }
}

function renderPagination(currentPage, totalPages) {
  document.querySelector('#pagination').hidden = totalPages <= 1;
  document.querySelector('#page-info').textContent = 'Page ' + currentPage + ' of ' + totalPages;
  document.querySelector('#prev-button').disabled = currentPage === 1;
  document.querySelector('#next-button').disabled = currentPage === totalPages;
}

function createHabitItem(habit, todayKey, heatmapDays) {
  const item = document.createElement('li');
  item.className = 'habit';
  item.dataset.id = habit.id; // main.js reads this to know which habit was clicked

  item.append(createHeader(habit, todayKey));
  item.append(createHeatmap(habit, heatmapDays));
  return item;
}

function createHeader(habit, todayKey) {
  const header = document.createElement('div');
  header.className = 'habit-header';

  const name = document.createElement('h2');
  name.className = 'habit-name';
  name.textContent = habit.name; // textContent so user-typed HTML isn't rendered

  const deleteButton = document.createElement('button');
  deleteButton.type = 'button';
  deleteButton.className = 'delete-button';
  deleteButton.textContent = 'Delete';
  deleteButton.setAttribute('aria-label', 'Delete ' + habit.name);

  // Name and streak share a box so the name gets the full width on narrow screens
  const info = document.createElement('div');
  info.className = 'habit-info';
  info.append(name);
  info.append(createStreak(habit));

  header.append(createCheckbox(habit, todayKey));
  header.append(info);
  header.append(deleteButton);
  return header;
}

function createCheckbox(habit, todayKey) {
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.className = 'done-checkbox';
  checkbox.checked = habit.completedDates.includes(todayKey);
  checkbox.setAttribute('aria-label', 'Done today: ' + habit.name);
  return checkbox;
}

function createStreak(habit) {
  const streak = getStreak(habit.completedDates);

  const badge = document.createElement('span');
  badge.className = 'streak';

  if (streak === 0) {
    badge.textContent = 'No streak';
  } else {
    badge.textContent = streak + '-day streak';
    badge.classList.add('active');
  }
  return badge;
}

function createHeatmap(habit, heatmapDays) {
  const area = document.createElement('div');
  area.className = 'heatmap-area';

  const title = document.createElement('p');
  title.className = 'heatmap-title';
  title.textContent = 'Last 12 weeks';

  const row = document.createElement('div');
  row.className = 'heatmap-row';
  row.append(createDayLabels());
  row.append(createHeatmapGrid(habit, heatmapDays));

  area.append(title);
  area.append(row);
  return area;
}

function createDayLabels() {
  const labels = document.createElement('div');
  labels.className = 'day-labels';
  // The grid already has an aria-label summary, so skip these
  labels.setAttribute('aria-hidden', 'true');

  for (const text of ['Mon', 'Wed', 'Fri']) {
    const label = document.createElement('span');
    label.textContent = text;
    labels.append(label);
  }
  return labels;
}

function createHeatmapGrid(habit, heatmapDays) {
  const heatmap = document.createElement('div');
  heatmap.className = 'heatmap';

  let doneCount = 0;

  for (const day of heatmapDays) {
    const isDone = habit.completedDates.includes(toDateKey(day));

    const cell = document.createElement('span');
    cell.className = 'heatmap-cell';
    if (isDone) {
      cell.classList.add('done');
      doneCount = doneCount + 1;
    }

    cell.title = day.toDateString();
    heatmap.append(cell);
  }

  // One summary sentence for screen readers instead of 80+ cells
  heatmap.setAttribute('role', 'img');
  heatmap.setAttribute('aria-label', 'Last 12 weeks: done on ' + doneCount + ' of ' + heatmapDays.length + ' days');
  return heatmap;
}
