-- Sample data for the H2 in-memory "nodb" profile only.
-- Spring Boot skips this script for the default (SQL Server) datasource.

INSERT INTO site_master (site_store_code, Stores, City, State, access_code)
VALUES ('STORE001', 'Sample Store', 'Pune', 'Maharashtra', 'DEMO123');

INSERT INTO target_master (no, site_store_code, store_name, months, monthly_target)
VALUES (1, 'STORE001', 'Sample Store', DATEADD('DAY', 1 - DAY(CURRENT_DATE), CURRENT_DATE), 300000);
