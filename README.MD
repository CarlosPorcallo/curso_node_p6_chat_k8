# Curso NodeJS - Práctica 5: Chat (Contenerizado en Kubernetes)

Un pequeño cliente chat creado con Node.JS.

## Getting Started

Es necesario tener Docker instalado y corriendo.

Se crea un archivo dotenv `.env`usando el template de ejemplo del proyecto chat:
```code
PORT_SOCKET=3000
PORT_SERVER=3001
HOST="localhost"
VERSION="v1"

MONGO_URI="<query string mongo>"
MONGO_DB="p4_chat"
MONGO_MSG_COLLECTION="mensajes"
MONGO_USR_COLLECTION="usuarios"
MONGO_TKN_COLLECTION="valid_tokens"
DEFAULT_USER_PASSWORD="password123"
TTL_JWT=1800 # 30 minutos
TTL_JWT_STR="30m" # 30 minutos

```
Para inicializar el clúster de Minikube ejecutar el siguiente comando:

```bash
chmod +x init_minikube.sh
./init_minikube.sh
```

Construir las imagenes necesarias con el siguiente comando:
```bash
chmod +x build_img.sh
./build_img.sh
```

Aplicar los ConfigMaps correspondientes con el siguiente comando:
```bash
chmod +x create_configmap_from_script.sh
./create_configmap_from_script.sh
```

Crear el servicio correspondiente y el tunel de Minikube con los siguientes comando:
```bash
kubectl -n default apply -f service.yaml
minikube tunnel
```

Para probar cada uno de los manifiestos de deployment o stateful sets ejecutar siguiente comando:

```bash
kubectl -n default apply -f <manifiesto>.yaml
```

Abrir [http://localhost:3001/api/v1](http://localhost:3001/api/v1) con el navegador web para acceder a la documentación Swagger de la API del chat.

Abrir [http://localhost:3000](http://localhost:3000) con el navegador web para acceder al chat.