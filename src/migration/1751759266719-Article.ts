import { MigrationInterface, QueryRunner } from "typeorm";

export class Article1751759266719 implements MigrationInterface {
    name = 'Article1751759266719'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "article" ADD "imagen1" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "article" ADD "imageb2" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "article" DROP COLUMN "imageb2"`);
        await queryRunner.query(`ALTER TABLE "article" DROP COLUMN "imagen1"`);
    }

}
