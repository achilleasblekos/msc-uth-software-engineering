# Χρησιμοποιούμε Java base image
FROM openjdk:17-jdk

# Ορίζουμε το working directory
WORKDIR /app

# Αντιγραφή του .jar αρχείου στο container
COPY target/recipe_management_api-0.0.1-SNAPSHOT.jar app.jar

# Έκθεση της πόρτας 8080
EXPOSE 8090

# Εκκίνηση της εφαρμογής
ENTRYPOINT ["java", "-jar", "app.jar"]
