FROM golang:1.20.1

RUN go install github.com/cosmtrek/air@latest &&\
    git config --global --add safe.directory /opt/app/api

WORKDIR /opt/app/api