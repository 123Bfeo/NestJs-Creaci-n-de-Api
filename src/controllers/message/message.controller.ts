/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { CreateMessageDto } from 'src/dto/create-message-dto/create-message-dto';
import { MessangeService } from 'src/service/messange.service';

@Controller('message')
export class MessageController {
    constructor(private messageService : MessangeService)
    {}

   /**Para crear un mensaje peticion de tipo Post*/
    @Post('create')
    async create(@Body() createMessageDto:CreateMessageDto, @Res() response){
        try {
            const message = await  this.messageService.createMessage(createMessageDto);
            response.status(HttpStatus.CREATED).json(message)
        } catch (error) {
            response.status(HttpStatus.FORBIDDEN).json({message:'ERROR CREATE MESSAGE'})
        }
    }
    
    /**Para listar todos los emnsajes  peticion de tipo Get*/
    @Get('list')
    async getAll(@Res() response){
        try {
            const getAllMessage = await this.messageService.getAllMessage();
            response.status(HttpStatus.OK).json(getAllMessage)
        } catch (error) {
            response.status(HttpStatus.FORBIDDEN).json({message:'ERROR GETALL MESSAGE'})
        }
        
    }
    /**Para actualizar un mensaje en especifico */
    @Put(':id')
    async update(@Body() updateMessageDto: CreateMessageDto, @Res() response,@Param('id') idMessage ){
        try {
        const message = await this.messageService.updateMessage(idMessage, updateMessageDto)
        response.status(HttpStatus.OK).json(message)
        } catch (error) {
        response.status(HttpStatus.FORBIDDEN).json({message:'ERROR UPDATE MESSAGE'})
        }
        /**Uso del then otra froma de hacerlo 
         * 
        this.messageService.updateMessage(idMessage,updateMessageDto).then(message=>{
            response.status(HttpStatus.OK).json(message)
        }).catch(()=>{
            response.status(HttpStatus.FORBIDDEN).json({message:'ERROR UPDATE MESSAGE'})
        })*/
    }

    @Delete(':id')
    async delete(@Res() response, @Param('id') idMessage){
        try {
            const message = await this.messageService.deleteMessage(idMessage);
            response.status(HttpStatus.OK).json(message);
        } catch (error) {
            response.status(HttpStatus.FORBIDDEN).json({message:"ERROR DELETE MESSAGE"})
        }
    }

}
