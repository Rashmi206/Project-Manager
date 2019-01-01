const parentSchema = require("../models/parent.model");

exports.list_parents = function (req, res) {
    parentSchema.find({}, function (err, parents) {
        if (err)
            console.log(err);
        res.json(parents);
    });
}

exports.get_parent = function (req, res) {
    parentSchema.findById(req.params.id, function (err, parent) {
        if (err)
            console.log(err);
        res.json(parent);
    });
}

exports.save_parent = function (req, res) {
    var parentInstance = new parentSchema(req.body);
    parentInstance.save(function (err, parent) {
        if (err)
            console.log(err);
        res.json(parent);
    });
}

exports.update_parent = function (req, res) {
    parentSchema.findByIdAndUpdate(req.params.id, req.body, { new: true }, function (err, parent) {
        if (err)
            console.log(err);
        res.json(parent);
    });
}

exports.delete_parent = function (req, res) {
    parentSchema.findByIdAndDelete(req.params.id, function (err, parent) {
        if (err)
            console.log(err);
        res.json(parent);
    });
}

exports.get_all_parents_of_project = function (req, res) {
    parentSchema.find({ projectId: req.params.id }, function (err, parents) {
        if (err)
            console.log(err);
        res.json(parents);
    })
}