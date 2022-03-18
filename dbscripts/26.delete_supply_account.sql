USE `adserve`;
DROP PROCEDURE IF EXISTS `delete_supply_account`;

DELIMITER //

CREATE PROCEDURE `delete_supply_account` (
    $id int(11)
)
BEGIN
    SET SESSION TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
    SET @id := $id;
    DELETE FROM supply_accounts WHERE id = $id;
    SELECT @id as id;
END //

DELIMITER ;
