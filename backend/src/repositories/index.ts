import { AppDataSource } from "../data-source";
import { Container } from "../entities/Container";
import { Movement } from "../entities/Movement";

export const ContainerRepository = AppDataSource.getRepository(Container);
export const MovementRepository = AppDataSource.getRepository(Movement);
