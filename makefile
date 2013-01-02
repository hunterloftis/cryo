VERSION=0.0.1
SRC=lib/cryo.js
DEV=build/cryo-$(VERSION).js
PROD=build/cryo-$(VERSION).min.js

setup:
	npm install

test:
	node_modules/.bin/mocha -R spec --bail

build:
	@echo "Development: $(DEV)"
	@echo "Production: $(PROD)"

	@cat $(SRC) > $(DEV)

	@echo "Building with closure compiler..."
	@curl -s \
		-d compilation_level=SIMPLE_OPTIMIZATIONS \
		-d output_format=text \
		-d output_info=compiled_code \
		--data-urlencode "js_code@${DEV}" \
		http://closure-compiler.appspot.com/compile \
		> $(PROD)

.PHONY: setup test build