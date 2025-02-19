# api-image

## ✨ Image Processing

**api-image** is a system for processing images and querying processing tasks, including states and associated prices.

---

## 🛠️ Installation

### ✨ Prerequisites

Make sure you have the following installed on your system:

- [Docker](https://www.docker.com/) & [Docker Compose](https://docs.docker.com/compose/)

### ➕ Setting Up the Development Environment

1. **Start the infrastructure**

   ```bash
   docker compose --profile=dev up -d --build
   ```

2. **Run the application**

   ```bash
   npm run dev
   ```

3. **Run tests**

   ```bash
   docker compose exec api-images npm run test
   ```

4. **Run the application in a container**

   ```bash
   docker compose exec api-images npm run dev
   ```

---

## 🌐 Accessing the Application

After starting the application, it will be available at:

**[http://127.0.0.1:3000](http://127.0.0.1:3000)**

---
