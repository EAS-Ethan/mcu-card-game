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
                            sh '''#!/busybox/sh
                            /kaniko/executor -f `pwd`/Dockerfile -c `pwd` --insecure --skip-tls-verify --cache=false --destination=registry.easlab.co.uk/ethan/mcu-game'''
                    }
                }
            }
        }
        stage('K8s staging deploy') {
            environment {
                NAMESPACE = "mcu-game"
                PROJECT_ID = "c-h7csv:p-g56s2"
            }
            steps {
                container(name: 'kube') {
                    // Deploy to k8s cluster
                    script {
                        kubernetesDeploy configs: "manifests/*.yml", kubeconfigId: 'e786a663-3cf9-4d09-ba13-31c70fc11b87'
                    }
                }
            }
        }
    }
}
