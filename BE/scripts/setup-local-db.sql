-- Life Insurance Recommendation Database Setup
-- Run this script in your local PostgreSQL instance

-- Create database (run this as superuser)
-- CREATE DATABASE life_insurance;

-- Connect to the database
-- \c life_insurance;

-- Create enum type for risk tolerance
CREATE TYPE risk_tolerance_enum AS ENUM ('low', 'medium', 'high');

-- Create recommendations table
CREATE TABLE IF NOT EXISTS recommendations (
    id SERIAL PRIMARY KEY,
    age INTEGER NOT NULL CHECK (age >= 18 AND age <= 100),
    income DECIMAL(12,2) NOT NULL CHECK (income >= 0),
    dependents INTEGER NOT NULL CHECK (dependents >= 0 AND dependents <= 10),
    risk_tolerance risk_tolerance_enum NOT NULL,
    recommendation TEXT NOT NULL,
    explanation TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_recommendations_created_at ON recommendations(created_at);
CREATE INDEX IF NOT EXISTS idx_recommendations_age ON recommendations(age);
CREATE INDEX IF NOT EXISTS idx_recommendations_income ON recommendations(income);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_recommendations_updated_at 
    BEFORE UPDATE ON recommendations 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Insert sample data for testing
INSERT INTO recommendations (age, income, dependents, risk_tolerance, recommendation, explanation) VALUES
(35, 60000, 1, 'high', 'Term Life – $500,000 for 20 years', 'You''re under 40 with high risk tolerance, so a term life policy fits.'),
(55, 80000, 0, 'low', 'Whole Life – $250,000', 'You''re over 50 with low risk tolerance, so a whole life policy provides permanent coverage.'),
(40, 120000, 3, 'medium', 'Term Life – $1,000,000 for 30 years', 'High income with multiple dependents requires substantial coverage for long-term protection.')
ON CONFLICT DO NOTHING;

-- Grant permissions (adjust as needed)
-- GRANT ALL PRIVILEGES ON TABLE recommendations TO your_user;
-- GRANT USAGE, SELECT ON SEQUENCE recommendations_id_seq TO your_user; 