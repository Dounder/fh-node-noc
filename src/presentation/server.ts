import { CheckService } from '../domain/use-cases/checks/check.service';
import { CronService } from './cron/cron.service';

export class Server {
	public static start() {
		console.log('Server started...');

		CronService.createJob('*/5 * * * * *', () => {
			const url = 'https://www.google.com';

			new CheckService(
				() => console.log(`Success on check ${url}`),
				(error) => console.error(error)
			).execute(url);
		});
	}
}
