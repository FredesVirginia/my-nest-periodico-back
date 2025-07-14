import { MigrationInterface, QueryRunner } from "typeorm";

export class Article31752328657320 implements MigrationInterface {
    name = 'Article31752328657320'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "article" ALTER COLUMN "category" DROP DEFAULT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "article" ALTER COLUMN "category" SET DEFAULT 'PLANTILLA_1'`);
    }

}
