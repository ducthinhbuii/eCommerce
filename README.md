# eCommerce React Application

A modern, full-featured eCommerce web application built with React, Redux Toolkit, and Firebase. This application provides a complete online shopping experience with user authentication, product browsing, cart management, and payment processing.

## 🚀 Features

- **User Authentication**: Login/Register with email/password and Google OAuth2
- **Product Management**: Browse products by categories with filtering and search
- **Shopping Cart**: Add/remove items, quantity management, and cart persistence
- **Order Management**: Complete checkout process with address and payment
- **User Dashboard**: Profile management and order status tracking
- **Responsive Design**: Modern UI with SCSS styling
- **Real-time Updates**: Firebase integration for dynamic content
- **State Management**: Redux Toolkit for centralized state management

## 🛠️ Tech Stack

- **Frontend**: React 18.2.0
- **Build Tool**: Vite 5.2.0
- **State Management**: Redux Toolkit, React Redux
- **Routing**: React Router DOM 6.23.1
- **Styling**: SCSS/Sass
- **HTTP Client**: Axios
- **Authentication**: Google OAuth2
- **UI Components**: Custom components with modern design
- **Notifications**: React Toastify
- **Environment**: Dotenv for configuration

## 📁 Project Structure

```
eCommerce/
├── public/                 # Static assets
│   └── js/
│       └── custom.js
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── carousel/      # Product carousel component
│   │   ├── firebase/      # Firebase configuration
│   │   ├── footer/        # Footer component
│   │   ├── header/        # Header/Navigation component
│   │   ├── listCard/      # Product card components
│   │   ├── rangeSlider/   # Price range filter
│   │   └── spinner/       # Loading spinner
│   ├── hooks/             # Custom React hooks
│   │   ├── useFetch.jsx   # API data fetching hook
│   │   └── usePost.jsx    # API posting hook
│   ├── pages/             # Page components
│   │   ├── cart/          # Shopping cart functionality
│   │   │   ├── address/   # Address management
│   │   │   └── order/     # Order processing
│   │   ├── categories/    # Product categories and filtering
│   │   │   ├── breadCrumb/
│   │   │   ├── products/
│   │   │   └── sideBar/
│   │   ├── detail/        # Product detail pages
│   │   │   ├── breadCrumbs/
│   │   │   ├── itemDetail/
│   │   │   └── tab/
│   │   ├── home/          # Homepage components
│   │   │   ├── banner/
│   │   │   ├── benefit/
│   │   │   ├── bestSeller/
│   │   │   ├── blog/
│   │   │   ├── deal/
│   │   │   ├── newArrive/
│   │   │   ├── newsLetter/
│   │   │   └── slider/
│   │   ├── login/         # Authentication pages
│   │   ├── payment/       # Payment processing
│   │   ├── register/      # User registration
│   │   └── user/          # User dashboard
│   │       ├── infomation/
│   │       └── order-status/
│   ├── redux/             # State management
│   │   ├── actions.js
│   │   ├── reducer.js
│   │   ├── selector.js
│   │   └── store.js
│   └── ultis/             # Utility functions
│       ├── api.js         # API configuration
│       ├── postApi.js     # POST request utilities
│       ├── ProtectRouter.jsx  # Route protection
│       └── setting.js     # Application settings
├── index.html             # Entry HTML file
├── package.json           # Dependencies and scripts
├── vite.config.js         # Vite configuration
└── README.md             # This file
```

## 🚀 Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd eCommerce
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   
   Create a `.env` file in the root directory:
   ```env
   VITE_REACT_BACKEND_BASE_URL=your_backend_api_url
   ```



### Running the Application

#### Development Mode
```bash
npm run dev
```
The application will start on `http://localhost:5173`

#### Production Build
```bash
npm run build
```

#### Preview Production Build
```bash
npm run preview
```

#### Linting
```bash
npm run lint
```

### Payment Testing
For testing payment functionality, you can use the following test card details:

| Field | Value |
|-------|-------|
| **Card Number** | `9704198526191432198` |
| **Cardholder Name** | `NGUYEN VAN A` |
| **Expiry Date** | `07/15` |
| **OTP Password** | `123456` |

> **Note**: These are test card details for development and testing purposes only. Do not use in production.

## 🔧 Configuration

### API Configuration
API calls are configured in `src/ultis/api.js` using Axios with:
- Base URL from environment variables (`VITE_REACT_BACKEND_BASE_URL`)
- Bearer token authentication
- Cookie support for session management

```javascript
const BASE_URL = import.meta.env.VITE_REACT_BACKEND_BASE_URL;

export const fetchDataFromAPI = async (url, token, cookie, params) => {
    const {data} = await axios.get(
        BASE_URL + url,
        {
            headers: {
                Authorization: "Bearer " + token,
                Cookie: cookie
            },
            params,
        }
    )
    return data;
}
```

## 📱 Key Features Explained

### Authentication System
- Email/password registration and login
- Google OAuth2 integration
- Protected routes for authenticated users
- Session management with tokens

### Product Management
- Category-based product browsing
- Advanced filtering with price ranges
- Product search functionality
- Detailed product pages with tabs

### Shopping Cart
- Add/remove products
- Quantity adjustment
- Cart persistence across sessions
- Address management for shipping

### Order Processing
- Multi-step checkout process
- Payment integration
- Order status tracking
- User dashboard for order history
