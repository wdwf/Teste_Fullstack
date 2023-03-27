import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { MovementType } from "../roles/movementRoles";
import { Container } from "./Container";

@Entity("movements")
export class Movement {

  @PrimaryColumn({
    type: "uuid"
  })
  id: string;

  @Column({
    type: "enum",
    enum: MovementType,
    nullable: false
  })
  movement: MovementType;

  @Column({
    type: "date"
  })
  dateStart: Date;

  @Column({
    type: "date"
  })
  dateEnd: Date;

  @ManyToOne(
    () => Container,
    container => container.movement,
  )
  container: Container;

  constructor() {
    if (!this.id) {
      this.id = uuid()
    }
  }
}