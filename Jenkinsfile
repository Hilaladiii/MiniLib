pipeline{
    agent any

    tools{
        maven "maven_3_6_2"
    }

    environment {
        FRONTEND_DIR = 'frontend'
        BACKEND_DIR = 'backend'        

    }

    stages{
        stage('Checkout'){
            steps{
                checkout scm
            }
        }
        stages('Sast Scan'){
            stage('frontend scan'){
                steps{
                    dir('frontend'){
                        sh """                    
                        sonar-scanner
                        """
                    }
                }
            }
            stage('Sast Scan backend'){
                steps{
                    dir('backend'){
                        sh """                      
                        sonar-scanner
                        """
                    }                
                }
            }        
        }        
        stage('Deploy') {        
            steps {
                withCredentials([
                    file(credentialsId: 'backend-env', variable: 'ENV_FILE_BE'),
                    file(credentialsId: 'frontend-env', variable: 'ENV_FILE_FE')
                ]) {
                    script {
                        try{
                        sh """
                            cp ${ENV_FILE_BE}  backend/.env
                            cp ${ENV_FILE_FE} frontend/.env
                            docker compose up -d --build --force-recreate                            
                        """
                        }
                        catch(Exception e){
                            echo "Deployment failed ${e.message}"                            

                        }
                    }
                }
            }
        }
    }

    post{
        success{
            echo "Deployment completed successfully!"
        }
        failure{
            echo "Deployment failed. Check logs for details"
        }        
        always{
            cleanWs()
        }
    }
}