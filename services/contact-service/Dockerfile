# Step 1: Build the application
FROM golang:1.24-alpine AS builder

WORKDIR /app

# Copy go.mod and go.sum files to download dependencies
COPY go.mod go.sum ./
RUN go mod download

# Copy the rest of the application source code
COPY . .

# Tidy the modules to ensure go.mod and go.sum are in sync with the code
RUN go mod tidy

# Build the application for a production environment
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o contact-service .

# Step 2: Create a small, secure production image
FROM alpine:latest

WORKDIR /root/

# Copy the pre-built binary from the builder stage
COPY --from=builder /app/contact-service .

# Expose the port the app runs on
EXPOSE 8081

# Command to run the executable
CMD ["./contact-service"]
