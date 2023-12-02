import fs from 'fs';
import { LogDatasource } from '../../domain/datasources/log.datasource';
import { LogEntity, LogLevel } from '../../domain/entities/log.entity';
import { Certificate } from 'crypto';

export class FileSystemDatasource implements LogDatasource {
	private readonly logPath = 'logs/';
	private readonly allLogsPath = `${this.logPath}/all-logs.log`;
	private readonly mediumLogsPath = `${this.logPath}/medium-logs.log`;
	private readonly highLogsPath = `${this.logPath}/high-logs.log`;

	constructor() {
		this.createLogsFileIfNotExists();
	}

	private createLogsFileIfNotExists = () => {
		if (fs.existsSync(this.logPath)) return;

		fs.mkdirSync(this.logPath);

		const paths = [this.allLogsPath, this.mediumLogsPath, this.highLogsPath];

		paths.forEach((path) => {
			if (!fs.existsSync(path)) fs.writeFileSync(path, '');
		});
	};

	async saveLog(log: LogEntity): Promise<void> {
		const content = `${JSON.stringify(log)}\n`;

		fs.appendFileSync(this.allLogsPath, content);

		if (log.level === LogLevel.low) return;

		if (log.level === LogLevel.medium) return fs.appendFileSync(this.mediumLogsPath, content);

		if (log.level === LogLevel.high) return fs.appendFileSync(this.highLogsPath, content);
	}

	async getLogs(logLevel: LogLevel): Promise<LogEntity[]> {
		switch (logLevel) {
			case LogLevel.low:
				return this.getLogsFromFile(this.allLogsPath);
			case LogLevel.medium:
				return this.getLogsFromFile(this.mediumLogsPath);
			case LogLevel.high:
				return this.getLogsFromFile(this.highLogsPath);
			default:
				throw new Error('Invalid log level');
		}
	}

	private getLogsFromFile = (path: string): LogEntity[] => {
		const content = fs.readFileSync(path, 'utf-8').split('\n');

		return content.map(LogEntity.fromJson);
	};
}
