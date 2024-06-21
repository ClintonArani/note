import mssql from 'mssql'
import dotenv,{config} from 'dotenv'

dotenv.config();

export const sqlConfig = {
    user: process.env.DB_USER as string,
    password: process.env.DB_PWD as string,
    database: process.env.DB_NAME as string,
    server: process.env.MS_SERVER as string,
    pool: {
      max: 10,
      min: 0,
      idleTimeoutMillis: 30000,
    },
    options: {
      encrypt: false,
      trustServerCertificate: true,
    },
  };

  async function  testConnection() {
    try {
        let pool = await mssql.connect(sqlConfig);

        if(pool.connected) {
            console.log("connection was made successfully.");
        }else{
            console.log("Error establishing connection");
        }
    }catch (error) {
        console.error("connection error:", error);        
    }
  }

  testConnection();