const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async (request, response, next) => {
  let token;
  let authHeader =
    request.headers.Authorization || request.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, decoded) => {
      if (error) {
        response.status(401);
        throw new Error("User is not Authorized");
      }
      request.user = decoded.user;
      next();
    });

    if (!token) {
      response.status(401);
      throw new Error("User is not Authorized or Token is missing");
    }
  }
});

module.exports = validateToken;
