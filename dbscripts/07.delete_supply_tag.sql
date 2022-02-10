USE `adserve`;
DROP PROCEDURE IF EXISTS `delete_supply_tag`;
CREATE PROCEDURE `delete_supply_tag` (
    $id bigint(20)
)
BEGIN
    SET SESSION TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
    SET @delete_id := $id;
    DELETE FROM supply_tags WHERE id = $id;
    SELECT @delete_id as id;
END;