# 🛒 Store Management Application (Spring Boot)

Website for **CSG (Crispy Snacks and Goodies)**.

A simple **store management web application** built using **Spring Boot, Thymeleaf, and PostgreSQL**.
This project is designed to understand **end-to-end backend development**, from request handling to database persistence, and to serve as a **real-world portfolio project**.

---

## 🚀 Features

* Home page displaying all products
* Admin page to add new products
* Server-side rendering using Thymeleaf
* Persistent storage using PostgreSQL
* Data survives application restart
* Clean MVC-based architecture

---

## 🛠 Tech Stack

* **Backend:** Java, Spring Boot
* **Frontend:** Thymeleaf (HTML)
* **Database:** PostgreSQL
* **ORM:** Spring Data JPA (Hibernate)
* **Build Tool:** Maven
* **Version Control:** Git & GitHub

---

## 🧱 Project Architecture

```
Controller → Repository → Database
        ↓
     Thymeleaf Views
```

### Key Packages

* `controller` – Handles HTTP requests
* `model` – JPA entities
* `repository` – Database access using Spring Data JPA
* `resources/templates` – Thymeleaf HTML pages

---

## 🔄 Application Flow

1. Admin adds a product from `/admin`
2. Data is sent via POST request
3. Spring Boot controller creates a `Product` entity
4. JPA persists data into PostgreSQL
5. Home page fetches products from DB and displays them

---

## 🗄 Database Configuration

Configured using `application.properties`:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/store_db
spring.datasource.username=postgres
spring.datasource.password=postgres

spring.jpa.hibernate.ddl-auto=update
```

> **Note:** Credentials are currently stored locally for development purposes only.

---

## ▶️ How to Run Locally

### Prerequisites

* Java 17+
* Maven
* PostgreSQL

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/saintvj/store-springboot.git
   ```

2. Create PostgreSQL database:

   ```
   store_db
   ```

3. Update database credentials in `application.properties`

4. Run the Spring Boot application

5. Open in browser:

    * Home: `http://localhost:8080/`
    * Admin: `http://localhost:8080/admin`

---

## 📌 Current Limitations

* No authentication (admin endpoints are open)
* Basic UI (CSS will be added later)
* No input validation yet

---

## 🔮 Future Enhancements

* Input validation
* DTOs and Builder pattern
* Product update & delete
* Authentication & authorization
* Deployment to cloud (Render / Railway)
* UI styling & SEO improvements

---

## 👨‍💻 Author

**Vedant J**
Backend-focused software engineer learning Spring Boot and system design through real projects.
