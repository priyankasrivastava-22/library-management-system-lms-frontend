pipeline {
    agent any

    stages {

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build React App') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Verify Build') {
            steps {
                sh 'ls -la build'
            }
        }

    }

    post {
        success {
            echo "Frontend build successful"
        }
        failure {
            echo "Frontend build failed"
        }
    }
}