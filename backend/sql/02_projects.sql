-- Create project status enum
CREATE TYPE project_status AS ENUM ('planning', 'testing', 'completed', 'live', 'on_hold', 'archived');

-- Create projects table
CREATE TABLE projects (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    tech_stack TEXT,
    repo_url VARCHAR(500),
    status project_status NOT NULL,
    is_public BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by BIGINT REFERENCES users(id),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);