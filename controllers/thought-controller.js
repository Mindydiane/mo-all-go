const { User, Thought } = require("../models");

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
        console.log(body);
        Thought.create(body)
        .then((dbThoughtData) => {
            return User.findOneAndUpdate(
                { userName : body.userName },
                { $push: { thoughts: dbThoughtData._id } },
                { new: true }
            );
        })
        .then (dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No User found with that id!'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
    },
    // update thought by id
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id}, body, { new: true })
        .then((dbThoughtData) => {
            if (!dbThoughtData) {
                res.status(404).json({ message: "No thought found with this id!"});
                return;
            }
            res.json(dbThoughtData);
        })
        .catch((err) => res.status(400).json(err));
    },
    //delete thought
    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id},)
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: "No thought found with this id!" })
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.status(400).json(err));
    },
    //create reaction
    createReaction({ params, body }, res) {
        console.log(body);
        Thought.findOneAndUpdate({_id:params.id}, {$addToSet:{reactions:body }}, {runValidators: true, new:true} )
        .then((dbReactionData) => {
            
            if (!dbReactionData) {
                 return res.status(404).json({ message: 'No reaction found with this id'})
            }
            res.json(dbReactionData)
        })
        
        .catch(err => res.json(err));
    },
    // remove reaction
    removeReaction({ params, body }, res) {
        console.log(params);
        Thought.findOneAndUpdate({_id:params.id}, {$pull:{reactions:{reactionId:params.reactionId} }}, {runValidators: true, new:true} )
        .then((dbReactionData) => {
            
            if (!dbReactionData) {
                 return res.status(404).json({ message: 'No reaction found with this id'})
            }
            res.json(dbReactionData)
        })
        
        .catch(err => res.json(err));
        

    }
};

module.exports = thoughtController;


