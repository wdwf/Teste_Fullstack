import { Request, Response } from "express";
import { BadRequestError } from "../helpers/api-error";
import { ContainerCategory, ContainerStatus, ContainerType } from "../roles/containerRoles";
import { ContainerService } from "../service/ContainerService";
import { validationCreateContainer, validationFilter } from "../validator/ContainerValidator";


const containerService = new ContainerService();

export class ContainerController {
  async create(request: Request, response: Response) {
    const parsed = validationCreateContainer(request.body);

    if (!parsed.success) {
      throw new BadRequestError(parsed.error.issues[0].message);
    }

    await containerService.create(parsed.data)

    return response.status(201).json({ message: "Container criado com sucesso!" })
  }

  async listContainer(request: Request, response: Response) {
    const containers = await containerService.listContainer()
    return response.status(200).json(containers); 
  }
  
  async getContainer(request: Request, response: Response) {
    const { containerId } = request.params;

    const result = await containerService.getContainer(containerId)

    return response.status(200).json(result)
  }

  async update(request: Request, response: Response) {
    const { containerId } = request.params;
    const parsed = validationCreateContainer(request.body);

    if (!parsed.success) {
      throw new BadRequestError(parsed.error.issues[0].message);
    }

    await containerService.update(containerId, parsed.data)

    return response.status(200).json({ message: "Alterado com sucesso!" })
  }

  async delete(request: Request, response: Response) {
    const { containerId } = request.params;

    await containerService.delete(containerId);

    return response.status(200).json({ message: "Conteiner Removido com sucesso!" })
  }

  async filter(request: Request, response: Response) {
    const parsed = validationFilter(request.query);

    if (!parsed.success) {
      throw new BadRequestError(parsed.error.issues[0].message);
    }

    const { category, client, numberContainer, status, type } = parsed.data;

    const result = await containerService.filter({
      client,
      numberContainer,
      category: category as ContainerCategory,
      status: status as ContainerStatus,
      type: type as ContainerType
    })

    return response.status(200).json(result);
  }
}