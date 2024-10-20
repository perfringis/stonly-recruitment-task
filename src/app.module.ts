import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Issue } from './entity/Issue';
import { IssueRepository } from './repository/issue.repository';
import { IssueService } from './service/issue.service';
import { IssueController } from './controller/issue.controller';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRESQL_DB_HOST || 'localhost',
      port: process.env.POSTGRESQL_DB_PORT
        ? parseInt(process.env.POSTGRESQL_DB_PORT, 10)
        : 5432,
      username: process.env.POSTGRESQL_DB_USERNAME,
      password: process.env.POSTGRESQL_DB_PASSWORD,
      database: process.env.POSTGRESQL_DB_NAME,
      autoLoadEntities: true,
      synchronize: true,
      logging: true,
      entities: [Issue],
    }),
  ],
  controllers: [IssueController],
  providers: [
    // repository
    IssueRepository,

    // service
    IssueService,
  ],
})
export class AppModule {}
