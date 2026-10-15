import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Inquiry } from './entities/inquiry.entity';
import { CreateInquiryDto } from './dto/create-inquiry.dto';
import { UpdateInquiryStatusDto } from './dto/update-inquiry-status.dto';
import { MailService } from '../mail/mail.service';

@Injectable()
export class InquiriesService {
  constructor(
    @InjectRepository(Inquiry)
    private inquiriesRepository: Repository<Inquiry>,
    private mailService: MailService,
  ) {}

  async create(createInquiryDto: CreateInquiryDto): Promise<Inquiry> {
    const inquiry = this.inquiriesRepository.create(createInquiryDto);
    const saved = await this.inquiriesRepository.save(inquiry);

    // Asynchronously dispatch email notification
    this.mailService.sendInquiryNotification({
      name: saved.name,
      email: saved.email,
      phone: saved.phone,
      subject: saved.subject,
      message: saved.message,
    }).catch((err) => console.error('Error sending inquiry notification:', err));

    return saved;
  }

  async findAll(): Promise<Inquiry[]> {
    return this.inquiriesRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  async findById(id: string): Promise<Inquiry> {
    const inquiry = await this.inquiriesRepository.findOne({ where: { id } });
    if (!inquiry) {
      throw new NotFoundException(`Inquiry with ID '${id}' not found`);
    }
    return inquiry;
  }

  async updateStatus(
    id: string,
    updateStatusDto: UpdateInquiryStatusDto,
  ): Promise<Inquiry> {
    const inquiry = await this.findById(id);
    inquiry.status = updateStatusDto.status;
    if (updateStatusDto.notes !== undefined) {
      inquiry.notes = updateStatusDto.notes;
    }
    return this.inquiriesRepository.save(inquiry);
  }

  async remove(id: string): Promise<boolean> {
    const inquiry = await this.findById(id);
    await this.inquiriesRepository.remove(inquiry);
    return true;
  }
}

