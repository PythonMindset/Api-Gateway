-- Migration: Add name and description columns to access_request table
-- Run this after the initial schema setup

ALTER TABLE access_request
ADD COLUMN name VARCHAR(255) DEFAULT 'Unknown User' NOT NULL,
ADD COLUMN description TEXT;