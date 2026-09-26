# Habit Tracker

A simple habit tracker made with HTML, CSS and JavaScript.

You add habits you want to do every day, like "Read 20 mins" or "Drink water". Each day you tick them off. The app shows your streak (how many days in a row) and a grid of the last 12 weeks, like the green squares on a GitHub profile.

Your habits are saved in your browser, so they're still there when you come back.

![Screenshot of the habit tracker](screenshot.png)
<!-- TODO: add a screenshot -->

## Features
- Add a habit
- Delete a habit (it asks "are you sure?" first)
- Tick a habit as done for today, or untick it
- See your current streak for each habit
- See the last 12 weeks for each habit as a grid of squares
- Search habits by name
- Pages of 6 habits, with Previous and Next buttons
- 3 columns on desktop, 1 column on phones
- Your habits are still there after you refresh the page

## How to run it
1. Download or clone this project.
2. Double-click `index.html` to open it in your browser.

That's it. Nothing to install.

## Built with
- HTML
- CSS
- JavaScript (no frameworks or libraries)
- `localStorage` to save data in the browser

## Files
| File | What it does |
| --- | --- |
| `index.html` | The page: the form to add a habit and the empty list |
| `style.css` | How everything looks |
| `js/storage.js` | Saves and loads habits in `localStorage` |
| `js/dates.js` | Date helpers: today's date, streaks, and the days for the grid |
| `js/render.js` | Draws the habit list on the page |
| `js/main.js` | Holds the habits and handles clicks (add, delete, tick) |

## How the data is saved
All habits are kept in one array and saved to `localStorage` as JSON:

```json
[
  {
    "id": "a1b2c3",
    "name": "Read 20 mins",
    "completedDates": ["2026-09-23", "2026-09-24", "2026-09-25"]
  }
]
```

`completedDates` is the list of days the habit was done. Ticking today adds today's date and unticking removes it. The streak and the grid are both worked out from this list.

## What I learned
- **Saving data in the browser:** `localStorage` only stores text, so I use `JSON.stringify` to save the array and `JSON.parse` to load it back. If the saved text is broken, the app starts with an empty list instead of crashing.
- **Dates are tricky:** `toISOString()` gives the date in UTC time, which can be tomorrow's date if it's late in the evening. I build the date text myself from the local date instead.
- **Redraw after every change:** when something changes, I update the array, save it, and redraw the whole list. This keeps the page and the saved data the same.
- **Event delegation:** the delete buttons and checkboxes are created after the page loads, so I put one click listener on the whole list and check which element was clicked.
- **Safe text:** I use `textContent` instead of `innerHTML` to show habit names, so if someone types HTML it shows as text and doesn't run.
- **Script tags vs modules:** I first used JavaScript modules (`import`/`export`), but browsers block them when you open a file by double-clicking it. I switched to normal `<script>` tags so the app works without a server.
- **CSS Grid:** the 12-week grid has 7 rows (one per day of the week) and fills the squares down each column, so every column is one week.
- **Flexbox for rows:** each habit's top row is a flex row. Giving the name `flex: 1` makes it take the free space, which pushes the streak badge and Delete button to the right.
- **Custom checkbox:** `appearance: none` removes the browser's default checkbox so I can draw my own circle with a tick made from a rotated border. It's still a real `<input>`, so the keyboard and screen readers work as normal.
- **Interaction states:** `:hover` for the mouse, `:active` while pressing, and `:focus-visible` for keyboard focus. Unlike `:focus`, `:focus-visible` doesn't show an outline after a mouse click.
- **Search and pages:** I never change the saved array to search or page. I `filter()` it by the search text, then `slice()` out the 6 habits for the current page. If deleting a habit leaves the current page empty, the app goes back a page.
- **Wrapping columns:** on desktop the list is a flex row with `flex-wrap: wrap` and each card is `32%` wide, so 3 fit per row and the rest wrap underneath. On phones it's a normal list.
- **Accessibility:** every input has a label, focused elements get a blue outline, and screen readers hear one summary sentence for the grid instead of every square.
