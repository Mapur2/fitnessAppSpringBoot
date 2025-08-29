# FitLife - Fitness Application

Welcome to FitLife, a comprehensive fitness application designed to help you track your activities, get personalized recommendations, and achieve your fitness goals.

## Project Overview

FitLife is a full-stack fitness application with a microservices-based backend and a React-based frontend. It allows users to register, log in, track their fitness activities (like running, walking, cycling, etc.), and receive personalized recommendations powered by an AI service.

## Architecture

The application follows a microservices architecture, with several backend services working together to provide the application's functionality. The key components of the architecture are:

  * **API Gateway**: A single entry point for all client requests, routing them to the appropriate backend service.
  * **Service Registry**: A central server where all microservices register themselves, enabling dynamic service discovery.
  * **User Service**: Manages user authentication, registration, and user-related data.
  * **Activity Service**: Handles the tracking and management of fitness activities.
  * **AI Service**: Provides intelligent recommendations based on user activities.
  * **Frontend**: A React-based single-page application that provides the user interface for the application.

## Technologies Used

### Backend

  * **Spring Boot**: For creating standalone, production-grade Spring-based applications.
  * **Spring Cloud**: For building resilient and scalable microservices.
      * **Spring Cloud Gateway**: For the API Gateway.
      * **Spring Cloud Netflix Eureka**: For the Service Registry.
  * **Spring Data JPA**: For data persistence in the User Service.
  * **Spring Data MongoDB**: For data persistence in the Activity and AI Services.
  * **Spring Security**: For authentication and authorization.
  * **RabbitMQ**: For asynchronous communication between the Activity and AI Services.
  * **MySQL**: As the database for the User Service.
  * **MongoDB**: As the database for the Activity and AI Services.
  * **Maven**: For dependency management.
  * **Java 21**: The programming language used for the backend services.

### Frontend

  * **React**: A JavaScript library for building user interfaces.
  * **Vite**: A fast build tool for modern web development.
  * **React Router**: For declarative routing in the React application.
  * **Tailwind CSS**: A utility-first CSS framework for styling the application.

## Services Description

### API Gateway

The API Gateway is the single entry point for all incoming requests from the frontend. It is responsible for routing requests to the appropriate microservice, as well as handling cross-cutting concerns like security and CORS.

### Registry

The Registry Service uses Netflix Eureka to provide a service discovery mechanism for the microservices. Each microservice registers itself with the Eureka server, which allows other services to discover and communicate with it without hardcoding hostnames and ports.

### User Service

The User Service is responsible for managing all user-related operations, including:

  * User registration and login
  * User authentication and authorization using JWT
  * Managing user profiles

### Activity Service

The Activity Service is responsible for managing all fitness activity-related operations, including:

  * Tracking new fitness activities
  * Retrieving a user's activity history
  * Publishing activity data to RabbitMQ for processing by the AI Service

### AI Service

The AI Service provides intelligent recommendations to users based on their fitness activities. It listens for new activities from the Activity Service via RabbitMQ, processes the data using a generative AI model, and stores the recommendations in a MongoDB database.

## Getting Started

To get the application up and running, you will need to set up the backend microservices and the frontend application.

### Prerequisites

  * Java 21
  * Maven
  * Node.js and npm
  * MySQL
  * MongoDB
  * RabbitMQ

### Backend Setup

1.  Clone the repository:
    ```
    git clone https://github.com/mapur2/fitnessappspringboot.git
    ```
2.  Navigate to the `backend` directory.
3.  For each microservice (`registry`, `apigateway`, `userservice`, `activityservice`, `aiservice`):
      * Navigate to the service's directory (e.g., `cd registry`).
      * Build the service using Maven: `mvn clean install`.
      * Run the service: `mvn spring-boot:run`.
4.  Make sure to start the services in the following order:
    1.  `registry`
    2.  `apigateway`
    3.  `userservice`
    4.  `activityservice`
    5.  `aiservice`

### Frontend Setup

1.  Navigate to the `frontend` directory: `cd ../frontend`.
2.  Install the dependencies: `npm install`.
3.  Start the development server: `npm run dev`.
4.  The application will be available at `http://localhost:5173`.

## API Endpoints

### User Service

  * **POST** `/api/users/register`: Register a new user.
  * **POST** `/api/users/login`: Log in a user.
  * **GET** `/api/users/profile`: Get the profile of the currently logged-in user.

### Activity Service

  * **POST** `/api/activities`: Track a new activity.
  * **GET** `/api/activities/{id}`: Get an activity by its ID.
  * **GET** `/api/activities`: Get all activities for the current user.

### AI Service

  * **GET** `/api/recommendations/user/{userId}`: Get all recommendations for a user.
  * **GET** `/api/recommendations/activity/{activityId}`: Get the recommendation for a specific activity.
