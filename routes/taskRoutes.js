const express = require("express");
const Task = require("../model/task")
const router = express.Router();
const { getUser } = require("../service/auth");


router.get("/tasks",async (req,res) => {
    try{
        const tasks = await Task.find({createdBy: req.user._id});
        res.json(tasks);
    }catch(err){
        res.status(500).json({message: err.message});
    }
})
router.get("/tasks/:id",async (req,res) => {
    const id = req.params.id;
    try{
        const tasks = await Task.findById(id);
        res.json(tasks);
    }catch(err){
        res.status(500).json({message: err.message});
    }
})
router.post("/tasks",async (req,res) => {
    try{
        const {title,description} = req.body;
        // console.log(req.body.title);
        const newTask =   await Task.create({
            title,description,createdBy: req.user._id,
        })
        res.status(201).json(newTask);
    }catch (err) {
        res.status(400).json({ message: err.message });
    }
})

router.put("/tasks/:id",async (req,res) => {
    const id = req.params.id;
    const { title, description, completed } = req.body;
    try{
        const task = await Task.findByIdAndUpdate(id,{ title, description, completed },{new:true});
        if(!task) return res.status(404).json({message: "Task Not Found"});
        res.json(task);
    }catch(err){
        res.status(400).json({ message: err.message });
    }
})

router.delete("/tasks/:id",async (req,res) => {
    const id = req.params.id;
    try{
        const task = await Task.findByIdAndDelete(id);
        if (!task) return res.status(404).json({ message: 'Task not found' });
        res.json({ message: 'Task deleted' });
    }catch(err){
        res.status(400).json({ message: err.message });
    }
})

module.exports = router