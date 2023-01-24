const {Router} = require("express")
const jwt = require("jsonwebtoken")
const UserModel = require("../models/UserModel")
const router = Router()

router.post('/signUp', async (req,res) => {
    try{
        const {email} = req.body
    
        // Validate user input
        if (!(email)) {
            res.status(400).send("All input is required");
          }
      
          // check if user already exist
          // Validate if user exist in our database
          const oldUser = await UserModel.findOne({ email });
      
          if (oldUser) {
            return res.status(409).send("User Already Exist. Please Login");
          }
    
    
        UserModel.create({email}).then((user)=>{
    
            const token = jwt.sign(
                { _id: user._id, email },
                process.env.TOKEN_KEY,
                {
                  expiresIn: "2h",
                }
              );
              console.log(user);
              // save user token
              user.token = token;
    
            // console.log("user created with success")
            // console.log(user);
            // return new user
            res.status(201).json(user);
            // res.send(JSON.stringify(user))
        })
    }catch (err) {
        console.log(err);
      }
    
        // console.log(data)
        // res.send(data)
    })
    
// Create ToDo
router.post('/login', async (req,res) => {
// Our login logic starts here
try {
    // Get user input
    const { email } = req.body;

    // Validate user input
    if (!(email)) {
      res.status(400).send("All input is required");
    }
    // Validate if user exist in our database
    const user = await UserModel.findOne({ email });

    if (user) {
      // Create token
      const token = jwt.sign(
        { _id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );

      // save user token
      user.token = token;

      // user
      res.status(200).json(user);
    }
    // res.setHeader(name, value)
    // res.status(400).send("Invalid Credentials");
  } catch (err) {
    console.log(err);
  }

})

router.post('/logout', (req,res) => {

})

module.exports = router