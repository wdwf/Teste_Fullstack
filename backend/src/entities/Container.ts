import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn,  } from "typeorm";
import { v4 as uuid } from "uuid";
import { ContainerCategory, ContainerStatus, ContainerType } from "../roles/containerRoles";
import { Movement } from "./Movement";



@Entity("containers")
export class Container {

  @PrimaryColumn({
    type: "uuid"
  })
  id: string;

  @Column({
    type: "varchar"
  })
  client: string;

  @OneToMany(
    () => Movement,
    movement => movement.container,
    {
      cascade: true
    }
  )
  @JoinColumn({ name: "movementId" })
  movement: Movement;

  @Column({
    type: "varchar"
  })
  numberContainer: string;

  @Column({
    type: "enum",
    enum: ContainerType,
    nullable: false
  })
  type: ContainerType;

  @Column({
    type: "enum",
    enum: ContainerStatus,
    nullable: false
  })
  status: ContainerStatus;

  @Column({
    type: "enum",
    enum: ContainerCategory,
    nullable: false
  })
  category: ContainerCategory;

  constructor() {
    if (!this.id) {
      this.id = uuid()
    }
  }

}