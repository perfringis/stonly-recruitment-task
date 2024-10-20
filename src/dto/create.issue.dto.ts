import { IsEnum, IsNotEmpty, MaxLength } from 'class-validator';
import { IssueState } from 'src/entity/Issue';

export class CreateIssueDTO {
  @IsNotEmpty()
  @MaxLength(255)
  title: string;

  @IsNotEmpty()
  @MaxLength(255)
  description: string;

  @IsNotEmpty()
  @IsEnum(IssueState)
  state: IssueState;
}
