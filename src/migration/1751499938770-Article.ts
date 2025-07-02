import { MigrationInterface, QueryRunner } from "typeorm";

export class Article1751499938770 implements MigrationInterface {
    name = 'Article1751499938770'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "article" RENAME COLUMN "autor" TO "autorr"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "article" RENAME COLUMN "autorr" TO "autor"`);
    }

}
