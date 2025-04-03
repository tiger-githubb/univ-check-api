import { MigrationInterface, QueryRunner } from "typeorm";

export class Generated1743602350022 implements MigrationInterface {
    name = 'Generated1743602350022'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "academic_year" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "periode" character varying NOT NULL, CONSTRAINT "PK_ebe672580520ed92b9e89088325" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "emargement" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "timestamp" TIMESTAMP NOT NULL DEFAULT now(), "status" character varying NOT NULL, "classSessionId" uuid, "professorId" uuid, CONSTRAINT "PK_da5fceb0eaa30edb5007041a136" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "phone" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "role" character varying NOT NULL DEFAULT 'USER', "programmeId" uuid, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "class_session" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "date" date NOT NULL, "heureDebut" character varying NOT NULL, "heureFin" character varying NOT NULL, "academicYearId" uuid, "subjectId" uuid, "professorId" uuid, "classRepresentativeId" uuid, CONSTRAINT "PK_a3d6e3f59db21b19a3b6eb908d9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "subject" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nom" character varying NOT NULL, "volumeHoraire" integer NOT NULL, "programmeId" uuid, CONSTRAINT "PK_12eee115462e38d62e5455fc054" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "programme" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nom" character varying NOT NULL, "departementId" uuid, CONSTRAINT "PK_76ff6b30b74f213944d1ac0a660" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "departement" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nom" character varying NOT NULL, "universiteId" uuid, CONSTRAINT "PK_f32f7be16ef46566fececc35a34" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "universite" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nom" character varying NOT NULL, "organisationId" uuid, "responsableUniversiteId" uuid, CONSTRAINT "REL_d3e18b22e98fcf575ccb8373e4" UNIQUE ("responsableUniversiteId"), CONSTRAINT "PK_d7d76c116ebbb80f3f243772d93" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "organisation" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nom" character varying NOT NULL, CONSTRAINT "PK_c725ae234ef1b74cce43d2d00c1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "notification" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "timestamp" TIMESTAMP NOT NULL DEFAULT now(), "message" character varying NOT NULL, "status" character varying NOT NULL, "emargementId" uuid, "recipientId" uuid, CONSTRAINT "PK_705b6c7cdf9b2c2ff7ac7872cb7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users_subjects_subject" ("usersId" uuid NOT NULL, "subjectId" uuid NOT NULL, CONSTRAINT "PK_8169026eed2d89621cff15e7e36" PRIMARY KEY ("usersId", "subjectId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_833312c718480c67bd20dbb7de" ON "users_subjects_subject" ("usersId") `);
        await queryRunner.query(`CREATE INDEX "IDX_91430d3d1a91aa9847688942ee" ON "users_subjects_subject" ("subjectId") `);
        await queryRunner.query(`ALTER TABLE "emargement" ADD CONSTRAINT "FK_839ffe1fec713005d7c6b626b50" FOREIGN KEY ("classSessionId") REFERENCES "class_session"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "emargement" ADD CONSTRAINT "FK_1bebb56d3a95ed41f142563d987" FOREIGN KEY ("professorId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_1b807d70ac6aaf745260d51b864" FOREIGN KEY ("programmeId") REFERENCES "programme"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "class_session" ADD CONSTRAINT "FK_11b3ec74ce96255b4d4d43da7a2" FOREIGN KEY ("academicYearId") REFERENCES "academic_year"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "class_session" ADD CONSTRAINT "FK_2660453991695eaadb82948162b" FOREIGN KEY ("subjectId") REFERENCES "subject"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "class_session" ADD CONSTRAINT "FK_81e603ae38887475f8b95c8d1c5" FOREIGN KEY ("professorId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "class_session" ADD CONSTRAINT "FK_52707225182d817aa2351179f3e" FOREIGN KEY ("classRepresentativeId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "subject" ADD CONSTRAINT "FK_557a56cddee97d4df5962790af1" FOREIGN KEY ("programmeId") REFERENCES "programme"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "programme" ADD CONSTRAINT "FK_cd6907feed1e447367ac21475d4" FOREIGN KEY ("departementId") REFERENCES "departement"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "departement" ADD CONSTRAINT "FK_daff5b0b6a80116ffb32426eb4b" FOREIGN KEY ("universiteId") REFERENCES "universite"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "universite" ADD CONSTRAINT "FK_489274c2525af2b6a5b28542dc9" FOREIGN KEY ("organisationId") REFERENCES "organisation"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "universite" ADD CONSTRAINT "FK_d3e18b22e98fcf575ccb8373e49" FOREIGN KEY ("responsableUniversiteId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "notification" ADD CONSTRAINT "FK_8f207410573c371b2b3967fcc01" FOREIGN KEY ("emargementId") REFERENCES "emargement"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "notification" ADD CONSTRAINT "FK_ab7cbe7a013ecac5da0a8f88884" FOREIGN KEY ("recipientId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users_subjects_subject" ADD CONSTRAINT "FK_833312c718480c67bd20dbb7ded" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "users_subjects_subject" ADD CONSTRAINT "FK_91430d3d1a91aa9847688942eec" FOREIGN KEY ("subjectId") REFERENCES "subject"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_subjects_subject" DROP CONSTRAINT "FK_91430d3d1a91aa9847688942eec"`);
        await queryRunner.query(`ALTER TABLE "users_subjects_subject" DROP CONSTRAINT "FK_833312c718480c67bd20dbb7ded"`);
        await queryRunner.query(`ALTER TABLE "notification" DROP CONSTRAINT "FK_ab7cbe7a013ecac5da0a8f88884"`);
        await queryRunner.query(`ALTER TABLE "notification" DROP CONSTRAINT "FK_8f207410573c371b2b3967fcc01"`);
        await queryRunner.query(`ALTER TABLE "universite" DROP CONSTRAINT "FK_d3e18b22e98fcf575ccb8373e49"`);
        await queryRunner.query(`ALTER TABLE "universite" DROP CONSTRAINT "FK_489274c2525af2b6a5b28542dc9"`);
        await queryRunner.query(`ALTER TABLE "departement" DROP CONSTRAINT "FK_daff5b0b6a80116ffb32426eb4b"`);
        await queryRunner.query(`ALTER TABLE "programme" DROP CONSTRAINT "FK_cd6907feed1e447367ac21475d4"`);
        await queryRunner.query(`ALTER TABLE "subject" DROP CONSTRAINT "FK_557a56cddee97d4df5962790af1"`);
        await queryRunner.query(`ALTER TABLE "class_session" DROP CONSTRAINT "FK_52707225182d817aa2351179f3e"`);
        await queryRunner.query(`ALTER TABLE "class_session" DROP CONSTRAINT "FK_81e603ae38887475f8b95c8d1c5"`);
        await queryRunner.query(`ALTER TABLE "class_session" DROP CONSTRAINT "FK_2660453991695eaadb82948162b"`);
        await queryRunner.query(`ALTER TABLE "class_session" DROP CONSTRAINT "FK_11b3ec74ce96255b4d4d43da7a2"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_1b807d70ac6aaf745260d51b864"`);
        await queryRunner.query(`ALTER TABLE "emargement" DROP CONSTRAINT "FK_1bebb56d3a95ed41f142563d987"`);
        await queryRunner.query(`ALTER TABLE "emargement" DROP CONSTRAINT "FK_839ffe1fec713005d7c6b626b50"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_91430d3d1a91aa9847688942ee"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_833312c718480c67bd20dbb7de"`);
        await queryRunner.query(`DROP TABLE "users_subjects_subject"`);
        await queryRunner.query(`DROP TABLE "notification"`);
        await queryRunner.query(`DROP TABLE "organisation"`);
        await queryRunner.query(`DROP TABLE "universite"`);
        await queryRunner.query(`DROP TABLE "departement"`);
        await queryRunner.query(`DROP TABLE "programme"`);
        await queryRunner.query(`DROP TABLE "subject"`);
        await queryRunner.query(`DROP TABLE "class_session"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "emargement"`);
        await queryRunner.query(`DROP TABLE "academic_year"`);
    }

}
