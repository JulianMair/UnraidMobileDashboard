pipeline {
    agent any

    environment {
        REPO_BACKEND = "unraid-dashboard-backend"
        REPO_FRONTEND = "unraid-dashboard-frontend"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        // -------------------------
        // Backend: Tests (Python)
        // -------------------------
        stage('Backend: Tests') {
            agent {
                docker {
                    image 'python:3.9-slim'
                    args '-v /var/run/docker.sock:/var/run/docker.sock'
                }
            }
            steps {
                dir('backend') {
                    sh '''
                        python -m venv .venv
                        . .venv/bin/activate
                        pip install --upgrade pip
                        pip install -r requirements.txt
                        pytest -v
                    '''
                }
            }
        }

        // -------------------------
        // Docker Login
        // -------------------------
        stage('Docker Login') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    sh 'echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin'
                    sh "export DOCKER_USER=${DOCKER_USER}"
                }
            }
        }

        // -------------------------
        // Backend: Build & Push
        // -------------------------
        stage('Build & Push Backend') {
            agent {
                docker { 
                    image 'docker:20-dind' 
                    args '--privileged' 
                }
            }
            steps {
                dir('backend') {
                    sh '''
                        docker build -t $DOCKER_USER/$REPO_BACKEND:latest .
                        docker push $DOCKER_USER/$REPO_BACKEND:latest
                    '''
                }
            }
        }

        // -------------------------
        // Frontend: Build with Node + Copy dist to Nginx
        // -------------------------
        stage('Build & Push Frontend') {
            agent {
                docker { 
                    image 'node:20-alpine' 
                    args '-v /var/run/docker.sock:/var/run/docker.sock' 
                }
            }
            steps {
                dir('frontend') {
                    sh '''
                        # Build mit Node
                        npm install
                        npm run build

                        # Nginx Dockerfile erstellen und dist kopieren
                        echo "FROM nginx:alpine
                        COPY dist /usr/share/nginx/html
                        EXPOSE 80" > Dockerfile.nginx

                        docker build -t $DOCKER_USER/$REPO_FRONTEND:latest -f Dockerfile.nginx .
                        docker push $DOCKER_USER/$REPO_FRONTEND:latest
                    '''
                }
            }
        }
    }

    post {
        failure {
            mail to: 'dev-team@company.local',
                 subject: "Jenkins: Build failed ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                 body: "Build failed. Check Jenkins logs."
        }
    }
}
