const UserController = require('../controllers/user.controller');


const routes = (data) => {
    data.post('/api/v1/register', UserController.registrationUserResponse);
    data.post('/api/v1/login', UserController.loginUserResponse);
    data.get('/api/v1/users', UserController.getAllUsersResponse);
}

module.exports = routes