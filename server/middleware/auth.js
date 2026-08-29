const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }
  const token = authHeader.split(" ")[1];
  
  // Bypass JWT check for local demo tokens
  if (token && token.startsWith("demo_token_")) {
    const role = token.split("_")[2] || "candidate";
    req.user = {
      id: role === "admin" ? "65ef49b80000000000000003" : role === "recruiter" ? "65ef49b80000000000000002" : "65ef49b80000000000000001",
      role: role
    };
    return next();
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id, role }
    next();
  } catch (err) {
    return res.status(401).json({ message: "Not authorized, token invalid" });
  }
};

const authorize = (...roles) => (req, res, next) => {
  // Bypass role authorization check for local demo mode to allow seamless testing
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.includes("demo_token_")) {
    return next();
  }

  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ message: "Forbidden: insufficient role" });
  }
  next();
};

module.exports = { protect, authorize };
