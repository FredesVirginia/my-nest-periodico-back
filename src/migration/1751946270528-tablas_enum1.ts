import { MigrationInterface, QueryRunner } from "typeorm";

export class TablasEnum11751946270528 implements MigrationInterface {
    name = 'TablasEnum11751946270528'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "public"."article_category_enum" RENAME TO "article_category_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."article_category_enum" AS ENUM('PLANTILLA_1', 'PLANTILLA_2', 'PLANTILLA_3')`);
        await queryRunner.query(`ALTER TABLE "article" ALTER COLUMN "category" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "article" ALTER COLUMN "category" TYPE "public"."article_category_enum" USING "category"::"text"::"public"."article_category_enum"`);
        await queryRunner.query(`ALTER TABLE "article" ALTER COLUMN "category" SET DEFAULT 'PLANTILLA_1'`);
        await queryRunner.query(`DROP TYPE "public"."article_category_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."article_category_enum_old" AS ENUM('PLANTILLA_1', 'PLANTILLA_2', 'PLANTILLA_3')`);
        await queryRunner.query(`ALTER TABLE "article" ALTER COLUMN "category" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "article" ALTER COLUMN "category" TYPE "public"."article_category_enum_old" USING "category"::"text"::"public"."article_category_enum_old"`);
        await queryRunner.query(`ALTER TABLE "article" ALTER COLUMN "category" SET DEFAULT 'PLANTILLA_1'`);
        await queryRunner.query(`DROP TYPE "public"."article_category_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."article_category_enum_old" RENAME TO "article_category_enum"`);
    }

}
