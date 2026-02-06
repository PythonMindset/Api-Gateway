-- Create api_logs table
CREATE TABLE api_logs (
    id BIGSERIAL PRIMARY KEY,
    endpoint VARCHAR(500) NOT NULL,
    method VARCHAR(10) NOT NULL,
    status_code INTEGER NOT NULL,
    user_id BIGINT REFERENCES users(id),
    level VARCHAR(10) DEFAULT 'info' CHECK (level IN ('info', 'warning', 'error')),
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);