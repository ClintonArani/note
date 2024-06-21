CREATE PROCEDURE registerUser
    @id VARCHAR(255),
    @FirstName VARCHAR(255),
    @LastName VARCHAR(255),
    @phone_number VARCHAR(20),
    @email VARCHAR(255),
    @password VARCHAR(255),
    @profileImage VARCHAR(255),
    @createdAt DATEtIME,
    @bio VARCHAR(255),
    @location VARCHAR(255),
    @d_b_o VARCHAR(255)
AS
BEGIN
    INSERT INTO users(id, FirstName, LastName, phone_number, email, password, profileImage, role, isCreated, createdAt, bio, location, d_b_o)
    VALUES(@id, @FirstName, @LastName, @phone_number, @email, @password, @profileImage, 'user',0, @createdAt, @bio, @location, @d_b_o);
END