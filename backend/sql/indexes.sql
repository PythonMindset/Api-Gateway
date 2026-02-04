-- Indexes for users table
CREATE INDEX idx_users_email ON users(email);

-- Indexes for projects table
CREATE INDEX idx_projects_created_by ON projects(created_by);
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_projects_is_public ON projects(is_public);

-- Indexes for access_request table
CREATE INDEX idx_access_request_email ON access_request(email);
CREATE INDEX idx_access_request_status ON access_request(status);

-- Indexes for api_logs table
CREATE INDEX idx_api_logs_user_id ON api_logs(user_id);
CREATE INDEX idx_api_logs_timestamp ON api_logs(timestamp);