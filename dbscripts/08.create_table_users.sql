USE `adserve`;
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
    `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
    `username` varchar(255) NOT NULL,
    `email` varchar(255) NOT NULL,
    `password` varchar(255) NOT NULL,
    `two_factor_authentication` tinyint(1) DEFAULT NULL,
    `two_factor_authentication_secret` varchar(255) DEFAULT NULL,
    `insert_date` datetime NOT NULL DEFAULT now(),
    `modify_date` datetime DEFAULT NULL,
    `is_active` tinyint(1) DEFAULT NULL,
    PRIMARY KEY (`id`)
);