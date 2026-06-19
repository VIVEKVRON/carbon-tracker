# 🍃 CarbonTrack: Intelligent & Gamified Emissions Ledger

[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.x-brightgreen.svg?logo=springboot)](https://spring.io/projects/spring-boot)
[![Java](https://img.shields.io/badge/Java-21-blue.svg?logo=java)](https://www.oracle.com/java/)
[![React](https://img.shields.io/badge/React-18-61DAFB.svg?logo=react)](https://reactjs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-336791.svg?logo=postgresql)](https://www.postgresql.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

CarbonTrack is a full-stack, highly concurrent application designed to transform abstract carbon footprint tracking into an engaging, actionable daily habit. Built for scale and speed, it combines precise mathematical emissions modeling with a gamified user experience and AI-driven behavioral insights.

## ✨ Key Features

* **⚡ Sub-100ms UI Performance:** A dynamic React-Router SPA utilizing optimistic UI updates for instantaneous data mutation and seamless page transitions.
* **🧠 Smart Insights Engine:** A backend algorithmic service that analyzes trailing 7-day carbon footprints to generate customized, dynamic reduction recommendations.
* **🏆 Gamification Hub (Eco-Challenges):** Users can browse seeded sustainable challenges (e.g., '7 Days Plant-Based') and track active daily streaks.
* **📊 Enterprise Data Export:** Implemented native Spring `@Cacheable` contexts for lightning-fast reads, paired with a dedicated micro-service for generating and downloading CSV compliance reports.
* **🔒 Secure & Scalable Architecture:** Stateless JWT authentication (BCrypt) safeguarding a PostgreSQL database indexed with UUIDs, powered by Java 21 Virtual Threads for high-throughput concurrency.

## 🛠️ Tech Stack

**Frontend Interface**
* React 18 + TypeScript (Vite tooling)
* React Router DOM (Multi-page routing)
* Tailwind CSS (Monochromatic design system with Emerald accents)
* Recharts (Dynamic emission trending)

**Backend Core**
* Java 21 (Virtual Threads Enabled)
* Spring Boot 3.x (Web, Data JPA, Security)
* Spring Cache (ConcurrentMapCacheManager)
* PostgreSQL (Containerized via Docker)

## 🚀 Getting Started

### Prerequisites
* [Java 21](https://jdk.java.net/21/)
* [Node.js](https://nodejs.org/) (v18+)
* [Docker Desktop](https://www.docker.com/products/docker-desktop/)

### Installation & Setup

**1. Clone the repository**
```bash
git clone https://github.com/VIVEKVRON/carbon-tracker.git
cd carbon-tracker
```

**2. Launch the Database**
Ensure Docker is running, then spin up the PostgreSQL container:

```bash
docker compose up -d
```

*Note: Hibernate is configured to automatically generate the required schema, tables, and seed the default Eco-Challenges upon application startup.*

**3. Start the Backend Server**
Navigate to the backend directory and run the Spring Boot wrapper:

```bash
cd backend
./mvnw spring-boot:run
```

*The backend will initialize on `http://localhost:8080`.*

**4. Start the Frontend Client**
Open a new terminal, navigate to the frontend directory, install dependencies, and start Vite:

```bash
cd frontend
npm install
npm run dev
```

*The frontend will be available at `http://localhost:5173`.*

## 🛣️ Core API Endpoints

| Method | Endpoint | Description | Auth Required |
| --- | --- | --- | --- |
| `POST` | `/api/v1/auth/register` | Register a new user | No |
| `POST` | `/api/v1/auth/login` | Authenticate and return JWT | No |
| `GET` | `/api/v1/tracker` | Fetch all user carbon logs | Yes |
| `POST` | `/api/v1/tracker` | Create a new carbon log entry | Yes |
| `GET` | `/api/v1/tracker/analytics` | Fetch aggregated dashboard metrics | Yes |
| `GET` | `/api/v1/tracker/insights` | Fetch personalized AI recommendations | Yes |
| `GET` | `/api/v1/challenges` | Fetch all available Eco-Challenges | Yes |
| `GET` | `/api/v1/tracker/export` | Download user data as CSV | Yes |

## 🎥 Demonstration

*[https://youtu.be/YHTGDD_FMnE]*

## Deployment

*[https://carbon-tracker-sandy.vercel.app/]*
