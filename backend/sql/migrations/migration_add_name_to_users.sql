-- Migration: Add name column to users table
-- Run this after the initial schema setup
-- 

ALTER TABLE users
ADD COLUMN name VARCHAR(255) DEFAULT 'Unknown User' NOT NULL;