import 'dotenv/config';
import { envs } from './config/plugins/env.plugin';
import { MongoDatabase } from './data/mongo';
import { Server } from './presentation/server';
import { PrismaClient } from '@prisma/client';

(() => {
	main();
})();

async function main() {
	await MongoDatabase.connect({
		mongoUrl: envs.MONGO_URL,
		dbName: envs.MONGO_DB_NAME,
	});

	Server.start();
}
