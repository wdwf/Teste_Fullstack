import { Router } from "express";
import { ContainerController } from "../controllers/ContainerController";

const routes = Router();
const containerController = new ContainerController();

routes.post("/container", containerController.create)
routes.get("/containers", containerController.listContainer)
routes.get("/container/:containerId", containerController.getContainer)
routes.put("/container/:containerId", containerController.update)
routes.delete("/container/:containerId", containerController.delete)
routes.get("/containers/search", containerController.filter)


export default routes;