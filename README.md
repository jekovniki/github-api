
<h1 align="center">
  Repository API
</h1>

<p align="center">
  The API provides an endpoint that given github username and "Accept" property fetches the user's repository and branches from the Github API.
</p>

## How To Use

To clone and run this application, you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```bash
# Clone this repository
$ git clone https://github.com/jekovniki/repositories-api.git

# Go into the repository
$ cd repositories-api

# Build the docker image
$ docker build -t nzhekov/repository-api:1.1 .
you can replace the "nzhekov/repository-api:1.1" with whatever you prefer

# Run the docker file
$ docker run -it -p 9000:3000 37b6396ebee4
9000:3000 - can be replaced with the preffered selection of ports
37b6396ebee4 - is the id of the image. It should be replaced with whatever was generated
```

## Documentation

How to work with the api:
https://app.swaggerhub.com/apis/jekovniki/repositories-api/1.0.0

## License

MIT

---

> [nzhekov.com](https://www.nzhekov.com) &nbsp;&middot;&nbsp;
> GitHub [@jekovniki](https://github.com/jekovniki) 