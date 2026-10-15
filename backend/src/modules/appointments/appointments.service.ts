import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Appointment } from './entities/appointment.entity';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentStatusDto } from './dto/update-appointment-status.dto';
import { MailService } from '../mail/mail.service';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(Appointment)
    private appointmentsRepository: Repository<Appointment>,
    private mailService: MailService,
  ) {}

  async create(createAppointmentDto: CreateAppointmentDto): Promise<Appointment> {
    const appointment = this.appointmentsRepository.create(createAppointmentDto);
    const saved = await this.appointmentsRepository.save(appointment);

    // Asynchronously dispatch consultation notification
    this.mailService.sendAppointmentNotification({
      name: saved.name,
      email: saved.email,
      phone: saved.phone,
      location: saved.location,
      roomType: saved.roomType,
      budget: saved.budget,
      preferredDate: saved.preferredDate,
      preferredTime: saved.preferredTime,
      requirements: saved.requirements,
    }).catch((err) => console.error('Error sending appointment notification:', err));

    return saved;
  }

  async findAll(): Promise<Appointment[]> {
    return this.appointmentsRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  async findById(id: string): Promise<Appointment> {
    const appointment = await this.appointmentsRepository.findOne({ where: { id } });
    if (!appointment) {
      throw new NotFoundException(`Consultation appointment with ID '${id}' not found`);
    }
    return appointment;
  }

  async updateStatus(
    id: string,
    updateStatusDto: UpdateAppointmentStatusDto,
  ): Promise<Appointment> {
    const appointment = await this.findById(id);
    appointment.status = updateStatusDto.status;
    if (updateStatusDto.meetingLink !== undefined) {
      appointment.meetingLink = updateStatusDto.meetingLink;
    }
    return this.appointmentsRepository.save(appointment);
  }

  async remove(id: string): Promise<boolean> {
    const appointment = await this.findById(id);
    await this.appointmentsRepository.remove(appointment);
    return true;
  }
}

