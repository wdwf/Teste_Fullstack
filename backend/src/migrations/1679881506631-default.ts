import { MigrationInterface, QueryRunner } from "typeorm";

export class default1679881506631 implements MigrationInterface {
    name = 'default1679881506631'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "movements" ("id" uuid NOT NULL, "movement" "public"."movements_movement_enum" NOT NULL, "dateStart" date NOT NULL, "dateEnd" date NOT NULL, "containerId" uuid, CONSTRAINT "PK_5a8e3da15ab8f2ce353e7f58f67" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "containers" ("id" uuid NOT NULL, "client" character varying NOT NULL, "numberContainer" character varying NOT NULL, "type" "public"."containers_type_enum" NOT NULL, "status" "public"."containers_status_enum" NOT NULL, "category" "public"."containers_category_enum" NOT NULL, CONSTRAINT "PK_21cbac3e68f7b1cf53d39cda70c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "movements" ADD CONSTRAINT "FK_918f6a144e0733be9809d8c2c7b" FOREIGN KEY ("containerId") REFERENCES "containers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movements" DROP CONSTRAINT "FK_918f6a144e0733be9809d8c2c7b"`);
        await queryRunner.query(`DROP TABLE "containers"`);
        await queryRunner.query(`DROP TABLE "movements"`);
    }

}
