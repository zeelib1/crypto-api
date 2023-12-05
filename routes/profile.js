// const express = require('express');
// const router = express.Router();
// const User = require('../models/User');
// const verifyToken = require('../middleware/authMiddleware');

// // GET user profile
// router.get('/profile', verifyToken, async (req, res) => {
//   try {
//     // Retrieve the user from the database based on the user ID stored in the token
//     const user = await User.findById(req.userId);

//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     // Return the user profile information
//     res.json({ user });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server Error' });
//   }
// });

// // POST update user profile
// router.post('/profile/edit', verifyToken, async (req, res) => {
//   try {
//     // Retrieve the user from the database based on the user ID stored in the token
//     const user = await User.findById(req.userId);

//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     // Update the user profile information
//     user.name = req.body.name;
//     user.email = req.body.email;

//     // Save the updated user
//     await user.save();

//     // Return the updated user profile information
//     res.json({ user });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server Error' });
//   }
// });

// module.exports = router;
