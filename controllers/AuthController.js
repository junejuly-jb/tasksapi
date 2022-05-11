const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { registrationValidator, loginValidator } = require('../helpers/helper');

const register = async (req, res) => { 
    const { error } = registrationValidator(req.body);
    if (error) return res.status(400).json({
        "success": false,
        "message": error.details[0].message
    });

     const emailExist = await User.findOne({ email: req.body.email });
     if (emailExist) return res.status(400).json({
          "success": false,
          "message": 'This email address is already in use.'
     });

     const salt = await bcrypt.genSalt(10);
     const hashedPassword = await bcrypt.hash(req.body.password, salt);

     const user = new User({
          name: req.body.name,
          email: req.body.email,
          password: hashedPassword,
          initials: getInitials(req.body.name)
     });

     try {
          await user.save();
          return res.status(200).json({ "success": true, "message": "User registered successfully" });
     } catch (error) {
         return res.status(400).json({
            "success": false,
            "message": error.message
        });
     }
}


const login = async (req, res) => {
     const { error } = loginValidator(req.body);
     if (error) return res.status(400).json({
          "success": false,
          "message": error.details[0].message
     });

     const user = await User.findOne({ email: req.body.email });
     if (!user) return res.status(400).json({
          "success": false,
          "message": 'Email or password is incorrect'
     });

     const validPass = await bcrypt.compare(req.body.password, user.password);
     if (!validPass) return res.status(400).json({
          "success": false,
          "message": 'Email or password is incorrect'
     });

     const token = jwt.sign({ _id: user._id, name: user.name }, '@thisISAuthenticationPASSPHRASE', { expiresIn: '7d' });
     const exp = jwt.decode(token);
     return res.status(200).json({ "success": true, "message": "User logged in successfully", token, "expiry": exp.exp });

}

const getInitials = (name) => {
     var parts = name.split(' ')
     var initials = ''
     for (var i = 0; i < parts.length; i++) {
          if (parts[i].length > 0 && parts[i] !== '') {
               initials += parts[i][0]
          }
     }
     return initials
}
 
module.exports = { register, login };