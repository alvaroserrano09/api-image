# api-image

## ✨ Image Processing

**api-image** is a system for processing images and querying processing tasks, including states and associated prices.

---

### ✨ Prerequisites

Make sure you have the following programs installed on your system:

- [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/) (Mandatory for infrastructure setup)
- [Node.js](https://nodejs.org/) (Only required for running outside the development container)
- [npm](https://www.npmjs.com/)

---

# 🚀 Getting Started

## **Run Application**

### Inside Dev Container

1. Run the following command to start the development containers:

   ```bash
   docker compose --profile=dev up -d --build
   ```
    All commands should be executed **inside the container**.

2. To enter the development container and run commands:

   ```bash
   docker compose exec api-image bash
   ```

3. Once inside, you can start the application with:

   ```bash
   npm run dev
   ```

The application will be running on **Port: 3001**.

### Outside Dev Container

If you prefer to run the application locally , follow these steps:

1. Ensure you have **Node.js** installed.
2. Configure the environment variables:

   ```bash
   source env.sh
   ```

3. Start the infrastructure without the `dev` profile:

   ```bash
   docker compose up -d --build
   ```

4. Install dependencies:

   ```bash
   npm install
   ```

5. Run the application:

   ```bash
   npm run dev
   ```


## **Run Tests**
The following test commands can be executed both inside and outside the development container.
### Unit Tests

```bash
npm run test
```

### Integration Tests

To run integration tests, ensure the application and database are running, then execute:

```bash
npm run test:integration
```

