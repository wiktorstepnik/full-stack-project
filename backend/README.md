# Users Repository API

A simple Python project demonstrating a users repository loaded from a JSON file and accessible via FastAPI. The repository provides methods to get all users or a single user by ID, modeled with Pydantic models.

---

## Features

- Load users data from a JSON file.
- Get a list of all users.
- Get a single user by unique ID.
- Proper HTTP error handling for missing or duplicated users.
- Uses Pydantic `User` model for data validation.

---

## Prerequisites
1. install uv

You can install the dependencies via:

```bash
uv sync
```

## Start API
```bash
uv run poe start
```