import { MigrationInterface, QueryRunner } from "typeorm";

export class Article111752507983199 implements MigrationInterface {
    name = 'Article111752507983199'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "article" ADD "titulo" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "article" DROP COLUMN "titulo"`);
    }

}
