import dotenv from 'dotenv';
import path from 'path';

try {
    dotenv.config({ path: path.join(__dirname, '../.env') });
}
catch (err) {
    dotenv.config({ path: path.join(__dirname, '../tmp.env') });
}

const APP_CONFIG = {
    DB: {
        HOST: process.env.DB_HOST || 'localhost',
        PORT: process.env.DB_PORT || '5432',
        USER: process.env.DB_USER || 'database',
        PASSWORD: process.env.DB_PASSWORD || 'db-password',
        NAME: process.env.DB_NAME || 'database',
    }
};

export { APP_CONFIG };
