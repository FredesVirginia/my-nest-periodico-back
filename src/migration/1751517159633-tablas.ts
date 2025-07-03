import { MigrationInterface, QueryRunner } from "typeorm";

export class Tablas1751517159633 implements MigrationInterface {
    name = 'Tablas1751517159633'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "article" RENAME COLUMN "autorr" TO "autor"`);
        await queryRunner.query(`ALTER TABLE "titulo" DROP CONSTRAINT "PK_8cf776f975f6a534fe300d9a91e"`);
        await queryRunner.query(`ALTER TABLE "titulo" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "titulo" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "titulo" ADD CONSTRAINT "PK_8cf776f975f6a534fe300d9a91e" PRIMARY KEY ("id")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "titulo" DROP CONSTRAINT "PK_8cf776f975f6a534fe300d9a91e"`);
        await queryRunner.query(`ALTER TABLE "titulo" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "titulo" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "titulo" ADD CONSTRAINT "PK_8cf776f975f6a534fe300d9a91e" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "article" RENAME COLUMN "autor" TO "autorr"`);
    }

}
