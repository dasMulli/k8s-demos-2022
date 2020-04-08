#!/bin/sh

# Update nginx repo
helm repo add nginx-stable https://helm.nginx.com/stable
helm repo update

# Create a namespace for your ingress resources
kubectl create namespace ingress

# Use Helm to deploy an NGINX ingress controller
helm install ingress-nginx nginx-stable/nginx-ingress \
    --namespace ingress \
    --set controller.replicaCount=2 \
    --set controller.nodeSelector."beta\.kubernetes\.io/os"=linux \
    --set defaultBackend.nodeSelector."beta\.kubernetes\.io/os"=linux \
    --set controller.setAsDefaultIngress=true