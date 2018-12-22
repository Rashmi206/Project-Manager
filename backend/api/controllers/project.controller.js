const projectSchema = require("../models/project.model");

exports.list_projects = function (req, res) {
    projectSchema.find({}, function (err, projects) {
        if (err)
            console.log(err);
        res.json(projects);
    });
}

exports.get_project = function (req, res) {
    projectSchema.findById(req.params.id, function (err, project) {
        if (err)
            console.log(err);
        res.json(project);
    });
}

exports.save_project = function (req, res) {
    var projectInstance = new projectSchema(req.body);
    projectInstance.save(function (err, project) {
        if (err)
            console.log(err);
        res.json(project);
    });
}

exports.update_project = function (req, res) {
    projectSchema.findByIdAndUpdate(req.params.id, req.body, { new: true }, function (err, project) {
        if (err)
            console.log(err);
        res.json(project);
    });
}

exports.delete_project = function (req, res) {
    projectSchema.findByIdAndDelete(req.params.id, function (err, project) {
        if (err)
            console.log(err);
        res.json(project);
    });
}