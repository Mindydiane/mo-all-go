const router = require('express').Router();

const {
    getAllThought,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    createReaction
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

// set up GET PUT and Delete at /api/thoughts/:thoughtId/reactions    
router
    .route('/:id/reactions')
    .post(createReaction)
    // .delete(deleteReaction)

module.exports = router