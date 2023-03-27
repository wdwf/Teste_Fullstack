import { Request, Response } from "express";
import { BadRequestError } from "../helpers/api-error";
import { MovementService } from "../service/MovementService"
import { validationCreateMovement } from "../validator/MovementValidator";

const movementService = new MovementService();

export class MovementController {
  async create(request: Request, response: Response) {
    const parsed = validationCreateMovement(request.body)

    if (!parsed.success) {
      throw new BadRequestError(parsed.error.issues[0].message);
    }

    const { dateEnd, dateStart, ...movement } = parsed.data;

    const newDateEnd = new Date(Date.parse(dateEnd));
    const newDateStart = new Date(Date.parse(dateStart));

    const theMovement = { ...movement, dateEnd: newDateEnd, dateStart: newDateStart }

    await movementService.create(theMovement);

    return response.status(200).json({ message: "Movimentação criada com sucesso" })
  }

  async listMovements(request: Request, response: Response) {
    const listMovements = await movementService.listMovements()

    return response.status(200).json(listMovements);
  }

  async getMovement(request: Request, response: Response) {
    const { movementId } = request.params;

    const movement = await movementService.getMovement(movementId)

    return response.status(200).json(movement)
  }

  async update(request: Request, response: Response) {
    const { movementId } = request.params;
    const parsed = validationCreateMovement(request.body);

    if (!parsed.success) {
      throw new BadRequestError(parsed.error.issues[0].message);
    }

    const { dateEnd, dateStart, ...movement } = parsed.data;

    const newDateEnd = new Date(Date.parse(dateEnd));
    const newDateStart = new Date(Date.parse(dateStart));

    const theMovement = { ...movement, dateEnd: newDateEnd, dateStart: newDateStart }

    await movementService.updade(movementId, theMovement);

    return response.status(200).json({ message: "Movimentação Atualizada com sucesso" })
  }

  async delete(request: Request, response: Response) {
    const { movementId } = request.params;
    await movementService.delete(movementId)
    return response.status(200).json({ message: "Movimentação Removido com sucesso!" })
  }

  async reportInfo(request: Request, response: Response) {
    const reportInfo = await movementService.reportInfo()
    return response.status(200).json(reportInfo)
  }
}