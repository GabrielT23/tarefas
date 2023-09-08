import { Router } from 'express';



import { tarefasRoutes } from './tarefasRoutes';


const routes = Router();


routes.use('/tarefas', tarefasRoutes);


export { routes };