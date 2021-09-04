const router = require('express').Router();

const {
    getAllUser,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} = require('../../controllers/user-controller');

// Set up Get all and Post at /api/user
router
    .route('/')
    .get(getAllUser)
    .post(createUser);

// set up GET and, PUT, and DELETE at /api/user/:id
router
    .route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser)

//set up POST and DELETE at /api/user/:id/friends/friendId
router
    .route('/:id/friends/:friendId')
    .post(createFriend) 
    .delete(deleteFriend)   

module.exports = router