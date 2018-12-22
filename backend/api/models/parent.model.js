const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ParentSchema = new Schema({
    parent: {
        type: String,
        required: true
    },
    projectId: {
        type: Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    }
});

const Parent = mongoose.model('Parent', ParentSchema);
module.exports = Parent;