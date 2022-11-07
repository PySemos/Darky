const User = require("../models/user");

// Method to get all users or a single user
const usersGet = async (req, res) => {
  try {
    const { id, limit = 5, offset = 0 } = req.query;
    const query = { active: true };
    if (id) return res.json(await User.findById(id));

    let [count, users] = await Promise.all([
      User.countDocuments(query),
      User.find(query).skip(offset).limit(limit),
    ]);

    res.json({ count, users });
  } catch (err) {
    res.json({ msg: "An error ocurred while searching for a user" });
  }
};

// Method to create a new user
const usersPost = async (req, res) => {
  try {
    let newUser = new User({ ...req.body });
    await newUser.save();
    req.session.username = newUser.username;
    res.status(200).json({ sucess: true, newUser });
  } catch (err) {
    res.status(500).json({ msg: "An error ocurred while creating a user" });
  }
};

// Method to update a user
const usersUpdate = async (req, res) => {
  try {
    let id = req.params.id;
    let user = await User.findByIdAndUpdate(id, { ...req.body });
    res.json(user);
  } catch (err) {
    res.status(500).json({ msg: "An error occurred while updating the user" });
  }
};

// Method to delete a user
const usersDelete = async (req, res) => {
  try {
    let id = req.params.id;
    let user = await User.findOneAndUpdate({ _id: id }, { active: false });
    res.json(user);
  } catch (err) {
    res.status(500).json({ msg: "An error occurred while deleting a user" });
  }
};

// Export my methods
module.exports = {
  usersGet,
  usersPost,
  usersUpdate,
  usersDelete,
};
