import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDocumentoDto } from './dto/create-documento.dto';
import { UpdateDocumentoDto } from './dto/update-documento.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Documento, DocumentoDocument } from './schema/documento.schema';

@Injectable()
export class DocumentoService {
  constructor(
    @InjectModel(Documento.name) private DocumentoModel: Model<DocumentoDocument>
  ){}
  async create(createDocumentoDto: CreateDocumentoDto) {
    const documentoCreated = await this.DocumentoModel.create(createDocumentoDto)
    return documentoCreated;
  }

  async findAll() {
    const documentoFindAll = await this.DocumentoModel.find({})
    .populate('persona_id', 'name CI')
    .populate('proceso_determinado_id', 'name')
    return documentoFindAll;
  }

  async findOne(id: string) {
    const documentoFindID = await this.DocumentoModel.findById(id)
    if (!documentoFindID) {
      throw new NotFoundException(`El documento que desea consultar con la id "${id}" no existe.`);
    }
    return documentoFindID;
  }

  async update(id: string, updateDocumentoDto: UpdateDocumentoDto) {
    const actualizarDocumento = await this.DocumentoModel.findByIdAndUpdate(id, UpdateDocumentoDto)
    if (!actualizarDocumento) {
      throw new NotFoundException(`El documento que desea actualizar con la id "${id}" no existe.`);
    }
    return actualizarDocumento;
  }

  async remove(id: string) {
    const documenmtoRemove = await this.DocumentoModel.findByIdAndDelete(id)
    return documenmtoRemove;
  }
}
