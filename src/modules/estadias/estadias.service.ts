import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThanOrEqual, MoreThanOrEqual } from 'typeorm';
import { Estadia } from './entities/estadia.entity';
import { CreateEstadiaDto } from './dto/create-estadia.dto';
import { UpdateEstadiaDto } from './dto/update-estadia.dto';

@Injectable()
export class EstadiasService {

  constructor(
    @InjectRepository(Estadia)
    private readonly estadiaRepo: Repository<Estadia>,
  ) {}

  async create(createEstadiaDto: CreateEstadiaDto) {

    // 🔥 VALIDACIÓN CLAVE: evitar sobreventa
    const { huespedId, habitacionId, ...rest } = createEstadiaDto;

    const existe = await this.estadiaRepo.findOne({
      where: {
        habitacion: { id: habitacionId },
        activa: true,
        fecha_inicio: LessThanOrEqual(rest.fecha_fin),
        fecha_fin: MoreThanOrEqual(rest.fecha_inicio),
      },
    });

    if (existe) {
      throw new BadRequestException(
        'La habitación ya tiene una estadía activa en esas fechas',
      );
    }

    const nuevaEstadia = this.estadiaRepo.create({
      ...rest,
      huesped: { id: huespedId },
      habitacion: { id: habitacionId },
    });
    return this.estadiaRepo.save(nuevaEstadia);
  }

  findAll() {
    return this.estadiaRepo.find();
  }

  // 🔄 UPDATE (con validación también)
  async update(id: number, updateData: UpdateEstadiaDto) {

    const estadia = await this.estadiaRepo.findOne({ 
      where: { id },
      relations: ['habitacion']
    });

    if (!estadia) {
      throw new BadRequestException('Estadía no encontrada');
    }

    // 🔥 VALIDAR CRUCE DE FECHAS (igual que en create)
    const existe = await this.estadiaRepo.findOne({
      relations: ['habitacion'],
      where: {
        habitacion: { id: updateData.habitacionId ?? estadia.habitacion.id },
        activa: true,
        fecha_inicio: LessThanOrEqual(updateData.fecha_fin ?? estadia.fecha_fin),
        fecha_fin: MoreThanOrEqual(updateData.fecha_inicio ?? estadia.fecha_inicio),
      },
    });

    // ⚠️ evitar conflicto consigo misma
    if (existe && existe.id !== id) {
      throw new BadRequestException(
        'Conflicto de fechas en la habitación',
      );
    }

    Object.assign(estadia, updateData);

    return this.estadiaRepo.save(estadia);
  }

  // 📝 CHECK-OUT (Cálculo de Factura)
  async checkout(id: number) {
    const estadia = await this.estadiaRepo.findOne({
      where: { id },
      relations: ['habitacion', 'habitacion.categoria', 'consumos', 'consumos.servicio', 'huesped'],
    });

    if (!estadia) {
      throw new BadRequestException('Estadía no encontrada');
    }

    const { habitacion, consumos } = estadia;
    const precioHabitacion = Number(habitacion.categoria.precioBaseNoche);

    // Calcular días (Noches) - Mínimo 1 noche si entra y sale el mismo día
    const diffTime = Math.abs(new Date(estadia.fecha_fin).getTime() - new Date(estadia.fecha_inicio).getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const noches = diffDays === 0 ? 1 : diffDays;

    const totalHabitacion = noches * precioHabitacion;

    let totalConsumos = 0;
    const detalleConsumos = consumos.map(consumo => {
      const precioServicio = Number(consumo.servicio.precio);
      const subtotal = consumo.cantidad * precioServicio;
      totalConsumos += subtotal;
      return {
        servicio: consumo.servicio.nombre,
        cantidad: consumo.cantidad,
        precioUnitario: precioServicio,
        subtotal
      };
    });

    const totalFactura = totalHabitacion + totalConsumos;

    // Opcional: Marcar estadía como inactiva (checkout realizado)
    // estadia.activa = false;
    // await this.estadiaRepo.save(estadia);

    return {
      estadiaId: estadia.id,
      huesped: estadia.huesped.nombre,
      habitacion: habitacion.numero,
      categoria: habitacion.categoria.nombre,
      noches,
      precioPorNoche: precioHabitacion,
      totalHabitacion,
      detalleConsumos,
      totalConsumos,
      totalFactura
    };
  }
}