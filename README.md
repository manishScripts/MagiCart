# MagiCart - E-Commerce MERN Application

A full-stack e-commerce application built with **MongoDB, Express, React, and Node.js (MERN)** featuring a complete order management system, admin dashboard, and user authentication.

## 🚀 Features

### User Features
- **User Authentication** - Sign up, login, and account management
- **Product Browsing** - Browse products with search and filter functionality
- **Shopping Cart** - Add/remove items, manage quantities
- **Order Placement** - Place orders with address and payment method selection
- **Order Tracking** - View order history and current order status
- **Responsive Design** - Mobile-friendly interface with Tailwind CSS

### Admin Features
- **Admin Dashboard** - Comprehensive admin panel
- **Product Management** - Add, edit, and delete products
- **Product Listing** - View all products with search
- **Order Management** - View all customer orders
- **Order Status Updates** - Update order status (Order Placed → Packing → Shipped → Out for Delivery → Delivered)
- **Admin Authentication** - Secure admin login

## 🛠️ Tech Stack

### Frontend
- **React** - UI library
- **Vite** - Build tool
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client
- **React Router** - Client-side routing
- **Context API** - State management

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **MongoDB** - Database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Cloudinary** - Image upload service
- **Multer** - File upload middleware
- **Cookie-Parser** - Cookie handling
- **Dotenv** - Environment variables

## 📁 Project Structure

```
E-commerce/
├── frontend/
│   ├── src/
│   │   ├── components/       # Reusable components
│   │   ├── pages/            # Page components
│   │   ├── context/          # React context (auth, shopping, user)
│   │   ├── utils/            # Utilities (Firebase config)
│   │   ├── assets/           # Images and SVGs
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
├── Admin/
│   ├── src/
│   │   ├── components/       # Admin components
│   │   ├── pages/            # Admin pages (Add, List, Orders)
│   │   ├── context/          # Auth context
│   │   ├── assets/           # SVG assets
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
├── backend/
│   ├── config/               # DB, Cloudinary, JWT config
│   ├── controller/           # Route handlers
│   ├── middleware/           # Auth, Admin auth, Multer
│   ├── models/               # MongoDB schemas
│   ├── routes/               # API routes
│   ├── server.js
│   ├── index.js
│   └── package.json
└── .gitignore
```

## 🔧 Installation & Setup

### Prerequisites
- **Node.js** (v14+)
- **npm** or **yarn**
- **MongoDB** (local or MongoDB Atlas)
- **Git**

### 1. Clone the Repository
```bash
git clone https://github.com/YOUR_USERNAME/E-commerce.git
cd E-commerce
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the backend folder:

```env
PORT=5000
MONGO_URI=mongodb+srv://ecommerceAdmin:SimplePass123@cluster0.fwwsq3l.mongodb.net/ecommerce
JWT_SECRET=your_jwt_secret_key
ADMIN_EMAIL=MagiCart123@gmail.com
ADMIN_PASSWORD=MagiCart@123
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

**Important:** Update MongoDB connection:
1. Go to [MongoDB Atlas](https://cloud.mongodb.com)
2. Add your IP to Network Access → IP Whitelist
3. Create a new cluster (if not already done)
4. Get your connection string and update `MONGO_URI`

Start the backend:
```bash
npm start
# or for development with auto-reload
npx nodemon index.js
```

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Access at `http://localhost:5173`

### 4. Admin Setup

```bash
cd Admin
npm install
npm run dev
```

Access at `http://localhost:5174`

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/admin-login` - Admin login

### Products
- `GET /api/product/listproduct` - Get all products
- `POST /api/product/add` - Add new product (Admin)
- `DELETE /api/product/delete/:id` - Delete product (Admin)

### Cart
- `GET /api/cart` - Get user cart
- `POST /api/cart/add` - Add to cart
- `POST /api/cart/remove` - Remove from cart
- `POST /api/cart/update` - Update cart quantity

### Orders
- `POST /api/order/placeorder` - Place new order
- `GET /api/order/userorders` - Get user orders
- `GET /api/order/allorders` - Get all orders (Admin)
- `POST /api/order/status/:orderId` - Update order status (Admin)

### User
- `GET /api/user/profile` - Get user profile
- `POST /api/user/update` - Update user profile

## 🔐 Environment Variables

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000
```

### Admin (.env)
```env
VITE_API_URL=http://localhost:5000
```

### Backend (.env)
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
ADMIN_EMAIL=admin_email@example.com
ADMIN_PASSWORD=admin_password
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

## 🚨 Troubleshooting

### MongoDB Connection Error
**Error:** `querySrv ECONNREFUSED`
- **Solution:** 
  1. Ensure your IP is whitelisted in MongoDB Atlas Network Access
  2. Check that the cluster is running (not paused)
  3. Verify connection string is correct

### CORS Issues
- Ensure backend CORS is configured for both frontend and admin URLs
- Check `server.js` for CORS whitelist

### Port Already in Use
```bash
# Find process using port 5000
netstat -ano | findstr :5000

# Kill process (Windows)
taskkill /PID <PID> /F
```

## 📝 Default Admin Credentials

```
Email: MagiCart123@gmail.com
Password: MagiCart@123
```

> ⚠️ Change these credentials in production!

## 🎯 Key Features Implementation

### Order Management
- **Place Order** - Users fill delivery details and select payment method
- **Order Tracking** - Users view their order history and current status
- **Admin Dashboard** - Admins view all orders and update status in real-time

### Authentication
- JWT-based authentication
- Secure password hashing with bcrypt
- Cookie-based session management
- Admin role verification middleware

### Product Management
- Upload images to Cloudinary
- Product categorization
- Search and filter functionality

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 📧 Support

For issues and questions, please create an issue in the repository or contact MagiCart123@gmail.com

## 🎉 Acknowledgments

- Built with MERN stack
- UI designed with Tailwind CSS
- Icons from Lucide React
- Image hosting via Cloudinary
- Database hosted on MongoDB Atlas

---

**Happy Coding! 🚀**
