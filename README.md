# Contact Management App

## 📖 Project Description
This project is a **Contact Management App** that allows users to:
- Add new contacts with details like name, email, phone number, company, and job title.
- View a list of all added contacts.
- Manage contacts through a user-friendly interface.

The app demonstrates a full-stack implementation using **React** for the frontend, **Node.js/Express** for the backend, and **MongoDB** for the database.

---

## 🚀 Features
- User-friendly form to input contact details.
- Data validation to ensure proper input.
- RESTful APIs for seamless data interaction between the frontend and backend.
- MongoDB database for secure and scalable storage of contact information.


## 🛠️ Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/Harshvardhan5703/CM
cd contact-management-app
```
### 2.  Install Dependencies
Backend
```bash
cd server
npm install
```
Frontend
```bash
cd client_temp
npm install
```
### 3. Run the App
Backend
```bash
 cd server
node server.js
```
Frontend
```bash
cd client_temp
npm start
```
#### 4. Database schema
```bash
firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true },
  company: { type: String },
  jobTitle: { type: String },
```
#### 5. 🧠 Technical Decisions
Frontend Framework:
React was chosen for its component-based architecture and dynamic rendering capabilities.
Styling: CSS Modules were used for scoped styles.

Backend Framework:
Node.js and Express were used for their simplicity and ability to handle RESTful APIs efficiently.
Middleware: CORS and body-parser middleware were configured for secure API communication.

Database:
MongoDB was selected for its NoSQL structure, which provides flexibility in storing varying user data.

#### 6. 🔄 How the App Works

 ##### Frontend Workflow
 - The user fills out the form with contact details.
   
- Validation is performed on the client side to ensure proper input.
  
 - A POST request is sent to the backend API to save the contact.

 ##### Backend Workflow
 - The server receives the POST request and validates the data.
   
 - The contact details are stored in the MongoDB database.
   
 - The server sends a success response back to the frontend.

 ##### Mongo DB Workflow
 - The MongoDB database stores the contacts with unique identifiers.
   
-  Data is retrieved or modified using APIs based on the user’s actions.

#### 7.⚡ Challenges and Solutions

###### 1.  While pushing to github, my frontend folder was pushed as a submodule, and tus wasnt accessible from there, then i read some github docs and resolved it bt removing the /.git file, checking other related stuff.
###### 2.  Error duting CORS and resolved it by using middlewares.
###### 3.  MongoDB doesn't have access to all other IPs, gave access to 0.0.0.0 IP address in order to make it usable from every device.
