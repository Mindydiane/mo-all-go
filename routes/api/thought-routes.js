const router = require('express').Router();

const {
    getAllThought,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought
} = require('../../controllers/thought-controller');

// set up Get all and Post at /api/thought
router
    .route('/')
    .get(getAllThought)
    .post(createThought);

// set up GET, PUT and DELETE at /api/thought/:_id
router
    .route('/:id')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought)

module.exports = router