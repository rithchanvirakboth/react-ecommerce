export const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`); // req.originalUrl is the url that was requested
  res.status(404);
  next(error);
}

export const errorHandler = (err, req, res, next) => {
  // if the status code is 200, set it to 500
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message; 

  // if Mongoose not found error, set to 404 and change the message
  if(err.name === "CastError" && err.kind === "ObjectId") {
    statusCode = 404;
    message = "Resource not Found";
  }

  res.status(statusCode).json({
    message: message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};  


