# Admin Panel Setup Guide

## Firebase Configuration

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select an existing one
3. Set up authentication:
   - Go to Authentication > Sign-in method
   - Enable Email/Password authentication
4. Set up Firestore Database:
   - Go to Firestore Database
   - Click "Create database"
   - Start in production mode
   - Select a location near your users
5. Set up Storage:
   - Go to Storage
   - Click "Get started"
   - Choose "Start in production mode"
   - Select a location near your users
6. Get your Firebase config:
   - Go to Project settings
   - Under "Your apps", select your web app
   - Copy the Firebase configuration object

## Environment Variables

Create a `.env` file in the root directory with your Firebase configuration:

```env
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
```

## Security Rules

### Firestore Rules

Go to Firestore > Rules and paste the following:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /products/{productId} {
      allow read: if true;
      allow create, update, delete: if request.auth != null;
    }
    
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

### Storage Rules

Go to Storage > Rules and paste the following:

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /products/{imageId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    match /avatars/{userId}/{imageId} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## Creating an Admin User

1. Go to Authentication > Users
2. Click "Add user"
3. Enter an email and password
4. Click "Add user"

## Accessing the Admin Panel

1. Start the development server:
   ```bash
   npm start
   ```

2. Navigate to `/admin/login`
3. Log in with your admin credentials
4. You'll be redirected to the dashboard where you can manage products

## Features

- **Product Management**:
  - Add new products with images
  - Edit existing products
  - Delete products
  - View all products in a sortable table

- **Image Handling**:
  - Upload product images
  - Preview images before upload
  - Automatic image optimization

- **Security**:
  - Protected routes
  - Secure file uploads
  - Role-based access control

## Troubleshooting

- **Authentication Issues**:
  - Ensure Email/Password authentication is enabled in Firebase
  - Verify your Firebase configuration in the `.env` file

- **Permission Denied Errors**:
  - Check your Firestore and Storage rules
  - Make sure you're logged in when trying to access protected routes

- **Image Upload Issues**:
  - Check your Storage rules
  - Ensure the file size is within limits
  - Verify the file type is allowed (images only)
