pipeline {
    agent any

    stages {

        stage('Check Environment') {
            steps {
                sh 'docker version'
                sh 'docker compose version'
            }
        }

        stage('Build & Deploy') {
            steps {
                sh '''
                docker compose down || true
                docker compose up -d --build
                '''
            }
        }
    }

    post {
        success {
            echo '✅ Application deployed successfully'
        }
        failure {
            echo '❌ Pipeline failed'
        }
    }
}

