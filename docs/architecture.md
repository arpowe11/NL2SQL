# NL2SQL – System Architecture

## Overview
NL2SQL is a three-tier, microservice-style application.  
The system converts a user’s natural language question into a valid SQL query and executes it securely.

---

## High-Level Diagram

```
┌─────────────┐        HTTPS         ┌──────────────────┐       HTTP        ┌─────────────────────┐
│ React Front │ <------------------> │ ASP.NET Backend  │ <---------------> │ Python AI Service   │
│   (Client)  │                      │  (Web API)       │                   │  (FastAPI/Flask)    │
└─────────────┘                      └──────────────────┘                   └─────────────────────┘
       |                                        |
       |              SQL Queries               |
       └--------------------------------------> │
                                                ▼
                                      ┌───────────────────┐
                                      │   SQL Database    │
                                      │ (e.g., MSSQL/PG)  │
                                      └───────────────────┘
```

---

## Components

### 1️⃣ Frontend (React)
- Provides a clean UI for entering natural language questions.
- Sends API requests to the ASP.NET backend.
- Displays generated SQL and query results.

### 2️⃣ Backend (ASP.NET Web API)
- Acts as the central orchestrator.
- Validates user input and handles authentication (if enabled).
- Sends the natural language query to the Python AI service.
- Receives the SQL statement, sanitizes it, and executes it against the database.
- Returns query results to the React frontend.

### 3️⃣ AI Service (Python)
- Exposes a REST API endpoint (FastAPI/Flask).
- Uses an NLP model (e.g., HuggingFace transformer) to translate natural language into SQL.
- Returns generated SQL to the ASP.NET backend.

### 4️⃣ Database
- Stores the sample or production data.
- Executed queries are parameterized to prevent SQL injection.

---

## Data Flow

1. **User Input** → User enters a question on the React interface.
2. **API Request** → Frontend sends the text to the ASP.NET backend (`/api/query`).
3. **AI Processing** → Backend forwards the question to the Python AI microservice.
4. **SQL Generation** → AI service returns a SQL statement.
5. **Execution & Results** → Backend validates and runs the SQL query, then returns the results to the frontend.

---

## Deployment

- **Docker Compose** manages multi-container deployment for a micro-service delpoyment architecture:
  - `frontend` → React app served via Nginx or Vite dev server.
  - `backend` → ASP.NET API container.
  - `ai-service` → Python service container.
  - `database` → SQL Server/PostgreSQL container.

- Services communicate internally through a private Docker network.

---

## Security Considerations
- Parameterized queries to prevent SQL injection.
- HTTPS enforced for client ↔ backend communication.
- Separate network for AI service to limit external exposure.
