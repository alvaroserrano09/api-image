
# api-image

## ✨ Image Processing

**api-image** is a system for processing images and querying processing tasks, including states and associated prices.

---

## 🛠️ Installation

### ✨ Prerequisites

Make sure you have the following programs installed on your system:

- [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/)
- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

---

#  **First steps**


## 1.  **Configure environment variables**

Before running the application, you need to set the environment variables so that the database and other services are accessible. This is done by sourcing the `env.sh` file.

```bash
source env.sh
```
This command will load the necessary variables into your terminal, allowing the Node.js environment to be configured correctly.

## 2. **Install dependencies**

Once the environment variables are set, install the project dependencies:

```bash
npm install
```

# 🚀 Using Docker

## 1. **Start the infrastructure with Docker**

Run the following command to start the development containers:

```bash
docker compose --profile=dev up -d --build
```

This command will build and bring up the necessary infrastructure for the application, including the database and any other dependent services.

## 2. **Run the application**

### 2.1 Working inside the container

Inside the `api-images` container, run the following command to start the application in development mode:

```bash
docker compose exec api-images npm run dev
```

Keep in mind, the app is running in Port:3001

### 2.2 Working in local


With the dependencies installed and the environment variables configured, run the application locally with:

```bash
npm run dev
```

## 3. **Run tests**

If you want to run the unit tests locally, use the following command:

```bash
npm run test
```
If you want to run integration tests, use the following command, but you need to run the application and the database
```bash
newman run api/postman/collection/api-image.postman_collection.json -e api/postman/environment/api-image.enviroment.postman_environment.json
```


---
