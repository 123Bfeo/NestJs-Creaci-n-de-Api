/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MessageController } from './controllers/message/message.controller';
import { MessangeService } from './service/messange.service';
import { MessageEntity} from './entities/message.entity';



@Module({
  /**Configuracion de conexion para mi base de datos */
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'nestm',
      password: 'app',
      database: 'sendMessage',
      autoLoadEntities: true,
      //entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([MessageEntity])
  ],
  controllers: [AppController, MessageController],
  providers: [AppService, MessangeService],
})
export class AppModule {}
