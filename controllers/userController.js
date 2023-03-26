const { User, Thought } = require('../models');

module.exports = {
    //Get all users
    getUsers(req, res) {
        User.find()
        .then((users) => res.json(users))
        .catch((err) => res.status(500).json(err));
    },
    //Get a single user by id
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
        .then((user) => 
            !user
            ? res.status(404).json({ message: 'No user found with this id!' })
            : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },
    //Create a new user
    createUser(req, res) {
        User.create(req.body)
        .then((user) => res.json(user))
        .catch((err) => res.status(500).json(err));
    },
    //Update a user by id
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
        .then((user) =>
            !user
            ? res.status(404).json({ message: 'No user found with this id!'})
            : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },
    //Delete a user by id
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
       .then((user) =>
            !user
            ? res.status(404).json({ message: 'No user found with this id!'})
            : res.json(user)
        )
       .catch((err) => res.status(500).json(err));
    },
    //Add a friend
    addFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.params.friendId } },
            { runValidators: true, new: true }
        )
      .then((user) =>
            !user
            ? res.status(404).json({ message: 'No user found with this id!'})
            : res.json(user)
        )
      .catch((err) => res.status(500).json(err));
    },
    //Remove a friend
    removeFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            { runValidators: true, new: true }
        )
     .then((user) =>
            !user
            ? res.status(404).json({ message: 'No user found with this id!'})
            : res.json(user)
        )
     .catch((err) => res.status(500).json(err));
    }
};