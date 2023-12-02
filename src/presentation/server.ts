import { CheckService } from '../domain/use-cases/checks/check.service';
import { FileSystemDatasource } from '../infrastructure/datasources/file-system.datasource';
import { LogRepositoryImpl } from '../infrastructure/repositories/log.repository.impl';
import { CronService } from './cron/cron.service';

const fileSystemLogRepository = new LogRepositoryImpl(new FileSystemDatasource());

export class Server {
	public static start() {
		console.log('Server started...');

		CronService.createJob('*/5 * * * * *', () => {
			const url = 'https://www.google.com';

			new CheckService(
				fileSystemLogRepository,
				() => console.log(`Success on check ${url}`),
				(error) => console.error(error)
			).execute(url);
		});
	}
}
