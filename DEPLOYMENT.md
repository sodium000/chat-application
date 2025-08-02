# Chat Application Deployment Guide

This guide provides step-by-step instructions to deploy your chat application for free on various platforms.

## Prerequisites

Before deploying, ensure you have:
- A GitHub account
- A MongoDB database (MongoDB Atlas free tier recommended)
- Environment variables configured

## Environment Variables Setup

Create a `.env` file in your project root with the following variables:

```env
NODE_ENV=production
PORT=10000
MONGO_CONNECTION_STRING=your_mongodb_connection_string
COOKIE_SECRET=your_cookie_secret_key
```

### Getting MongoDB Connection String

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free account
3. Create a new cluster (free tier)
4. Click "Connect" on your cluster
5. Choose "Connect your application"
6. Copy the connection string
7. Replace `<password>` with your database user password
8. Replace `<dbname>` with your database name

## Deployment Options

### Option 1: Render (Recommended - Free Tier)

Render offers a generous free tier with automatic deployments from GitHub.

#### Steps:

1. **Prepare Your Repository**
   - Ensure your code is pushed to GitHub
   - Verify `render.yaml` exists in your project root

2. **Deploy on Render**
   - Go to [render.com](https://render.com)
   - Sign up with your GitHub account
   - Click "New +" and select "Web Service"
   - Connect your GitHub repository
   - Render will automatically detect the `render.yaml` configuration

3. **Configure Environment Variables**
   - In your Render dashboard, go to your service
   - Navigate to "Environment" tab
   - Add the following environment variables:
     - `NODE_ENV`: `production`
     - `PORT`: `10000`
     - `MONGO_CONNECTION_STRING`: Your MongoDB connection string
     - `COOKIE_SECRET`: A random secret string

4. **Deploy**
   - Click "Create Web Service"
   - Render will automatically build and deploy your application
   - Your app will be available at `https://your-app-name.onrender.com`

### Option 2: Railway (Free Tier)

Railway provides easy deployment with automatic scaling.

#### Steps:

1. **Prepare Your Repository**
   - Ensure your code is pushed to GitHub
   - Verify `railway.json` exists in your project root

2. **Deploy on Railway**
   - Go to [railway.app](https://railway.app)
   - Sign up with your GitHub account
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository

3. **Configure Environment Variables**
   - In your Railway dashboard, go to "Variables" tab
   - Add the following environment variables:
     - `NODE_ENV`: `production`
     - `PORT`: `10000`
     - `MONGO_CONNECTION_STRING`: Your MongoDB connection string
     - `COOKIE_SECRET`: A random secret string

4. **Deploy**
   - Railway will automatically detect the configuration and deploy
   - Your app will be available at the provided URL

### Option 3: Heroku (Free Tier - Limited)

**Note**: Heroku's free tier has been discontinued, but you can still deploy with their paid plans.

#### Steps:

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

5. **Deploy**
   ```bash
   git push heroku main
   ```

### Option 4: Vercel (Free Tier)

Vercel is great for Node.js applications with automatic deployments.

#### Steps:

1. **Prepare for Vercel**
   - Create a `vercel.json` file in your project root:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "app.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/app.js"
    }
  ]
}
```

2. **Deploy on Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign up with your GitHub account
   - Click "New Project"
   - Import your GitHub repository
   - Configure environment variables in the dashboard
   - Deploy

### Option 5: Netlify (Free Tier)

Netlify can host Node.js applications with serverless functions.

#### Steps:

1. **Prepare for Netlify**
   - Create a `netlify.toml` file:

```toml
[build]
  command = "npm install"
  publish = "public"

[[redirects]]
  from = "/*"
  to = "/.netlify/functions/app"
  status = 200

[functions]
  directory = "functions"
```

2. **Create Serverless Function**
   - Create a `functions` folder
   - Move your app logic to a serverless function

3. **Deploy**
   - Connect your GitHub repository to Netlify
   - Configure environment variables
   - Deploy

## Post-Deployment Checklist

After deploying, verify:

- [ ] Application is accessible at the provided URL
- [ ] Database connection is working
- [ ] User registration and login work
- [ ] Real-time chat functionality works
- [ ] File uploads work (if applicable)
- [ ] Environment variables are properly set
- [ ] SSL certificate is active (https)

## Troubleshooting

### Common Issues:

1. **Database Connection Failed**
   - Verify MongoDB connection string
   - Check if IP whitelist includes deployment platform
   - Ensure database user has proper permissions

2. **Environment Variables Not Working**
   - Double-check variable names (case-sensitive)
   - Restart the application after adding variables
   - Verify variables are set in the correct environment

3. **Port Issues**
   - Most platforms use `process.env.PORT`
   - Ensure your app listens on the correct port
   - Check platform-specific port requirements

4. **Build Failures**
   - Check if all dependencies are in `package.json`
   - Verify Node.js version compatibility
   - Check build logs for specific errors

## Security Considerations

1. **Environment Variables**
   - Never commit `.env` files to version control
   - Use strong, unique values for secrets
   - Rotate secrets regularly

2. **Database Security**
   - Use strong database passwords
   - Enable MongoDB Atlas security features
   - Restrict IP access when possible

3. **Application Security**
   - Keep dependencies updated
   - Use HTTPS in production
   - Implement proper input validation

## Monitoring and Maintenance

1. **Set up monitoring** (optional)
   - Use platform-specific monitoring tools
   - Set up error tracking (Sentry, etc.)
   - Monitor application performance

2. **Regular maintenance**
   - Update dependencies regularly
   - Monitor database usage
   - Check application logs

## Support

If you encounter issues:
1. Check the platform's documentation
2. Review application logs
3. Verify environment configuration
4. Test locally with production settings

---

**Recommended Platform**: Render or Railway for the best free tier experience with Node.js applications. 