FROM openjdk:17-jdk-alpine
WORKDIR /app
COPY target/*.jar app.jar
COPY .env /app/.env
ENTRYPOINT ["java", "-jar", "app.jar"]