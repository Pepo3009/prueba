import { Test, TestingModule } from '@nestjs/testing';
import { ProcesoDeterminadoController } from './proceso_determinado.controller';
import { ProcesoDeterminadoService } from './proceso_determinado.service';

describe('ProcesoDeterminadoController', () => {
  let controller: ProcesoDeterminadoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProcesoDeterminadoController],
      providers: [ProcesoDeterminadoService],
    }).compile();

    controller = module.get<ProcesoDeterminadoController>(ProcesoDeterminadoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
