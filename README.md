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
