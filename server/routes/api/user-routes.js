//creating the routes for users
//importing express router to handle the routes for the users
const router = require('express').Router();
//importing the controllers
const {
    getAllUsers,
    updateUser,
    deleteUser,
    createUser,
    loginUser,
    getSingleUser
} = require('../../controllers/user-controller');
//importing the authorization module
const { authMiddleware } = require('../../utils/auth');

router.route('/')
    //get all users route
    .get(getAllUsers)
    //create a new user route
    .post(createUser);

//route to user login
router.route('/login').post(loginUser);

router.route('/me').get(authMiddleware, getSingleUser);

router.route('/:id').get(getSingleUser)
    //update a user route
    .put(updateUser)
    //delete a user route
    .delete(deleteUser);

module.exports = router;