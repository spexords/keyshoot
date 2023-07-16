# Keyshoot

Keyshoot is an application that measures your typing speed and accuracy on the keyboard. It calculates words per minute (WPM) and accuracy metrics to help you improve your typing skills. This README provides information on how to set up and run the Keyshoot application locally using Docker.

## Technologies Used

- .NET 6
- Duende IdentityServer
- SignalR
- Redis
- MediatR
- Angular 16

## Prerequisites

To run Keyshoot locally, you need to have the following installed:

- Docker
- Docker Compose

## Getting Started

Follow the steps below to set up and run Keyshoot on your local machine:

### 1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/keyshoot.git
   ```

### 2. Build and run the Docker containers:

   ```bash
   cd keyshoot
   docker-compose up --build -d
   ```

### 3. Access Keyshoot in your web browser:

  Open your web browser and navigate to http://localhost:4200 to access the Keyshoot application.

## Usage

  1. Open the application in your web browser at http://localhost:4200.
  2. Create account on Sign Up section.
  3. Go to Measure, follow the instructions on the screen to start a typing test.
  4. The application will calculate your words per minute (WPM) and accuracy metrics and display them upon completing the test.
  5. You can find your scores on the Leaderboard page.
