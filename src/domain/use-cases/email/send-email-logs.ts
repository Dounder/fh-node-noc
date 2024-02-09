import { EmailService } from '../../../presentation/email/email.service';
import { LogEntity, LogSeverityLevel } from '../../entities/log.entity';
import { LogRepository } from '../../repositories/log.repository';

interface SendEmailLogsUseCase {
	execute(to: string | string[]): Promise<Boolean>;
}

export class SendEmailLogs implements SendEmailLogsUseCase {
	constructor(private readonly emailService: EmailService, private readonly logRepository: LogRepository) {}

	async execute(to: string | string[]): Promise<Boolean> {
		try {
			const sent = await this.emailService.sendEmailWithLogs(to);

			if (!sent) throw new Error('Error sending email with logs');

			const log = new LogEntity({ level: LogSeverityLevel.low, message: `Email sent to ${to}`, origin: 'send-email-logs.use-case' });

			this.logRepository.saveLog(log);

			return true;
		} catch (error) {
			const log = new LogEntity({ level: LogSeverityLevel.high, message: `${error}`, origin: 'send-email-logs.use-case' });

			this.logRepository.saveLog(log);

			this.logRepository.saveLog(log);

			return false;
		}
	}
}
