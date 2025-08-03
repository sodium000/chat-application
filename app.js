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
      console.log("🔄 Connecting to database...");
      
      await mongoose.connect(process.env.MONGO_CONNECTION_STRING, {
        serverSelectionTimeoutMS: 15000, // 15 seconds timeout for server selection
        socketTimeoutMS: 45000, // 45 seconds timeout for socket operations
        maxPoolSize: 10, // Maximum number of connections in the pool
        minPoolSize: 1, // Minimum number of connections in the pool
        maxIdleTimeMS: 30000, // Maximum time a connection can be idle
        connectTimeoutMS: 15000, // 15 seconds timeout for initial connection
        heartbeatFrequencyMS: 10000, // How often to send heartbeat to server
        retryWrites: true, // Retry write operations if they fail
        w: 'majority', // Write concern
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
      
      // Graceful shutdown
      process.on('SIGINT', async () => {
        await mongoose.connection.close();
        console.log('Database connection closed through app termination');
        process.exit(0);
      });
      
    } else {
      console.log("⚠️ MongoDB connection string not provided");
    }
  } catch (err) {
    console.log("❌ Database connection error:", err.message);
    console.log("Please check your MONGO_CONNECTION_STRING environment variable");
  }
};

// Connect to database with retry mechanism
const connectWithRetry = async (retries = 3, delay = 5000) => {
  for (let i = 0; i < retries; i++) {
    try {
      await connectDB();
      return; // Success, exit the retry loop
    } catch (error) {
      console.log(`❌ Connection attempt ${i + 1} failed:`, error.message);
      if (i < retries - 1) {
        console.log(`🔄 Retrying in ${delay/1000} seconds...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      } else {
        console.log("❌ All connection attempts failed");
        throw error;
      }
    }
  }
};

connectWithRetry();

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
    console.log(`🔗 Health check: http://localhost:${PORT}`);
  });
}

// For Vercel serverless
module.exports = app;