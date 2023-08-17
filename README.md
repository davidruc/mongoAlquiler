# Alquiler de automoviles

## Tabla de contenido:
- [Introducción](#introducción)
- [Implementaciones](#se-implementó)
- [Instalación](#instrucciones-para-la-instalación-del-proyecto)
- [Diagrama](#esquema-de-la-base-de-datos-del-proyecto)
- [Consultas planteadas](#consultas-específicas-planteadas)
- [Solución](#solucion-y-funcionamiento-de-los-endpoints)
    - [CRUD](#enpoints-del-crud)
    - [Respuestas EndPoints](#endpoints-de-las-consultas-específicas)
- [Tecnologías](#tecnologías)
- [Dependencias](#dependencias-utilizadas)

## Introducción
Este proyecto es un ejemplo sencillo de la base de datos de una empresa de alquileres de automoviles que tiene diferentes sedes. Permite manejar clientes, empleados, automoviles, verificar la disponibilidad, gestionar los prestamos,las devoluciones, las reservas y las sucursales donde se encuentran los autos. 

Para este proyecto se utilizó una base de datos en MongoDB y se le implementaron diferentes metodologías de desarrollo para brindarle capas de seguridad al proyecto. 

#### Se implementó:
* Middleware para la verificación de la estructura de los datos que debían ingresar en los métodos POST y UPDATE.
* Middleware para evitar ataques de fuerza bruta controlando el límite de peticiones en un periodo de tiempo determinado.
* Middleware para validar que los datos de los parámetros id ingresados en el método UPDATE, DELETE y en algunos casos en GETs fuera datos númericos y enteros.
* Esquemas en la creación de la base de datos para validar el tipo de dato que ingresa a cada colección.
* Uso de Alias en las consultas tipo get para no revelar la estructura ni lo nombres de las variables en las que se crearon las colecciones.
* Se utilizaron tokens de acceso para la implementación de cada una de las tablas, esto se espera modificar en futuras versiones por un proceso de autenticación.

***********
* Quedó pendiente implementar el middleware para la salida de errores de mongoDB, ya que si la persona no ingresa correctamente los datos podrá observar la estructura y nombre con el que fue creado. *En la proxima versión se buscará corregir esta vulnerabilidad.*

## Instrucciones para la instalación del proyecto.

Para la correcta implementación del proyecto se recomienda seguir los siguientes pasos: 

1. Clone el repositorio del proyecto y abra el archivo del proyecto en su editor de código. (Recomdación: utilizar Visual studio code)

2. Ingrese a la terminal en la ruta específica donde tiene alojado el proyecto e implemente las dependencias que están en el package.json usando el siguiente comando:
```bash
    npm install
``` 
De esta forma verá que la carpeta "*node_modules*" y el archivo "*package-lock.json*" se crean después de contados segundos.

3. Para poder correr el proyecto de manera local es necesario configurar las variables de entorno. Por lo que puede dirigirse al archivo .env.example y observar la configuración del proyecto.

    * Cree un archivo que se llame ".env" y copie la estructura del archivo .env.example o simplemente renombre el .env.example.
    
    * Ingrese los datos requeridos. En el caso de manejar el proyecto local, el host sería:
                
            localhost 
    * El nombre de la base de datos está definida como se crea en el siguiente paso en la base de datos.
    * En el campo de MY_CONFIG ingrese un hostname y un puerto a su elección. Recuerde que por defecto el local host requiere que el host name es 

            127.0.0.1 
    * Verifique que el puerto que va a utilizar no esté en uso. Para evitar confisión mate todos los puertos que tiene abiertos en su máquina.
    * Ingrese su usuario de atlas y contraseña en los recuadros suministrados.

    * **Importante: Es importante que se dirija a la carpeta ./db e ingrese al archivo atlas.db (*archivo encargado de la conexion con atlas*) y modifique la variable uri. El valor que debe remplazar es el siguiente: *@cluster0.mqhexgk.mongodb.net* con el nombre que le haya suministrado previamente a su conexión con atlas con compass**

    Para más información referente con la conexión con atlas compass dirígase a la [documentación oficial de atlas](https://www.mongodb.com/docs/atlas/compass-connection/).

    4. Para ejecutar la base de datos diríjase a la carpeta ./db e ingrese al archivo esquemas.mongodb. Una vez ahí ejecute todo el archivo haciendo uso de la extensión mongoDB.

    * Opcional: Si desea agregar datos de prueba para facilitar la consulta diríjase al archivo en la misma carpeta datos.mongodb y ejecute todo el script.

    * En el archivo consultas se encuentran todas las consultas realizada a lo largo del proyecto aunque algunas de ellas están desactualizadas y no se encuentran correctas. Sin embargo en los archivos routes donde se implementan dichas consultas si están completamente en orden y bien formuladas.

### Esquema de la base de datos del proyecto:


### Consultas específicas planteadas.

1. Recursos: MongoDB, DTO, JWT
2. Mostrar todos los clientes registrados en la base de datos.
3. Obtener todos los automóviles disponibles para alquiler.
4. Listar todos los alquileres activos junto con los datos de los
clientes relacionados.
5. Mostrar todas las reservas pendientes con los datos del cliente
y el automóvil reservado.
6. Obtener los detalles del alquiler con el ID_Alquiler específico.
7. Listar los empleados con el cargo de "Vendedor".
8. Mostrar la cantidad total de automóviles disponibles en cada
sucursal.
9. Obtener el costo total de un alquiler específico.
10. Listar los clientes con el DNI específico. 
11. Mostrar todos los automóviles con una capacidad mayor a 5
personas.
12. Obtener los detalles del alquiler que tiene fecha de inicio en
'2023-07-05'.
13. Listar las reservas pendientes realizadas por un cliente
específico.
14. Mostrar los empleados con cargo de "Gerente" o "Asistente".
15. Obtener los datos de los clientes que realizaron al menos un
alquiler.
16. Listar todos los automóviles ordenados por marca y modelo.
17. Mostrar la cantidad total de automóviles en cada sucursal junto
con su dirección.
18. Obtener la cantidad total de alquileres registrados en la base de
datos.
19. Mostrar los automóviles con capacidad igual a 5 personas y que
estén disponibles.
20. Obtener los datos del cliente que realizó la reserva con
21. Listar los alquileres con fecha de inicio entre '2023-07-05' y
'2023-07-10'.

### Solucion y funcionamiento de los endPoints

Para el proyecto se generó todo el CRUD, por lo que libremente se pueden realizar consultas GET, GET by ID, POST, UPDATE Y DELETE en cada tabla. 

Antes de utilizar cualquiera de los endPoints del proyecto y así como se mencionó anteriormente, se hizo uso de Tokens de acceso para cada tabla, por lo que antes de tener permisos para realizar consultas hay que seguir generar dicho token.

#### Generación del token: 

Para generar este token para acceder al crud de cada colección deberá agregar antes de la ruta de dicha colección /token/ a la uri. Puede generarse utilizando los métodos GET, POST, PUT Y DELETE. Este token tiene un tiempo de caducación de 30 minutos, pasado este tiempo es requerido generar uno nuevo. 

El token generado deberá ser agregado en los encabezados de la solicitud. Si la consulta se realiza usando thunder client seleccióne la opción de "Authorization". Aquí un ejemplo de como sería una uri para generar el token de un colleción cualquiera:

```http
http://${hostname}:{port}/token/${rutaColección} 
```

### Enpoints del CRUD :

* **El ALL solo aplica para GET/POST/PUT/UPDATE**
* Para los endpoints de los crud el id es únicamente para el post y update, en algunas tablas funciona distinto para el método GET by ID debido al uso de la dependencia express-query-boolean. Estos usos serán especificados en cada endPoint 

1. Para la colección automoviles:
    ```http
    PUT/DELETE /autos/:id
    ```
    ```http
    POST/GET /autos
    ```
    ```http
    GETbyID /autos?id=<valor>
    ```

* Para búsquedas por GET by id se utiliza el interrogante seguido de id, un signo igual y el valor que deseamos ingresar. 
* Para los métodos PUT y DELETE es requerido ingresar el dato seguido del "/" sin necesidad de escribir nada más. ej: /autos/2
* Este id debe ser un número entero, de lo contrario arrojará un error de sintaxis.

**Estructura de datos para el post o update:**

```JSON
{
    "id_auto":, <number> #int
    "marca_auto":, <string>
    "modelo_auto":, <string>
    "year_auto": , <number> #int
    "tipo_auto": ,<string>
    "capacidad_auto": , <number> #int
    "costo_dia": , <number> #int
}
```

2. Para la colección alquileres:
    ```http
    PUT/DELETE /alquileres/:id
    ```
    ```http
    POST/GET /alquileres
    ```
    ```http
    GETbyID /alquileres?id=<valor>
    ```


* Para búsquedas por GET by id se utiliza el interrogante seguido de id, un signo igual y el valor que deseamos ingresar. 
* Para los métodos PUT y DELETE es requerido ingresar el dato seguido del "/" sin necesidad de escribir nada más. ej: /alquileres/2
* Este id debe ser un número entero, de lo contrario arrojará un error de sintaxis.

**Estructura de datos para el post o update:**

```JSON
{
    "id_alquiler": , <number> #int
    "id_cliente": , <number> #int
    "id_automovil": , <number> #int
    "inicio_alquiler": , <string> 'AAAA-MM-DD'
    "fin_alquiler": , <string> 'AAAA-MM-DD'
    "costo_final": , <number> #int
    "estado_alquiler": , <string>
}
```

3. Para la colección datos_clientes:
    ```http
    PUT/DELETE /datos_clientes/:id
    ```
    ```http
    POST/GET /datos_clientes
    ```
    ```http
    GETbyID /datos_clientes?id=<valor>
    ```

* Para búsquedas por GET by id se utiliza el interrogante seguido de id, un signo igual y el valor que deseamos ingresar. 
* Para los métodos PUT y DELETE es requerido ingresar el dato seguido del "/" sin necesidad de escribir nada más. ej: /datos_clientes/2
* Este id debe ser un número entero, de lo contrario arrojará un error de sintaxis.

**Estructura de datos para el post o update:**

```JSON
{
    "id": , <number> #int
    "cliente": , <string>
    "apellido": , <string>
    "documento": , <number> #int
    "direccion_contacto": , <string>
    "contacto": , <number> #int
    "email": , <string>
}
```


4. Para la colección datos_empleado:
    ```http
    PUT/DELETE /datos_empleado/:id
    ```
    ```http
    POST/GET /datos_empleado
    ```
    ```http
    GETbyID /datos_empleado?id=<valor>
    ```

* Para búsquedas por GET by id se utiliza el interrogante seguido de id, un signo igual y el valor que deseamos ingresar. 
* Para los métodos PUT y DELETE es requerido ingresar el dato seguido del "/" sin necesidad de escribir nada más. ej: /datos_empleado/2
* Este id debe ser un número entero, de lo contrario arrojará un error de sintaxis.

**Estructura de datos para el post o update:**

```JSON
{
    "id": , <number> #int
    "empleado": ,  <string>
    "apellido": ,  <string>
    "documento": , <number> #int
    "direccion_contacto": , <string> 
    "contacto": , <number> #int
    "cargo": ,  <string>
}
```

5. Para la coleccion devoluciones:
    ```http
    ALL /devolucion/:id?
    ```

* Aquí el parámetro id siempre se manda igual y es opcional en el método GET y no requerido en el método POST. Sin embargo obligatorio para poder realizar el POST y PUT. 

**Estructura de datos para el post o update:**

```JSON
{
    "id": , <number> #int
    "id_alquiler": , <number> #int
    "id_empleado": , <number> #int
    "fecha_entrega": , <string> 'AAAA-MM-DD'
    "combustible_retornado": , <number> #int
    "kilometraje_retornado": , <number> #int
    "costo_adicional": , <number> #int
}
```

6.  Para la coleccion entregas:
    ```http
    ALL /entrega/:id?
    ```

* Aquí el parámetro id siempre se manda igual y es opcional en el método GET y no requerido en el método POST. Sin embargo obligatorio para poder realizar el POST y PUT. 

**Estructura de datos para el post o update:**

```JSON
{
    "id": , <number> #int
    "id_alquiler": , <number> #int
    "id_empleado": , <number> #int
    "fecha_inicio": ,  <string> 'AAAA-MM-DD'
    "combustible_actual": , <number> #int
    "Kilometraje_actual": , <number> #int
}
```

7. Para la colección reservacion:
    ```http
    PUT/DELETE /reservacion/:id
    ```
    ```http
    POST/GET /reservacion
    ```
    ```http
    GETbyID /reservacion?id=<valor>
    ```

* Para búsquedas por GET by id se utiliza el interrogante seguido de id, un signo igual y el valor que deseamos ingresar. 
* Para los métodos PUT y DELETE es requerido ingresar el dato seguido del "/" sin necesidad de escribir nada más. ej: /reservacion/2
* Este id debe ser un número entero, de lo contrario arrojará un error de sintaxis.

**Estructura de datos para el post o update:**

```JSON
{
    "id_alquiler": , <number> #int
    "id_cliente": , <number> #int
    "id_automovil": , <number> #int
    "fecha_reservacion": , <string> 'AAAA-MM-DD'
    "inicio_alquiler": , <string> 'AAAA-MM-DD'
    "fin_alquiler": , <string> 'AAAA-MM-DD'
    "estado_reserva": , <string> 
}
```

8.  Para la colección sucursal_auto:
    ```http
    PUT/DELETE /SucursalxAuto/:id
    ```
    ```http
    POST/GET /SucursalxAuto
    ```
    ```http
    GETbyID /SucursalxAuto?id=<valor>
    ```

* Para búsquedas por GET by id se utiliza el interrogante seguido de id, un signo igual y el valor que deseamos ingresar. 
* Para los métodos PUT y DELETE es requerido ingresar el dato seguido del "/" sin necesidad de escribir nada más. ej: /SucursalxAuto/2
* Este id debe ser un número entero, de lo contrario arrojará un error de sintaxis.

**Estructura de datos para el post o update:**

```JSON
{
    "id_sucursal": , <number> #int
    "id_automovil": , <number> #int
    "cantidad": , <number> #int
}
```

9. Para la colección Sucursales:
    ```http
    PUT/DELETE /Sucursales/:id
    ```
    ```http
    POST/GET /Sucursales
    ```
    ```http
    GETbyID /Sucursales?id=<valor>
    ```

* Para búsquedas por GET by id se utiliza el interrogante seguido de id, un signo igual y el valor que deseamos ingresar. 
* Para los métodos PUT y DELETE es requerido ingresar el dato seguido del "/" sin necesidad de escribir nada más. ej: /Sucursales/2
* Este id debe ser un número entero, de lo contrario arrojará un error de sintaxis.

```JSON
{
    "id": , <number> #int
    "sucursal": , <number> #int
    "ubicacion": ,<string> 
    "contacto": ,<number> #int
  
}
```

### Endpoints de las consultas específicas.

1. Requerimiento cumplido. 

2. Para este endPoint realice la consulta GET all del crud de clientes mostrada anteriormente.

3. Para este endPoint realice la consulta GET all del crud de automoviles mostrada anteriormente.

4. En este endPoint se traen todos los datos donde los alquileres están activos anclado a la información del cliente.

    ```http
    GET /datos_clientes/reserva_activa
    ```

5. En este endPoint se traen todos los datos donde los alquileres están con una reserva pendiente anclado a la información del cliente.

    ```http
    GET /datos_clientes/reserva_pendiente
    ```

6. Para este endPoint realice la consulta GET by ID del crud de alquileres mostrada anteriormente.

7. Este endPoint lista todos los empleados con cargo Agente de Entrega que segun mis datos es similar a "vendedor"
    ```http
    GET /datos_empleado/vendedor
    ```

8. Este endPoint muestra el numero total de autos que hay en cada sucursal
    ```http
    GET /SucursalxAuto/totalAutos
    ```

9. Este endPoint obtiene el total del costo de un alquiler en específico buscado por id
     ```http
    GET /alquileres?TotalCliente=<id cliente>
    ```
    * Los < > son solo para especificar que ahí va el id, no deben ponerse en la consulta.

10. Este endPoint lista los clientes con un DNI específico:

    ```http
    GET /datos_clientes?documento=<DNI>
    ```

11. Este endPoint muestra los automoviles con una capacidad superior a 5 puestos.

    ```http
    GET /autos/capacidad_grande
    ```

12. Este endPoint obtiene los detalles del alquiler que tiene fecha de inicio en '2023-07-05'
    
    ```http
    GET /alquileres/dia
    ```

13. Este endPoint lista las reservas pendientes realizadas por un cliente en específico. La búsqueda se hace por id.

    ```http
    GET /reservacion?idReserva=<idCliente>
    ```
    
14. Este endPoint se encarga de mostrar los empleados con los cargos de "Gerente" o "Asistente".

    ```http
    GET /datos_empleado/gerente_asistente
    ```

15. EndPoint para obtener los datos de los clientes que realizaron al menos un alquiler.

    ```http
    GET /datos_clientes/entregados
    ```

16. EndPoint para listar todos los automóviles ordenados por marca y modelo.

    ```http
    GET /autos/autos_por_marca
    ```

17. EndPoint para mostrar la cantidad total de automóviles en cada sucursal junto con su dirección.

    ```http
    GET /Sucursales/cantidadTotal
    ```

18. EndPoint para obtener la cantidad total de alquileres registrados en la base de datos.

    ```http
    GET /alquileres/total
    ```

19. EndPoint para mostrar los automóviles con capacidad igual a 5 personas y que estén disponibles.

    ```http
    GET /autos/autos_grandes_disponibles
    ```

20. Endpoint para obtener los datos del cliente que realizó la reserva con reserva_id especifico.

     ```http
    GET /reservacion?idReservaEsp=<id_Reserva>
    ```

21. EndPoint para listar los alquileres con fecha de inicio entre '2023-07-05' y '2023-07-10'.

    ```http
    GET /alquileres/plazos
    ```



## Tecnologías

<img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="javascript" width="50" height="50"/>    <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg" alt="nodejs" width="60" height="60"/>   <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original-wordmark.svg" alt="express" width="60" height="60"/>  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg" alt="typescript" width="50" height="50"/> 

## Dependencias utilizadas

Para el presente proyecto se van a utilizar las siguientes dependencias en sus respectivas versiones:

  ```json
    "class-transformer": "0.5.1",
    "class-validator": "0.14.0",
    "dotenv": "16.3.1",
    "express": "4.18.2",
    "express-rate-limit": "6.8.1",
    "jose": "4.14.4",
    "mongodb": "5.7.0",
    "nodemon": "3.0.1",
    "reflect-metadata": "0.1.13",
    "typescript": "5.1.6",
    "express-query-boolean": "2.0.0"
  ```

  **Autor**: David Rueda // campuslands