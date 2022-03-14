USE `adserve`;
DROP PROCEDURE IF EXISTS `get_accounts`;

DELIMITER //

CREATE PROCEDURE `get_accounts` (
    $id int(11),
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
        a.id,
        a.name,
        a.insert_date,
        a.modify_date,
        a.is_active
    FROM accounts a
    WHERE 1 = 1
        AND a.id = IFNULL($id, a.id)
    ORDER BY
    CASE
        WHEN @sort_order <> 'ASC' THEN 0
        WHEN @sort_column = 'id' THEN a.id
    END ASC,
    CASE
        WHEN @sort_order <> 'ASC' THEN ''
        WHEN @sort_column = 'name' THEN a.name
    END ASC,
    CASE
        WHEN @sort_order <> 'ASC' THEN CAST(NULL AS DATE)
        WHEN @sort_column = 'insert_date' THEN a.insert_date
    END ASC,
    CASE
        WHEN @sort_order <> 'ASC' THEN CAST(NULL AS DATE)
        WHEN @sort_column = 'modify_date' THEN a.modify_date
    END ASC,
    CASE
        WHEN @sort_order <> 'ASC' THEN 0
        WHEN @sort_column = 'is_active' THEN a.is_active
    END ASC,
    CASE
        WHEN @sort_order <> 'DESC' THEN 0
        WHEN @sort_column = 'id' THEN a.id
    END DESC,
    CASE
        WHEN @sort_order <> 'DESC' THEN ''
        WHEN @sort_column = 'name' THEN a.name
    END DESC,
    CASE
        WHEN @sort_order <> 'DESC' THEN CAST(NULL AS DATE)
        WHEN @sort_column = 'insert_date' THEN a.insert_date
    END DESC,
    CASE
        WHEN @sort_order <> 'DESC' THEN CAST(NULL AS DATE)
        WHEN @sort_column = 'modify_date' THEN a.modify_date
    END DESC,
    CASE
        WHEN @sort_order <> 'DESC' THEN 0
        WHEN @sort_column = 'is_active' THEN a.is_active
    END DESC
  LIMIT $from, $size;
  SET @row_num = FOUND_ROWS();
  SELECT @row_num;

END //

DELIMITER ;
