import { Test, TestingModule } from '@nestjs/testing';
import { ProcesoDeterminadoService } from './proceso_determinado.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NotFoundException } from '@nestjs/common';
import { ProcesoDeterminado } from './schema/proceso_determinado.schema';
import { Proceso } from 'src/proceso/schema/proceso.schema';
import { FlujoProceso } from 'src/flujo_proceso/schema/flujo_proceso.schema';

// Mock del modelo mongoose
const mockProcesoDeterminadoModel = {
  findById: jest.fn(),
};

describe('ProcesoDeterminadoService', () => {
  let procesoDeterminadoService: ProcesoDeterminadoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProcesoDeterminadoService,
        {
          provide: getModelToken('ProcesoDeterminado'), // Usa el nombre del modelo aquí
          useValue: mockProcesoDeterminadoModel,
        },
      ],
    }).compile();

    procesoDeterminadoService = module.get<ProcesoDeterminadoService>(
      ProcesoDeterminadoService,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(procesoDeterminadoService).toBeDefined();
  });

  describe('findByIdProcesoDeterminado', () => {
    it('should return a proceso determinado by ID', async () => {
      const procesoDeterminadoId = 'some-proceso-determinado-id'; // Reemplaza con un ID válido
      const mockProcesoDeterminado: ProcesoDeterminado | null = {
        //_id: procesoDeterminadoId,
        name: 'Proceso Determinado 1',
        proceso_id: {// Reemplaza con un ID válido de Proceso
          name: 'Proceso de prueba',
        }, // Reemplaza con un ID válido de Proceso
        flujo_proceso_id: {
          name: 'ffg',
          tipo_flujo_proceso_id: {
            name: ''
          },
          opciones_id: {
            type:"",
            content:""
          }

        }, // Reemplaza con un ID válido de FlujoProceso
      };
      

      // Mock para simular la búsqueda por ID exitosa
      mockProcesoDeterminadoModel.findById.mockResolvedValue(mockProcesoDeterminado);

      // Prueba el método findByIdProcesoDeterminado
      const result = await procesoDeterminadoService.findByIdProcesoDeterminado(
        procesoDeterminadoId,
      );

      // Verifica que se haya llamado a findById con el ID proporcionado
      expect(mockProcesoDeterminadoModel.findById).toHaveBeenCalledWith(
        procesoDeterminadoId,
      );

      // Verifica que el resultado coincida con el objeto proceso determinado
      expect(result).toEqual(mockProcesoDeterminado);
    });

    it('should throw NotFoundException if proceso determinado with the ID does not exist', async () => {
      const procesoDeterminadoId = 'non-existent-id'; // ID que no existe en el mock

      // Mock para simular que no se encuentra un proceso determinado con el ID
      mockProcesoDeterminadoModel.findById.mockResolvedValue(null);

      // Asegura que el servicio lance una NotFoundException
      await expect(
        procesoDeterminadoService.findByIdProcesoDeterminado(procesoDeterminadoId),
      ).rejects.toThrow(NotFoundException);
    });
  });

  // Otras pruebas para los demás métodos del servicio

});
