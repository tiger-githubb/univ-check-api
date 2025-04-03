# univ-check-api
A scalable, stateless RESTful API for academic attendance management. Features RBAC authentication (JWT), event-driven attendance validation, optimized query performance, and modular service-layer architecture. Supports multi-tenancy, request validation, and high concurrency handling.

Steps to run this project:

## YARN
1. Run `yarn` command
2. Setup database settings inside `data-source.ts` file
3. Run migration with `yarn migration`
3. Run `yarn start` command or `yarn dev` for watch mode

## NPM
1. Run `npm i` command
2. Run migration with `npm run migration`
3. Run `npm run start` command or `npm run dev` for watch mode

## ADMIN USER
The previous command will create the following user:

- User: `univ.admin@gmail.com`
- Password: `_KUSO58AD@`
