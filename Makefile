.PHONY: all clean test build publish dev check release install

all: clean test build

dev: install clean build test lint

check: test lint

release: clean test build lint

install:
	npm install

test-rust:
	cargo test

build-wasm:
	RUSTFLAGS='--cfg getrandom_backend="wasm_js"' wasm-pack build --target bundler --out-dir pkg
	rm pkg/.gitignore pkg/README.md pkg/package.json
	npm run optimize-wasm

build-ts:
	npm run build

lint:
	npm run lint

test-js: build-wasm
	npm test

clean:
	rm -rf dist
	rm -rf pkg
	cargo clean

build: install build-wasm build-ts

test: test-rust test-js

prepublish: clean build test lint

publish: prepublish
	npm publish --access public
