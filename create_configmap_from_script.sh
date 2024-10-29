kubectl -n default create configmap init-db-configmap --from-file=./mongo/init_mongo.js
kubectl -n default apply -f configmap.yaml

# Un configmap es un objeto de la API de Kubernetes utilizado para crear configuraciones separadas del código de la aplicación. Los Pods pueden utilizar los ConfigMaps como variables de entorno, argumentos de la linea de comandos o como ficheros de configuración en un Volumen.

# Un ConfigMap te permite desacoplar la configuración de un entorno específico de una imagen de contenedor, así las aplicaciones son fácilmente portables.