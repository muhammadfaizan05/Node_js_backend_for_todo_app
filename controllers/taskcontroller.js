const TaskSchema = require("../models/task");

// create task 
const newtask = async (req, res, next) => {
    try {
        const { title, description } = req.body;
        TaskSchema.create({
            title, description,
            user: req.user,
        });
        res.status(200).json({
            success: true,
            message: "Task Saved"
        })
    } catch (error) {
        next(error);
    }
}
exports.newtask = newtask;

// get task  of a specific user 
const tasksofoneuse = async (req, res, next) => {
    try {
        const userid = req.user._id;
        const tasks = await TaskSchema.find({ user: userid });
        res.status(200).json({
            success: true,
            data: tasks
        })
    } catch (error) {
        next(error)
    }

}
exports.tasksofoneuse = tasksofoneuse;


// update task  of a user 
const updatetask = async (req, res, next) => {
    try {
        let task = await TaskSchema.findById(req.params.id);
        console.log(task);
        if (!task) return next(new Error("Invalid Id for update"));
        task.iscompleted = !task.iscompleted;
        await task.save();
        res.status(200).json({
            success: true,
            message: "task upated",
            task,
        })
    } catch (error) {
        next(error);
    }

}
exports.updatetask = updatetask;

// delete task  of a  user 
const deletetask = async (req, res, next) => {
    try {
        let task = await TaskSchema.findById(req.params.id);
        if (!task) return next(new Error("Inavlid id for delete"));
        await task.deleteOne();
        res.status(200).json({
            success: true,
            message: "task deleted",
        })
    } catch (error) {
        next(error)
    }

}
exports.deletetask = deletetask;