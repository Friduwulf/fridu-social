const { User, Thought } = require('../models');

module.exports = {
    //Get all Thoughts
    getThoughts(req, res) {
        Thought.find()
        .then(thoughts => res.json(thoughts))
        .catch((err) => res.status(500).json(err));
    },
    //Get a single Thought
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
        .select('-__v')
        .then((thought) =>
            !thought
            ? res.status(404).json({ message: 'No thought found with this id!' })
            : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },
    //Create a new Thought
    createThought(req, res) {
        Thought.create(req.body)
        .then((dbThoughtData) => 
            !dbThoughtData
            ? res.status(404).json({ message: 'No thought found with this id'})
            : User.findOneAndUpdate(
                { _id: req.body.userId },
                { $push: { thoughts: dbThoughtData._id } },
                { runValidators: true, new: true }
            ))
            .then(() => res.jston({ message: 'Thought created!' }))
            .catch((err) => res.status(500).json(err));
    },
    //Update a Thought
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
      .then((dbThoughtData) =>
          !dbThoughtData
          ? res.status(404).json({ message: 'No thought found with this id!' })
            : res.json(dbThoughtData)
        )
      .catch((err) => res.status(500).json(err));
    },
    //Delete a Thought
    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((dbThoughtData) =>
          !dbThoughtData
          ? res.status(404).json({ message: 'No thought found with this id!' })
            : User.findOneAndUpdate(
                { _id: req.body.userId },
                { $pull: { thoughts: req.params.thoughtId } },
                { runValidators: true, new: true }
            ))
          .then(() => res.json({ message: 'Thought deleted!' }))
          .catch((err) => res.status(500).json(err));
    },
    //Add a reaction to a Thought
    addReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $push: { reactions: req.body } },
            { runValidators: true, new: true }
        )
     .then((dbThoughtData) =>
         !dbThoughtData
         ? res.status(404).json({ message: 'No thought found with this id!' })
            : res.json(dbThoughtData)
        )
     .catch((err) => res.status(500).json(err));
    },
    //Delete a reaction from a Thought
    deleteReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { runValidators: true, new: true }
        )
    .then((dbThoughtData) =>
        !dbThoughtData
        ? res.status(404).json({ message: 'No thought found with this id!' })
            : res.json(dbThoughtData)
        )
    .catch((err) => res.status(500).json(err));
    }
};