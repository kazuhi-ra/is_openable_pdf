FROM --platform=linux/amd64 mcr.microsoft.com/devcontainers/rust:1-bookworm

RUN curl -fsSL https://deb.nodesource.com/setup_lts.x | bash - \
  && apt-get update \
  && apt-get install -y nodejs \
  && npm install -g npm@latest

RUN apt-get update && apt-get install -y \
  build-essential \
  pkg-config \
  && rm -rf /var/lib/apt/lists/*

RUN cargo install wasm-pack

WORKDIR /workspace 
