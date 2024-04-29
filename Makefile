BUILDER_NAME=$(shell docker compose ps -q builder)
SCRAPPER_NAME=$(shell docker compose ps -q scrapper)
DB_NAME=$(shell docker compose ps -q db)
VIZUALIZER_NAME=$(shell docker compose ps -q vizualizer)

watch:
	@docker-compose watch

serve:
	@docker-compose up --remove-orphans

build:
	@docker-compose build

build-no-cache:
	@docker-compose build --no-cache

workspace-builder:
	@docker exec -it ${BUILDER_NAME} /bin/bash

workspace-scrapper:
	@docker exec -it ${SCRAPPER_NAME} /bin/sh

workspace-vizualizer:
	@docker exec -it ${VIZUALIZER_NAME} /bin/sh

deps-scrapper:
	@docker exec -it ${SCRAPPER_NAME} /bin/sh -c "npm install"

# migrate:
# 	@docker exec -t ${BUILDER_NAME} /bin/sh -c "npm run migration:up"

# migrate-revert:
# 	@docker exec -t ${BUILDER_NAME} /bin/sh -c "npm run migration:down"

reset-db:
	@echo "Not implemented yet."

# postgres:
# 	@docker exec -it ${POSTGRES_CONTAINER} psql -U admin -d glutton

restart-db:
	@docker restart ${DB_NAME}

stop-scrapper:
	@docker stop ${SCRAPPER_NAME}

restart-scrapper:
	@docker restart ${SCRAPPER_NAME}

stop-builder:
	@docker stop ${BUILDER_NAME}

restart-builder:
	@docker restart ${BUILDER_NAME}

stop-vizualizer:
	@docker stop ${VIZUALIZER_NAME}

restart-vizualizer:
	@docker restart ${VIZUALIZER_NAME}
