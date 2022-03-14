USE `adserve`;
DROP PROCEDURE IF EXISTS `delete_user`;

DELIMITER //

CREATE PROCEDURE `delete_user` (
    $id int(11)
)
BEGIN
    SET SESSION TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
    SET @id := $id;
    DELETE FROM users WHERE id = $id;
    SELECT @id as id;
END //

DELIMITER ;
