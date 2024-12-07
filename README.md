# RBAC Dashboard

A simple Role-Based Access Control (RBAC) dashboard built with React and Vite. This application allows users to manage roles and users with associated permissions.

## Technologies Used

- **Frontend**: React, Vite, Tailwind CSS
- **Backend**: JSON Server (for mock API)
- **Routing**: React Router DOM

## Features

- **User Management**: Change password.
- **Role Management**: Add, edit, and delete roles with specific permissions.
- **Dashboard Overview**: View the total number of users and roles at a glance.
- **Responsive Design**: The application is mobile-friendly and adapts to different screen sizes.

## Getting Started

### Installation

1. Clone the repository:
   git clone https://github.com/Sparkashok/RBAC.git

2. Navigate to the project directory:
   cd VRV-WEB

3. Install the dependencies:
   npm install

4. Start the mock API server:
   npx json-server --watch db.json --port 5000

5. Start the development server:

6. open the new terminal and run:
    npm run dev

### Usage
    Upon launching the application, you’ll see the main dashboard that provides a summary of users, roles, active users, and pending requests.

    User Roles and Functionality
   ### Workflow

- **HR Login**:  
  HRs can log in using their credentials to access the dashboard. Once logged in, they can:  
  - Add new users by filling in the required details in the "User Management" section.  
  - Update existing user information, such as roles or contact details.  
  - View and manage all users and their roles.  
  - Handle pending requests (e.g., approvals or account activations).
  - Admin can manage all the access such as update,delete,create etc..
  - Admin can edit the details or information of the any user.

- **User Login**:  
  Regular users can log in to:  
  - View their profile information.  
  - Change their password from the "Change Password" section for enhanced security.
 
    **
       if the login form is in hrfrom then only hr can access the dashboard by entering the credentials these credentials are validated using the authentication method which all the credentials are stored in the json web server of PORT number '5000'.
    - JSON server will run on the PORT number 5000.
   - In this port or the localhost the total information of the users and the admin will be there.

- **Dashboard Overview**:  
  The dashboard provides an at-a-glance overview with key statistics:  
  - Total users and roles in the system.  
  - Active users count (calculated dynamically).  
  - Pending requests awaiting HR action.




  **MY OLD PROJECT MERN-AUTHENTICATION WITH ALL REQUIREMENTS SUCH AS SENDING EMAILS,JWT TOKEN CHECKING ETC.. PLEASE CHECK ONCE IF YOU HAVE ANY TIME.
  website link: new-auth-ucfs.onrender.com
  GITHUB REPO: https://github.com/Sparkashok/new-auth

  SecureAuth: MERN Stack Authentication System
      SecureAuth is a robust authentication system built using the MERN stack (MongoDB, Express, React, Node.js). It provides a secure and user-friendly way to             manage authentication, including email verification, password reset, and protected routes for authorized users.

     Features
  User Authentication:

     Signup and login functionalities with hashed passwords for security.
      Users can access protected routes only after authentication.
  
  Email Verification:

     A 6-digit OTP is sent to the user’s email upon registration for verification.
      Integrates with Mailtrap for email testing in the development environment.
Password Reset:

   Forgot password functionality that allows users to reset their password via email.
   Securely handles password updates using hashed storage.
  
Error Handling:
   User-friendly error messages for failed operations like incorrect login details or expired OTPs.
   
Session Management:
   JWT-based authentication for secure and scalable session handling.
   Token expiration ensures enhanced security.
   
Responsive Design:
      Designed to work seamlessly on both desktop and mobile devices.
      
Technologies Used
      Frontend: React, Zustand (for state management), Axios (for API requests).
      Backend: Node.js, Express.js.
      Database: MongoDB with Mongoose for schema modeling.
      Email Service: Mailtrap (for development and testing purposes).
      
How It Works
Signup:
      User registers by providing an email, password, and other details.
      A verification email with a 6-digit OTP is sent for email confirmation.
Email Verification:
      User enters the OTP on the verification page to activate their account.
      On success, the account is marked as verified in the database.
Login:
      User provides email and password to log in.
      A JWT token is generated upon successful authentication.
Forgot Password:
      User requests a password reset by providing their registered email.
      A password reset link or OTP is sent to the email.
      User enters a new password, which is securely hashed before being updated in the database.
Protected Routes:
   Certain routes (e.g., dashboard, user profile) are accessible only after authentication.
   The React app checks for a valid JWT token before granting access.
