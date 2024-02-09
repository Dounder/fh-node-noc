import { CheckServiceMultiple } from '../domain/use-cases/checks/check.service-multiple';
import { FileSystemDatasource } from '../infrastructure/datasources/file-system.datasource';
import { MongoDatasource } from '../infrastructure/datasources/mongo.datasource';
import { PostgresDatasource } from '../infrastructure/datasources/postgres.datasource';
import { LogRepositoryImpl } from '../infrastructure/repositories/log.repository.impl';
import { CronService } from './cron/cron.service';
import { EmailService } from './email/email.service';

const fsLogRepository = new LogRepositoryImpl(new FileSystemDatasource());
const mongoLogRepository = new LogRepositoryImpl(new MongoDatasource());
const postgresLogRepository = new LogRepositoryImpl(new PostgresDatasource());

export class Server {
	public static async start() {
		console.log('Server started...');

		// new SendEmailLogs(emailService, fileSystemLogRepository).execute(['glasdou12@gmail.com']);

		// CronService.createJob('*/5 * * * * *', () => {
		// 	const url = 'https://www.google.com';

		// 	new CheckServiceMultiple(
		// 		[fsLogRepository, mongoLogRepository, postgresLogRepository],
		// 		() => console.log(`Success on check ${url}`),
		// 		(error) => console.error(error)
		// 	).execute(url);
		// });
	}
}
