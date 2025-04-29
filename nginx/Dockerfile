FROM nginx:alpine

# Copy your Nginx configuration file
COPY nginx/nginx.conf /etc/nginx/nginx.conf

# Optionally copy your SSL certificates (if needed)
COPY nginx/server.crt /etc/ssl/certs/server.crt
COPY nginx/server.key /etc/ssl/certs/server.key