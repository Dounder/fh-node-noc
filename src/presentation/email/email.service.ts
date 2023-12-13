import nodemailer from 'nodemailer';
import { envs } from '../../config/plugins/env.plugin';
import { LogRepository } from '../../domain/repositories/log.repository';
import { LogEntity, LogLevel } from '../../domain/entities/log.entity';

interface SendEmailOptions {
	to: string | string[];
	subject: string;
	html: string;
	attachments: Attachment[];
}

interface Attachment {
	filename: string;
	path: string;
}

export class EmailService {
	private transporter = nodemailer.createTransport({
		service: envs.MAILER_SERVICE,
		auth: {
			user: envs.MAILER_EMAIL,
			pass: envs.MAILER_SECRET_KEY,
		},
	});

	async sendEmail(options: SendEmailOptions): Promise<Boolean> {
		const { to, subject, html, attachments = [] } = options;

		try {
			const info = await this.transporter.sendMail({
				to,
				subject,
				html,
				attachments,
			});

			return true;
		} catch (error) {
			return false;
		}
	}

	async sendEmailWithLogs(to: string | string[]): Promise<Boolean> {
		const subject = 'System logs';
		const html = `<h1>System logs</h1>
		 	<p>Aute cupidatat ex ea tempor cupidatat sunt mollit eiusmod occaecat incididunt.</p>
		 	<p>View attached file</p>`;
		const attachments: Attachment[] = [
			{ filename: 'all-logs.log', path: './logs/all-logs.log' },
			{ filename: 'high-logs.log', path: './logs/high-logs.log' },
			{ filename: 'medium-logs.log', path: './logs/medium-logs.log' },
		];

		return await this.sendEmail({ to, subject, html, attachments });
	}
}
