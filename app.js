// external imports
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const path = require("path");
const cookieParser = require("cookie-parser");
const moment = require("moment");

// internal imports
const loginRouter = require("./router/loginRouter");
const usersRouter = require("./router/usersRouter");
const inboxRouter = require("./router/inboxRouter");

// internal imports
const {
  notFoundHandler,
  errorHandler,
} = require("./middlewares/common/errorHandler");

// Load environment variables
dotenv.config();

const app = express();

// set comment as app locals
app.locals.moment = moment;

// Validate required environment variables
const requiredEnvVars = ['MONGO_CONNECTION_STRING', 'COOKIE_SECRET', 'JWT_SECRET'];
const missingEnvVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingEnvVars.length > 0) {
  console.error('❌ Missing required environment variables:', missingEnvVars);
  console.error('Please set these variables in your Vercel dashboard');
}

// Set default values for optional environment variables
process.env.COOKIE_NAME = process.env.COOKIE_NAME || 'token';
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// database connection with better error handling and timeout configuration
const connectDB = async () => {
  try {
    if (process.env.MONGO_CONNECTION_STRING) {
      await mongoose.connect(process.env.MONGO_CONNECTION_STRING, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 15000, // 15 seconds timeout for server selection
        socketTimeoutMS: 45000, // 45 seconds timeout for socket operations
        bufferCommands: false, // Disable mongoose buffering
        bufferMaxEntries: 0, // Disable mongoose buffering
        maxPoolSize: 10, // Maximum number of connections in the pool
        minPoolSize: 1, // Minimum number of connections in the pool
        maxIdleTimeMS: 30000, // Maximum time a connection can be idle
        connectTimeoutMS: 15000, // 15 seconds timeout for initial connection
      });
      console.log("✅ Database connection successful!");
      
      // Monitor database connection
      mongoose.connection.on('error', (err) => {
        console.error('❌ Database connection error:', err.message);
      });
      
      mongoose.connection.on('disconnected', () => {
        console.log('⚠️ Database disconnected');
      });
      
      mongoose.connection.on('reconnected', () => {
        console.log('✅ Database reconnected');
      });
      
    } else {
      console.log("⚠️ MongoDB connection string not provided");
    }
  } catch (err) {
    console.log("❌ Database connection error:", err.message);
  }
};

// Connect to database
connectDB();

// request parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// set view engine
app.set("view engine", "ejs");

// set static folder
app.use(express.static(path.join(__dirname, "public")));

// parse cookies with fallback
app.use(cookieParser(process.env.COOKIE_SECRET || "default-secret"));

// Add request logging for debugging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Health check endpoint
app.get('/health', (req, res) => {
  const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
  res.json({
    status: 'ok',
    database: dbStatus,
    timestamp: new Date().toISOString()
  });
});

// routing setup
app.use("/", loginRouter);
app.use("/users", usersRouter);
app.use("/inbox", inboxRouter);

// 404 not found handler
app.use(notFoundHandler);

// common error handler
app.use(errorHandler);

// For local development
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`🚀 App listening to port ${PORT}`);
    console.log(`📊 Environment: ${process.env.NODE_ENV}`);
    console.log(`🔗 Health check: http://localhost:${PORT}/health`);
  });
}

// For Vercel serverless
module.exports = app;