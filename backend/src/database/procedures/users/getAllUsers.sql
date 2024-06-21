CREATE OR ALTER PROCEDURE getAllUsers
AS
BEGIN
    SELECT * FROM users WHERE role = 'user'
END

SELECT * FROM users WHERE role = 'user'