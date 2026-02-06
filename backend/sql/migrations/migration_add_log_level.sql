-- Migration: Add log level column to api_logs table
-- Run this after the initial schema setup

ALTER TABLE api_logs
ADD COLUMN level VARCHAR(10) DEFAULT 'info' CHECK (level IN ('info', 'warning', 'error'));