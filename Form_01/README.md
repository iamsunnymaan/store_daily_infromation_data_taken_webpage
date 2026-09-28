# Store Visit Form

Full-stack Spring Boot application for daily store visit data collection, KPI calculation, root-cause analysis, and database persistence.

## Tech Stack

- Java 17
- Spring Boot
- Spring Web REST API
- Spring Data JPA / Hibernate
- Microsoft SQL Server JDBC driver
- HTML, CSS, JavaScript frontend served from Spring Boot

## Configuration

Database settings are in `src/main/resources/application.properties`.

Install Java 17 and Maven before running the project.

Set credentials through environment variables before running:

```powershell
$env:DB_USERNAME="sunny"
$env:DB_PASSWORD="your-password"
mvn spring-boot:run
```

The app defaults to:

```text
jdbc:sqlserver://192.168.0.146;databaseName=QuestRetail;encrypt=false;trustServerCertificate=true
```

If your database name is different:

```powershell
$env:DB_URL="jdbc:sqlserver://192.168.0.146;databaseName=YOUR_DB;encrypt=false;trustServerCertificate=true"
```

## Pages and APIs

- Web page: `http://localhost:8080/`
- Validate store access: `GET /api/stores/validate?site=...&accessCode=...`
- Submit visit: `POST /api/visits`

## Database Tables Used

Read-only lookup:

- `site_master`
- `target_table`

Written by the application:

- `transactional_table`
- `Root_Cause_table`
