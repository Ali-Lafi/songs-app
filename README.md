# Songs App

A full-stack learning project built to learn and practice the following technology stack:

* React
* TypeScript
* TanStack Query
* Tailwind CSS
* shadcn/ui
* NestJS
* CQRS
* PostgreSQL
* Drizzle ORM
* Zod
* Nx Monorepo
* Docker
* Docker Compose

The application itself is a simple songs management system that allows users to browse songs and authenticated users to create new songs. The primary purpose of the project is to gain practical experience with the technologies listed above and understand how they work together in a full-stack application.

## Technologies Learned

### Frontend

* React
* TypeScript
* React Router
* TanStack Query
* Tailwind CSS
* shadcn/ui

### Backend

* NestJS
* CQRS Pattern
* Dependency Injection
* JWT Authentication
* Zod Validation

### Database

* PostgreSQL
* Drizzle ORM

### Architecture

* Nx Monorepo
* Shared Contracts Package
* Contract-First API Design
* End-to-End Type Safety

### DevOps

* Docker
* Docker Compose
* Multi-Stage Docker Builds

## Features

* Browse songs with pagination and search
* JWT authentication
* Protected song creation
* Shared contracts between frontend and backend
* Dockerized setup

## Project Structure

```txt
songs-app/
├── api/          # NestJS backend
├── web/          # React frontend
├── contracts/    # Shared contracts, schemas and types
└── docker-compose.yml
```

## Running the Project

### Prerequisites

* Docker Desktop

### Start the Application

```bash
docker compose up --build
```

### Frontend

```txt
http://localhost:4200
```

### Backend

```txt
http://localhost:3000
```

### Database

```txt
Host: localhost
Port: 5432
Database: songs_db
```

## Demo Credentials

```txt
Email: alilafi@test.com
Password: ADMIN
```

## Learning Objectives

The goal of this project was to learn:

* Building user interfaces with React and TypeScript
* Managing server state with TanStack Query
* Building APIs with NestJS
* Applying the CQRS pattern
* Working with PostgreSQL and Drizzle ORM
* Sharing contracts and types between frontend and backend
* Organizing applications using an Nx monorepo
* Containerizing applications with Docker and Docker Compose
* Implementing authentication using JWT
