import { LogEntity, LogLevel } from '../../entities/log.entity';
import { LogRepositoryImpl } from './../../../infrastructure/repositories/log.repository.impl';
interface CheckServiceUseCase {
	execute(url: string): Promise<boolean>;
}

type SuccessCallback = () => void | undefined;
type ErrorCallback = (error: string) => void | undefined;

export class CheckService implements CheckServiceUseCase {
	private origin: string = 'check.service';

	constructor(
		private readonly logRepository: LogRepositoryImpl,
		private readonly successCallback: SuccessCallback,
		private readonly errorCallback: ErrorCallback
	) {}

	async execute(url: string): Promise<boolean> {
		try {
			const req = await fetch(url);

			if (!req.ok) throw new Error(`Error on check ${url}`);

			this.successCallback?.(); //? OwO

			const log = new LogEntity({
				level: LogLevel.low,
				message: `Success on check ${url}`,
				origin: this.origin,
			});
			this.logRepository.saveLog(log);

			return true;
		} catch (error) {
			const errorMessage = `Error on check ${url} - ${error}`;

			this.errorCallback?.(errorMessage);

			const log = new LogEntity({
				level: LogLevel.high,
				message: errorMessage,
				origin: this.origin,
			});
			this.logRepository.saveLog(log);

			return false;
		}
	}
}
