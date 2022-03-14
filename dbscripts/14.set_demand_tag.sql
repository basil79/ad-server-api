USE `adserve`;
DROP PROCEDURE IF EXISTS `set_demand_tag`;

DELIMITER //

CREATE PROCEDURE `set_demand_tag` (
    $id int(11),
    $name varchar(255),
    $supply_tag_id int(11),
    $vast_url text,
    $tier int(3),
    $priority int(3),
    $cpm decimal(15, 2),
    $floor decimal(15, 2),
    $timeout int(11),
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
        INSERT INTO demand_tags (
            id,
            name,
            supply_tag_id,
            vast_url,
            tier,
            priority,
            cpm,
            floor,
            timeout,
            modify_date,
            is_active
        ) VALUES (
            $id,
            $name,
            $supply_tag_id,
            $vast_url,
            $tier,
            $priority,
            $cpm,
            $floor,
            $timeout,
            NOW(),
            IFNULL($is_active, 0)
        );

        SET $id = last_insert_id();
    ELSE
        UPDATE demand_tags
            SET
                id = IFNULL($id, id),
                name = IFNULL($name, name),
                supply_tag_id = IFNULL($supply_tag_id, supply_tag_id),
                vast_url = IFNULL($vast_url, vast_url),
                tier = IFNULL($tier, tier),
                priority = IFNULL($priority, priority),
                cpm = IFNULL($cpm, cpm),
                floor = IFNULL($floor, floor),
                timeout = IFNULL($timeout, timeout),
                modify_date = NOW(),
                is_active = IFNULL($is_active, is_active)
            WHERE id = $id;
    END IF;
    SELECT $id as id;
        COMMIT;
END //

DELIMITER ;
