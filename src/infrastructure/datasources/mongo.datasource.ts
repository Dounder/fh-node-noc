import { LogModel } from '../../data/mongo';
import { LogDatasource } from '../../domain/datasources/log.datasource';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';

export class MongoDatasource implements LogDatasource {
	async saveLog(log: LogEntity): Promise<void> {
		const newLog = await LogModel.create(log);

		console.log('New log created', newLog.id);
	}

	async getLogs(logLevel: LogSeverityLevel): Promise<LogEntity[]> {
		const logs = await LogModel.find({ level: logLevel });

		return logs.map(LogEntity.fromObject);
	}
}
