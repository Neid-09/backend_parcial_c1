import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { HuespedesModule } from './modules/huespedes/huespedes.module';
import { HabitacionesModule } from './modules/habitaciones/habitaciones.module';
import { ReservasModule } from './modules/reservas/reservas.module';
import { EstadiasModule } from './modules/estadias/estadias.module';
import { ServiciosAdicionalesModule } from './modules/servicios-adicionales/servicios-adicionales.module';
import { ConsumosModule } from './modules/consumos/consumos.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    DatabaseModule,
    HuespedesModule,
    HabitacionesModule,
    ReservasModule,
    EstadiasModule,
    ServiciosAdicionalesModule,
    ConsumosModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
