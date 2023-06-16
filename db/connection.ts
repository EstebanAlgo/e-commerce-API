import { Sequelize } from "sequelize";
import { GlobalRoutes } from "../GlobalRoutes";

const DbConnection = new Sequelize(GlobalRoutes.DB_NAME || '', GlobalRoutes.DB_USER || '', GlobalRoutes.DB_PASS, {
    host: GlobalRoutes.DB_HOST,
    dialect: 'mariadb',
    logging: false,
    retry: {
        match: [
            /ETIMEDOUT/,
            /EHOSTUNREACH/,
            /ECONNRESET/,
            /ECONNREFUSED/,
            /ETIMEDOUT/,
            /ESOCKETTIMEDOUT/,
            /EHOSTUNREACH/,
            /EPIPE/,
            /EAI_AGAIN/,
            /SequelizeConnectionError/,
            /SequelizeConnectionRefusedError/,
            /SequelizeHostNotFoundError/,
            /SequelizeHostNotReachableError/,
            /SequelizeInvalidConnectionError/,
            /SequelizeConnectionTimedOutError/
        ],
        max: 5
    }
});

export default DbConnection;

