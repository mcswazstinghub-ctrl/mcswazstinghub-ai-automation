// index.js

const fs = require('fs');
const util = require('util');
const path = require('path');
const winston = require('winston'); // Logging framework

// Configure logging
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.File({ filename: 'combined.log' }),
        new winston.transports.Console()
    ],
});

// Load configuration
async function loadConfig() {
    try {
        const configPath = path.resolve(__dirname, 'config.json'); // Path to configuration file
        const configData = await util.promisify(fs.readFile)(configPath, 'utf8');
        return JSON.parse(configData);
    } catch (error) {
        logger.error('Error loading configuration:', error);
        throw error;
    }
}

// Main function
async function main() {
    try {
        const config = await loadConfig();
        logger.info('Configuration loaded successfully:', config);
        // Your main logic goes here
    } catch (error) {
        logger.error('Error in main execution:', error);
    }
}

main();
