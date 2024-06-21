CREATE OR ALTER PROCEDURE switchRoles
    @user_id VARCHAR(255)
AS
BEGIN
    UPDATE users SET role = 'user' WHERE id = @user_id;
END