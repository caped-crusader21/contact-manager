const { constants } = require("../errorConstants.js");

const errorHandler = (error, request, response, next) => {
  const statusCode = response.statusCode && response.statusCode !== 200 ? response.statusCode : 500;

  switch (statusCode) {
    case constants.VALIDATION_ERROR:
      return response.status(statusCode).json({ 
        title: "Validation Error",
        message: error.message,
        stackTrace: error.stack,
      });

    case constants.UNAUTHORIZED:
      return response.status(statusCode).json({
        title: "Unauthorized Access",
        message: error.message,
        stackTrace: error.stack,
      });

    case constants.FORBIDDEN:
      return response.status(statusCode).json({
        title: "Forbidden Access",
        message: error.message,
        stackTrace: error.stack,
      });

    case constants.NOT_FOUND:
      return response.status(statusCode).json({
        title: "Not Found",
        message: error.message,
        stackTrace: error.stack,
      });

    default:
      return response.status(statusCode).json({
        title: "Server Error",
        message: error.message,
        stackTrace: error.stack,
      });
  }
};

module.exports = errorHandler;
