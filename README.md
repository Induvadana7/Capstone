# Investment Banking Deal Pipeline Management Portal

A full-stack application for managing investment banking deal pipelines with secure authentication, role-based access control, and real-time event tracking using Kafka.





## Tech Stack

### Backend

- Spring Boot 3.x

- Java 17

- MongoDB

- Spring Security

- JWT Authentication

- Apache Kafka

### Frontend

- Angular 18

- Angular Material

### DevOps

- Docker

- Docker Compose





## Architecture

### Clean layered architecture:

src/main/java/com/bank/pipeline/

    ├── auth/           - Authentication & JWT security
    ├── deal/           - Deal management module
    │   ├── controller/ - REST APIs
    │   ├── service/    - Business logic
    │   ├── repository/ - MongoDB repositories
    │   └── model/      - Deal entities
    ├── kafka/          - Kafka producers, consumers, topics
    ├── config/         - Application configuration
    └── exception/      - Global exception handling





## Features

Authentication & Authorization

JWT login system

BCrypt password encryption

### Roles:

### User
- Create deals  
- Edit deal details  
- Add notes  
- Update deal stage  
- Cannot view or edit deal value  

### Admin
- All USER permissions  
- View & edit deal value  
- Delete deals  
- Manage users  


Route protection using Spring Security


  


## Deal Pipeline Management

Create, view, update deals

- ### Deal stages:

    - Prospect

    - UnderEvaluation

    - TermSheetSubmitted

    - Closed

    - Lost

Add notes to deals

Role-based data restriction (deal value visible to ADMIN only)


 


## Kafka Event Streaming

Every deal action generates an event:

- Deal Created

- Stage Updated

- Note Added

- Deal Value Updated

- Deal Deleted

Consumer logs events in backend.


 


## API Endpoints

### Authentication

- POST /api/auth/login
- GET  /api/users/me

### Deals

- POST   /api/deals                → Create deal
- GET    /api/deals                → List deals
- GET    /api/deals/{id}           → Deal details
- PUT    /api/deals/{id}/stage     → Update stage
- POST   /api/deals/{id}/notes     → Add note
- PUT    /api/deals/{id}/value     → Update deal value (ADMIN)
- DELETE /api/deals/{id}           → Delete deal (ADMIN)


 


## Setup Instructions

### Prerequisites

Docker Desktop installed

- Run Full System :

    docker compose up -d --build


  


## Services:

- Frontend → http://localhost:4200

- Backend → http://localhost:8080





## MongoDB

- Kafka + Zookeeper


  


## Security

- JWT token authentication

- Role-based authorization

- Password hashing with BCrypt

- CORS enabled


 


## Database Collections

### users
- username, email, password, role, active

### deals
- clientName, dealType, sector, dealValue, currentStage, notes, createdBy


 


## Kafka Verification

Run:

docker logs -f deal_backend

Perform deal actions → you will see:

📩 Kafka Event Received: {...}


  


## Project Highlights

- Full JWT security

- Role-based data masking

- MongoDB integration

- Kafka event-driven architecture

- Dockerized environment

- Angular SPA frontend


  


## Author

Induvadana Chinthaginjala 

Project: Investment Banking Deal Pipeline Management Portal