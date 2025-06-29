FROM golang:1.24-alpine
WORKDIR /app
COPY . .
RUN apk add --no-cache git
RUN go mod tidy
RUN go build -o api-gateway .
EXPOSE 8080
CMD ["./api-gateway"]
