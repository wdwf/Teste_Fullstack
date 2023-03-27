import { Conflict, NotFoundError } from "../helpers/api-error"
import { ContainerRepository, MovementRepository } from "../repositories"
import { ContainerCategory, ContainerStatus, ContainerType } from "../roles/containerRoles"

export interface dataContainer {
  client: string;
  numberContainer: string;
  type: ContainerType;
  status: ContainerStatus;
  category: ContainerCategory;
}

export class ContainerService {
  async create(dataContainer: dataContainer) {

    const container = await ContainerRepository.findOneBy({ numberContainer: dataContainer.numberContainer })

    if (container) {
      throw new Conflict("Numeração do conteiner ja existente");
    }
  
    const theContainer = ContainerRepository.create(dataContainer);

    return await ContainerRepository.save(theContainer);
  }

  async listContainer() {
    const container = await ContainerRepository.find();
    return container;
  }

  async getContainer(containerId: string) {
    const query = ContainerRepository.createQueryBuilder("containers")

    query.andWhere("containers.id = :containerId", { containerId: containerId })

    const result = await query.execute();

    return result;
  }

  async update(containerId: string, dataContainer: Partial<dataContainer>) {
    const container = await ContainerRepository.findOneBy({ id: containerId })

    if (!container) {
      throw new NotFoundError("Conteiner não encontrado!")
    }

    container.numberContainer = dataContainer.numberContainer ? dataContainer.numberContainer : container.numberContainer;
    container.type = dataContainer.type ? dataContainer.type : container.type
    container.status = dataContainer.status ? dataContainer.status : container.status
    container.category = dataContainer.category ? dataContainer.category : container.category

    return await ContainerRepository.save(container);
  }

  async delete(containerId: string) {
    const container = await ContainerRepository.findOneBy({ id: containerId });

    if (!container) {
      throw new NotFoundError("Conteiner não encontrado!")
    }
    await MovementRepository.delete({ container })
    return await ContainerRepository.delete({ id: containerId })
  }

  async filter({ numberContainer, type, client, category, status }: Partial<dataContainer>) {
    const query = ContainerRepository.createQueryBuilder("containers")

    if (numberContainer) {
      query.andWhere("(containers.numberContainer ILIKE :numberContainer)", { numberContainer: `%${numberContainer}%` })
    }
    if (type) {
      query.andWhere("type = :type", { type: type })
    }
    if (client) {
      query.andWhere("(client ILIKE :client)", { client: `%${client}%` })
    }
    if (category) {
      query.andWhere("category = :category", { category: category })
    }
    if (status) {
      query.andWhere("status = :status", { status: status })
    }

    const result = await query.execute();

    return result;
  }
}