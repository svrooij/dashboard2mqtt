# Dashboard2mqtt

A dashboard to control devices on your mqtt server. I started this dashboard because I want to accomplish the following goals, and I couldn't find any solution that checks all the boxes.

- Run local only
- Use one port for all communication
- Can be run behind a nginx proxy
- Real-time communication as much as possible
- No configuration of devices, should use auto discovery only

## Front-end

The front-end for this dashboard is build in Angular 9, and can be found in [frontend folder](./src/frontend). During development the front-end runs on `http://localhost:4200` (with ng serve) providing a proxy from `http://localhost:4200/api/` to `http://localhost:3000/api/`

## Backend

The backend for this dashboard is build in TypeScript, using express and websockets, found in the [backend folder](./src/backend).
During development the backend runs on `http://localhost:3000`

During production the backend app is configured to run the SPA front-end from the `wwwroot` folder.

## Development

To run both the front-end and the backend you can run `npm run dev` in the main folder. It will start 2 processes, one to watch the backend and one to watch the front-end. You can also run the front-end with `npm run start-ui` and debug the backend in VSCode.
