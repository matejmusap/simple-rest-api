# SIMPLE REST API

Simple blog-like rest api!.
Tehnologies I used:
Express.js
Typescript
PostgreSQL (raw queries) for database
ejs for frontend
jest for testing
swagger for routes documentation

To start app you need:

- setup your local PostgreSQL
- create .env file with variables:
  - PORT _port_
  - IP _localhost or ip_
  - DB*HOST \_postgres database password*
  - DB*NAME \_postgres database nname*
  - DB*USERNAME \_postgres database username*
  - DB*PASSWORD \_postgres database password*
  - SECRET*TOKEN_KEY \_jwt secret key*
  - EMAIL*HOST \_nodemailrer reuired email host*
  - EMAIL _nodemailrer reuired email _
  - EMAIL_PASS* nodemailrer reuired email password*
- run **npm i**
- run **npm run watch** or **tsc** to build dist
- run **npm run start** to start app
- visit in broswer (${IP}:${PORT}/)
- register your user
- login and write your posts
- visit for swagger routes documentation (${IP}:${PORT}/api-docs)
