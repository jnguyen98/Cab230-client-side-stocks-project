module.exports = {
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        database: process.env.DBNAME,
        user: process.env.USER,
        password: process.env.DBPASSWORD
    }
}
