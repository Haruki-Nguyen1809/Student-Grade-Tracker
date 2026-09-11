# Student Grade Tracker

A browser-based student roster and grade tracker built with vanilla HTML, CSS, and JavaScript — the final project in a series aimed at practicing modern (ES6+) array methods and arrow functions as preparation for React.

## How to Use

1. Fill in the four fields (Student ID, Name, Class, Grade) and click **Add**.
2. Type into the search box to filter the table by name in real time; clear it to see the full list again.
3. The average grade above the table updates automatically whenever a student is added.
4. Click **Sort by grade** to reorder the table by ascending grade.
5. Data persists across page reloads via `localStorage`.

## Features

- Dynamically builds table rows (`<tr>` with four `<td>` cells) entirely in JavaScript, appended to an empty `<tbody>`
- Maintains a `students` array of `{ id, name, class, grade }` objects as the source of truth, synced to `localStorage` after every add
- Live search filtering by name (case-insensitive, partial match) using `Array.prototype.filter` and `String.prototype.includes`
- Automatically recalculated average grade using `Array.prototype.reduce`, with a guard against dividing by zero when the roster is empty
- In-place sorting by grade using `Array.prototype.sort` with a comparator function
- Input validation for all four fields, including numeric and non-negative checks on the grade

## Project Structure

```
├── index.html      # Page structure: input fields, Add button, search box, average display, sort button, table
├── index.js        # Data management, dynamic table rendering, search, average calculation, sorting
└── style.css       # Styling
```

## Core Logic Overview

- **`students`** — an array of student objects, restored on load via `JSON.parse(localStorage.getItem('students')) || []`.
- **`renderStudentList(studentObject)`** — builds one table row: creates a `<tr>`, creates four separate `<td>` elements (one per field, since a single `<td>` can't hold four values), sets each `<td>`'s `textContent`, appends each `<td>` to the `<tr>`, then appends the completed `<tr>` to the table body. Used both on page load (via `forEach`) and after adding a new student.
- **Adding a student** — validates all four inputs (non-empty, and the grade must be a valid non-negative number), builds a `{ id, name, class, grade }` object (grade converted to a `Number`), pushes it into `students`, saves to `localStorage`, recalculates the average, and renders the new row.
- **Search** — on every `input` event, decides what to render: the full `students` array if the search box is empty, or `students.filter(...)` otherwise (comparing lowercased strings for a case-insensitive partial match). Either way, the table is cleared (`innerHTML = ""`) and re-rendered via `forEach` — avoiding duplicated logic by computing "what to render" first and rendering it in one place afterward.
- **`averageGrade()`** — returns `0` immediately if there are no students (avoiding a division-by-zero `NaN`/`Infinity`), otherwise sums all grades with `reduce` (starting accumulator at `0`) and divides by `students.length`. Called both on page load and after every successful add, with its return value assigned to a variable and then pushed into the DOM via `textContent`.
- **Sorting** — `students.sort((a, b) => a.grade - b.grade)` mutates the array in place (unlike `filter`, which returns a new array), then the table is cleared and re-rendered from the now-sorted `students`.

## What This Project Practices

- Arrow functions used consistently across callbacks, as a step away from `function() {}` syntax
- `Array.prototype.reduce` — accumulating a single result across a list, including why the initial value matters and why a `return` is required inside the callback
- `Array.prototype.sort` — the two-argument (`a`, `b`) comparator pattern, distinct from single-item callbacks like `forEach`/`filter`/`map`
- The repeated "clear the DOM, then re-render from current data" pattern, used identically for search results and sort results — the same data-driven rendering mental model that frameworks like React automate
- Building multi-level nested DOM structure (`tbody` → `tr` → multiple `td`s) with `createElement`/`appendChild`
- Recognizing duplicated logic (the same clear+render steps appearing in two places) as a signal to extract a shared function

## Possible Improvements

- Extract the repeated "clear + re-render" logic into a single `renderList(list)` helper function
- Add a delete button per row (following the same pattern as the To-Do List project)
- Add sort direction toggling (ascending/descending) and sorting by other columns
- Add class-based filtering alongside name search
