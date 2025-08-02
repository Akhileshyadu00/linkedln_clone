import User from '../models/user.js'
import jwt from 'jsonwebtoken';

// REGISTER
export async function register(req, res) {
  try {
    const { userName, email, password} = req.body;

    // Basic validation
    if ( !userName || !email || !password ) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ $or: [{ email }, { userName }] });
    if (existingUser) {
      return res.status(409).json({ message: 'Email or username already in use' });
    }

    // Create new user
    const newUser = new User({
      userName,
      email,
      password,
     
    });

    await newUser.save();

    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: newUser._id,
        userName: newUser.userName,
        email: newUser.email,
        
      },
    });
  } catch (err) {
    console.error('Register error:', err);

    // Handle Mongoose validation errors
    if (err.name === 'ValidationError') {
      const validationErrors = {};
      for (const field in err.errors) {
        validationErrors[field] = err.errors[field].message;
      }
      return res.status(400).json({ message: 'Validation failed', errors: validationErrors });
    }

    res.status(500).json({ message: 'Internal Server Error' });
  }
}


// Login
export async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials (email)' });
    }

    if (typeof user.comparePassword !== 'function') {
      console.error('comparePassword is not defined on user model');
      return res.status(500).json({ message: 'Server misconfiguration: password method missing' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials (password)' });
    }

    if (!process.env.JWT_SECRET) {
      console.error('JWT_SECRET is not defined in environment variables');
      return res.status(500).json({ message: 'Server configuration error' });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
      maxAge: 60 * 60 * 1000,
    });

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        userName: user.userName,
        email: user.email,
      },
    });
  } catch (err) {
    console.error('Login error:', err); // This should log the actual error
    res.status(500).json({ message: 'Internal Server Error' });
  }
}



// LOGOUT
export async function logout(req, res) {
  try {
    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
    });

    res.status(200).json({ message: 'Logged out successfully' });
  } catch (err) {
    console.error('Logout error:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}




//  export async function getUserProfile(req, res) {
//   try {
//     const { id } = req.params;
//     // Exclude password and __v, and populate channel
//     const user = await User.findById(id)
//       .select("-password -__v")
//       .populate("channel");

//     if (!user) {
//       return res.status(404).json({ message: "User not found." });
//     }

//     // channelId is either user.channel?._id or null
//     const channelId = user.channel ? user.channel._id : null;

//     res.status(200).json({
//       user,
//       channelId,
    
//     });
//   } catch (err) {
//     console.error("Get user profile error:", err);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// }





