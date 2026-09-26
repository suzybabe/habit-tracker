const STORAGE_KEY = 'habits';

function loadHabits() {
  const savedText = localStorage.getItem(STORAGE_KEY);

  if (savedText === null) {
    return [];
  }

  // Corrupted data shouldn't crash the app, just start fresh
  try {
    const savedHabits = JSON.parse(savedText);
    if (Array.isArray(savedHabits)) {
      return savedHabits;
    }
    return [];
  } catch (error) {
    return [];
  }
}

function saveHabits(habits) {
  const text = JSON.stringify(habits);
  localStorage.setItem(STORAGE_KEY, text);
}
