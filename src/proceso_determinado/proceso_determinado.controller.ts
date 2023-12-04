import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger/dist';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ProcesoDeterminadoService } from './proceso_determinado.service';
import { CreateProcesoDeterminadoDto } from './dto/create-proceso_determinado.dto';
import { UpdateProcesoDeterminadoDto } from './dto/update-proceso_determinado.dto';

//TODO http://localhost:3000/proceso-determinado

@ApiBearerAuth()
@ApiTags('proceso-determinado')
@Controller('proceso-determinado')
// @UseGuards(JwtAuthGuard)
export class ProcesoDeterminadoController {
  constructor(private readonly procesoDeterminadoService: ProcesoDeterminadoService) {}

  @Post()
  create(@Body() createProcesoDeterminadoDto: CreateProcesoDeterminadoDto) {
    return this.procesoDeterminadoService.createProcesoDeterminado(createProcesoDeterminadoDto);
  }

  @Get()
  findAll() {
    return this.procesoDeterminadoService.findAllProcesoDeterminado();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.procesoDeterminadoService.findByIdProcesoDeterminado(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProcesoDeterminadoDto: UpdateProcesoDeterminadoDto) {
    return this.procesoDeterminadoService.updateProcesoDeterminado(id, updateProcesoDeterminadoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.procesoDeterminadoService.removeProcesoDeterminado(id);
  }
}
