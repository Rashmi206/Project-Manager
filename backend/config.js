const config = {
    mongodb: process.env.MONGO_URL || 'mongodb://localhost:27017/ProjectManager',
    serverport: 3000
};

module.exports = config;