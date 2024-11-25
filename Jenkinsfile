pipeline{
    agent any

    tools{
        maven "maven_3_6_3"
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
        stage('Sast Scan'){
            steps{
                withCredentials(
                    file(credentialsId: 'sonar_project_key', variable: 'SONAR_PROJECT_KEY'),
                    file(credentialsId: 'sonar_organization', variable: 'SONAR_ORGANIZATION'),
                    file(credentialsId: 'sonar_token', variable: 'SONAR_TOKEN')
                ){
                     sh """mvn clean verify sonar:sonar \
                            -Dsonar.projectkey=${SONAR_PROJECT_KEY} \
                            -Dsonar.organization=${SONAR_ORGANIZATION} \
                            -Dsonar.host.url=https://sonarcloud.io \
                            -Dsonar.login=${SONAR_TOKEN}
                        """
                }
            }
        }
        // stage("Frontend test"){
        //     agent{
        //         docker{
        //             image "node:20.18-alpine"
        //             reuseNode true
        //         }
        //     }
        //     steps{
        //         dir(FRONTEND_DIR){
        //             sh  """
        //                 npm install --legacy-peer-deps                        
        //             """
        //         }
        //     }
        // }
        // stage('Backend test'){
        //     agent{
        //         docker{
        //             image "node:20.18-alpine"
        //         }                
        //     }
        //     steps{
        //         dir(BACKEND_DIR){
        //             sh """
        //                 npm install                       
        //             """
        //         }
        //     }
        // }

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