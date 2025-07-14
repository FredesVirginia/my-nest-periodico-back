import { MigrationInterface, QueryRunner } from "typeorm";

export class Article41752328934318 implements MigrationInterface {
    name = 'Article41752328934318'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "article" ALTER COLUMN "category" SET DEFAULT 'PLANTILLA_3'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "article" ALTER COLUMN "category" DROP DEFAULT`);
    }

}
