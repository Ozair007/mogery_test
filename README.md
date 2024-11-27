# Mongery Test

Mongery Test is a full-stack project consisting of a **backend** and **frontend**. This project is set up to run both parts concurrently using a single command.


## Features

- **Concurrent Development**: Runs both the backend and frontend concurrently using `concurrently` npm package.
- **Easy Setup**: Install both frontend and backend dependencies with a single command.
- **Frontend**: React-based UI for displaying data.
- **Backend**: Node.js server to manage API requests and data processing.

## Getting Started

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed on your machine.

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/mongery_test.git
    cd mongery_test
    ```

2. Install dependencies for all root and (frontend and backend) simultaneously:
    ```bash
    npm install
    npm run install
    ```

### Running the Project

To start both the backend and frontend in development mode concurrently:

```bash
npm run dev
```

To start backend only in development:

```bash
npm run dev:server
```

To start frontend only in development:

```bash
npm run dev:client
```

To install backend / frontend dependencies individually:

```bash
npm run install:backend / npm run install:frontend
```
