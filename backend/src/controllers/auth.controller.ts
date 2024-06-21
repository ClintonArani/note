import { Request, Response } from 'express'
import { authService } from '../services/auth.service';
import { extendedRequest } from '../middlewares/verifyToken';

let service = new authService();

export class authController{
    async loginUser(req: Request, res:Response){
        try{
            const {email, password} = req.body;
            
            const response = await service.login({email, password});

            if(response.error){
                return res.status(401).json({error: response.error});
            }

            return res.status(200).json(response);
        }catch(error){
            console.error("Error occurred in loginUser:", error);
            return res.status(500).json({error: "An internal server error occured"});
        }
    }

    async checkDetails(req: extendedRequest, res: Response){
        try{
            if(req.info){
                return res.status(200).json({
                    info: req.info
                });
            }else{
                return res.status(404).json({error: "No details found"});
            }
        }catch(error){
            console.error("Error occured in checkDetailes:",error);
            return res.status(500).json({ error: "An internal error occurred"});
        }   
    }
}