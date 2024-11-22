pipeline{
    agent any

    environment {
        DOCKER_COMPOSE_FILE = 'docker-compose.yaml'
        FRONTEND_DIR = 'frontend'
        BACKEND_DIR = 'backend'
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
            steps{
                sh "docker-compose up -d"
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