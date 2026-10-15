import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);
  private transporter: nodemailer.Transporter | null = null;
  private readonly fromEmail: string;
  private readonly alertRecipient: string;

  constructor(private configService: ConfigService) {
    const mailConfig = this.configService.get('mail');
    this.fromEmail = mailConfig?.from || 'concierge@aurelleinteriors.com';
    this.alertRecipient = mailConfig?.alertRecipient || 'admin@aurelleinteriors.com';

    if (mailConfig?.host && mailConfig?.user && mailConfig?.pass) {
      this.transporter = nodemailer.createTransport({
        host: mailConfig.host,
        port: mailConfig.port,
        secure: mailConfig.port === 465,
        auth: {
          user: mailConfig.user,
          pass: mailConfig.pass,
        },
      });
      this.logger.log(`SMTP transport initialized for ${mailConfig.host}:${mailConfig.port}`);
    } else {
      this.logger.log('SMTP credentials not configured. Email notifications will be logged to console in preview mode.');
    }
  }

  async sendInquiryNotification(inquiry: {
    name: string;
    email: string;
    phone?: string;
    subject?: string;
    message: string;
  }) {
    const subject = `[New Atelier Inquiry] ${inquiry.subject || 'Consultation Request'} from ${inquiry.name}`;
    const text = `
New inquiry received at AURELLE Interiors:

Client Name: ${inquiry.name}
Email: ${inquiry.email}
Phone: ${inquiry.phone || 'N/A'}
Subject: ${inquiry.subject || 'General Inquiry'}
Message:
${inquiry.message}
    `;

    const html = `
      <div style="font-family: serif, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e7e2d8; background: #fbf9f5;">
        <h2 style="font-family: serif; color: #181716; letter-spacing: 0.1em; border-bottom: 1px solid #e7e2d8; padding-bottom: 12px;">AURELLE Interiors Atelier</h2>
        <p style="font-size: 14px; color: #5d6853; text-transform: uppercase; letter-spacing: 0.15em;">New Client Inquiry</p>
        <div style="background: #ffffff; padding: 20px; border: 1px solid #e7e2d8; margin: 16px 0;">
          <p><strong>Client:</strong> ${inquiry.name}</p>
          <p><strong>Email:</strong> <a href="mailto:${inquiry.email}">${inquiry.email}</a></p>
          <p><strong>Phone:</strong> ${inquiry.phone || 'N/A'}</p>
          <p><strong>Subject:</strong> ${inquiry.subject || 'General Inquiry'}</p>
          <p style="margin-top: 16px;"><strong>Message:</strong></p>
          <blockquote style="margin: 0; padding: 12px; background: #f8f6f0; border-left: 3px solid #181716; font-style: italic;">
            ${inquiry.message}
          </blockquote>
        </div>
        <p style="font-size: 12px; color: #8c827a;">AURELLE Interiors Digital Atelier</p>
      </div>
    `;

    await this.sendMail(this.alertRecipient, subject, text, html);
  }

  async sendAppointmentNotification(apt: {
    name: string;
    email: string;
    phone: string;
    location: string;
    roomType: string;
    budget: string;
    preferredDate?: string;
    preferredTime?: string;
    requirements?: string;
  }) {
    const subject = `[Consultation Scheduled] ${apt.roomType} for ${apt.name}`;
    const text = `
Private Consultation Requested:
Client: ${apt.name} (${apt.email}, ${apt.phone})
Location: ${apt.location}
Space: ${apt.roomType}
Budget: ${apt.budget}
Date & Time: ${apt.preferredDate || 'Flexible'} (${apt.preferredTime || 'Standard Atelier Hours'})
Requirements:
${apt.requirements || 'None provided'}
    `;

    const html = `
      <div style="font-family: serif, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e7e2d8; background: #fbf9f5;">
        <h2 style="font-family: serif; color: #181716; letter-spacing: 0.1em; border-bottom: 1px solid #e7e2d8; padding-bottom: 12px;">AURELLE Interiors</h2>
        <p style="font-size: 14px; color: #5d6853; text-transform: uppercase; letter-spacing: 0.15em;">Private Consultation Request</p>
        <div style="background: #ffffff; padding: 20px; border: 1px solid #e7e2d8; margin: 16px 0;">
          <p><strong>Client:</strong> ${apt.name}</p>
          <p><strong>Contact:</strong> ${apt.email} | ${apt.phone}</p>
          <p><strong>Location:</strong> ${apt.location}</p>
          <p><strong>Scope:</strong> ${apt.roomType}</p>
          <p><strong>Target Investment:</strong> ${apt.budget}</p>
          <p><strong>Requested Date:</strong> ${apt.preferredDate || 'Flexible'} (${apt.preferredTime || 'Standard Atelier Hours'})</p>
          <p style="margin-top: 12px;"><strong>Client Vision:</strong></p>
          <blockquote style="margin: 0; padding: 12px; background: #f8f6f0; border-left: 3px solid #181716;">
            ${apt.requirements || 'Standard architectural consultation requested.'}
          </blockquote>
        </div>
      </div>
    `;

    await this.sendMail(this.alertRecipient, subject, text, html);
  }

  private async sendMail(to: string, subject: string, text: string, html: string) {
    if (this.transporter) {
      try {
        await this.transporter.sendMail({
          from: this.fromEmail,
          to,
          subject,
          text,
          html,
        });
        this.logger.log(`Email dispatched successfully to ${to} [${subject}]`);
      } catch (err) {
        this.logger.error(`Failed to send email to ${to}: ${(err as Error).message}`);
      }
    } else {
      this.logger.log(`\n================= EMAIL PREVIEW =================\nTo: ${to}\nSubject: ${subject}\n\n${text}\n=================================================`);
    }
  }
}

