const form = document.querySelector('#add-habit-form');
const nameInput = document.querySelector('#habit-name');
const habitList = document.querySelector('#habit-list');
const searchInput = document.querySelector('#search-input');
const prevButton = document.querySelector('#prev-button');
const nextButton = document.querySelector('#next-button');

const HABITS_PER_PAGE = 6;

// Shape: { id, name, completedDates: ['2026-09-25', ...] }
let habits = loadHabits();

let searchText = '';
let currentPage = 1;

function showHabits() {
  const matchingHabits = habits.filter((habit) =>
    habit.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const totalPages = Math.max(1, Math.ceil(matchingHabits.length / HABITS_PER_PAGE));

  // Deleting the last habit on the last page can leave us past the end
  if (currentPage > totalPages) {
    currentPage = totalPages;
  }

  const start = (currentPage - 1) * HABITS_PER_PAGE;
  const pageHabits = matchingHabits.slice(start, start + HABITS_PER_PAGE);

  let emptyText = 'No habits yet. Add one above.';
  if (habits.length > 0) {
    emptyText = 'No habits match "' + searchText + '".';
  }

  renderHabits(pageHabits, emptyText);
  renderPagination(currentPage, totalPages);
}

function saveAndRender() {
  saveHabits(habits);
  showHabits();
}

function findHabit(id) {
  return habits.find((habit) => habit.id === id);
}

function addHabit(name) {
  const newHabit = {
    id: crypto.randomUUID(),
    name: name,
    completedDates: [],
  };
  habits.push(newHabit);

  // Clear the search and jump to the last page so the new habit is visible
  searchText = '';
  searchInput.value = '';
  currentPage = Math.ceil(habits.length / HABITS_PER_PAGE);
  saveAndRender();
}

function deleteHabit(id) {
  const habit = findHabit(id);
  const confirmed = confirm('Delete "' + habit.name + '"? Its history will be lost.');
  if (!confirmed) {
    return;
  }

  habits = habits.filter((otherHabit) => otherHabit.id !== id);
  saveAndRender();
}

function toggleToday(id) {
  const habit = findHabit(id);
  const todayKey = toDateKey(new Date());

  if (habit.completedDates.includes(todayKey)) {
    habit.completedDates = habit.completedDates.filter((date) => date !== todayKey);
  } else {
    habit.completedDates.push(todayKey);
  }
  saveAndRender();
}

// --- Events ---

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const name = nameInput.value.trim();
  if (name === '') {
    return;
  }

  addHabit(name);
  nameInput.value = '';
  nameInput.focus();
});

// Delegated to the list because the buttons and checkboxes get rebuilt on every render
habitList.addEventListener('click', (event) => {
  const clickedElement = event.target;
  if (!clickedElement.classList.contains('delete-button')) {
    return;
  }

  const habitItem = clickedElement.closest('.habit');
  deleteHabit(habitItem.dataset.id);
});

habitList.addEventListener('change', (event) => {
  const changedElement = event.target;
  if (!changedElement.classList.contains('done-checkbox')) {
    return;
  }

  const habitItem = changedElement.closest('.habit');
  const id = habitItem.dataset.id;
  toggleToday(id);

  // The re-render replaced the checkbox, so restore focus for keyboard users
  const newCheckbox = habitList.querySelector('[data-id="' + id + '"] .done-checkbox');
  newCheckbox.focus();
});

searchInput.addEventListener('input', () => {
  searchText = searchInput.value.trim();
  currentPage = 1;
  showHabits();
});

prevButton.addEventListener('click', () => {
  currentPage = currentPage - 1;
  showHabits();
});

nextButton.addEventListener('click', () => {
  currentPage = currentPage + 1;
  showHabits();
});

showHabits();
