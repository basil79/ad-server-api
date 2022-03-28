USE `adserve`;
DROP PROCEDURE IF EXISTS `set_demand_account`;

DELIMITER //

CREATE PROCEDURE `set_demand_account` (
    $id int(11),
    $name varchar(255),
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
        INSERT INTO demand_accounts (
            id,
            name,
            account_id,
            modify_date,
            is_active
        ) VALUES (
            $id,
            $name,
            $account_id,
            NOW(),
            IFNULL($is_active, 0)
        );

        SET $id = last_insert_id();
    ELSE
        UPDATE demand_accounts
            SET
                id = IFNULL($id, id),
                name = IFNULL($name, name),
                account_id = IFNULL($account_id, account_id),
                modify_date = NOW(),
                is_active = IFNULL($is_active, is_active)
            WHERE id = $id;
    END IF;
    SELECT $id as id;
        COMMIT;
END //

DELIMITER ;
