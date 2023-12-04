import { PartialType } from '@nestjs/swagger';
import { CreateProcesoDeterminadoDto } from './create-proceso_determinado.dto';

export class UpdateProcesoDeterminadoDto extends PartialType(CreateProcesoDeterminadoDto) {}
