#!groovy

node {

    registry_url = "https://index.docker.io/v1/"
    docker_creds_id = "1"
    build_tag = "latest"

    stage 'Git'
    step([$class: 'WsCleanup'])
    git([ url: 'https://github.com/kinoreel/kino-frontend.git', branch: "${env.BRANCH_NAME}"])

    docker.withRegistry("${registry_url}", "${docker_creds_id}") {
        maintainer_name = "kinoreel"
        container_name = "frontend"
        stage "Building Docker image"
        image = "${maintainer_name}/${container_name}:${build_tag}"
        container = docker.build("${image}")

        if ("${env.BRANCH_NAME}" == "${env.BRANCH_NAME}")
        {
            stage "Pushing Docker image"
            container.push()
        }

        currentBuild.result = 'SUCCESS'
    }
    stage 'Clean docker image'
    sh 'docker rmi kinoreel/frontend --force'

    if ("${env.BRANCH_NAME}" == "${env.BRANCH_NAME}")
    {
        stage 'Deploy application'
        milestone()
        input message: "Proceed?"
        milestone()
        sh 'cd charts; sh deploy.sh'
    }
}