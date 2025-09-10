pipeline {
  agent any

  environment {
    IMAGE_BACKEND = "${env.DOCKER_USER}/${env.REPO_BACKEND}:latest"
    IMAGE_FRONTEND = "${env.DOCKER_USER}/${env.REPO_FRONTEND}:latest"
    REPO_BACKEND = "unraid-dashboard-backend"
    REPO_FRONTEND = "unraid-dashboard-frontend"
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Backend: Tests') {
        dir('backend') {
            sh '''
            python3 -m venv .venv
            . .venv/bin/activate
            pip install --upgrade pip
            pip install -r requirements.txt
            pip install -r requirements-dev.txt
            pytest -v
            '''
        }
    }

    stage('Docker Login') {
      steps {
        withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
          sh 'echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin'
          sh "export DOCKER_USER=${DOCKER_USER}"
        }
      }
    }

    stage('Build & Push Backend') {
      steps {
        dir('backend') {
          sh '''
            docker build -t $DOCKER_USER/${REPO_BACKEND}:latest .
            docker push $DOCKER_USER/${REPO_BACKEND}:latest
          '''
        }
      }
    }

    stage('Build & Push Frontend') {
      steps {
        dir('frontend') {
          sh '''
            docker build -t $DOCKER_USER/${REPO_FRONTEND}:latest .
            docker push $DOCKER_USER/${REPO_FRONTEND}:latest
          '''
        }
      }
    }
  }

  post {
    failure {
      mail to: 'dev-team@company.local', subject: "Jenkins: Build failed ${env.JOB_NAME} #${env.BUILD_NUMBER}", body: "Build failed. Check Jenkins."
    }
  }
}
