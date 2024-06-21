create table users(
    id VARCHAR(255) PRIMARY KEY,
    FirstName VARCHAR(255) NOT NULL,
    LastName  VARCHAR(255) NOT NULL,
    phone_number VARCHAR(20) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    profileImage VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'user',
    isCreated BIT DEFAULT 0,
    createdAt DATEtIME NOT NULL,
    bio VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    d_b_o VARCHAR(255) NOT NULL
)

SELECT * from users