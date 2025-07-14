import { MigrationInterface, QueryRunner } from "typeorm";

export class Article101752504761728 implements MigrationInterface {
    name = 'Article101752504761728'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "seccion" RENAME COLUMN "contenido" TO "subtitulo"`);
        await queryRunner.query(`CREATE TYPE "public"."bloque_contenido_tipo_enum" AS ENUM('TEXTO', 'LISTA', 'IMAGEN')`);
        await queryRunner.query(`CREATE TABLE "bloque_contenido" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "tipo" "public"."bloque_contenido_tipo_enum" NOT NULL, "contenido" text NOT NULL, "seccionId" uuid, CONSTRAINT "PK_82d1a6e2dc815deb553ab50f33b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "bloque_contenido" ADD CONSTRAINT "FK_8c6e8b03b8e6150e1848f8b8f64" FOREIGN KEY ("seccionId") REFERENCES "seccion"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bloque_contenido" DROP CONSTRAINT "FK_8c6e8b03b8e6150e1848f8b8f64"`);
        await queryRunner.query(`DROP TABLE "bloque_contenido"`);
        await queryRunner.query(`DROP TYPE "public"."bloque_contenido_tipo_enum"`);
        await queryRunner.query(`ALTER TABLE "seccion" RENAME COLUMN "subtitulo" TO "contenido"`);
    }

}
