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
                            /kaniko/executor -f `pwd`/Dockerfile -c `pwd` --insecure --skip-tls-verify --cache=false --destination=registry.easlab.co.uk/ethan/$APPNAME'''
                    }
                }
            }
        }
        stage('K8s staging deploy') {
            environment {
                APPNAME = "mcu-game"
            }
            steps {
                container(name: 'kube') {
                    // Deploy to k8s cluster
                    script {
                        kubernetesDeploy configs: "manifests/*.yaml", kubeconfigId: 'kubeconfig'
                    }
                }
            }
        }
    }
}
