import { Router } from "express";
import { MovementController } from "../controllers/MovementController";

const routes = Router();
const movementController = new MovementController();

routes.post("/movement", movementController.create);
routes.get("/movement/report", movementController.reportInfo);
routes.get("/movements", movementController.listMovements);
routes.get("/movement/:movementId", movementController.getMovement);
routes.put("/movement/:movementId", movementController.update);
routes.delete("/movement/:movementId", movementController.delete);


export default routes;