const mongoose = require('mongoose');
const dns = require('node:dns');

const connectDatabase = async () => {
    const dnsServers = process.env.DNS_SERVERS
        ?.split(',')
        .map(server => server.trim())
        .filter(Boolean);

    if (dnsServers?.length) {
        dns.setServers(dnsServers);
    }

    if (!process.env.DB_URI) {
        throw new Error('DB_URI is missing from the backend environment file.');
    }

    const connection = await mongoose.connect(process.env.DB_URI);
    console.log(`MongoDB Database connected with HOST: ${connection.connection.host}`);
}

module.exports = connectDatabase