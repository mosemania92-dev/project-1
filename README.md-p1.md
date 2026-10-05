# QuickNotes

QuickNotes is a small note-taking web app built with plain HTML, CSS and JavaScript. You can write short notes, give each one a category, search through them and delete the ones you no longer need. Your notes are saved in the browser, so they are still there when you refresh the page.

## Features

- Add a note (up to 200 characters) with a category: personal, work or study
- Each note is shown as a card with its text, category label, date and a Delete button
- Validation with clear messages for empty notes and notes over 200 characters
- Delete any single note
- Live search that ignores upper and lower case, with a message when nothing matches
- A note counter that reads correctly for zero, one and many notes
- Notes saved with `localStorage`, so they survive a page refresh
- Responsive layout that adapts to small screens
- Bonus: a "Clear all" button that asks for confirmation first

## How to run locally

1. Download or clone the repository.
2. Open the folder in VS Code.
3. Right-click `index.html` and choose **Open with Live Server**
   (or simply double-click `index.html` to open it in your browser).

No installation or build step is needed.

## What I learned

- How to keep one source of truth (the `notes` array) and rebuild the page from it with a `render()` function.
- How to build page elements safely with `createElement` and `textContent`, so user text can never run as HTML.
- How to save and load data with `localStorage`, using `JSON.stringify` and `JSON.parse`.
- How to lay out a form with Flexbox and adapt a layout for small screens with a media query.
- How to make small, clear Git commits as a project grows.
