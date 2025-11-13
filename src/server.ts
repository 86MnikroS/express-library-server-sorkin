import  express from 'express';
import {PORT} from "./configurations/appConfig.ts";
import {bookRouter} from "./routers/bookRouter.ts";
import {errorHandler} from "./errorHandler/errorHandler.ts";

export const launchServer = () => {
    const app = express();
    app.listen(PORT, ()=>{
        console.log('Server is running at http://localhost:${ PORT }');
    })

    //=========================MiddleWare=======================================
    app.use(express.json())

    //==========================Router==========================================
    app.use('/api', bookRouter);


    app.use((req,res)=>{
        res.status(404).send('Page Not Found');
    })

    app.use(errorHandler);
}