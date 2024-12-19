# College Management WebApp with AI Integrations

## Overview

This project is a **College Management WebApp** designed to streamline and enhance administrative and academic operations. By integrating cutting-edge AI features, this application provides an innovative and efficient solution for managing college-related tasks. The project is a collaborative effort by **Anuj**, **Arsh**, and **Qasim**.

---

## Features

- **AI-Driven Insights**: Integrates artificial intelligence to assist in decision-making and provide predictive analytics.
- **Role-Based Access Control (RBAC)**: Ensures secure access based on user roles (Admin, Faculty, Student, etc.).
- **Student and Faculty Management**: Comprehensive management of student and faculty data.
- **Course and Schedule Management**: Easy creation and monitoring of courses, schedules, and exams.
- **Announcements and Notifications**: Efficient communication channels for important updates.
- **Interactive Dashboard**: Provides an intuitive overview of key metrics and statistics.

---

## Tech Stack

### Frontend

- **Framework**: Vite React
- **Styling**: Tailwind CSS

### Backend

- **Framework**: Node.js
- **Database**: MongoDB
- **Authentication**: JSON Web Tokens (JWT)
- **Authorization**: Role-Based Access Control (RBAC)
- **AI Integration**: Groq API

---

## Installation and Setup

1. **Clone the repository**:

   ```bash
   git clone https://github.com/Lucifer11122/College-Project-Main.git
   cd College-Project-Main
   ```

2. **Install dependencies**:

   ```bash
   # Frontend
   cd frontend
   npm install
   npm i @material-tailwind/react animate.css axios bcryptjs cors dotenv express groq-sdk jsonwebtoken lucide-react mongoose react react-dom react-router-dom recharts tailwind-scrollbar-hide

   # Backend
   cd backend
   npm i axios bcryptjs compression cors dotenv express jsonwebtoken mongoose
   ```

3. **Set up environment variables**: Create a `.env` file in the `backend` folder with the following details:

   ```env
   MONGO_URI=<Your MongoDB connection string>
   JWT_SECRET=<Your secret key>
   AI_API_KEY=<Your Groq API key>
   ```

4. **Run the application**:

   ```bash
   # Frontend
   cd frontend
   npm run dev
Open a new terminal
   # Backend
   cd backend
   node server.js
   ```

5. **Access the application**: Open your browser and navigate to `http://localhost:3000` for the frontend.

---

## Project Structure

```
college-management-webapp/
|├── collage/       # Vite React application
|   |├── src/          # React components, pages, and assets
|   |└── public/       # Static files
|└── backend/        # Node.js API server
    |├── models/       # MongoDB schemas
    |├── routes/       # API routes
    |├── controllers/  # Route handlers
    |├── middleware/   # Authentication and RBAC middleware
    |└── utils/        # Utility functions
```

---

## Contributors

- **Anuj**
- **Arsh**
- **Qasim**

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Acknowledgments

- Thanks to our mentors and peers for their guidance and feedback.
- Special thanks to the developers of the open-source tools and libraries used in this project.

---

## Future Enhancements

- Expand AI capabilities to include voice recognition and NLP features.
- Develop a mobile application version for broader accessibility.

"# BB-College-Website-V-2.0" 
