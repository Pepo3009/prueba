import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RolesService } from './roles.service';
import { Roles, RolesDocument } from './schema/roles.schema';
import { NotFoundException, ConflictException } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

describe('RolesService', () => {
  let service: RolesService;
  let model: Model<RolesDocument>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RolesService,
        {
          provide: getModelToken(Roles.name),
          useValue: Model, // Asegúrate de que aquí esté configurado correctamente
        },
      ],
    }).compile();

    service = module.get<RolesService>(RolesService);
    model = module.get<Model<RolesDocument>>(getModelToken(Roles.name));
  });


  describe('findOne', () => {
    it('should return a Role object when given a valid id', async () => {
      // Arrange
      const mockId = 'valid-id';
      const mockProcesoDet = new Roles();
      jest.spyOn(model, 'findById').mockResolvedValueOnce(mockProcesoDet);

      // Act
      const result = await service.findOne(mockId);

      // Assert
      expect(result).toEqual(mockProcesoDet);
    });

    it('should throw a NotFoundException when given an invalid id', async () => {
      // Arrange
      const mockId = 'invalid-id';
      jest.spyOn(model, 'findById').mockResolvedValueOnce(null);

      // Act and Assert
      await expect(service.findOne(mockId)).rejects.toThrowError(NotFoundException);
    });
  });
  describe('create', () => {
    it('should throw a ConflictException when a role with the same name already exists', async () => {
      // Arrange
      const mockCreateRoleDto: CreateRoleDto = {
        name: 'ExistingRoleName',
      };
      jest.spyOn(model, 'findOne').mockResolvedValueOnce(new Roles());

      // Act and Assert
      await expect(service.create(mockCreateRoleDto)).rejects.toThrowError(ConflictException);
    });
  });
  describe('update', () => {
    it('should update a role when provided a valid id and data', async () => {
      // Arrange
      const mockId = 'valid-id';
      const mockUpdateRoleDto: UpdateRoleDto = {
        // Provide the properties you want to update
      };
      const mockUpdatedRole = new Roles(); // You can create a mock Role object here
      jest.spyOn(service['rolModel'], 'findByIdAndUpdate').mockResolvedValueOnce(mockUpdatedRole);

      // Act
      const result = await service.update(mockId, mockUpdateRoleDto);

      // Assert
      expect(result).toEqual(mockUpdatedRole);
    });
  });
  describe('remove', () => {
    it('should remove a role when provided a valid id', async () => {
      // Arrange
      const mockId = 'valid-id';
      const mockRemovedRole = new Roles(); // You can create a mock Role object here
      jest.spyOn(service['rolModel'], 'findByIdAndDelete').mockResolvedValueOnce(mockRemovedRole);

      // Act
      const result = await service.remove(mockId);

      // Assert
      expect(result).toEqual(mockRemovedRole);
    });
  });
  describe('findAll', () => {
    it('should return an array of roles when roles exist', async () => {
      // Arrange
      const mockRoles = [new Roles(), new Roles()];
      jest.spyOn(model, 'find').mockResolvedValueOnce(mockRoles);

      // Act
      const result = await service.findAll();

      // Assert
      expect(result).toEqual(mockRoles);
    });
    it('should throw a NotFoundException when no roles exist', async () => {
      // Arrange
      jest.spyOn(model, 'find').mockResolvedValueOnce([]);

      // Act and Assert
      await expect(service.findAll()).rejects.toThrowError(NotFoundException);
    });
  });
});
