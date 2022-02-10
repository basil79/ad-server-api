USE `adserve`;
DROP PROCEDURE IF EXISTS `set_supply_tag`;
CREATE PROCEDURE `set_supply_tag` (
    $id bigint(20),
    $name varchar(255),
    $is_active tinyint(1)
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
        BEGIN
            ROLLBACK;
            RESIGNAL;
        END;
    START TRANSACTION;
    IF (ISNULL($id)) THEN
        INSERT INTO supply_tags (
            id,
            name,
            modify_date,
            is_active
        ) VALUES (
            $id,
            $name,
            NOW(),
            IFNULL($is_active, 0)
        );

        SET $id = last_insert_id();
    ELSE
        UPDATE supply_tags
            SET
                id = IFNULL($id, id),
                name = IFNULL($name, name),
                modify_date = NOW(),
                is_active = IFNULL($is_active, is_active)
            WHERE id = $id;
    END IF;
    SELECT $id as id;
        COMMIT;
END;