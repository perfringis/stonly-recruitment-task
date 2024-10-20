import { Injectable } from '@nestjs/common';
import { CreateIssueDTO } from 'src/dto/create.issue.dto';
import { Issue, IssueState } from 'src/entity/Issue';
import { IssueRepository } from 'src/repository/issue.repository';

@Injectable()
export class IssueService {
  constructor(private readonly issueRepository: IssueRepository) {}

  public async createIssue(issueDTO: CreateIssueDTO): Promise<Issue> {
    const issue: Issue = new Issue(
      issueDTO.title,
      issueDTO.description,
      issueDTO.state,
    );

    return await this.issueRepository.save(issue);
  }

  public async getIssues(): Promise<Issue[]> {
    return await this.issueRepository.find({});
  }

  public async updateIssue(issueId: string, state: IssueState): Promise<Issue> {
    const issue: Issue = await this.issueRepository.findById(issueId);

    issue.changeTo(state);

    return await this.issueRepository.save(issue);
  }

  public async removeIssue(issueId: string): Promise<void> {
    await this.issueRepository.deleteById(issueId);
  }
}
