

const jwt = require('jsonwebtoken');

const ValidateToken = (req, res, next) => {
  const token = req.headers.Authentication || req.headers.authentication;

  if (token && token.startsWith('Bearer')) {
    const accessToken = token.split(' ')[1];

    try {
      const decoded = jwt.verify(accessToken, process.env.SECRET);
      console.log(decoded)
      req.user = decoded.user;
      // Only call next() when the token is valid
      next();
    } catch (error) {
      return res.status(401).json({ msg: error.message });
    }
  } else {
    return res.status(401).json({ message: 'No access token provided' });
  }
};


module.exports = ValidateToken