export enum LogLevel {
	low = 'low',
	medium = 'medium',
	high = 'high',
}

export class LogEntity {
	public level: LogLevel;
	public message: string;
	public createdAt: Date;

	constructor(message: string, level: LogLevel) {
		this.message = message;
		this.level = level;
		this.createdAt = new Date();
	}

	static fromJson(json: string): LogEntity {
		const { message, level, createdAt } = JSON.parse(json);

		if (!message || !level || !createdAt) throw new Error('Invalid log entity');

		const log = new LogEntity(message, level);
		log.createdAt = new Date(createdAt);

		return log;
	}
}
