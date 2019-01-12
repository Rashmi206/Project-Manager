pipeline {
    agent any

    stages {
        stage('Build Project Manager Frontend') {
            steps {
                echo 'Building Project Manager Frontend..'
                bat 'cd ./frontend/ && npm install && npm run build --prod'
            }
        }
        stage('Build Project Manager Backend') {
            steps {
                echo 'Building Project Manager Backend ..'
                // bat 'cd ./TaskManagerBackend/ && npm install --no-optional && npm run build'
            }
        }
        stage('Testing Project Manager Frontend') {
            steps {
                echo 'Testing Project Manager Frontend...'
                // bat 'npm install pm2 -g'
                // bat 'pm2 start ./TaskManagerBackend/index.js'
                // bat 'cd ./TaskManagerFrontend/ && npm test --single-run true --watch=false' 
                // bat 'pm2 stop index'               
            }
        }
        stage('Testing Project Manager Backend') {
            steps {
                echo 'Testing Project Manager Backend...'
                // bat 'cd ./TaskManagerBackend/ && npm test'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying the application...'
                bat 'docker-compose up --build -d'
            }
        }
    }
}