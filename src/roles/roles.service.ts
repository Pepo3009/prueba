import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Roles, RolesDocument } from './schema/roles.schema';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class RolesService {
  constructor(@InjectModel(Roles.name) private readonly rolModel: Model<RolesDocument>) {}

  async create(createRoleDto: CreateRoleDto) {
    const { name } = createRoleDto;

    // Verifica si ya existe un rol con el mismo nombre
    const existingRole = await this.rolModel.findOne({ name });

    if (existingRole) {
      throw new ConflictException('El rol ya existe.');
    }

    // Crea una nueva instancia del modelo Roles y asigna los datos
    const newRole = new this.rolModel(createRoleDto);

    // Guarda la nueva instancia en la base de datos
    const createdRole = await newRole.save();

    return createdRole;
  }
  async findAll() {
    const roles = await this.rolModel.find()
    if (roles.length === 0) {
      throw new NotFoundException('No existen roles');
    }
    return roles;
  }

  async findOne(id: string) {
    const rol = await this.rolModel.findById(id)
    if (!rol) {
      throw new NotFoundException(`El rol que desea consultar con la id "${id}" no existe.`);
    }
    return rol;
  }

  async update(id: string, updateRoleDto: UpdateRoleDto) {
    const actualizarRol = await this.rolModel.findByIdAndUpdate(id, updateRoleDto, { new: true });
    if (!actualizarRol) {
      throw new NotFoundException(`El rol que desea actualizar con la id "${id}" no existe.`);
    }
    return actualizarRol;
  }

  async remove(id: string) {
    const rolRemove = await this.rolModel.findByIdAndDelete(id);
    if (!rolRemove) {
      throw new NotFoundException(`El rol que desea eliminar con la id "${id}" no existe.`);
    }
    return rolRemove;
  }
}
