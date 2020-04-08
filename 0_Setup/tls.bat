@echo off

kubectl create namespace cert-manager

kubectl label namespace cert-manager certmanager.k8s.io/disable-validation=true

helm repo add jetstack https://charts.jetstack.io
helm repo update

helm install ^
  cert-manager jetstack/cert-manager ^
  --namespace cert-manager ^
  --version v1.4.3 ^
  --set installCRDs=true ^
  --set ingressShim.defaultIssuerName=letsencrypt ^
  --set ingressShim.defaultIssuerKind=ClusterIssuer