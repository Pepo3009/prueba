import { Test, TestingModule } from '@nestjs/testing';
import { DocumentoService } from './documento.service';
import { Documento, DocumentoDocument } from './schema/documento.schema';
import { Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { NotFoundException } from '@nestjs/common';
import { CreateDocumentoDto } from './dto/create-documento.dto';
import { UpdateDocumentoDto } from './dto/update-documento.dto';

describe('DocumentoService', () => {
  let service: DocumentoService;
  let model: Model<DocumentoDocument>;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DocumentoService,
        {
          provide: getModelToken(Documento.name),
          useValue: Model, // Asegúrate de que aquí esté configurado correctamente
        },
      ],
    }).compile();

    service = module.get<DocumentoService>(DocumentoService);
    model = module.get<Model<DocumentoDocument>>(getModelToken(Documento.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('findOne', () => {
    it('should return a Document object when given a valid id', async () => {
      // Arrange
      const mockId = 'valid-id';
      const mockProcesoDet = new Documento();
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
  
  describe('update', () => {
    it('should update a role when provided a valid id and data', async () => {
      // Arrange
      const mockId = 'valid-id';
      const mockUpdateRoleDto: UpdateDocumentoDto = {
        // Provide the properties you want to update
      };
      const mockUpdatedRole = new Documento(); // You can create a mock Role object here
      jest.spyOn(model, 'findByIdAndUpdate').mockResolvedValueOnce(mockUpdatedRole);

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
      const mockRemovedRole = new Documento(); // You can create a mock Role object here
      jest.spyOn(model, 'findByIdAndDelete').mockResolvedValueOnce(mockRemovedRole);

      // Act
      const result = await service.remove(mockId);

      // Assert
      expect(result).toEqual(mockRemovedRole);
    });
  });
  // describe('findAll', () => {
  //   it('should return an array of documents when documents exist', async () => {
  //     // Arrange
  //     const mockDocumento = [new Documento(), new Documento()];
  //     jest.spyOn(model, 'find').mockResolvedValueOnce(mockDocumento);

  //     // Act
  //     const result = await service.findAll();

  //     // Assert
  //     expect(result).toEqual(mockDocumento);
  //   });
  //   it('should throw a NotFoundException when no Documento exist', async () => {
  //     // Arrange
  //     jest.spyOn(model, 'find').mockResolvedValueOnce([]);

  //     // Act and Assert
  //     await expect(service.findAll()).rejects.toThrowError(NotFoundException);
  //   });
  // });
  // describe('create', () => {
  //   it('should throw a ConflictException when a role with the same name already exists', async () => {
  //     // Arrange
  //     const mockCreateRoleDto: CreateDocumentoDto = {
  //       name: 'ExistingRoleName',
  //     };
  //     jest.spyOn(model, 'findOne').mockResolvedValueOnce(new Roles());

  //     // Act and Assert
  //     await expect(service.create(mockCreateRoleDto)).rejects.toThrowError(ConflictException);
  //   });
  // });
});
