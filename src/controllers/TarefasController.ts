import { Request, Response } from 'express';
import Zod from 'zod';
import { AppError } from "../errors/AppError";
import { prisma } from '../lib/prisma';


export class TarefasController {
  public async create(request: Request, response: Response) {

    const bodySchema = Zod.object({
      titulo: Zod.string(),
      descricao: Zod.string(),
      status: Zod.string(),
    }).strict();

    const {titulo, descricao, status} = bodySchema.parse(request.body);
    
    const tarefa = await prisma.tarefa.create({
        data: {
            titulo, descricao, status
        },
     });
     return response.status(200).json(tarefa);
  }

  public async list(request: Request, response: Response) {
    const tarefa = await prisma.tarefa.findMany();
    return response.status(200).json(tarefa);
  }

  public async show(request: Request, response: Response) {
    const { id } = request.params;
    
    const tarefa = await prisma.tarefa.findUnique({
      where: { id },
    });
    if (!tarefa){
      throw new AppError("tarefa not Found", 404);
    }

  response = response.status(200).json(tarefa);
  }

  public async update(request: Request, response: Response) {
    const bodySchema = Zod.object({
        titulo: Zod.string().nullish(),
        descricao: Zod.string().nullish(),
        status: Zod.string().nullish(),
      }).strict();
  
    const {titulo, descricao, status} = bodySchema.parse(request.body);
    const { id } = request.params;
    let data= {}
    if(titulo) data = {titulo};
    if(descricao) data = {...data, descricao};
    if(status) data = {...data, status};
    const tarefa = await prisma.tarefa.findUnique({
      where: { id },
    });
    if (!tarefa){
      throw new AppError("tarefa not Found", 404);
    }
    const tarefas = await prisma.tarefa.update({
      where:{id},
      data,
   });
    
     return response.status(200).json(tarefas);
    
  }

  public async delete(request: Request, response: Response) {
    const { id } = request.params;
    const tarefa = await prisma.tarefa.findUnique({
      where: { id },
    });
    if (!tarefa){
      throw new AppError("tarefa not Found", 404);
    }
    await prisma.tarefa.delete({
      where: { id },
    });

    return response.status(204).json();
  }
}
