pipeline {
    agent any

    stages {

        // ===== FRONTEND BUILD =====
        stage('Build Frontend') {
            steps {
                dir('frontend') {
                    bat 'npm install'
                    bat 'npm run build'
                }
            }
        }

        // ===== FRONTEND DEPLOY =====
        stage('Deploy Frontend to Tomcat') {
            steps {
                bat '''
                if exist "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\frontendproject" (
                    rmdir /S /Q "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\frontendproject"
                )
                mkdir "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\frontendproject"
                xcopy /E /I /Y frontend\\dist\\* "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\frontendproject"
                '''
            }
        }

        // ===== BACKEND BUILD =====
        stage('Build Backend') {
            steps {
                dir('planthome') {
                    bat 'mvn clean package -DskipTests'
                }
            }
        }

        // ===== BACKEND DEPLOY =====
        stage('Deploy Backend to Tomcat') {
            steps {
                bat '''
                echo "Stopping Tomcat service..."
                net stop Tomcat10 || echo "Tomcat service was not running"
                
                echo "Cleaning old deployment..."
                if exist "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\planthome.war" (
                    del /Q "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\planthome.war"
                )
                if exist "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\planthome" (
                    rmdir /S /Q "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\planthome"
                )
                
                echo "Deploying new WAR..."
                copy "planthome\\target\\*.war" "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\planthome.war"
                
                echo "Starting Tomcat service..."
                net start Tomcat10
                
                echo "Waiting for deployment to complete..."
                timeout /t 30 /nobreak
                '''
            }
        }

        // ===== HEALTH CHECK =====
        stage('Health Check') {
            steps {
                bat '''
                echo "Checking backend health..."
                curl -f http://localhost:8080/planthome/api/plants/all || echo "Backend health check failed"
                '''
            }
        }

    }

    post {
        success {
            echo 'Deployment Successful!'
            echo 'Frontend: http://your-server:8080/frontendproject'
            echo 'Backend API: http://your-server:8080/planthome/api/plants'
        }
        failure {
            echo 'Pipeline Failed.'
        }
    }
}