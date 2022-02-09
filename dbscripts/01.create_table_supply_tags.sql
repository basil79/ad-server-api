USE `adserve`;
DROP TABLE IF EXISTS `supply_tags`;
CREATE TABLE `supply_tags` (
    `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
    `name` varchar(255) NOT NULL,
    `insert_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `modify_date` datetime DEFAULT NULL,
    `is_active` tinyint(1) DEFAULT NULL,
    PRIMARY KEY (`id`)
);