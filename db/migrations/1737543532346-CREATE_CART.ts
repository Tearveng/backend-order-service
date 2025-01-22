import { MigrationInterface, QueryRunner } from 'typeorm';

export class CREATECART1737543532346 implements MigrationInterface {
  name = 'CREATECART1737543532346';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`items_entity\` (\`itemId\` varchar(36) NOT NULL, \`productId\` int NOT NULL, \`name\` varchar(255) NOT NULL, \`quantity\` int NOT NULL, \`price\` decimal(10,2) NOT NULL, \`variant\` json NOT NULL, \`sku\` varchar(255) NOT NULL, \`subtotal\` decimal(10,2) NOT NULL, \`tax\` decimal(10,2) NOT NULL DEFAULT '0.00', \`totalPrice\` decimal(10,2) NOT NULL, \`productImage\` varchar(255) NOT NULL DEFAULT '', \`productUrl\` varchar(255) NOT NULL DEFAULT '', \`isInStock\` tinyint NOT NULL DEFAULT 0, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`cartId\` varchar(36) NULL, PRIMARY KEY (\`itemId\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`carts_entity\` (\`cartId\` varchar(36) NOT NULL, \`userId\` int NOT NULL, \`subtotal\` decimal(10,2) NOT NULL DEFAULT '0.00', \`tax\` decimal(10,2) NOT NULL DEFAULT '0.00', \`shippingCost\` decimal(10,2) NOT NULL DEFAULT '0.00', \`totalPrice\` decimal(10,2) NOT NULL DEFAULT '0.00', \`currency\` varchar(255) NOT NULL DEFAULT 'USD', \`couponCode\` varchar(255) NULL, \`discountsApplied\` decimal(5,2) NULL, \`isSavedForLater\` tinyint NOT NULL DEFAULT 0, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`cartId\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`orders_entity\` (\`id\` int NOT NULL AUTO_INCREMENT, \`refererCode\` varchar(255) NOT NULL DEFAULT '', \`discount\` int NOT NULL DEFAULT '0', \`total\` int NOT NULL, \`subtotal\` int NOT NULL, \`totalPrice\` int NOT NULL, \`currency\` varchar(255) NOT NULL DEFAULT 'USD', \`couponCode\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`items_entity\` ADD CONSTRAINT \`FK_3886d6ed5e07b211c051e3c0100\` FOREIGN KEY (\`cartId\`) REFERENCES \`carts_entity\`(\`cartId\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`items_entity\` DROP FOREIGN KEY \`FK_3886d6ed5e07b211c051e3c0100\``,
    );
    await queryRunner.query(`DROP TABLE \`orders_entity\``);
    await queryRunner.query(`DROP TABLE \`carts_entity\``);
    await queryRunner.query(`DROP TABLE \`items_entity\``);
  }
}
