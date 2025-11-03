// backend/middleware/errorHandler.js
export default function errorHandler(err, req, res, next) {
  console.error(err.stack);
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode).json({
    message: err.message,
    // only include stack in development
    stack: process.env.NODE_ENV === "production" ? "🥞" : err.stack,
  });
}
