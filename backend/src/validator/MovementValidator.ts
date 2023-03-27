import { z } from "zod";
import { MovementType } from "../roles/movementRoles";

const payloadSchemaCreateMovement = z.object({
  type: z.nativeEnum(MovementType),
  dateStart: z.string().min(1, "Data Invalida"),
  dateEnd: z.string().min(1, "Data Invalida"),
  containerId: z.string().min(1, "Codigo de conteiner invalido"),
})

const createMovementSchema = (param: unknown) => payloadSchemaCreateMovement.safeParse(param);
export const validationCreateMovement = createMovementSchema;
