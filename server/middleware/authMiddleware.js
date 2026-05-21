const jwt = require('jsonwebtoken');

// Read secret from env with safe fallback for development
const JWT_SECRET = process.env.JWT_SECRET || 'secretkey';

// Protect routes - expects header: Authorization: <token>
module.exports = (req, res, next) => {
  // Express lower-cases header names
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(401).json({ message: 'No token provided' });
  }

  // Expected format: "Bearer <token>" (case-insensitive)
  const parts = authHeader.split(' ');
  let token = null;

  if (parts.length === 2) {
    const scheme = parts[0];
    const credentials = parts[1];
    if (/^Bearer$/i.test(scheme)) {
      token = credentials;
    } else {
      // If scheme is not Bearer, treat the entire header as token
      token = authHeader;
    }
  } else {
    // If header doesn't contain a space, treat it as raw token
    token = authHeader;
  }

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // attach decoded payload (e.g., { id, role })
    return next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};
