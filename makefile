VERSION=0.0.3
SRC=lib/cryo.js
DEV=build/cryo-$(VERSION).js
PROD=build/cryo-$(VERSION).min.js

setup:
	npm install

test:
	node_modules/.bin/mocha -R spec --bail ./test/*.test.js

build:
	@echo "Development: $(DEV)"
	@echo "Production: $(PROD)"

	@cat $(SRC) > $(DEV)

.PHONY: setup test build