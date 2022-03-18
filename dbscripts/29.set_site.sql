USE `adserve`;
DROP PROCEDURE IF EXISTS `set_site`;

DELIMITER //

CREATE PROCEDURE `set_site` (
    $id int(11),
    $name varchar(255),
    $domain varchar(255),
    $supply_account_id int(11),
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
        INSERT INTO sites (
            id,
            name,
            domain,
            supply_account_id,
            account_id,
            modify_date,
            is_active
        ) VALUES (
            $id,
            $name,
            $domain,
            $supply_account_id,
            $account_id,
            NOW(),
            IFNULL($is_active, 0)
        );

        SET $id = last_insert_id();
    ELSE
        UPDATE sites
            SET
                id = IFNULL($id, id),
                name = IFNULL($name, name),
                domain = IFNULL($domain, domain),
                supply_account_id = IFNULL($supply_account_id, supply_account_id),
                account_id = IFNULL($account_id, account_id),
                modify_date = NOW(),
                is_active = IFNULL($is_active, is_active)
            WHERE id = $id;
    END IF;
    SELECT $id as id;
        COMMIT;
END //

DELIMITER ;
