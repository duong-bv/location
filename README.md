<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Business
**Project Documentation: Location Management API**

**Overview**
The Location Management API is a RESTful service built using Node.js and NestJS, allowing CRUD operations for managing location entities. It is designed to handle hierarchical location data with robust validations, error handling, and logging, and it leverages PostgreSQL with TypeORM for database management.

**Key Features**
- CRUD operations for locations.
- Hierarchical location tree support.
- Detailed request validation.
- Transaction management with rollback capabilities.
- Centralized logging for monitoring and debugging.
- Comprehensive Swagger documentation for API endpoints.

**Technical Stack**
- **Framework**: Node.js (NestJS)
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: TypeORM
- **Documentation**: Swagger
- **Validation**: Class-validator
- **Logging**: NestJS built-in logger

**Database Design**
The database schema includes a `Location` table structured as follows:

```sql
CREATE TABLE Location (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  area VARCHAR(50),
  parent_id UUID REFERENCES Location(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```
**API Endpoints**
1. **GET /locations**
   - Fetches all locations.
   - **Response**: Array of location objects.
   - **Swagger Annotation**: `@ApiOperation`, `@ApiResponse`

2. **GET /locations/:id**
   - Fetches a location by its ID.
   - **Parameters**: `id` (string)
   - **Response**: Location object or 404 error.
   - **Swagger Annotation**: `@ApiParam`, `@ApiResponse`

3. **POST /locations**
   - Creates a new location.
   - **Request Body**: JSON object with `name`, `area`, and optional `parentId`.
   - **Response**: Created location object.
   - **Swagger Annotation**: `@ApiBody`, `@ApiResponse`

4. **PUT /locations/:id**
   - Updates an existing location by ID.
   - **Parameters**: `id` (string)
   - **Request Body**: JSON object with optional fields to update.
   - **Response**: Updated location object or 404 error.
   - **Swagger Annotation**: `@ApiParam`, `@ApiBody`, `@ApiResponse`

5. **DELETE /locations/:id**
   - Deletes a location by ID.
   - **Parameters**: `id` (string)
   - **Response**: Success message or 404 error.
   - **Swagger Annotation**: `@ApiParam`, `@ApiResponse`

**Swagger Integration**
The API is fully documented using `@nestjs/swagger`, providing an easy-to-navigate UI for developers. Accessible at `http://localhost:3000/api-docs`, it covers endpoint descriptions, parameters, response types, and example payloads.

**Transaction Handling**
Transactions are managed using TypeORM's `QueryRunner` to ensure atomicity. In case of an error during database operations, changes are rolled back to maintain data integrity.

**Logging**
NestJS’s built-in `Logger` service is utilized for logging information, errors, and debugging details. This enhances traceability and simplifies issue resolution.

**Validation and Error Handling**
All incoming requests are validated using `class-validator` decorators to ensure data integrity. Custom error handling mechanisms are implemented to provide clear feedback to API consumers.

**Conclusion**
The Location Management API is a robust, scalable solution built with best practices for clean code, comprehensive documentation, and efficient error handling. It is designed to support hierarchical data structures and can be extended easily to accommodate additional features.

## Deployment
Link API: http://54.179.179.83/api


