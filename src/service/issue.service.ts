import { Injectable } from '@nestjs/common';
import { CreateIssueDTO } from 'src/dto/create.issue.dto';
import { Issue } from 'src/entity/Issue';
import { IssueRepository } from 'src/repository/issue.repository';

@Injectable()
export class IssueService {
  constructor(private readonly issueRepository: IssueRepository) {}

  public async create(issueDTO: CreateIssueDTO): Promise<Issue> {
    const issue: Issue = new Issue(
      issueDTO.title,
      issueDTO.description,
      issueDTO.state,
    );

    return await this.issueRepository.save(issue);
  }
}
