# 🛒 Scatch – E-Commerce Web App

Scatch is a simple **Node.js + Express + MongoDB** based e-commerce application where users can browse products, add them to a cart, and manage authentication.

## 🚀 Features

* 🔑 **Authentication & Authorization** (User & Admin roles)
* 👤 User login & signup with JWT
* 🛍️ **Product management** (Admin can create products)
* 🛒 **Shopping Cart** with quantity tracking
* 📦 MongoDB + Mongoose for database models
* 🎨 EJS templates with TailwindCSS styling
* 📂 MVC folder structure for scalability

## 📁 Project Structure

```
Scatch-main/
│── app.js                 # Main entry point  
│── config/                # Database & file configs  
│── controllers/           # Authentication & other logic  
│── middlewares/           # Auth checks (isLoggedIn, isAdmin)  
│── models/                # Mongoose schemas (User, Product, Owner)  
│── routes/                # Express routes (users, products, owners)  
│── utils/                 # Helper functions (JWT generation)  
│── views/                 # EJS templates (cart, shop, admin, etc.)  
│── public/                # Static files (CSS, JS, images)  
```

## ⚙️ Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/Scatch.git
   cd Scatch-main
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Setup environment variables:
   Create a `.env` file in the root with:

   ```env
   MONGO_URI=your_mongo_connection_string
   JWT_SECRET=your_secret_key
   PORT=3000
   ```

4. Run the development server:

   ```bash
   npm start
   ```

5. Open in browser:

   ```
   http://localhost:3000
   ```

## 👨‍💻 Usage

* Visit `/shop` to browse products
* Login or Signup to add items to your cart
* Admins can log in and create products via `/admin`

## 🛠️ Tech Stack

* **Backend:** Node.js, Express
* **Database:** MongoDB with Mongoose
* **Frontend:** EJS, TailwindCSS
* **Authentication:** JWT
* **File Uploads:** Multer

## 🤝 Contributing

Feel free to fork this project and submit PRs!
