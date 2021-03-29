# Docker MERN Stack App

## Quick Start

```bash
# Run in Docker
docker-compose up
# use -d flag to run in background

# Tear down
docker-compose down

# To be able to edit files, add volume to compose file
volumes:
    - ['./:/usr/src/app']
    - ['./:/usr/src/client']

# To re-build
docker-compose build
```
