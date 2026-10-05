// ---------- Select elements ----------
const form = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const categorySelect = document.querySelector("#note-category");
const searchInput = document.querySelector("#search-input");
const notesList = document.querySelector("#notes-list");
const noteCount = document.querySelector("#note-count");
const errorMessage = document.querySelector("#error-message");
const clearAllBtn = document.querySelector("#clear-all");

// ---------- Data ----------
const STORAGE_KEY = "quicknotes-notes";
const MAX_LENGTH = 200;

// Each note: { id, text, category, createdAt }
let notes = loadNotes();

// ---------- Storage (Task 5) ----------
function saveNotes() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}

function loadNotes() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    const parsed = saved ? JSON.parse(saved) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    return [];
  }
}

// ---------- Helpers ----------
function getNextId() {
  if (notes.length === 0) {
    return 1;
  }
  return Math.max(...notes.map((note) => note.id)) + 1;
}

function formatDate(isoString) {
  return new Date(isoString).toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function capitalise(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

function getCountMessage() {
  if (notes.length === 0) {
    return "You have no notes yet.";
  }
  if (notes.length === 1) {
    return "You have 1 note.";
  }
  return `You have ${notes.length} notes.`;
}

// Notes whose text contains every search word (not case-sensitive)
function getVisibleNotes() {
  const words = searchInput.value.toLowerCase().split(/\s+/).filter(Boolean);
  if (words.length === 0) {
    return notes;
  }
  return notes.filter((note) => {
    const text = note.text.toLowerCase();
    return words.every((word) => text.includes(word));
  });
}

// ---------- Render (Task 3) ----------
function render() {
  notesList.replaceChildren();

  const visibleNotes = getVisibleNotes();

  if (notes.length > 0 && visibleNotes.length === 0) {
    const message = document.createElement("li");
    message.className = "empty-message";
    message.textContent = "No notes match your search.";
    notesList.append(message);
  }

  for (const note of visibleNotes) {
    const card = document.createElement("li");
    card.className = `note-card category-${note.category}`;

    const text = document.createElement("p");
    text.className = "note-text";
    text.textContent = note.text;

    const meta = document.createElement("div");
    meta.className = "note-meta";

    const category = document.createElement("span");
    category.className = "note-category";
    category.textContent = capitalise(note.category);

    const date = document.createElement("span");
    date.className = "note-date";
    date.textContent = formatDate(note.createdAt);

    const deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.className = "delete-btn";
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => deleteNote(note.id));

    meta.append(category, date, deleteBtn);
    card.append(text, meta);
    notesList.append(card);
  }

  noteCount.textContent = getCountMessage();
  clearAllBtn.hidden = notes.length === 0;
}

// ---------- Add note (Task 3 and 4) ----------
function addNote(event) {
  event.preventDefault();

  const text = noteInput.value.trim();

  if (text === "") {
    errorMessage.textContent = "Please type a note first.";
    return;
  }
  if (text.length > MAX_LENGTH) {
    errorMessage.textContent = "Notes must be 200 characters or fewer.";
    return;
  }

  notes.unshift({
    id: getNextId(),
    text: text,
    category: categorySelect.value,
    createdAt: new Date().toISOString(),
  });

  errorMessage.textContent = "";
  noteInput.value = "";
  saveNotes();
  render();
  noteInput.focus();
}

// ---------- Delete (Task 4) ----------
function deleteNote(id) {
  notes = notes.filter((note) => note.id !== id);
  saveNotes();
  render();
}

// ---------- Clear all (bonus) ----------
function clearAll() {
  if (confirm("Delete all notes?")) {
    notes = [];
    saveNotes();
    render();
  }
}

// ---------- Events ----------
form.addEventListener("submit", addNote);
searchInput.addEventListener("input", render);
clearAllBtn.addEventListener("click", clearAll);

// ---------- Start ----------
render();
