import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Response } from 'express';
import { CreateIssueDTO } from 'src/dto/create.issue.dto';
import { IssueDTO } from 'src/dto/issue.dto';
import { UpdateIssueDTO } from 'src/dto/update.issue.dto';
import { Issue } from 'src/entity/Issue';
import { IssueService } from 'src/service/issue.service';

@Controller()
export class IssueController {
  constructor(private readonly issueService: IssueService) {}

  @Get('issue')
  public async getAll(): Promise<IssueDTO[]> {
    const issues: Issue[] = await this.issueService.getIssues();

    return this.toDtoList(issues);
  }

  @Post('issue')
  @UsePipes(ValidationPipe)
  public async create(
    @Body() createIssueDTO: CreateIssueDTO,
  ): Promise<IssueDTO> {
    const issue: Issue = await this.issueService.createIssue(createIssueDTO);

    return this.toDto(issue);
  }

  @Put('issue')
  public async update(
    @Body() updateIssueDTO: UpdateIssueDTO,
  ): Promise<IssueDTO> {
    const issue: Issue = await this.issueService.updateIssue(
      updateIssueDTO.id,
      updateIssueDTO.state,
    );

    return this.toDto(issue);
  }

  @Delete('issue/:issueId')
  public async delete(
    @Param('issueId') issueId: string,
    @Res() response: Response,
  ): Promise<void> {
    await this.issueService.removeIssue(issueId);

    response.status(HttpStatus.OK).send();
  }

  private toDto(issue: Issue): IssueDTO {
    return new IssueDTO(issue);
  }

  private toDtoList(issues: Issue[]): IssueDTO[] {
    return issues.map((issue: Issue) => new IssueDTO(issue));
  }
}
