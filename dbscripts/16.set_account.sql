USE `adserve`;
DROP PROCEDURE IF EXISTS `set_account`;
CREATE PROCEDURE `set_account` (
    $id int(11),
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
        INSERT INTO accounts (
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
        UPDATE accounts
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