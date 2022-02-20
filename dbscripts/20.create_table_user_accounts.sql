USE `adserve`;
DROP TABLE IF EXISTS `user_accounts`;
CREATE TABLE `user_accounts` (
    `user_id` int(11) NOT NULL,
    `account_id` int(11) NOT NULL,
    `insert_date` datetime NOT NULL DEFAULT now(),
    `modify_date` datetime DEFAULT NULL,
    `is_active` tinyint(1) DEFAULT NULL
);