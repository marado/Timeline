INPUT	:= $(wildcard data/*)
OUTPUT	:= $(addsuffix .xml,$(subst data/,xml/,$(basename $(INPUT))))

all: build js check

check:
	@set -e; for LIBS in ajax js; do \
	  if [ ! -e /usr/share/javascript/timeline_$$LIBS ]; then \
	    echo "Warning - /usr/share/javascript/timeline_$$LIBS does not exist or is an invalid symlink. Check if you have libjs-simile-timeline installed."; \
	  fi \
	done

xml/%.xml: data/%
	@mkdir -p xml
	./build.py $< >$@

js: 
	./build_conf.py > media/generated.js

build: $(OUTPUT)

clean:
	rm -rf xml media/generated.js

install: build

.PHONY: install clean install check
