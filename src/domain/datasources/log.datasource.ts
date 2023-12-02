import { LogEntity, LogLevel } from '../entities/log.entity';

export abstract class LogDatasource {
	abstract saveLog(log: LogEntity): Promise<void>;
	abstract getLogs(logLevel: LogLevel): Promise<LogEntity[]>;
}
