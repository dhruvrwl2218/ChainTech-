# Mini Application for Chaitech

This mini application was created as part of an assignment for the job role at Chaitech Network. It includes user login, registration, and account management functionalities.

## Features

- **User Login & Registration**: Users can log in or register using a unified form component.
- **User Account Management**: Users can view and edit their account details.

## Design

- **Minimalist Approach**: 
  - No form libraries are used.
  - No validation libraries are used.
  - A single Form component is utilized for registration, login, and editing user information.
- **State Management**:
  - Uses React Context for global user data management across components.
  - Redux can be used as an alternative if needed.

## Backend

- The server code included demonstrates the application's flow but is not a complete build.

## Usage

1. **Installation**:
   - Clone the repository.
   - Install dependencies with `npm install`.

2. **Running the Application**:
   - Start the server.
   - Run the client application.

3. **Endpoints**:
   - `POST /user/login`: User login.
   - `POST /user/register`: User registration.
   - `PUT /user/edit/:id` : Update user information.
   -
   
   ## register Page
   - ![registerpage](https://github.com/user-attachments/assets/0187ef18-9c98-4163-b924-79f5ed4e78e5)


   ## Login page
   -![loggin](https://github.com/user-attachments/assets/0fd5482e-d83b-4c31-85b7-124ef2ab1153)

   ## User details  
   ![mangeuser](https://github.com/user-attachments/assets/c316c702-22d9-44b8-9884-e40c4a57ac88)

   - 
