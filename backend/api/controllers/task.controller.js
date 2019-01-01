const taskSchema = require("../models/task.model");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

exports.list_tasks = function (req, res) {
    taskSchema.find({}, function (err, tasks) {
        if (err)
            console.log(err);
        res.json(tasks);
    });
}

exports.get_task = function (req, res) {
    taskSchema.findById(req.params.id, function (err, task) {
        if (err)
            console.log(err);
        res.json(task);
    });
}

exports.save_task = function (req, res) {
    var taskInstance = new taskSchema(req.body);
    taskInstance.save(function (err, task) {
        if (err)
            console.log(err);
        res.json(task);
    });
}

exports.update_task = function (req, res) {
    taskSchema.findByIdAndUpdate(req.params.id, req.body, { new: true }, function (err, task) {
        if (err)
            console.log(err);
        res.json(task);
    });
}

exports.delete_task = function (req, res) {
    taskSchema.findByIdAndDelete(req.params.id, function (err, task) {
        if (err)
            console.log(err);
        res.json(task);
    });
}

exports.view_task_by_project = function (req, res) {
    taskSchema.aggregate([{
        $match: { projectId: ObjectId(req.params.id) }
    }, 
    {
        $lookup: {
            from: 'parents',
            localField: 'parentId',
            foreignField: '_id',
            as: 'parentTask'
        }
    },
    {
        $project: {
            _id: 1,
            'task': 1,
            'startDate': 1,
            'endDate': 1,
            'priority': 1,
            'finished': 1,
            'manager': 1,
            'parentTask': { "$ifNull": ["$parentTask.parent", null] }
        }
    }
    ]).exec(function (err, data) {
        if (err) {
            res.send(err);
        }
        else {
            res.json(data)
        }
    })
}