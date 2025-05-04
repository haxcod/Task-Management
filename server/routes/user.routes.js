const UserController = require('../controllers/user.controller');


const routes = (data) => {
    data.post('/api/v1/register', UserController.registrationUserResponse);
    data.post('/api/v1/login', UserController.loginUserResponse);
}

module.exports = routes