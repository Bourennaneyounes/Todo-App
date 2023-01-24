const {Router} = require("express")
const ToDoModel = require("../models/ToDoModel")
const router = Router()
const verifyToken = require('../middleware/isLoggedIn')

// get all ToDos
router.get('/:id' ,verifyToken, (req,res) => {
    // console.log(req.params);
    ToDoModel.find({owner :req.params.id}, (err,ToDo) =>{
       
        if (err){
            console.log(err);
        }
        else{
            // console.log("Result : ", ToDo);
            res.send(ToDo)
        }
        
    })
    

})

// Create ToDo
router.post('/createToDo', verifyToken, (req,res) => {
    const {owner,title,description,date} = req.body
    // console.log(req.body)
    const checked = false
    ToDoModel.create({owner,title,description,date,checked}).then((data)=>{

        // console.log("created with success")
        // console.log(data)
        res.send(data)
    }) })

// Update ToDo
router.post('/updateToDo',verifyToken, (req,res) => {
    const {_id, title, description, date} = req.body
    // console.log("success")
    ToDoModel.findByIdAndUpdate(_id, {title,description,date}).then(()=>{
        res.send("update with success")
        // console.log("success")
    }).catch((err) => console.log(err))
    
} )

//Delete ToDo
router.post('/deleteToDo',verifyToken ,(req,res) => {
    const {_id} = req.body

    ToDoModel.findByIdAndDelete(_id).then(()=>{
        res.send("delete with success")
    }).catch((err) => console.log(err))
})

router.post('/checkToDo',verifyToken ,(req,res) => {
    const {_id,checked} = req.body
    ToDoModel.findByIdAndUpdate(_id,{checked}).then((data)=>{
        res.send(data)
    }).catch((err) => console.log(err))
})
module.exports = router