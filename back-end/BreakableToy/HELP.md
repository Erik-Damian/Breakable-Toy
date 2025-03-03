# Getting Started

This document provides information about the backend project, including the file structure, endpoint structure, and important commands.

### Reference Documentation

For further reference, please consider the following sections:

* [Official Apache Maven documentation](https://maven.apache.org/guides/index.html)
* [Spring Boot Maven Plugin Reference Guide](https://docs.spring.io/spring-boot/3.4.0/maven-plugin)
* [Create an OCI image](https://docs.spring.io/spring-boot/3.4.0/maven-plugin/build-image.html)
* [Spring Boot DevTools](https://docs.spring.io/spring-boot/3.4.0/reference/using/devtools.html)
* [Spring Web](https://docs.spring.io/spring-boot/3.4.0/reference/web/servlet.html)
* [Spring Web Services](https://docs.spring.io/spring-boot/3.4.0/reference/io/webservices.html)

### Guides

The following guides illustrate how to use some features concretely:

* [Building a RESTful Web Service](https://spring.io/guides/gs/rest-service/)
* [Serving Web Content with Spring MVC](https://spring.io/guides/gs/serving-web-content/)
* [Building REST services with Spring](https://spring.io/guides/tutorials/rest/)
* [Producing a SOAP web service](https://spring.io/guides/gs/producing-web-service/)

### Project Structure

The project follows a standard Maven directory layout:
```
src/
├── main/
│   ├── java/
│   │   └── com/
│   │       └── example/
│   │           └── breakabletoy/
│   │               ├── controller/    # REST controllers
│   │               ├── model/         # Domain models
│   │               ├── repository/    # Spring Data repositories
│   │               ├── service/       # Business logic services
│   │               └── BreakableToyApplication.java  # Main application class
│   └── resources/
│       ├── application.properties     # Application configuration
│       └── static/                    # Static resources
└── test/
    ├── java/
    │   └── com/
    │       └── example/
    │           └── breakabletoy/
    │               ├── controller/    # Controller tests
    │               ├── service/       # Service tests
    │               └── BreakableToyApplicationTests.java  # Main test class
    └── resources/
        └── application-test.properties  # Test configuration
```


### Endpoint Structure

The backend provides the following RESTful endpoints:

#### Task Endpoints

- **Create a new task**
    ```
   POST /api/tasks
    ```
- **Get all tasks**
    ```
    GET /api/tasks
    ```
- **Get a task by ID**
    ```
    PUT /api/tasks/{taskId}
    ```
- **Update a task by ID**
    ```
    DELETE /api/tasks/{taskId}
    ```
- **Toggle task completion status by ID**
    ```
    PUT /api/tasks/toggle/{taskId}
    ```
#### Task Stats Endpoints

- **Get average time to complete tasks**
    ```
    GET /api/tasks/stats/average
    ```
- **Get average time to complete tasks by priority**
    ```
    GET /api/tasks/stats/average/{priority}
    ```
- **Get total count of tasks**
    ```
    GET /api/tasks/stats/count
    ```
- **Get count of tasks by priority**
    ```  
    GET /api/tasks/stats/count/priority/{priority}
    ```
    
### Important Commands

In the project directory, you can run:

#### `mvn spring-boot:run`

Runs the application in development mode.

#### `mvn test`

Runs the unit tests.

#### `mvn clean install`

Builds the project and installs the artifacts in the local Maven repository.

#### `mvn spring-boot:build-image`

Builds a Docker image for the application.

### Maven Parent Overrides

Due to Maven's design, elements are inherited from the parent POM to the project POM.
While most of the inheritance is fine, it also inherits unwanted elements like `<license>` and `<developers>` from the parent.
To prevent this, the project POM contains empty overrides for these elements.
If you manually switch to a different parent and actually want the inheritance, you need to remove those overrides.