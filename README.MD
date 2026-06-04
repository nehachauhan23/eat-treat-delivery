# Food Delivery Order Management

A full-stack food delivery order management application built as part of a Full Stack Developer assessment.

The application allows users to browse a menu, manage a cart, place orders, and track order status updates through a clean and responsive interface.

---

## Live Demo

### Frontend

Add deployed frontend URL here.

```txt
https://your-frontend-url.vercel.app
```

### Backend

Add deployed backend URL here.

```txt
https://your-backend-url.onrender.com
```

---

# Features

## Menu Display

* View available menu items
* Item name, description, price, and image
* Add items to cart

## Cart Management

* Add items to cart
* Increase/decrease quantities
* Dynamic subtotal and total calculations
* Empty cart state

## Checkout

* Collect customer information

  * Name
  * Address
  * Phone Number
* Client-side validation
* Order summary before submission

## Order Placement

* Create new orders through REST API
* Backend validation using Zod
* Error handling for invalid requests

## Order Tracking

* Track order status progression

Order lifecycle:

```txt
ORDER_RECEIVED
    ↓
PREPARING
    ↓
OUT_FOR_DELIVERY
    ↓
DELIVERED
```

* Automatic status updates
* Visual timeline interface
* Polling-based updates every 5 seconds

---

# Tech Stack

## Frontend

* React
* TypeScript
* Vite
* React Router DOM
* Zustand
* Axios
* TailwindCSS

## Backend

* Node.js
* Express
* TypeScript
* Zod
* UUID

## Testing

* Vitest
* React Testing Library
* Supertest

---

# Architecture

The project follows a layered architecture.

```txt
Frontend
    ↓
API Layer
    ↓
Express Routes
    ↓
Service Layer
    ↓
Data Store
```

Business logic is intentionally isolated from route handlers to improve maintainability and testability.

---

# Project Structure

## Frontend

```txt
client/
│
├── src/
│   ├── api/
│   ├── components/
│   ├── pages/
│   ├── store/
│   ├── types/
│   ├── App.tsx
│   └── main.tsx
```

## Backend

```txt
server/
│
├── src/
│   ├── data/
│   ├── routes/
│   ├── services/
│   ├── validators/
│   ├── middlewares/
│   ├── types/
│   └── index.ts
```

---

# API Endpoints

## Get Menu

```http
GET /api/menu
```

Returns all available menu items.

---

## Create Order

```http
POST /api/orders
```

Example request:

```json
{
  "customer": {
    "name": "John Doe",
    "address": "123 Main Street",
    "phone": "9999999999"
  },
  "items": [
    {
      "menuItemId": "1",
      "quantity": 2
    }
  ]
}
```

---

## Get Order

```http
GET /api/orders/:id
```

Returns order details and current order status.

---

# Validation

The backend validates incoming requests using Zod.

Validation includes:

* Required customer name
* Required address
* Required phone number
* At least one item in the order
* Positive item quantities

Example invalid scenarios:

* Empty customer name
* Empty address
* Empty order
* Negative quantity

---

# State Management

The cart is managed using Zustand.

Available actions:

```ts
addItem()
increaseQuantity()
decreaseQuantity()
clearCart()
```

Zustand was selected because it provides lightweight global state management with minimal boilerplate.

---

# Order Status Updates

The backend is the source of truth for order state.

When an order is created, the backend automatically simulates order progression:

```txt
ORDER_RECEIVED
      ↓ 10s
PREPARING
      ↓ 10s
OUT_FOR_DELIVERY
      ↓ 10s
DELIVERED
```

The frontend polls the backend every 5 seconds to retrieve the latest status.

---

# Design Decisions

## Why React + Vite?

* Fast development experience
* Excellent TypeScript support
* Minimal configuration

## Why Express?

* Mature ecosystem
* Simple API development
* Well suited for assessment-sized applications

## Why Zustand?

* Lightweight
* Easy to use
* Less boilerplate than Redux

## Why Zod?

* Runtime validation
* TypeScript-friendly
* Improves API reliability

## Why a Service Layer?

Instead of placing business logic directly inside route handlers:

```txt
Route
 ↓
Business Logic
```

I used:

```txt
Route
 ↓
Service
 ↓
Business Logic
```

Benefits:

* Better separation of concerns
* Easier testing
* Easier migration to a database in the future

---

# Scalability Considerations

The assessment allows in-memory storage.

Current architecture:

```txt
React
 ↓
Express
 ↓
In-Memory Store
```

Future production architecture:

```txt
React
 ↓
API
 ↓
Service Layer
 ↓
Prisma
 ↓
PostgreSQL
```

Because business logic is already isolated inside services, migrating to a database would require minimal changes.

For real-time updates, polling could be replaced with Socket.IO or WebSockets.

---

# Error Handling

The application includes:

* Request validation
* 404 handling
* 500 error handling
* Graceful user feedback

Example server response:

```json
{
  "message": "Internal Server Error"
}
```

Internal implementation details are intentionally hidden from clients.

---

# Testing

Tests cover:

## Backend

* Menu retrieval
* Order creation
* Validation failures
* Order retrieval
* Order status updates

## Frontend

* Cart interactions
* Quantity updates
* Checkout validation
* Order tracking display

---

# AI Usage

AI was used as a development assistant throughout the project.

Examples include:

* Boilerplate generation
* TypeScript assistance
* UI iteration and refinement
* Test case brainstorming
* Debugging support
* Architecture review

AI was not responsible for architectural decisions, system design, state management choices, validation strategy, or tradeoff analysis. Those decisions were made manually during implementation.

---

# Challenges & Solutions

## Challenge: Keeping UI and Business Logic Separate

Solution:

* Zustand for client state
* Service layer for backend logic

---

## Challenge: Order Tracking Updates

Solution:

* Backend-driven status progression
* Frontend polling for updates

Future improvement:

* Socket.IO for push-based real-time communication

---

## Challenge: Input Validation

Solution:

* Zod schemas
* Server-side validation before business logic execution

---

# Setup Instructions

## Clone Repository

```bash
git clone <repository-url>
cd food-delivery
```

---

## Frontend

```bash
cd client

npm install

npm run dev
```

Frontend runs on:

```txt
http://localhost:5173
```

---

## Backend

```bash
cd server

npm install

npm run dev
```

Backend runs on:

```txt
http://localhost:5000
```

---

# Future Improvements

* PostgreSQL + Prisma
* Socket.IO real-time updates
* Authentication
* Order history
* Admin dashboard
* Docker support
* CI/CD pipeline
* API documentation using Swagger/OpenAPI

---

# Author

Neha

Full Stack Developer Assessment Submission
