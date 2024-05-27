const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;
  let stack = err.stack;

  res.status(statusCode);

  res.json({
    message: message,
    stack: stack,
  });
};

export default errorHandler;
