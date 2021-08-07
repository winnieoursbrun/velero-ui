# WIP - velero-ui

![Backups Scrennshot](./content/backups.png)

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
cd json-server
json-server --watch db.js --routes routes.json -p 8081
cd ..
yarn serve
```

### Run local cluster
```
cd /tmp
wget https://raw.githubusercontent.com/tellesnobrega/velero-demo/master/minio.credentials
minikube start
git clone https://github.com/kubernetes-sigs/sig-storage-local-static-provisioner.git 
cd sig-storage-local-static-provisioner/
helm install local-storage --namespace velero ./helm/provisioner
velero backup create backup1

docker build . -t velero-build --target build-stage
docker build . -t velero --cache-from velero-build
docker-compose up -d

kubectl get secret -n velero velero-token-btkdf -o yaml
```

### Compiles and minifies for production
```
yarn build
```

### Run your unit tests
```
yarn test:unit
```

### Run your end-to-end tests
```
yarn test:e2e
```

### Lints and fixes files
```
yarn lint
```
