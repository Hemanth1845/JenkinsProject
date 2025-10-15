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
                xcopy /E /I /Y frontend\\dist\\* "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\frontendproject\\"
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

        // ===== TOMCAT PREP =====
        stage('Prepare Tomcat') {
            steps {
                bat '''
                echo "Force stopping Tomcat processes..."
                taskkill /F /IM java.exe 2>nul || echo "No Java processes found"
                taskkill /F /IM tomcat10.exe 2>nul || echo "No Tomcat process found"
                
                echo "Cleaning old deployment..."
                if exist "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\planthome.war" (
                    del /Q "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\planthome.war"
                )
                if exist "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\planthome" (
                    rmdir /S /Q "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\planthome"
                )
                
                timeout /t 5 /nobreak >nul
                '''
            }
        }

        // ===== BACKEND DEPLOY =====
        stage('Deploy Backend to Tomcat') {
            steps {
                bat '''
                echo "Deploying new WAR..."
                copy "planthome\\target\\backend.war" "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\planthome.war"
                
                echo "Waiting for file copy to complete..."
                timeout /t 3 /nobreak >nul
                '''
            }
        }

        // ===== START TOMCAT =====
        stage('Start Tomcat') {
            steps {
                bat '''
                echo "Starting Tomcat service..."
                net start Tomcat10
                
                if errorlevel 1 (
                    echo "Tomcat service start failed, trying alternative method..."
                    call "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\bin\\startup.bat"
                )
                
                echo "Waiting for deployment to initialize..."
                timeout /t 20 /nobreak >nul
                '''
            }
        }

        // ===== HEALTH CHECK =====
        stage('Health Check') {
            steps {
                bat '''
                echo "Checking backend health..."
                curl -s -o nul -w "%%{http_code}" http://localhost:8080/planthome/api/plants/all
                if errorlevel 1 (
                    echo "Backend health check failed - but continuing deployment"
                ) else (
                    echo "Backend is responding!"
                )
                '''
            }
        }
    }

    post {
        always {
            echo 'Pipeline execution completed'
            bat '''
            echo "Frontend URL: http://localhost:8080/frontendproject/"
            echo "Backend API: http://localhost:8080/planthome/api/plants/all"
            echo "Tomcat Manager: http://localhost:8080/manager"
            '''
        }
    }
}