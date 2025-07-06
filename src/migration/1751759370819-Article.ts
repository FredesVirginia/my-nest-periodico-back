import { MigrationInterface, QueryRunner } from "typeorm";

export class Article1751759370819 implements MigrationInterface {
    name = 'Article1751759370819'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "article" RENAME COLUMN "imageb2" TO "imagen2"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "article" RENAME COLUMN "imagen2" TO "imageb2"`);
    }

}
