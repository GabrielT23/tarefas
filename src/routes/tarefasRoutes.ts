import { Router } from 'express';

import { TarefasController } from '../controllers/TarefasController';

const tarefasRoutes = Router();
const controller = new TarefasController();


tarefasRoutes.post('/create', controller.create);
tarefasRoutes.get('/list', controller.list);
tarefasRoutes.get('/show/:id', controller.show);
tarefasRoutes.put('/update/:id', controller.update);
tarefasRoutes.delete('/delete/:id', controller.delete);

export { tarefasRoutes };