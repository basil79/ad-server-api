USE `adserve`;
DROP PROCEDURE IF EXISTS `get_demand_tags`;

DELIMITER //

CREATE PROCEDURE `get_demand_tags` (
    $id int(11),
    $demand_account_id int(11),
    $advertiser_id int(11),
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
        d.id,
        d.name,
        d.demand_account_id,
        d.advertiser_id,
        d.account_id,
        d.vast_url,
        d.tier,
        d.priority,
        d.cpm,
        d.floor,
        d.timeout,
        d.insert_date,
        d.modify_date,
        d.is_active
    FROM demand_tags d
    WHERE 1 = 1
        AND d.id = IFNULL($id, d.id)
        AND d.demand_account_id <=> IFNULL($demand_account_id, d.demand_account_id)
        AND d.advertiser_id <=> IFNULL($advertiser_id, d.advertiser_id)
        AND d.account_id <=> IFNULL($account_id, d.account_id)
    ORDER BY
    CASE
        WHEN @sort_order <> 'ASC' THEN 0
        WHEN @sort_column = 'id' THEN d.id
    END ASC,
    CASE
        WHEN @sort_order <> 'ASC' THEN ''
        WHEN @sort_column = 'name' THEN d.name
    END ASC,
    CASE
        WHEN @sort_order <> 'ASC' THEN 0
        WHEN @sort_column = 'demand_account_id' THEN d.demand_account_id
    END ASC,
    CASE
        WHEN @sort_order <> 'ASC' THEN 0
        WHEN @sort_column = 'advertiser_id' THEN d.advertiser_id
    END ASC,
    CASE
        WHEN @sort_order <> 'ASC' THEN 0
        WHEN @sort_column = 'account_id' THEN d.account_id
    END ASC,
    CASE
        WHEN @sort_order <> 'ASC' THEN 0
        WHEN @sort_column = 'tier' THEN d.tier
    END ASC,
    CASE
        WHEN @sort_order <> 'ASC' THEN 0
        WHEN @sort_column = 'priority' THEN d.priority
    END ASC,
    CASE
        WHEN @sort_order <> 'ASC' THEN 0
        WHEN @sort_column = 'timeout' THEN d.timeout
    END ASC,
    CASE
        WHEN @sort_order <> 'ASC' THEN CAST(NULL AS DATE)
        WHEN @sort_column = 'insert_date' THEN d.insert_date
    END ASC,
    CASE
        WHEN @sort_order <> 'ASC' THEN CAST(NULL AS DATE)
        WHEN @sort_column = 'modify_date' THEN d.modify_date
    END ASC,
    CASE
        WHEN @sort_order <> 'ASC' THEN 0
        WHEN @sort_column = 'is_active' THEN d.is_active
    END ASC,
    CASE
        WHEN @sort_order <> 'DESC' THEN 0
        WHEN @sort_column = 'id' THEN d.id
    END DESC,
    CASE
        WHEN @sort_order <> 'DESC' THEN ''
        WHEN @sort_column = 'name' THEN d.name
    END DESC,
    CASE
        WHEN @sort_order <> 'DESC' THEN 0
        WHEN @sort_column = 'demand_account_id' THEN d.demand_account_id
    END DESC,
    CASE
        WHEN @sort_order <> 'DESC' THEN 0
        WHEN @sort_column = 'advertiser_id' THEN d.advertiser_id
    END DESC,
    CASE
        WHEN @sort_order <> 'DESC' THEN 0
        WHEN @sort_column = 'account_id' THEN d.account_id
    END DESC,
    CASE
        WHEN @sort_order <> 'DESC' THEN 0
        WHEN @sort_column = 'tier' THEN d.tier
    END DESC,
    CASE
        WHEN @sort_order <> 'DESC' THEN 0
        WHEN @sort_column = 'priority' THEN d.priority
    END DESC,
    CASE
        WHEN @sort_order <> 'DESC' THEN 0
        WHEN @sort_column = 'timeout' THEN d.timeout
    END DESC,
    CASE
        WHEN @sort_order <> 'DESC' THEN CAST(NULL AS DATE)
        WHEN @sort_column = 'insert_date' THEN d.insert_date
    END DESC,
    CASE
        WHEN @sort_order <> 'DESC' THEN CAST(NULL AS DATE)
        WHEN @sort_column = 'modify_date' THEN d.modify_date
    END DESC,
    CASE
        WHEN @sort_order <> 'DESC' THEN 0
        WHEN @sort_column = 'is_active' THEN d.is_active
    END DESC
  LIMIT $from, $size;
  SET @row_num = FOUND_ROWS();
  SELECT @row_num;

END //

DELIMITER ;
