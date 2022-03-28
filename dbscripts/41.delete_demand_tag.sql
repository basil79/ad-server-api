USE `adserve`;
DROP PROCEDURE IF EXISTS `delete_demand_tag`;

DELIMITER //

CREATE PROCEDURE `delete_demand_tag` (
    $id int(11)
)
BEGIN
    SET SESSION TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
    SET @id := $id;
    DELETE FROM demand_tags WHERE id = $id;
    SELECT @id as id;
END //

DELIMITER ;
