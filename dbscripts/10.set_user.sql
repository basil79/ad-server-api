USE `adserve`;
DROP PROCEDURE IF EXISTS `set_user`;
CREATE PROCEDURE `set_user` (
    $id int(11),
    $username varchar(255),
    $email varchar(255),
    $password varchar(255),
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
        INSERT INTO users (
            id,
            username,
            email,
            password,
            modify_date,
            is_active
        ) VALUES (
            $id,
            $username,
            $email,
            $password,
            NOW(),
            IFNULL($is_active, 0)
        );

        SET $id = last_insert_id();
    ELSE
        UPDATE users
            SET
                id = IFNULL($id, id),
                username = IFNULL($username, username),
                email = IFNULL($email, email),
                password = IFNULL($password, password),
                modify_date = NOW(),
                is_active = IFNULL($is_active, is_active)
            WHERE id = $id;
    END IF;
    SELECT $id as id;
        COMMIT;
END;