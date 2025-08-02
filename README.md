# Chat Application

A real-time chat application built with Node.js, Express, Socket.IO, and MongoDB.

## Features

- Real-time messaging
- User authentication and registration
- File sharing and attachments
- User profiles and avatars
- Responsive design
- Socket.IO for real-time communication

## Quick Start

### Prerequisites

- Node.js (>= 14.0.0)
- MongoDB database
- Git

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/chat-application.git
   cd chat-application
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   NODE_ENV=development
   PORT=3000
   MONGO_CONNECTION_STRING=your_mongodb_connection_string
   COOKIE_SECRET=your_cookie_secret_key
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## Deployment on Heroku

### Quick Deploy Steps

#### Option 1: Deploy to Heroku (CLI)

1. **Install Heroku CLI**
   ```bash
   npm install -g heroku
   ```

2. **Login to Heroku**
   ```bash
   heroku login
   ```

3. **Create Heroku App**
   ```bash
   heroku create your-app-name
   ```

4. **Set Environment Variables**
   ```bash
   heroku config:set NODE_ENV=production
   heroku config:set MONGO_CONNECTION_STRING=your_mongodb_connection_string
   heroku config:set COOKIE_SECRET=your_cookie_secret_key
   ```

5. **Deploy to Heroku**
   ```bash
   git add .
   git commit -m "Deploy to Heroku"
   git push heroku main
   ```

6. **Open your app**
   ```bash
   heroku open
   ```

#### Option 2: Deploy to Heroku (Dashboard)

1. **Fork this repository** to your GitHub account
2. **Go to [heroku.com](https://heroku.com)** and sign up
3. **Click "New"** and select "Create new app"
4. **Connect your GitHub repository**:
   - Go to "Deploy" tab
   - Choose "GitHub" as deployment method
   - Connect your GitHub account
   - Select your repository
5. **Configure Environment Variables** in "Settings" tab:
   - `NODE_ENV`: `production`
   - `MONGO_CONNECTION_STRING`: Your MongoDB Atlas connection string
   - `COOKIE_SECRET`: A random secret string
6. **Deploy**:
   - Go to "Deploy" tab
   - Click "Deploy Branch"
7. **Your app will be available** at `https://your-app-name.herokuapp.com`

### Environment Variables for Production

Set these environment variables in your Heroku dashboard:

- `NODE_ENV`: `production`
- `PORT`: `3000` (Heroku sets this automatically)
- `MONGO_CONNECTION_STRING`: Your MongoDB Atlas connection string
- `COOKIE_SECRET`: A random secret string

### Getting MongoDB Connection String

1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster (free tier)
3. Click "Connect" → "Connect your application"
4. Copy the connection string
5. Replace `<password>` and `<dbname>` with your values

## Project Structure

```
chat-application/
├── app.js                 # Main application file
├── package.json           # Dependencies and scripts
├── router/               # Route handlers
├── controllers/          # Business logic
├── models/              # Database models
├── middlewares/         # Custom middleware
├── views/               # EJS templates
├── public/              # Static assets
└── utilities/           # Helper functions
```

## Available Scripts

- `npm start` - Start development server with nodemon
- `npm run dev` - Start development server
- `npm run prod` - Start production server

## Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Real-time**: Socket.IO
- **Template Engine**: EJS
- **Authentication**: JWT, bcrypt
- **File Upload**: Multer
- **Styling**: CSS3

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the ISC License.


---

**Happy Chatting! 🚀** 