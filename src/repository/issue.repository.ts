import { Injectable } from '@nestjs/common';
import { Issue } from 'src/entity/Issue';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class IssueRepository extends Repository<Issue> {
  constructor(private readonly dataSource: DataSource) {
    super(Issue, dataSource.createEntityManager());
  }
}
