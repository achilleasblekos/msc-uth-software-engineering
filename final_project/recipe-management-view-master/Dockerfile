# Πρώτο στάδιο: Δημιουργία του production build
FROM node:18 as build-stage

WORKDIR /app

# Αντιγραφή των αρχείων που περιέχουν τα dependencies
COPY package*.json ./

# Εγκατάσταση dependencies
RUN npm install

# Αντιγραφή του υπόλοιπου κώδικα της εφαρμογής
COPY . .

# Δημιουργία του production build
RUN npm run build -- --configuration production --project recipe-management

# Δεύτερο στάδιο: Εξυπηρέτηση του build μέσω Nginx
FROM nginx:stable

# Αντιγραφή του build στο φάκελο του Nginx
COPY --from=build-stage /app/dist/recipe-management /usr/share/nginx/html

# Έκθεση της πόρτας 80
EXPOSE 80

# Εκκίνηση του Nginx
CMD ["nginx", "-g", "daemon off;"]
