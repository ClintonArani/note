// import cors from 'cors';
import express, {NextFunction, Request, Response, json } from 'express'

const app = express()
app.use(json());
// app.use(cors())

//add both user and auth routers

// app.use('/users',user_router);
// app.use('/auth', auth_router);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).json({
        message: err.message
    });
});

const PORT = 5200;
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}...`);
    
})
