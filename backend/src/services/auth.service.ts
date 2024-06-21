import mssql from 'mssql'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { login_details } from '../interfaces/user.interface'
import { sqlConfig } from '../config/sql.config'

dotenv.config()

export class authService{
    async login(logins: login_details){
        let pool = await mssql.connect(sqlConfig)

        let user = (await pool.request()
        .input("email",logins.email)
        .input("password",logins.password).execute("loginUser")).recordset

        if(user.length < 1){
            return{
                error: "User not found"
            }
        }else{
            let hashedpassword = user[0].password

            //compare password
            let passwordMatches = bcrypt.compareSync(logins.password, hashedpassword)

            if(passwordMatches){
                let {createdAt, password, phone_number, ...rest} = user[0]

                let token = jwt.sign(rest, process.env.SECRET_KEY as string, {
                    expiresIn: '2h'
                })

                return{
                    message: "Logged in Successfully",
                    token
                }
            }else{
                return{
                    error: "Incorrect password"
                }
            }
        }
    }
}