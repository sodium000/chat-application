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
   JWT_SECRET=your_jwt_secret_key
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## Deployment on Vercel

### Step-by-Step Vercel Deployment

1. **Sign up** at [vercel.com](https://vercel.com)
2. **Import your GitHub repository**:
   - Click "New Project"
   - Connect your GitHub account
   - Select your chat-application repository
3. **Configure the project**:
   - Framework Preset: `Node.js`
   - Root Directory: `./` (leave as default)
   - Build Command: `npm run build`
   - Output Directory: `public` (leave empty for Node.js)
   - Install Command: `npm install`
4. **Set Environment Variables** (see section below)
5. **Deploy** - Click "Deploy"
6. **Your app will be available** at `https://your-app-name.vercel.app`

### Managing JWT_SECRET and COOKIE_SECRET

#### What are these secrets?

- **JWT_SECRET**: Used to sign and verify JSON Web Tokens for user authentication
- **COOKIE_SECRET**: Used to sign cookies to prevent tampering

#### How to Generate Secure Secrets

**Option 1: Using Node.js (Recommended)**
```bash
# Open terminal/command prompt and run:
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

**Option 2: Using Online Generators**
- Visit [https://generate-secret.vercel.app/64](https://generate-secret.vercel.app/64)
- Copy the generated 64-character string

**Option 3: Using OpenSSL**
```bash
openssl rand -hex 64
```

#### Setting Environment Variables in Vercel

1. **Go to your Vercel dashboard**
2. **Select your project**
3. **Go to Settings → Environment Variables**
4. **Add these variables**:

| Variable Name | Value | Environment |
|---------------|-------|-------------|
| `NODE_ENV` | `production` | Production |
| `MONGO_CONNECTION_STRING` | `mongodb+srv://...` | Production |
| `COOKIE_SECRET` | `your_generated_secret_here` | Production |
| `JWT_SECRET` | `your_generated_secret_here` | Production |

#### Example Environment Variables

```env
NODE_ENV=production
MONGO_CONNECTION_STRING=mongodb+srv://username:password@cluster.mongodb.net/chatdb?retryWrites=true&w=majority
COOKIE_SECRET=a1b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef1234567890
JWT_SECRET=f1e2d3c4b5a6789012345678901234567890fedcba1234567890fedcba1234567890
```

#### Security Best Practices

1. **Never commit secrets to Git**
   - Add `.env` to your `.gitignore` file
   - Use different secrets for development and production

2. **Use strong, random secrets**
   - At least 32 characters long
   - Mix of letters, numbers, and special characters

3. **Rotate secrets regularly**
   - Change secrets every 3-6 months
   - Update both JWT_SECRET and COOKIE_SECRET

4. **Environment-specific secrets**
   - Use different secrets for development, staging, and production

### Getting MongoDB Connection String

1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster (free tier)
3. Click "Connect" → "Connect your application"
4. Copy the connection string
5. Replace `<password>` and `<dbname>` with your values

### Vercel-Specific Configuration

The project includes:
- `vercel.json` - Vercel deployment configuration
- Updated `package.json` with build script
- Proper routing for Node.js application

### Troubleshooting Vercel Deployment

**Common Issues and Solutions:**

#### 1. Internal Server Error (500)
**Causes:**
- Missing environment variables
- Database connection issues
- Socket.IO compatibility issues
- Missing dependencies

**Solutions:**
- Check Vercel deployment logs in the dashboard
- Ensure all environment variables are set correctly
- Test the health check endpoint: `https://your-app.vercel.app/health`

#### 2. Build Fails
**Causes:**
- Missing dependencies in `package.json`
- Node.js version incompatibility
- Build script errors

**Solutions:**
- Ensure all dependencies are in `package.json` (not just devDependencies)
- Check Node.js version compatibility (>= 14.0.0)
- Review build logs in Vercel dashboard

#### 3. Environment Variables Not Working
**Causes:**
- Variables not set in Vercel dashboard
- Wrong variable names
- Variables set for wrong environment

**Solutions:**
- Double-check variable names in Vercel dashboard
- Ensure variables are set for "Production" environment
- Test with the health check endpoint

#### 4. Database Connection Issues
**Causes:**
- MongoDB Atlas network access restrictions
- Invalid connection string
- Missing database credentials

**Solutions:**
- Allow all IPs (0.0.0.0/0) in MongoDB Atlas Network Access
- Verify connection string format
- Check database user permissions

#### 5. Socket.IO Limitations
**Note:** Vercel serverless functions don't support persistent WebSocket connections.
- Real-time features will work in development but not in production
- Messages will still be saved to database
- Consider using external WebSocket services for real-time features

#### 6. File Upload Issues
**Limitations:**
- Vercel has 4MB file upload limit
- No persistent file storage
- Files are temporary in serverless environment

**Solutions:**
- Use external storage (AWS S3, Cloudinary, etc.)
- Implement client-side file size validation
- Consider using Vercel's Edge Functions for larger files

#### Debugging Steps:

1. **Check Health Endpoint:**
   ```
   https://your-app.vercel.app/health
   ```

2. **Review Vercel Logs:**
   - Go to Vercel dashboard
   - Select your project
   - Go to "Functions" tab
   - Check function logs

3. **Test Environment Variables:**
   - Add console.log statements in your code
   - Check logs in Vercel dashboard
   - Use the health endpoint to verify environment

4. **Local Testing:**
   ```bash
   # Test with production environment
   NODE_ENV=production npm run prod
   ```

## Project Structure

```
chat-application/
├── app.js                 # Main application file
├── vercel.json           # Vercel deployment config
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
- `npm run build` - Build for production (Vercel)

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