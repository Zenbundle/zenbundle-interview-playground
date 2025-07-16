# Zenbundle Interview Playground

## Overview

This project contains:
- **Backend:** FastAPI app (in `webapp/`)
- **Frontend:** React app (in `webapp-ui/`)

---

## Prerequisites

- **Python 3.11+** (recommended) with [Poetry](https://python-poetry.org/)
- **Node.js 20.13+** and **npm** (for the React front-end)

---

## Backend: FastAPI

### 1. Create and activate a virtual environment (Python 3.11)

From the **project root**:

```
virtualenv venv -p python3.11
source venv/bin/activate   # On Windows: venv\\Scripts\\activate
```

### 2. Install Python dependencies with Poetry

```
poetry install
```

### 3. Start the FastAPI app in development mode

```
poetry run fastapi run app.py --reload
```

- The API will be available at [http://localhost:8000](http://localhost:8000)
- Interactive API docs: [http://localhost:8000/docs](http://localhost:8000/docs)

---

## Front-end: React

### 1. Install dependencies

From the **project root**:

```
cd webapp-ui
npm install
```

### 2. Start the React development server

```
npm start
```

- The app will run at [http://localhost:3000](http://localhost:3000)

---

## Running Both Apps Together

- **Start the backend** (`fastapi run app.py --reload`)
- **Start the frontend** (`npm start`)
- The frontend will make API requests to your backend at `localhost:8000` (configure the API URL as needed in your front-end code or via environment variables).

---

## Useful Commands

**Frontend:**
- Lint: `npm run lint`
- Format: `npm run prettify`
