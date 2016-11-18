#!/bin/bash

cat > web-secrets.build.yml <<EOF
apiVersion: v1
kind: Secret
metadata:
  name: kubernetesQuayLogin
data:
  .dockercfg: ${DOCKER_CONFIG_BASE64}
type: kubernetes.io/dockercfg
EOF

cat > web-service.build.yml <<EOF
apiVersion: v1
kind: Service
metadata:
  name: web-service
spec:
  selector:
    app: gecko
    commit: ${GIT_COMMIT_HASH}
  ports:
    protocol: TCP
    port: 80
EOF

cat > web-rc.build.yml <<EOF
apiVersion: v1
kind: ReplicationController
metadata:
  name: web-controller
spec:
  replicas: 2
  selector:
    app: gecko
    commit: ${GIT_COMMIT_HASH}
  template:
    metadata:
      labels:
        app: gecko
        commit: ${GIT_COMMIT_HASH}
    spec:
      containers:
        - name: gecko-web-production
          image: quay.io/ziplinelabs/gecko-web-${ENV_TAG}:${GIT_COMMIT_HASH}
          ports:
            - containerPort: 80
      imagePullSecrets:
        - name: kubernetesQuayLogin
EOF