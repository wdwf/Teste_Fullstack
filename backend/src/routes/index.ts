import { Router } from "express";
import container from "./containerRoutes";
import movement from "./movementRoutes";

const routes = Router();

routes.use(container);
routes.use(movement);

export default routes;