USE `adserve`;
DROP PROCEDURE IF EXISTS `delete_demand_account`;

DELIMITER //

CREATE PROCEDURE `delete_demand_account` (
    $id int(11)
)
BEGIN
    SET SESSION TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
    SET @id := $id;
    DELETE FROM demand_accounts WHERE id = $id;
    SELECT @id as id;
END //

DELIMITER ;
