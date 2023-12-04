import { Module } from '@nestjs/common';
import { ProcesoDeterminadoService } from './proceso_determinado.service';
import { ProcesoDeterminadoController } from './proceso_determinado.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProcesoDeterminado, ProcesoDeterminadoSchema } from './schema/proceso_determinado.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ProcesoDeterminado.name,
        schema: ProcesoDeterminadoSchema,
      }
    ])
  ],
  controllers: [ProcesoDeterminadoController],
  providers: [ProcesoDeterminadoService],
})
export class ProcesoDeterminadoModule {}
