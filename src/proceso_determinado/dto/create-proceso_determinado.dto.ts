import { IsNotEmpty, IsString, IsMongoId } from "class-validator";

export class CreateProcesoDeterminadoDto {

    @IsNotEmpty({ message: 'El campo "name" es requerido' })
    @IsString({ message: 'El campo "name" debe ser una cadena de caracteres' })
    name: string;
    
    @IsNotEmpty({ message: 'El campo "proceso_id" es requerido' })
    @IsMongoId({ message: 'El campo "proceso_id" debe ser una id de mongo válida' })
    proceso_id: string;

    @IsNotEmpty({ message: 'El campo "flujo_proceso_id" es requerido' })
    @IsMongoId({ message: 'El campo "flujo_proceso_id" debe ser una id de mongo válida' })
    flujo_proceso_id: string;

};
