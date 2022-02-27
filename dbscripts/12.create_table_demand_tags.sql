USE `adserve`;
DROP TABLE IF EXISTS `demand_tags`;
CREATE TABLE `demand_tags` (
    `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
    `name` varchar(255) NOT NULL,
    `account_id` int(11) NOT NULL,
    `supply_tag_id` int(11) DEFAULT NULL,
    `vast_url` text DEFAULT NULL,
    `tier` int(3) DEFAULT NULL,
    `priority` int(3) DEFAULT NULL,
    `cpm` decimal(15, 2) DEFAULT NULL,
    `floor` decimal(15, 2) DEFAULT NULL,
    `timeout` int(11) DEFAULT NULL,
    `insert_date` datetime NOT NULL DEFAULT now(),
    `modify_date` datetime DEFAULT NULL,
    `is_active` tinyint(1) DEFAULT NULL,
    PRIMARY KEY (`id`)
);
