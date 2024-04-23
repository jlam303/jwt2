const User = require('../models/User');
const readUsers = async (req, res) => {
  try {
    let answer = await User.find({});
    res.json(answer);
  } catch (err) {}
};

const createUsers = async (req, res) => {
  try {
    const { email, password } = req.body;
    let item = await User.findOne({ email: email });
    let allUsers = await User.find({});
    if (!email || !password) {
      console.log('not all fields are filled out');
      return res.json({
        data: [],
        success: false,
        msg: 'Please fill out all fields',
      });
    } else if (item != null) {
      console.log('a user with that email already exists');
      return res.json({
        data: [],
        success: false,
        msg: "that email's already taken, try another",
      });
    } else {
      let itemTwo = await User.create({
        email: email,
        id: allUsers.length + 1,
        password: password,
      });
      res.json({ success: true, data: itemTwo });
    }
  } catch (err) {
    console.log(err);
  }
};

const updateUsers = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, age } = req.body;
    let answer = await User.find({});
    const answer2 = answer.find((User) => {
      return User.userId === Number(id);
    });
    if (!answer2) {
      return express.json({ success: false, data: [] });
    }
    if (age == -5) {
      await User.findByIdAndUpdate({ _id: answer2._id }, { assigned: name });
    } else {
      await User.findByIdAndUpdate(
        { _id: answer2._id },
        { name: name, age: age }
      );
    }

    res.status(202).json({ success: true });
  } catch (err) {
    console.log(err);
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    if (id == -2) {
      await User.deleteMany({});
    }
    let answer = await User.find({});
    const answer2 = answer.find((User) => {
      return User.userId === Number(id);
    });
    if (!answer2) {
      return res.json({ success: false, data: [] });
    }
    const newUsers = await User.findByIdAndDelete({ _id: answer2._id });
    res.status(202).json({ data: newUsers, success: true });
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  readUsers,
  createUsers,
  updateUsers,
  deleteUser,
};
