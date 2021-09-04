const { Thought } = require("../models");

const thoughtController = {
    // get all thoughts
    getAllThought(req, res) {
        Thought.find({})
        .then((dbThoughtData) => res.json(dbThoughtData))
        .catch((err) => {
            console.log(err);
        });
    },
    // get one thought by id
    getThoughtById({ params }, res) {
        Thought.findOne({_id: params.id })
        .then((dbThoughtData) => {
            // if no though is found send 404 err msg
            if (!dbThoughtData) {
                res.status(404).json({ message: "No thought found with this id!"});
                return;
            }
            res.json(dbThoughtData)
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json(err);
        })
    },
    //create A Thought
    createThought({ body }, res) {
        Thought.create(body)
        .then((dbThoughtData) => res.json(dbThoughtData))
        .catch((err) => res.status(400).json(err));
    },
    // update thought by id
    // update
} 


