import request from "supertest"
import {app} from '../app'
import { prisma } from "../lib/prisma"

describe("Create Tarefa Test", ()=>{
    it('Deveria criar uma tarefa', async ()=>{
        const result = await request(app).post('/tarefas/create').send({
            "titulo" : "caminhando",
            "descricao": "estou caminhando",
            "status": "ocorrendo"
          })
        expect(result.statusCode).toEqual(200)
        
    })
    it('Deveria retornar erro zod', async ()=>{
        const result = await request(app).post('/tarefas/create').send({
            "titulo": "Your Title"
          })
        expect(result.statusCode).toEqual(400)
        
    })

})
describe("Delete Tarefas Test", ()=>{
    it("Deveria deletar tarefa por ID", async ()=>{
        await request(app).post('/tarefas/create').send({
            "titulo" : "caminhando",
            "descricao": "estou caminhando",
            "status": "ocorrendo"
          })
        const tarefa = await prisma.tarefa.findFirst()
        const result = await request(app).delete('/tarefas/delete/'+tarefa?.id)
        expect(result.statusCode).toEqual(204)
    })
    it("Deveria retornar erro Tarefa not found",async () => {
        await request(app).post('/tarefas/create').send({
            "titulo" : "caminhando",
            "descricao": "estou caminhando",
            "status": "ocorrendo"
        })
        const result = await request(app).delete('/tarefas/delete/'+1)
        expect(result.statusCode).toEqual(404)
        
    })
})
describe("Get Tarefas Test", ()=>{
    it("Deveria ler tarefa por ID", async ()=>{
        await request(app).post('/tarefas/create').send({
            "titulo" : "caminhando",
            "descricao": "estou caminhando",
            "status": "ocorrendo"
          })
        const tarefa = await prisma.tarefa.findFirst()
        const result = await request(app).get('/tarefas/show/'+tarefa?.id)
        expect(result.statusCode).toEqual(200)
    })
    it("Deveria retornar erro Tarefa not found",async () => {
        const result = await request(app).get('/tarefas/show/'+9)
        expect(result.statusCode).toEqual(404)
    })
})
describe("List Tarefas Test", ()=>{
    it("Deveria listar as tarefas", async ()=>{
        const result = await request(app).get('/tarefas/list/')
        expect(result.statusCode).toEqual(200)
    })
})
describe("Update Tarefa API Test", ()=>{
    beforeEach(async ()=>{
        const result = await request(app).post('/tarefas/create').send({
            "titulo" : "caminhando",
            "descricao": "estou caminhando",
            "status": "ocorrendo"
        })
    })
    it('Deveria modificar uma tarefa completa', async ()=>{
        const tarefa = await prisma.tarefa.findFirst()
        const result = await request(app).put('/tarefas/update/'+tarefa?.id).send({
            "titulo": "tarefa modificada",
            "descricao": "tarefa modificada",
            "status": "tarefa modificada"
        })
        expect(result.statusCode).toEqual(200)
    })
    it('Deveria modificar uma tarefa apenas título', async ()=>{
        const tarefa = await prisma.tarefa.findFirst()
        const result = await request(app).put('/tarefas/update/'+tarefa?.id).send({
            "titulo": "tarefa modificada"
        })
        expect(result.statusCode).toEqual(200)
    })
    it("Deveria retornar erro Tarefa não encontrada",async () => {
        const result = await request(app).put('/tarefas/update/'+1).send({
            "titulo": "tarefa modificada",
            "descricao": "tarefa modificada",
            "status": "tarefa modificada"
        })
        expect(result.statusCode).toEqual(404)
       
    })
})