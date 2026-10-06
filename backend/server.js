const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.join(__dirname, 'env.txt') });

const app = require('./app');
const connectDatabase = require('./config/database')
const cloudinary = require('cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const startServer = async () => {
    try {
        await connectDatabase();
        const port = process.env.PORT || 4001;

        app.listen(port, () => {
            console.log(`Server started on port ${port} in ${process.env.NODE_ENV} mode`);
        });
    } catch (error) {
        console.error('Server startup failed:', error.message);
        process.exitCode = 1;
    }
};

startServer();