USE `adserve`;
INSERT INTO supply_tags (id, name, is_active) VALUES (2, 'test2', 1);
UPDATE supply_tags SET modify_date = now();