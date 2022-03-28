USE `adserve`;
DROP PROCEDURE IF EXISTS `set_advertiser`;

DELIMITER //

CREATE PROCEDURE `set_advertiser` (
    $id int(11),
    $name varchar(255),
    $demand_account_id int(11),
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
        INSERT INTO advertisers (
            id,
            name,
            demand_account_id,
            account_id,
            modify_date,
            is_active
        ) VALUES (
            $id,
            $name,
            $demand_account_id,
            $account_id,
            NOW(),
            IFNULL($is_active, 0)
        );

        SET $id = last_insert_id();
    ELSE
        UPDATE advertisers
            SET
                id = IFNULL($id, id),
                name = IFNULL($name, name),
                demand_account_id = IFNULL($demand_account_id, demand_account_id),
                account_id = IFNULL($account_id, account_id),
                modify_date = NOW(),
                is_active = IFNULL($is_active, is_active)
            WHERE id = $id;
    END IF;
    SELECT $id as id;
        COMMIT;
END //

DELIMITER ;
