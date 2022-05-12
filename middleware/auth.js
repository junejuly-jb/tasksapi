const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => { 
     if (req.headers.authorization) { 
          const token = req.headers.authorization.split(' ')[1];
     }
     else {
          return res.status(401).json({ "status": 401, "success": false, "message": "Authentication failed" });
     }
     
     const token = req.headers.authorization.split(' ')[1];
     try {
          const verify = jwt.verify(token, '@thisISAuthenticationPASSPHRASE');
          req.user = verify._id;
          req.userName = verify.name;
          next();
     } catch (error) {
          return res.status(401).json({"status": 401, "success": false, "message": "Authentication failed" });
     }
}