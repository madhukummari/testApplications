# Docker Interview Hands-on Tasks & Questions

## 🛠 Task 1: Optimize a Dockerfile (Reduce Image Size & Improve Caching)

### Challenge:
Given the following inefficient Dockerfile, optimize it by:
✅ Reducing image size  
✅ Improving caching  
✅ Using a non-root user  

### Unoptimized Dockerfile:
```dockerfile
FROM node:18
WORKDIR /app
COPY . .  
RUN npm install
CMD ["node", "server.js"]
```

### 👉 Tasks:
1. Improve the build process using **layer caching**.
2. Use a **lightweight base image**.
3. Add a **non-root user**.
4. Minimize unnecessary files using **.dockerignore**.

### Interview Questions:
1. What is layer caching in Docker?
2. How does modifying a layer affect the subsequent layers?
3. Why should we use a non-root user in Docker containers?
4. How does `.dockerignore` improve build efficiency?

---

## 🛠 Task 2: Create a Multi-Stage Build for a Python Flask App

### Challenge:
Convert this Dockerfile into a **multi-stage build** to reduce image size.

### Unoptimized Dockerfile:
```dockerfile
FROM python:3.10
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["python", "app.py"]
```

### 👉 Tasks:
1. Use a **builder stage** for dependencies.
2. Use a **minimal runtime image** for the final stage (e.g., `python:3.10-slim`).
3. Ensure the final image does **not include build tools**.

### Interview Questions:
1. What is a multi-stage build in Docker?
2. How does a multi-stage build reduce image size?
3. Why should we separate build dependencies from runtime dependencies?

---

## 🛠 Task 3: Deploy a Multi-Container App Using Docker Compose

### Challenge:
Set up a **Node.js + MongoDB** app using **Docker Compose**.

### 👉 Tasks:
1. Create a **`docker-compose.yml`** file to define:
   - `node-app`: Runs a Node.js app  
   - `mongo-db`: A MongoDB database  
2. Ensure the app **depends on MongoDB**.
3. Use **volumes** to persist MongoDB data.

### Example `docker-compose.yml`:
```yaml
version: "3.8"
services:
  node-app:
    build: .
    ports:
      - "3000:3000"
    depends_on:
      - mongo-db
  mongo-db:
    image: mongo
    volumes:
      - mongo-data:/data/db
volumes:
  mongo-data:
```

✅ Test by running:
```bash
docker-compose up -d
docker ps
docker logs <node-app-container-id>
```

### Interview Questions:
1. What is Docker Compose?
2. How do you define service dependencies in Docker Compose?
3. What are the benefits of using volumes in Docker?
4. How do you scale services in Docker Compose?

---

## 🛠 Task 4: Debug a Broken Container

### Challenge:
A container is failing to start. Your task is to **find and fix the issue**.

### 👉 Tasks:
1. Run this container and check why it crashes:
   ```bash
   docker run myapp
   ```
2. Use **`docker logs`** and **`docker inspect`** to diagnose.
3. Try running an **interactive shell** inside the container:
   ```bash
   docker exec -it myapp /bin/sh
   ```
4. Fix the issue.

### Interview Questions:
1. How do you debug a failing container?
2. What command helps inspect container logs?
3. How can you enter a running container’s shell?

---

## 🔥 Bonus Challenge: Deploy a Full Stack App
Deploy a **React + Node.js + MongoDB** application using **Docker Compose** and configure it with **Nginx reverse proxy**.

### Interview Questions:
1. What is the purpose of a reverse proxy in Dockerized applications?
2. How does Nginx interact with backend services in a Docker environment?
3. What are the advantages of using Docker for full-stack application deployment?

---

### 🎯 Next Steps
✅ Try out these tasks in a **local Docker environment** or **cloud (AWS, Azure, GCP)**.  
✅ Document your **solutions, optimizations, and troubleshooting steps**.  
✅ Be ready to **explain your thought process** in interviews.  

