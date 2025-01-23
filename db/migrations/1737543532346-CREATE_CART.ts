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
    await queryRunner.query(`
        INSERT INTO carts_entity (cartId, userId, subtotal, tax, shippingCost, totalPrice, currency)
            VALUES
          (72, 72, 52, 82, 1.97, 22, 'SEK'),
          (73, 73, 81, 39, 1.56, 62, 'AMD'),
          (74, 74, 55, 100, 2.53, 36, 'EUR'),
          (75, 75, 35, 1, 2.18, 41, 'CNY'),
          (76, 76, 84, 66, 2.68, 21, 'IDR'),
          (77, 77, 53, 84, 2.25, 90, 'EGP'),
          (78, 78, 72, 100, 2.48, 61, 'MYR'),
          (79, 79, 36, 40, 2.14, 29, 'CNY'),
          (80, 80, 31, 16, 2.02, 88, 'UZS'),
          (81, 81, 35, 1, 1.19, 53, 'ILS'),
          (82, 82, 84, 12, 2.62, 70, 'THB'),
          (83, 83, 80, 66, 1.07, 68, 'CAD'),
          (84, 84, 96, 16, 2.84, 68, 'CUP'),
          (85, 85, 47, 88, 2.84, 86, 'PLN'),
          (86, 86, 88, 26, 1.3, 71, 'CNY'),
          (87, 87, 92, 87, 2.2, 85, 'PHP'),
          (88, 88, 61, 40, 2.64, 87, 'RUB'),
          (89, 89, 93, 27, 2.42, 37, 'COP'),
          (90, 90, 78, 24, 1.51, 25, 'VEF'),
          (91, 91, 69, 19, 1.31, 53, 'CNY'),
          (92, 92, 39, 45, 1.26, 47, 'EGP'),
          (93, 93, 49, 84, 1.25, 75, 'RUB'),
          (94, 94, 72, 17, 2.26, 84, 'IDR'),
          (95, 95, 80, 32, 1.99, 30, 'RUB'),
          (96, 96, 76, 87, 1.48, 24, 'USD'),
          (97, 97, 36, 24, 1.6, 73, 'TND'),
          (98, 98, 49, 75, 1.45, 73, 'RUB'),
          (99, 99, 62, 31, 1.12, 90, 'PHP'),
          (100, 100, 49, 5, 1.75, 58, 'CZK')
        `);
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
