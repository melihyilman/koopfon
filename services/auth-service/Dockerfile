FROM golang:1.24-alpine
WORKDIR /app
COPY . .
RUN apk add --no-cache git
RUN go mod tidy
RUN go build -o auth-service .
EXPOSE 8081
CMD ["./auth-service"]
