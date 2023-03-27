const { User, Thought } = require('../models');

module.exports = {
    //Get all Thoughts
    getThoughts(req, res) {
        Thought.find()
        .populate('reactions')
        .then((thoughts) => res.json(thoughts))
        .catch((err) => res.status(500).json(err));
    },
    //Get a single Thought
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
        .populate('reactions')
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
        .then((thought) => 
            !thought
            ? res.status(404).json({ message: 'No thought found with this id'})
            : User.findOneAndUpdate(
                { _id: req.body.userId },
                { $push: { thoughts: thought._id } },
                { runValidators: true, new: true }
            ))
            .then(() => res.json({ message: 'Thought created!' }))
            .catch((err) => res.status(500).json(err));
    },
    //Update a Thought
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
      .then((thought) =>
            !thought
            ? res.status(404).json({ message: 'No thought found with this id!' })
            : res.json(thought)
        )
      .catch((err) => res.status(500).json(err));
    },
    //Delete a Thought
    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((thoughts) =>
          !thoughts
          ? res.status(404).json({ message: 'No thought found with this id!' })
            : User.findOneAndUpdate(
                { _id: req.body.userId },
                { $pull: { reactions: {reactionId: req.params.reactionId } } },
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
     .then((thoughts) =>
         !thoughts
         ? res.status(404).json({ message: 'No thought found with this id!' })
            : res.json(thoughts)
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
    .then((thoughts) =>
        !thoughts
        ? res.status(404).json({ message: 'No thought found with this id!' })
            : res.json(thoughts)
        )
    .catch((err) => res.status(500).json(err));
    }
};