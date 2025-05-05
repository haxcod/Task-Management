const { registrationUser, loginUser,allUsers } = require('../services/user.service');

const registrationUserResponse = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await registrationUser(name, email, password);
    res.status(201).json({
      message: 'User registered successfully',
      err: null,
      success: true,
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(400).json({
      message: 'User registration failed',
      err: error.message || err,
      success: false,
      data: {},
    });
  }
};

const loginUserResponse = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await loginUser(email, password);
    res.status(200).json({
      message: 'User login successful',
      err: null,
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(401).json({
      message: 'Login failed',
      err: error.message,
      success: false,
      data: {},
    });
  }
};


const getAllUsersResponse = async (req, res) => {
  try {
    const { userId } = req.query;
    const users = await allUsers(userId);
    res.status(200).json({
      message: 'Users retrieved successfully',
      err: null,
      success: true,
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to retrieve users',
      err: error.message,
      success: false,
      data: {},
    });
  }
}
module.exports = { registrationUserResponse, loginUserResponse,getAllUsersResponse };
