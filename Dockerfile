# Use official Java 22 runtime
FROM eclipse-temurin:22-jre

# Set working directory
WORKDIR /app

# Copy the built jar
COPY target/*.jar app.jar

# Expose port used by Spring Boot
EXPOSE 8080

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
