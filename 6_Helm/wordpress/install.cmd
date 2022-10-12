@echo off

helm repo add bitnami https://charts.bitnami.com/bitnami


helm repo update


kubectl create ns wordpress


kubectl apply -f password-secret.yaml


helm install wordpress bitnami/wordpress --namespace wordpress -f values.yaml