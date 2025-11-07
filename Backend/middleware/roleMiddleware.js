/*
ATTRIBUTES:
    Website:SecureBlog Activity
    Author: talia0404
    URL: https://github.com/talia0404/INSY7314/tree/main/SecureBlog%20Activity
    Accessed on: 2025-09-29

*/

const requireRole = (roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized: no user found" });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Forbidden: insufficient rights" });
    }

    next();
  };
};

module.exports = { requireRole };
