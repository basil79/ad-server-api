USE `adserve`;
DROP PROCEDURE IF EXISTS `delete_account`;
CREATE PROCEDURE `delete_account` (
    $id int(11)
)
BEGIN
    SET SESSION TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
    SET @id := $id;
    DELETE FROM accounts WHERE id = $id;
    SELECT @id as id;
END;