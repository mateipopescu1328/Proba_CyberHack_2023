import express from 'express';
import {Question} from '../models/qmodel.js '
const router = express.Router();

router.post('/', async (request, response)=>{
    try{
        if(
            !request.body.title ||
            !request.body.question ||
            !request.body.rightanswer 
        ){
            return response.status(400).send({
                message: 'Send all required fields',
            });
        }
        const newQuestion ={
            title: request.body.title,
            question: request.body.question,
            rightanswer: request.body.rightanswer, 
        };
        const question = await Question.create(newQuestion);
        return response.status(201).send(question);
    }catch(error){
            console.log(error.message);
            response.status(500).send({message: error.message});
        }
});

router.get('/', async (request, response)=>{
    try{
        const questions = await Question.find({});
        return response.status(200).json({
            count: questions.length,
            data: questions
        });
    }catch(error)
    {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

router.get('/:id', async (request, response)=>{
    try{

        const {id} = request.params;
       
        const question = await Question.findById(id);
        return response.status(200).json(question);
    }catch(error)
    {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

router.put('/:id', async (request, response)=>{
    try{
        if(
            !request.body.title ||
            !request.body.question ||
            !request.body.rightanswer 
        ){
            return response.status(400).send({
                message: 'Send all required fields',
            });
        }
        const{id} = request.params;
        const result = await Question.findByIdAndUpdate(id, request.body);
        if (!result){
            return response.status(404).json({message: 'Book not found'});
        }
        return response.status(200).send({message: 'Book updated successfully'});
    } catch (error)
    {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

router.delete('/:id', async (request, response)=>{
    try{
        
        const{id} = request.params;
        const result = await Question.findByIdAndDelete(id);
        if (!result){
            return response.status(404).json({message: 'Book not found'});
        }
        return response.status(200).send({message: 'Book deleted successfully'});
    } catch (error)
    {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

export default router;