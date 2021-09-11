const router = require('express').Router();

const {
    getAllThought,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    removeReaction
} = require('../../controllers/thought-controller');

// set up Get all and Post at /api/thoughts
router
    .route('/')
    .get(getAllThought)
    .post(createThought);

// set up GET, PUT and DELETE at /api/thoughts/:_id
router
    .route('/:id')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought)

// set up GET PUT at /api/thoughts/:thoughtId/reactions    
router
    .route('/:id/reactions')
    .post(createReaction)
//Delete  reactions    
router
    .route('/:id/reactions/:reactionId')    
    .delete(removeReaction)

module.exports = router