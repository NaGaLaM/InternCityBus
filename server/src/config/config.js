require('dotenv').config();
module.exports =
{
    logger: 1,
    PORT: process.env.PORT,
    cors: {
        origin: "*",
        methods: ['get', 'post', 'patch', 'put']
    },
    DB: {
        mysql: {
            client: 'mysql',
            connection: {
                host: process.env.myhost,
                port: 3306,
                user: process.env.myuser,
                password: process.env.mypassword,
                database: process.env.mydb
            }
        },
        MongoDB: process.env.MongoDB
    },
    mailer:
    {
        gmail: "interncitybus@gmail.com",
        pwd: process.env.mailpswd
    }
}