USE `adserve`;
DROP TABLE IF EXISTS `demand_accounts`;
CREATE TABLE `demand_accounts` (
	`id` int(11) unsigned NOT NULL AUTO_INCREMENT,
    `name` varchar(255) NOT NULL,
    `account_id` int(11) NOT NULL,
    `insert_date` datetime NOT NULL DEFAULT now(),
    `modify_date` datetime DEFAULT NULL,
    `is_active` tinyint(1) DEFAULT NULL,
    PRIMARY KEY (`id`)
)