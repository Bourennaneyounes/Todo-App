const {Router} = require("express")
const ToDoModel = require("../models/ToDoModel")
const router = Router()

// get all ToDos
router.get('/', async (req,res) => {
    const ToDo = await ToDoModel.find()
    res.send(ToDo)

})

// Create ToDo
router.post('/createToDo', (req,res) => {
    const {title,description,date} = req.body
  
    ToDoModel.create({title,description,date}).then((data)=>{

        console.log("created with success")
        console.log(data)
        res.send(data)
    }) })

// Update ToDo
router.post('/updateToDo', (req,res) => {
    const {_id, title, description, date} = req.body

    ToDoModel.findByIdAndUpdate(_id, {title,description,date}).then(()=>{
        res.send("update with success")
    }).catch((err) => console.log(err))
    
} )

//Delete ToDo
router.post('/deleteToDo', (req,res) => {
    const {_id} = req.body

    ToDoModel.findByIdAndDelete(_id).then(()=>{
        res.send("delete with success")
    }).catch((err) => console.log(err))
})
module.exports = router