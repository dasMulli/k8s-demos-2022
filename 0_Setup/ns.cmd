@echo off

if "%~1"=="" GOTO PRINTNAMESPACE

: SETNAMESPACE

kubectl config set-context --current --namespace="%~1"

: PRINTNAMESPACE

kubectl config view --minify --output "jsonpath={..namespace}"
