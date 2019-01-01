const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const parentSchema = require("../models/parent.model");
const taskSchema = require("../models/task.model");

const ProjectSchema = new Schema({
    project: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        default: Date.now
    },
    endDate: {
        type: Date,
        default: +new Date() + 24 * 60 * 60 * 1000
    },
    priority: {
        type: Number,
        min: 0,
        max: 30,
        default: 0,
        required: true
    },
    manager: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

ProjectSchema.pre('remove', function (next) {
    parentSchema.remove({ projectId: this._id }).exec();
    taskSchema.remove({ projectId: this._id }).exec();
})

const Project = mongoose.model('Project', ProjectSchema);
module.exports = Project;