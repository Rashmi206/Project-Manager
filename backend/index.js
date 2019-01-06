const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const config = require("./config");
const userRoutes = require("./api/routes/user.route");
const projectRoutes = require("./api/routes/project.route");
const parentRoutes = require("./api/routes/parent.route");
const taskRoutes = require("./api/routes/task.route");

const app = express();

mongoose.connect(config.mongodb, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("MongoDB connection successfully established");
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());
userRoutes(app);
projectRoutes(app);
parentRoutes(app);
taskRoutes(app);

app.listen(config.serverport, () => {
    console.log('Project Manager Server started on port: ' + config.serverport);
});

module.exports = app;