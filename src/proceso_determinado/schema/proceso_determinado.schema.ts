import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
// import { FlujoProceso } from 'src/flujo_proceso/schema/flujo_proceso.schema';
import { FlujoProceso } from '../../flujo_proceso/schema/flujo_proceso.schema';
import { Proceso } from '../../proceso/schema/proceso.schema';

export type ProcesoDeterminadoDocument = ProcesoDeterminado & Document;

@Schema()
export class ProcesoDeterminado {

    @Prop()
    name: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Proceso' })
    proceso_id: Proceso;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'FlujoProceso' })
    flujo_proceso_id: FlujoProceso;
}

export const ProcesoDeterminadoSchema = SchemaFactory.createForClass(ProcesoDeterminado);
