USE `adserve`;
DROP PROCEDURE IF EXISTS `delete_advertiser`;

DELIMITER //

CREATE PROCEDURE `delete_advertiser` (
    $id int(11)
)
BEGIN
    SET SESSION TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
    SET @id := $id;
    DELETE FROM advertisers WHERE id = $id;
    SELECT @id as id;
END //

DELIMITER ;
