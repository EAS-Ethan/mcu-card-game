pipeline {
    agent {
        kubernetes {
            label 'kaniko'
            yamlFile 'podspec.yaml'
        }
    }
    stages {
        stage("Build/Push Docker Image") {
            environment {
                PATH = "/busybox:/kaniko:$PATH"
            }
            steps {
                container(name: 'kaniko', shell: '/busybox/sh') {
                    script{
                            REPO_NAME = sh(returnStdout: true, script: "echo ${env.JOB_NAME} | awk -F/ '{print \$2}'").replaceAll('\\s', '')
                            sh '''#!/busybox/sh
                            /kaniko/executor -f `pwd`/Dockerfile -c `pwd` --insecure --skip-tls-verify --cache=false --destination=registry.easlab.co.uk/ethan/mcu-game'''
                    }
                }
            }
        }
    }
}
