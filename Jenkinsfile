pipeline{
    agent any

    environment {
        FRONTEND_DIR = 'frontend'
        BACKEND_DIR = 'backend'
        ENV_FRONTEND = credentials('frontend-env')
        ENV_BACKEND = credentials('backend-env')

    }

    stages{
        stage('Checkout'){
            steps{
                checkout scm
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

        stage('Deploy'){
            withCredentials([file(credentialsId:'backend-env', variable:'ENV_FILE_BE'),file(credentialsId:'frontend-env', variable:'ENV_FILE_FE')]){
            steps{
                sh """
                    cp $ENV_FILE_BE backend/ .env
                    cp $ENV_FILE_FE frontend/ .env
                    docker-compose up -d
                """
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