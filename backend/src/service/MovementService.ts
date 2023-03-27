import { NotFoundError } from "../helpers/api-error";
import { ContainerRepository, MovementRepository } from "../repositories";
import { MovementType } from "../roles/movementRoles";

interface dataMovement {
  type: MovementType;
  dateStart: Date;
  dateEnd: Date;
  containerId: string;
}

export class MovementService {
  async create(dataMovement: dataMovement) {
    const container = await ContainerRepository.findOneBy({id: dataMovement.containerId})

    if (!container) {
      throw new NotFoundError("Conteiner não encontrado!")
    }

    const movement = MovementRepository.create({
      movement: dataMovement.type,
      dateStart: dataMovement.dateStart,
      dateEnd: dataMovement.dateEnd
    })

    movement.container = container;
    
    return await MovementRepository.save(movement)
  }

  async listMovements() {
    const movements = await MovementRepository.find();
    return movements
  }

  async getMovement(movementId: string) {
    const query = MovementRepository.createQueryBuilder("movements")

    query.andWhere("movements.id = :movementId", { movementId: movementId })

    const result = await query.execute();
    return result;
  }

  async updade(movementId: string, dataMovement: dataMovement) {
    const movement = await MovementRepository.findOneBy({ id: movementId });
    const container = await ContainerRepository.findOneBy({ id: dataMovement.containerId });
  
    if (!movement || !container) {
      throw new NotFoundError("Conteiner ou Movimentação não encontrado!")
    }

    movement.movement = dataMovement.type ? dataMovement.type : movement.movement;
    movement.dateStart = dataMovement.dateStart ? dataMovement.dateStart : movement.dateStart;
    movement.dateEnd = dataMovement.dateEnd ? dataMovement.dateEnd : movement.dateEnd;
    movement.container = container;

    return await MovementRepository.save(movement)
  }

  async delete(movementId: string) {
    const movement = await MovementRepository.findOneBy({ id: movementId })
    
    if (!movement) {
      throw new NotFoundError("Movimentação não encontrada!")
    }

    return await MovementRepository.delete(movement);
  }

  async reportInfo() {
    /*
    De acordo com o requisito eu quero 
    Nesta consulta que seja selecionado
    - nome do cliente
    - o tipo de movimentação
    - o total de movimentaçoes pra cada combinação de cliente
    - O leftjoin vai servir pra garantir que o cliente q não tem 
      movimentaçoes seja 
     */
    const result = await MovementRepository.createQueryBuilder("movements")
    .select("container.client", "client")
    .addSelect("movements.movement", "type")
    .addSelect("COUNT(*)", "total")
    .leftJoin("movements.container","container")
    .groupBy("container.client, movements.movement")
    .getRawMany()

    return result;
  }
}