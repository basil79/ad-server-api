USE `adserve`;
DROP PROCEDURE IF EXISTS `set_supply_tag`;

DELIMITER //

CREATE PROCEDURE `set_supply_tag` (
    $id int(11),
    $name varchar(255),
    $supply_account_id int(11),
    $site_id int(11),
    $account_id int(11),
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
            supply_account_id,
            site_id,
            account_id,
            modify_date,
            is_active
        ) VALUES (
            $id,
            $name,
            $supply_account_id,
            $site_id,
            $account_id,
            NOW(),
            IFNULL($is_active, 0)
        );

        SET $id = last_insert_id();
    ELSE
        UPDATE supply_tags
            SET
                id = IFNULL($id, id),
                name = IFNULL($name, name),
                supply_account_id = IFNULL($supply_account_id, supply_account_id),
                site_id = IFNULL($site_id, site_id),
                account_id = IFNULL($account_id, account_id),
                modify_date = NOW(),
                is_active = IFNULL($is_active, is_active)
            WHERE id = $id;
    END IF;
    SELECT $id as id;
        COMMIT;
END //

DELIMITER ;
