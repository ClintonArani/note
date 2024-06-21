import { Request, Response } from 'express'
import { userService } from '../services/user.service'
import { userSchema } from '../validators/user.validator';

let service = new userService()

export class userController{
    async createUser(req: Request, res: Response){
        try{
            console.log("Request Body:",req.body);//for debugging
            let {FirstName, LastName, phone_number, email, password} = req.body;

            let {error} = userSchema.validate(req.body);

            if(error){
                return res.status(401).json({
                    error:error.message
                });
            }

            let result = await service.registerUser(req.body);

            return res.status(201).json(result);
            
        }catch(error){
            return res.json({
                error
            });
        }
    }

    async fetchAll(req: Request, res: Response) {
        try{
            let result = await service.fetchAllUsers()

            return res.status(201).json(result)

        }catch(error){
            return res.json({
                error
            })
        }
    }

    async fetchSingleUser(req: Request, res: Response){
        try{
            let {user_id} = req.params

            let response = await service.fetchSingleUser(user_id)

            return res.json(response)
        }catch(error){
            return res.json({
                error
            })
        }
    }

    async switchRoles(req: Request, res: Response){
        try{
            let {user_id} = req.body

            let response = await service.switchRoles(user_id)

            return res.json(response)
        }catch(error){
            return res.json({
                error
            })
        }
    }

    async getUnAssignedUsers(req: Request, res: Response) {
        try {
            let response = await service.fetchUnsignedUsers();

            return res.json(response)
        } catch (error) {
            return res.json({
                error
            })
        }
    }

    async assignUser(req: Request, res: Response) {
        try {
            let { project_id, user_id } = req.body;

            let change = {
                project_id,
                user_id
            }

            let response = await service.setUserToAssigned(change);

            return res.json(response);
        } catch (error) {
            return res.json({
                error
            })
        }
    }

}