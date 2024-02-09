import { LogLevel, PrismaClient } from '@prisma/client';
import { LogDatasource } from '../../domain/datasources/log.datasource';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';

const prisma = new PrismaClient();

const levelEnum = {
	low: LogLevel.LOW,
	medium: LogLevel.MEDIUM,
	high: LogLevel.HIGH,
};

export class PostgresDatasource implements LogDatasource {
	async saveLog(log: LogEntity): Promise<void> {
		const level = levelEnum[log.level];

		const newLog = await prisma.logModel.create({ data: { ...log, level } });

		console.log('New log created:', newLog.id);
	}

	async getLogs(logLevel: LogSeverityLevel): Promise<LogEntity[]> {
		const level = levelEnum[logLevel];

		const logs = await prisma.logModel.findMany({ where: { level } });

		return logs.map(LogEntity.fromObject);
	}
}
