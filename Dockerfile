# Use official Nginx image from Docker Hub
FROM nginx:alpine

# Copy your HTML file into the nginx html directory
COPY index.html /usr/share/nginx/html/index.html

# Expose port 80 to access the site
EXPOSE 80

# Start nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
