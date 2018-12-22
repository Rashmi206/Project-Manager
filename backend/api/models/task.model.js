const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const TaskSchema=new Schema({
    task:{
        type:String,
        required:true
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
    status:{
        type:String,
        required:true
    },
    projectId: {
        type: Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    },
    parentId:{
        type:Schema.Types.ObjectId,
        ref:'Parent',
        default:null
    },
    userId:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    }
});

const Task = mongoose.model('Task', TaskSchema);
module.exports = Task;