VERSION=0.0.3
SRC=lib/cryo.js
DEV=build/cryo-$(VERSION).js

setup:
	npm install

test:
	node_modules/.bin/mocha -R spec --bail ./test/*.test.js

build:
	@echo "Development: $(DEV)"

	@cat $(SRC) > $(DEV)

.PHONY: setup test build