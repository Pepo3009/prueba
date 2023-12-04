import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProcesoDeterminadoDto } from './dto/create-proceso_determinado.dto';
import { UpdateProcesoDeterminadoDto } from './dto/update-proceso_determinado.dto';
import { ProcesoDeterminado, ProcesoDeterminadoDocument } from './schema/proceso_determinado.schema';

@Injectable()
export class ProcesoDeterminadoService {

  constructor(
    @InjectModel(ProcesoDeterminado.name) private procesoDeterminadoModel: Model<ProcesoDeterminadoDocument>
  ){}

  async createProcesoDeterminado(createProcesoDeterminadoDto: CreateProcesoDeterminadoDto) {
    const { name } = createProcesoDeterminadoDto;
    const procesoDeterminadoExist = await this.procesoDeterminadoModel.findOne({name});
    if (procesoDeterminadoExist) {
      throw new ConflictException(`El proceso determinado con el nombre "${name}" ya existe.`);
    }
    //TODO Falta verificar la existencia de las id de las referencias
    const procesoDeterminadoCreate = await this.procesoDeterminadoModel.create(createProcesoDeterminadoDto);
    return procesoDeterminadoCreate;
  }

  async findAllProcesoDeterminado() {
    const procesoDeterminadoFindAll = await this.procesoDeterminadoModel.find().populate('proceso_id', 'name');
    return procesoDeterminadoFindAll;
  }

  async findByIdProcesoDeterminado(id: string) {
    const procesoDeterminadoFindById = await this.procesoDeterminadoModel.findById(id)
    if (!procesoDeterminadoFindById) {
      throw new NotFoundException(`El proceso determinado que desea consultar con la id "${id}" no existe.`);
    }
    return procesoDeterminadoFindById;
  }

  async updateProcesoDeterminado(id: string, updateProcesoDeterminadoDto: UpdateProcesoDeterminadoDto) {
    const { name } = updateProcesoDeterminadoDto;
    const procesoDeterminadoExist = await this.procesoDeterminadoModel.findOne({name});
    if (procesoDeterminadoExist) {
      throw new ConflictException(`El proceso determinado con el nombre "${name}" ya existe.`);
    }
    const procesoDeterminadoUpdate = await this.procesoDeterminadoModel.findByIdAndUpdate(id, updateProcesoDeterminadoDto);
    return procesoDeterminadoUpdate;
  }

  async removeProcesoDeterminado(id: string) {
    const procesoDeterminadoExist = await this.procesoDeterminadoModel.findById(id);
    if (!procesoDeterminadoExist) {
      throw new NotFoundException(`El proceso determinado que desea eliminar con la id "${id}" no existe.`);
    }
    const procesoDeterminadoRemove = await this.procesoDeterminadoModel.findByIdAndDelete(id)
    return procesoDeterminadoRemove;
  }
}
