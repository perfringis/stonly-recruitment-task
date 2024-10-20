import { IsEnum, IsNotEmpty } from 'class-validator';
import { IssueState } from 'src/entity/Issue';

export class UpdateIssueDTO {
  @IsNotEmpty()
  public id: string;

  @IsNotEmpty()
  @IsEnum(IssueState)
  public state: IssueState;

  constructor(id: string, state: IssueState) {
    this.id = id;
    this.state = state;
  }
}
