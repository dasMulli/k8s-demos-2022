@echo off

REM Update nginx repo
helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
helm repo update

REM Create a namespace for your ingress resources
kubectl create namespace ingress

REM Use Helm to deploy an NGINX ingress controller
helm install ingress-nginx ingress-nginx/ingress-nginx ^
    --version 3.35.0 ^
    --namespace ingress