## Welcome to the JobTrack backend documentation

This project is a scalable and structured API designed to support a job application tracking platform that helps users organize and manage their recruitment process efficiently.

Overview

JobTrack is a backend service built to provide a robust and scalable foundation for a modern job application tracking system.

It handles user authentication and management, processes job application data, and supports a Kanban-style workflow where users can organize their applications across different stages such as Wishlist, Applied, Interview, Offer, and Rejected.

The system ensures secure, efficient, and structured data management, allowing users to track their career opportunities in a centralized and intuitive way.

## Tech Stack & Technologies Used
- Node.js
- Express.js
- PostgreSQL
- Docker & Docker Compose

## Project Structure

 ```bash
📁 src/
  ┣ 📁 config/ → Application configuration (database, environment variables, logger)
  ┣ 📁 controllers/ → Handle HTTP requests and delegate to services
  ┣ 📁 dtos/ → Data Transfer Objects (optional but recommended)
  ┣ 📁 exceptions/ → Custom error classes and centralized error handling
  ┣ 📁 middlewares/ → Middleware functions (auth, validation, logging, etc.)
  ┣ 📁 models/ → Database models (Sequelize, Prisma, or Mongoose)
  ┣ 📁 repositories/ → Data access layer (ORM queries and database communication)
  ┣ 📁 seeds/ → Database seeding scripts
  ┣ 📁 routes/ → Application routes organized by modules
  ┣ 📁 services/ → Business logic and application rules
  ┣ 📁 tests/ → Automated tests organized by modules
  ┣ 📁 utils/ → Utility functions and helpers
  ┣ 📄 app.ts → Main app configuration (middlewares, routes)
  ┗ 📄 server.ts → Server bootstrap and initialization
```
## Getting Started

### 1. Clone the repository

  ```bash
git clone https://github.com/ryannardelli/job_track_back.git
   ```
---

### 2. Navigate to the project directory
  ```bash
cd job_track_back
   ```
---

### 3. Install dependencies
  ```bash
npm install
   ```
---

### 4. Create a .env file
  ```bash
    DB_USER=YOUR_DATABASE_USER
    DB_PASSWORD=YOUR_DATABASE_PASSWORD
    DB_NAME=YOUR_DATABASE_NAME
   ```
### 5. Start the Containers

```bash
docker compose up --build
```

### If everything is configured correctly, the following service will be available:

- API running at: `http://localhost:3000`

---
