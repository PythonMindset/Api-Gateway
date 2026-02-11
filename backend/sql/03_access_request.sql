-- Create access_request_status enum
CREATE TYPE access_request_status AS ENUM ('active', 'deactivated');

-- Create access_request table
CREATE TABLE access_request (
    id BIGSERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    status access_request_status DEFAULT 'active',
    requested_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);