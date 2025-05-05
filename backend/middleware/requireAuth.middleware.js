const User = require("../models/User");
const jwt = require("jsonwebtoken")
const { sendResponse } = require("../utils/utils");

const requireAuth = async (req, res, next) => {
  const token = req.cookies.jwt;
  

  if (!token) {
    req.user = null;
    return sendResponse(res, 401, false, "Unauthorized - No token provided.");
  }

  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  // console.log(decodedToken);
  

  if (!decodedToken) {
    req.user = null;
    return sendResponse(res, 401, false, "Unauthorized - Invalid Token.");
  }

  const user = await User.findById(decodedToken._id);

  if (!user) {
    req.user = null;
    return sendResponse(res, 401, false, "Unauthorized - Invalid Token.");
  }

  req.user = decodedToken._id;
  next();
};

module.exports = { requireAuth };
