# Building the Docker image


## Building and running the docker image locally
To build the image:\
`docker build -t flask-app .`


Running the image:\
`docker run -p 5000:5000 flask-app`


# If Using Podman 
## Building and running the docker image locally
Change to app location 
`cd open-source-geospatial-ecosystem/backend/`
Build Image 
`podman build -t flask-app . `
Run the image
`podman run -p 5000:5000 flask-app`

## Install Poetry dependencies

If you want to run locally outside of a container, you will need to install poetry:\
`pip install poetry`

### Installing project dependencies

```bash
cd backend
poetry install
```
Adding new dependencies:\
`poetry add <name>`


