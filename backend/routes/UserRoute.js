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
              // save user token
              user.token = token;
    
           
            res.status(201).json(user);
          
        })
    }catch (err) {
        console.log(err);
      }

    })
    

router.post('/login', async (req,res) => {

try {
    
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

     
      user.token = token;

      
      return res.status(200).json(user);
    }
    
    return res.status(400).send("Invalid Credentials");
  } catch (err) {
    console.log(err);
  }

})

router.post('/logout', (req,res) => {

})

module.exports = router