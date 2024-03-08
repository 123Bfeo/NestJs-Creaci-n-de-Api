/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateMessageDto } from 'src/dto/create-message-dto/create-message-dto';
import { MessageEntity } from 'src/entities/message.entity';
import { Repository } from 'typeorm';
/**El servicio hara uso de la clase repository y de la entidad que creamos 
 * El servicio sera quien le suministre al controlador una serie de metodos para
 * la obtencio y envio de datos a nustra base de datos
*/
@Injectable()
export class MessangeService {
    
    constructor(
        @InjectRepository(MessageEntity)
        private readonly messageRepository: Repository<MessageEntity>
    ){}
    /**Metodos definidos en nuestro servicio */

    /**Devolvera todos los registros en la tabla */
    async getAllMessage(){
        const resp = await this.messageRepository.find();
        return resp;
    }
   
    /**Crear un registro en la tabala*/
    async createMessage(messageNew: CreateMessageDto){
        const newMessage = new MessageEntity();
        newMessage.nick = messageNew.nick;
        newMessage.message = messageNew.message;
        return await this.messageRepository.save(newMessage)
    }
    /**Metdo de actualizacion*/
    async updateMessage(id : number, messageUpdate: CreateMessageDto){
        const updateMessage = await this.messageRepository.findOneBy({id});
        if(!updateMessage){
            throw new NotFoundException(`Message with ID ${id} not found`)
        }
        updateMessage.nick = messageUpdate.nick;
        updateMessage.message= messageUpdate.message;
        return await this.messageRepository.save(updateMessage)
    }
    
    /**Metdo que elimina un mensaje segun su id */
    async deleteMessage (id : number){
       await this.messageRepository.delete(id);
    }
}

