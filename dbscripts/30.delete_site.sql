USE `adserve`;
DROP PROCEDURE IF EXISTS `delete_site`;

DELIMITER //

CREATE PROCEDURE `delete_site` (
    $id int(11)
)
BEGIN
    SET SESSION TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
    SET @id := $id;
    DELETE FROM sites WHERE id = $id;
    SELECT @id as id;
END //

DELIMITER ;
