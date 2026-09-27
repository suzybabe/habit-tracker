# Habit Tracker

A simple habit tracker made with HTML, CSS and JavaScript.

You add habits you want to do every day, like "Read 20 mins" or "Drink water". Each day you tick them off. The app shows your streak (how many days in a row) and a grid of the last 12 weeks, like the green squares on a GitHub profile.

Your habits are saved in your browser, so they're still there when you come back.


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
