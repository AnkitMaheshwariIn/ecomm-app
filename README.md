# ShopEase - Ionic Angular E-commerce App

ShopEase is a modern, feature-rich e-commerce mobile application built with Ionic Angular and Firebase. The app provides a seamless shopping experience for customers and comprehensive management tools for administrators.

![ShopEase App](src/assets/icon/app-logo.png)

## Features

### Customer Features

- **User Authentication**
  - Google Sign-in integration
  - User profile management
  - Secure authentication with Firebase

- **Product Browsing**
  - Featured products carousel on home screen
  - Category and subcategory navigation
  - Product search functionality
  - Filtering and sorting options

- **Product Details**
  - High-quality product images with zoom capability
  - Detailed product descriptions and specifications
  - Price and discount information
  - Stock availability status
  - Related products suggestions

- **Shopping Cart**
  - Add/remove products
  - Adjust quantities
  - Real-time price calculation
  - Persistent cart (saved between sessions)

- **User Profile**
  - Order history
  - Wishlist
  - Saved addresses
  - Payment methods

### Admin Features

- **Dashboard**
  - Overview of products, categories, and statistics
  - Quick action buttons for common tasks

- **Product Management**
  - Add, edit, and delete products
  - Manage product attributes and variants
  - Upload and optimize product images
  - Set pricing, discounts, and stock levels
  - Feature products on home page

- **Category Management**
  - Create and organize categories and subcategories
  - Assign products to categories
  - Upload category images

## Technical Specifications

### Technology Stack

- **Frontend Framework**: Ionic 7 with Angular 17
- **UI Components**: Ionic UI components
- **State Management**: RxJS Observables
- **Authentication**: Firebase Authentication
- **Database**: Firebase Firestore
- **Image Storage**: Local storage with optimization
- **Form Handling**: Angular Reactive Forms
- **Routing**: Angular Router with lazy loading
- **Styling**: SCSS with Ionic theming
- **Internationalization**: Custom i18n implementation with JSON translation files
- **Theme**: Monochrome color palette with black, white, and gray tones

### Architecture

- **Component-Based**: Modular architecture with reusable components
- **Lazy Loading**: Optimized page loading for better performance
- **Service Layer**: Separation of concerns with dedicated services
- **Reactive Pattern**: Observable-based data flow
- **Responsive Design**: Adaptive layout for various screen sizes

### Key Technical Features

- **Image Optimization**
  - Client-side image compression and resizing
  - Optimized storage for faster loading
  - Lazy loading of images

- **Offline Support**
  - Local storage for cart items
  - Cached product data

- **Performance Optimizations**
  - Lazy loaded modules
  - Optimized bundle size
  - Efficient data fetching

- **Security**
  - Firebase Authentication
  - Role-based access control
  - Secure data access rules

## Project Structure

```
src/
├── app/
│   ├── models/            # Data models
│   ├── pages/             # Application pages
│   │   ├── admin/         # Admin section
│   │   ├── cart/          # Shopping cart
│   │   ├── categories/    # Categories browsing
│   │   ├── home/          # Home page
│   │   ├── login/         # Authentication
│   │   ├── product-detail/# Product details
│   │   ├── profile/       # User profile
│   │   └── tabs/          # Main navigation tabs
│   ├── services/          # Business logic and API calls
│   └── shared/            # Shared components and pipes
├── assets/                # Static assets
├── environments/          # Environment configuration
└── theme/                 # Global styling
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm (v7 or higher)
- Ionic CLI (v7 or higher)
- Angular CLI (v17 or higher)

### Installation

1. Clone the repository
   ```bash
   git clone <repository-url>
   cd ecomm-app
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Configure Firebase
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Authentication (Google provider)
   - Set up Firestore database
   - Update Firebase configuration in `src/environments/environment.ts` and `environment.prod.ts`

4. Run the application locally
   ```bash
   ionic serve
   ```

### Building for Production

```bash
# Build for web
ionic build --prod

# Add iOS platform
ionic capacitor add ios

# Add Android platform
ionic capacitor add android

# Build and run on iOS
ionic capacitor build ios

# Build and run on Android
ionic capacitor build android
```

## Customization

### Theming

The app uses Ionic's theming system. You can customize the colors, fonts, and other design elements in `src/theme/variables.scss`.

### Adding Payment Gateways

The app is designed to be easily extended with payment gateways. Implement a payment service in the `services` directory and integrate it with the checkout process.

### Internationalization (i18n)

The application supports multiple languages with a built-in translation system:

- **Supported Languages**: English and Hindi
- **Translation Files**: Located in `src/assets/i18n/` as JSON files
- **Language Service**: Manages language switching and translation loading
- **Language Toggle**: UI component for users to switch between languages
- **Persistent Preferences**: User language preference is saved between sessions

To add a new language:
1. Create a new JSON file in `src/assets/i18n/` (e.g., `fr.json`)
2. Copy the structure from an existing language file
3. Translate all the key values
4. Update the `LanguageService` to include the new language option

## Best Practices

- **Code Organization**: Follow Angular's style guide for component and service organization
- **Performance**: Use lazy loading for routes, optimize images, and minimize HTTP requests
- **Security**: Implement proper authentication and authorization checks
- **Testing**: Write unit and integration tests for components and services
- **Documentation**: Document code and maintain up-to-date README
- **UI Consistency**: Maintain consistent UI patterns across the application
- **Internationalization**: Keep all user-facing text in translation files
- **Service Abstraction**: Use services for shared functionality (e.g., LogoutService)

## 🔒 License

This project is proprietary and confidential. Unauthorized use or distribution is strictly prohibited.  
For licensing requests, contact **Ankit Maheshwari**.

## Acknowledgements

- [Ionic Framework](https://ionicframework.com/)
- [Angular](https://angular.io/)
- [Firebase](https://firebase.google.com/)
- [ngx-image-compress](https://github.com/dfa1234/ngx-image-compress)
