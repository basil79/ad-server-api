USE `adserve`;
DROP PROCEDURE IF EXISTS `get_supply_tags`;

DELIMITER //

CREATE PROCEDURE `get_supply_tags` (
    $id int(11),
    $supply_account_id int(11),
    $site_id int(11),
    $account_id int(11),
    $from int,
    $size int,
    $sort_column varchar(50),
    $sort_order varchar(4)
)
BEGIN
    SET $from = IFNULL($from, 0);
    SET $size = IFNULL($size, 100);

    SET @sort_column = IFNULL($sort_column, 'id');
    SET @sort_order = IFNULL($sort_order, 'ASC');

    SELECT
        SQL_CALC_FOUND_ROWS
        s.id,
        s.name,
        s.supply_account_id,
        s.site_id,
        s.account_id,
        s.insert_date,
        s.modify_date,
        s.is_active
    FROM supply_tags s
    WHERE 1 = 1
        AND s.id = IFNULL($id, s.id)
        AND s.supply_account_id <=> IFNULL($supply_account_id, s.supply_account_id)
        AND s.site_id <=> IFNULL($site_id, s.site_id)
        AND s.account_id <=> IFNULL($account_id, s.account_id)
    ORDER BY
    CASE
        WHEN @sort_order <> 'ASC' THEN 0
        WHEN @sort_column = 'id' THEN s.id
    END ASC,
    CASE
        WHEN @sort_order <> 'ASC' THEN ''
        WHEN @sort_column = 'name' THEN s.name
    END ASC,
    CASE
        WHEN @sort_order <> 'ASC' THEN 0
        WHEN @sort_column = 'supply_account_id' THEN s.supply_account_id
    END ASC,
    CASE
        WHEN @sort_order <> 'ASC' THEN 0
        WHEN @sort_column = 'site_id' THEN s.site_id
    END ASC,
    CASE
        WHEN @sort_order <> 'ASC' THEN 0
        WHEN @sort_column = 'account_id' THEN s.account_id
    END ASC,
    CASE
        WHEN @sort_order <> 'ASC' THEN CAST(NULL AS DATE)
        WHEN @sort_column = 'insert_date' THEN s.insert_date
    END ASC,
    CASE
        WHEN @sort_order <> 'ASC' THEN CAST(NULL AS DATE)
        WHEN @sort_column = 'modify_date' THEN s.modify_date
    END ASC,
    CASE
        WHEN @sort_order <> 'ASC' THEN 0
        WHEN @sort_column = 'is_active' THEN s.is_active
    END ASC,
    CASE
        WHEN @sort_order <> 'DESC' THEN 0
        WHEN @sort_column = 'id' THEN s.id
    END DESC,
    CASE
        WHEN @sort_order <> 'DESC' THEN ''
        WHEN @sort_column = 'name' THEN s.name
    END DESC,
    CASE
        WHEN @sort_order <> 'DESC' THEN 0
        WHEN @sort_column = 'supply_account_id' THEN s.supply_account_id
    END DESC,
    CASE
        WHEN @sort_order <> 'DESC' THEN 0
        WHEN @sort_column = 'site_id' THEN s.site_id
    END DESC,
    CASE
        WHEN @sort_order <> 'DESC' THEN 0
        WHEN @sort_column = 'account_id' THEN s.account_id
    END DESC,
    CASE
        WHEN @sort_order <> 'DESC' THEN CAST(NULL AS DATE)
        WHEN @sort_column = 'insert_date' THEN s.insert_date
    END DESC,
    CASE
        WHEN @sort_order <> 'DESC' THEN CAST(NULL AS DATE)
        WHEN @sort_column = 'modify_date' THEN s.modify_date
    END DESC,
    CASE
        WHEN @sort_order <> 'DESC' THEN 0
        WHEN @sort_column = 'is_active' THEN s.is_active
    END DESC
  LIMIT $from, $size;
  SET @row_num = FOUND_ROWS();
  SELECT @row_num;

END //

DELIMITER ;
