import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateIssueDTO } from 'src/dto/create.issue.dto';
import { IssueDTO } from 'src/dto/issue.dto';
import { Issue } from 'src/entity/Issue';
import { IssueService } from 'src/service/issue.service';

@Controller()
export class IssueController {
  constructor(private readonly issueService: IssueService) {}

  @Post('issue/create')
  @UsePipes(ValidationPipe)
  public async create(
    @Body() createIssueDTO: CreateIssueDTO,
  ): Promise<IssueDTO> {
    const issue: Issue = await this.issueService.create(createIssueDTO);

    return this.toDto(issue);
  }

  private toDto(issue: Issue): IssueDTO {
    return new IssueDTO(issue);
  }
}
