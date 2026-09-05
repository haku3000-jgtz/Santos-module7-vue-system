# 📦 Inventory Management System

> **Software Engineering 1 — Module 9: Software Evolution** _(latest)_
> **Student Name:** Santos
> **Section:** IT3A

---

## 📋 System Description

This project is a **frontend prototype** of the Inventory Management System proposed in Module 6. It focuses on the **Products** entity and provides full CRUD (Create, Read, Update, Delete) functionality for managing product records.

The application is built with **Vue.js 3**, styled with **Tailwind CSS v4**, and uses **browser localStorage** for prototype data persistence.

---

## 🏗️ Module 6 Connection

| Module 6 Element            | Module 7 Implementation                     |
|-----------------------------|----------------------------------------------|
| Proposed complete system    | Basis and long-term blueprint                |
| Presentation layer          | Vue components + Tailwind CSS interface      |
| System module/entity        | **Products** — one functional prototype      |
| User interactions           | Forms, buttons, record list, and search      |
| Application logic           | JavaScript CRUD and validation functions     |
| Data layer                  | Simulated using browser `localStorage`       |
| Backend / API / Database    | Future implementation; not required now       |

---

## ✅ Implemented Features

- **Add Product** — Submit a validated form to create a new product record.
- **View Products** — Display all products in a responsive table (desktop) or card list (mobile).
- **Edit Product** — Load an existing record into the form, modify fields, and save changes.
- **Delete Product** — Remove a product after a confirmation prompt.
- **Search / Filter** — Filter products by name or category in real time.
- **Form Validation** — Prevents submission when any required field is empty or invalid.
- **Persistence** — All records survive page refresh via `localStorage`.
- **Status Badges** — Color-coded badges for In Stock, Low Stock, and Out of Stock.
- **Inventory Summary** — Live product count and total inventory value.
- **Responsive Design** — Fully usable on desktop, tablet, and mobile screen sizes.
- **Feedback Messages** — Success, warning, and error notifications after every action.

---

## 🛠️ Technologies Used

| Technology        | Purpose                                   |
|-------------------|--------------------------------------------|
| Vue.js 3 + Vite   | Frontend framework and build tooling       |
| Tailwind CSS v4    | Utility-first responsive styling           |
| JavaScript (ES6+) | Application logic and CRUD operations      |
| localStorage       | Browser-based prototype data persistence   |
| Git + GitHub       | Version control and repository hosting     |
| GitHub Actions     | Continuous integration build check         |

---

## 🚀 Installation and Run Instructions

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or later
- npm (included with Node.js)
- Git

### Steps

```bash
# 1. Clone the repository
git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
cd YOUR_REPO_NAME

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:5173/`) in your browser.

### Production Build

```bash
npm run build
npm run preview
```

---

## 💾 How localStorage Works

This prototype uses the browser's `localStorage` API to store product records as a JSON string under the key `module7-records`.

- **Saving:** Every time a record is added, edited, or deleted, the entire records array is serialized with `JSON.stringify()` and written to `localStorage`.
- **Loading:** When the app mounts, it reads the key from `localStorage`, parses it with `JSON.parse()`, and populates the reactive state.
- **Persistence:** Data remains available even after closing and reopening the browser tab.
- **Limitation:** Data is stored only in the current browser on the current device. Clearing browser data will erase all records.

You can inspect stored data in your browser's **DevTools → Application → Local Storage**.

---

## 📸 Application Screenshots

> _Add your screenshots here following the required filenames:_
>
> 1. `01-running-application.png`
> 2. `02-add-record.png`
> 3. `03-record-list.png`
> 4. `04-edit-record.png`
> 5. `05-delete-confirmation.png`
> 6. `06-search-function.png`
> 7. `07-localstorage.png`
> 8. `08-responsive-view.png`
> 9. `09-github-repository.png`
> 10. `10-commit-history.png`
> 11. `11-ci-success.png`

---

## ⚠️ Known Limitations

- Data is stored locally in the browser only; no cloud synchronization.
- No user authentication or role-based access control.
- Product ID is auto-generated using `Date.now()` and is not user-editable.
- No pagination — large datasets may affect scrolling performance.
- No data export/import functionality.

---

## 🔮 Proposed Future Improvements

- Implement a backend API with Node.js/Express and a database (MySQL or MongoDB).
- Add user authentication and authorization.
- Implement pagination, sorting, and advanced filtering.
- Add data export (CSV/PDF) and import features.
- Deploy to a cloud hosting platform.
- Add unit and integration tests.

---

## 📁 Project Structure

```
src/
├── components/
│   ├── AppHeader.vue      # Navigation bar with title and record count
│   ├── RecordForm.vue     # Product entry and edit form with validation
│   ├── RecordList.vue     # Searchable, filterable product table/card list
│   └── AppFooter.vue      # Footer with student info
├── App.vue                # Main application component with CRUD logic
├── main.js                # Vue app entry point
└── style.css              # Tailwind CSS import
```

---

## 🔄 Module 9 — Software Evolution

> **Change Request:** CR-M9-01 — Add stock status filter to the Product List
> **Maintenance Type:** Perfective — improves usability without changing existing behavior
> **Target Version:** `1.0.0` → `1.1.0`
> **Branch:** `module9/software-evolution`

### CR-M9-01 Summary

| Field | Detail |
|---|---|
| **Problem** | Users had no quick one-click way to narrow products by stock status; they had to scroll or type partial words in the search bar. |
| **Change** | Added four filter buttons — **All · In Stock · Low Stock · Out of Stock** — above the product table in `RecordList.vue`. |
| **Acceptance Criteria** | 1. Four filter buttons visible. 2. Each status button shows only matching records. 3. "All" restores full list. 4. Filter + text search work simultaneously (AND logic). 5. Empty-state message reflects active filter. 6. Old localStorage records remain compatible. |

### Impact Analysis

| Area | Impact |
|---|---|
| Architecture | Only `RecordList.vue` changed. `App.vue`, `RecordForm.vue`, `AppHeader.vue`, `AppFooter.vue` and `localStorage` boundary **unchanged**. |
| Design / UI | Filter button row added between search bar and product table. Empty-state message improved. |
| Implementation | Added `statusFilter` ref, `statusOptions` array, updated `filteredRecords` computed, added `activeFilterClass()` helper. |
| Data / localStorage | **No schema change.** `status` field already present on all records. Old records remain fully compatible. |
| Testing | Added `tests/unit/statusFilter.spec.js` (7 new tests). Updated 1 obsolete expectation in `searchValidation.spec.js`. All 13 Module 8 regression tests retained. |
| CI / Build | Added `npm run test:run` step to `build.yml`; CI now verifies tests AND build on every push. |

### Test Results — Version 1.1.0

| Metric | Result |
|---|---|
| Test files | 6 passed |
| Total tests | **20 passed (20)** |
| New tests added | 7 (`statusFilter.spec.js`) |
| Module 8 regression tests retained | 13 |
| `npm run build` | ✅ Built in ~2s |
| GitHub Actions CI | ✅ Passes (test + build steps) |

### Release Notes — v1.1.0

```
Version: 1.1.0
Type: Perfective Maintenance
CR: CR-M9-01 — Add stock status filter
Added: Status filter buttons (All / In Stock / Low Stock / Out of Stock) in RecordList
Preserved: CRUD, text search, form validation, delete confirmation, localStorage persistence
Tests: 20 Vitest unit tests passed (6 files); npm run build passed; GitHub Actions CI passed
Compatibility: All existing localStorage records remain valid (status field already present on all records)
Regression: All 13 Module 8 test cases retained and passing
```

### Commits on `module9/software-evolution`

1. `docs: add Module 9 change request and impact analysis`
2. `feat: add stock status filter to RecordList (CR-M9-01)`
3. `test: add statusFilter Vitest tests and update regression for CR-M9-01`
4. `docs: update README with Module 9 release notes and version 1.1.0`

---

