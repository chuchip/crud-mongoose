Aplicacion CRUD con MongoDB realizada en Node 14.

Se utiliza la libreria mongoose  y express con CORS.

#### Configuración

Crear fichero `db.env` con las siguientes variables.

DB_USER=<USUARIO DATABASE>
DB_PASS=<CONTRASEÑA DE USUARIO>
DB_URL=<URL CONEXION>


#### Database en Docker.
Si se desea levantar una base de datos mongo en local se puede hacer con el siguiente comando:
```
    docker run -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=mongo -e MONGO_INITDB_ROOT_PASSWORD=pass --name mongo_test -d mongo
``` 

Los parametros a pone en db.env serian:
```
DB_URL=mongodb://mongo:pass@localhost:27017/admin
```

En este caso no es necesario poner la variable DB_USER y DB_PASS ya que la estamos poniendo en la base de datos.

#### Start: 

> npm run dev


#### Insertar registro:

Usando bash:

> curl --location --request POST 'localhost:3000/persona' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "Jesus",
    "surname": "Puente",
    "city": "Logroño"
}'


#### Listar todos los registro cuyo nombre coincida con 'Jesus'

> curl --location --request GET 'localhost:3000/persona' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "Jesus"
}'

#### Buscar por ID

curl --location --request GET 'localhost:3000/persona/611a7c26be8e095b49aaf46f' 

#### Update por ID

curl --location --request PUT 'localhost:3000/persona/611a8ba946c4deee38e9d096' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "Pedro",
    "surname": "Garcia"
}'

#### Delete por ID.

curl --location --request DELETE 'localhost:3000/persona/611a891852d22c8c274d409d'