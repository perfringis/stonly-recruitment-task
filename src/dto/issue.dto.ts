import { Issue, IssueState } from 'src/entity/Issue';

export class IssueDTO {
  id: string;
  title: string;
  description: string;
  state: IssueState;

  constructor(issue: Issue) {
    this.id = issue.getId();
    this.title = issue.getTitle();
    this.description = issue.getDescription();
    this.state = issue.getState();
  }
}
