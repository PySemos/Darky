const User = require("../models/user");

const emailIsUnique = async (email)=>{
    try{
      const allUsers = await User.find({})
      for(let i = 0;i<allUsers.length;i++){
        if(allUsers[i].email == email){
          return false
        }
      }
      return true    
    }catch{
      return false
    }
}

const userIsUnique = async(username)=>{
    try{
      const allUsers = await User.find({})
      for(let i = 0;i<allUsers.length;i++){
        if(allUsers[i].username == username){
          return false
        }
      }
      return true
    }
    catch(e){
      console.log(e)
      return false
    }
}

// Method to get all users or a single user

const usersGet = async (req, res) => {
  try {
    const { id, username, limit = 5, offset = 0 } = req.query;
    const query = { active: true };
    if (id) return res.json({sucess:true,user:await User.findById(id)});
    if(username) return res.json({sucess:true,user:await User.findOne({username:username})})

    let [count, users] = await Promise.all([
      User.countDocuments(query),
      User.find(query).skip(offset).limit(limit),
    ]);

    res.json({sucess:true,data:{ count, users }});
  } catch (err) {
    res.json({sucess:false, error: "An error ocurred while searching for a user" });
  }
};

// Method to create a new user
const usersPost = async (req, res) => {
  try {
    if(req.body.email == ''){
      req.body.email = null
    }
    let newUser = new User({ ...req.body });
    await newUser.save();
    console.log(newUser)
    req.session.username = newUser.username;
    res.status(200).json({ sucess: true, newUser });
  } catch (err) {
    res.status(500).json({ sucess:false,error: "An error ocurred while creating a user" });
  }
};

// Method to update a user
const usersUpdate = async (req, res) => {
  try {
    let id = req.params.id;
    let user = await User.findByIdAndUpdate(id, { ...req.body });
    res.json({
      sucess:true,
      oldUser:user
    });
  } catch (err) {
    res.status(500).json({sucess:false, error: "An error occurred while updating the user" });
  }
};

// Method to delete a user
const usersDelete = async (req, res) => {
  try {
    let id = req.params.id;
    let user = await User.findOne({ _id: id })
    if(user.password === req.body.password){
      user.remove()
      res.json({sucess:true});
    }
    else{
      res.json({sucess:false,error:"Password doesn't match"})
    }
  } catch (err) {
    res.status(500).json({sucess:false ,error: "An error occurred while deleting a user" });
  }
};

// Export my methods
module.exports = {
  usersGet,
  usersPost,
  usersUpdate,
  usersDelete,
  userIsUnique,
  emailIsUnique
};
