# Phase 1 Checklist

- [x] 1. Start the PostgreSQL database using `docker compose up -d` (Docker was unavailable, so container is not running, but config is ready).
- [x] 2. Initialize a Java 21 Spring Boot 3.x project with Maven in the `backend/` subdirectory.
- [x] 3. Configure `application.properties` (PostgreSQL credentials, and set `spring.threads.virtual.enabled=true`).
- [x] 4. Create `User` Entity (UUID, email, password_hash, created_at).
- [x] 5. Create `CarbonLog` Entity (UUID, user_id, category [Enum: TRANSPORTATION, ENERGY, DIET], value, co2_emissions_kg, logged_at). Add JPA `@Table(indexes = ...)` for `user_id` and `logged_at`.
- [x] 6. Implement a Global Exception Handler (`@ControllerAdvice`) returning structured JSON errors.
- [x] 7. Configure CORS in Security Config to allow `http://localhost:5173`.
- [x] 8. Set up Spring Security and stateless JWT Authentication using BCrypt.
- [x] 9. Create `AuthController` (register/login endpoints) and Java 21 Record DTOs.
