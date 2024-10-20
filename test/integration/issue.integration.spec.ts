import { AppModule } from 'src/app.module';
import { IssueService } from 'src/service/issue.service';
import { Test } from '@nestjs/testing';
import { Issue, IssueState } from 'src/entity/Issue';
import { CreateIssueDTO } from 'src/dto/create.issue.dto';
import { NotAcceptableException } from '@nestjs/common';

describe('Issue integration test', () => {
  let issueService: IssueService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    const app = await module.createNestApplication().init();

    issueService = app.get<IssueService>(IssueService);
  });

  test('should create issue with open state', async () => {
    // given
    const createIssueDTO: CreateIssueDTO = createIssueCreateDto(
      'title',
      'desc',
      IssueState.OPEN,
    );

    // when
    const createdIssue: Issue = await issueService.createIssue(createIssueDTO);

    // then
    expect(createdIssue.getId()).not.toBeNull();
    expect(createdIssue.getTitle()).toEqual(createIssueDTO.title);
    expect(createdIssue.getDescription()).toEqual(createIssueDTO.description);
    expect(createdIssue.getState()).toEqual(createIssueDTO.state);
  });

  test('should not create issue with open state when invalid dto', async () => {
    // when
    const createIssueDTO: CreateIssueDTO = createIssueCreateDto(
      null,
      'desc',
      IssueState.OPEN,
    );

    // then
    await expect(() =>
      issueService.createIssue(createIssueDTO),
    ).rejects.toThrow(Error);
  });

  test('should create issue with pending state', async () => {
    // given
    const createIssueDTO: CreateIssueDTO = createIssueCreateDto(
      'title',
      'desc',
      IssueState.PENDING,
    );

    // when
    const createdIssue: Issue = await issueService.createIssue(createIssueDTO);

    // then
    expect(createdIssue.getId()).not.toBeNull();
    expect(createdIssue.getTitle()).toEqual(createIssueDTO.title);
    expect(createdIssue.getDescription()).toEqual(createIssueDTO.description);
    expect(createdIssue.getState()).toEqual(createIssueDTO.state);
  });

  test('should not create issue with pending state when invalid dto', async () => {
    // when
    const createIssueDTO: CreateIssueDTO = createIssueCreateDto(
      null,
      'desc',
      IssueState.PENDING,
    );

    // then
    await expect(() =>
      issueService.createIssue(createIssueDTO),
    ).rejects.toThrow(Error);
  });

  test('should create issue with closed state', async () => {
    // given
    const createIssueDTO: CreateIssueDTO = createIssueCreateDto(
      'title',
      'desc',
      IssueState.CLOSED,
    );

    // when
    const createdIssue: Issue = await issueService.createIssue(createIssueDTO);

    // then
    expect(createdIssue.getId()).not.toBeNull();
    expect(createdIssue.getTitle()).toEqual(createIssueDTO.title);
    expect(createdIssue.getDescription()).toEqual(createIssueDTO.description);
    expect(createdIssue.getState()).toEqual(createIssueDTO.state);
  });

  test('should not create issue with pending state when invalid dto', async () => {
    // when
    const createIssueDTO: CreateIssueDTO = createIssueCreateDto(
      null,
      'desc',
      IssueState.CLOSED,
    );

    // then
    await expect(() =>
      issueService.createIssue(createIssueDTO),
    ).rejects.toThrow(Error);
  });

  test('should change ticket state to pending when ticket is open', async () => {
    // given
    const createdIssue: Issue = await issueService.createIssue(
      createIssueCreateDto('title', 'desc', IssueState.OPEN),
    );

    // when
    const updatedIssue: Issue = await issueService.updateIssue(
      createdIssue.getId(),
      IssueState.PENDING,
    );

    // then
    expect(createdIssue.getTitle()).toEqual(updatedIssue.getTitle());
    expect(createdIssue.getDescription()).toEqual(
      updatedIssue.getDescription(),
    );
    expect(updatedIssue.getState()).toEqual(IssueState.PENDING);
  });

  test('should change ticket state to closed when ticket is open', async () => {
    // given
    const createdIssue: Issue = await issueService.createIssue(
      createIssueCreateDto('title', 'desc', IssueState.OPEN),
    );

    // when
    const updatedIssue: Issue = await issueService.updateIssue(
      createdIssue.getId(),
      IssueState.CLOSED,
    );

    // then
    expect(createdIssue.getTitle()).toEqual(updatedIssue.getTitle());
    expect(createdIssue.getDescription()).toEqual(
      updatedIssue.getDescription(),
    );
    expect(updatedIssue.getState()).toEqual(IssueState.CLOSED);
  });

  test('should change ticket state to closed when ticket is pending', async () => {
    // given
    const createdIssue: Issue = await issueService.createIssue(
      createIssueCreateDto('title', 'desc', IssueState.PENDING),
    );

    // when
    const updatedIssue: Issue = await issueService.updateIssue(
      createdIssue.getId(),
      IssueState.CLOSED,
    );

    // then
    expect(createdIssue.getTitle()).toEqual(updatedIssue.getTitle());
    expect(createdIssue.getDescription()).toEqual(
      updatedIssue.getDescription(),
    );
    expect(updatedIssue.getState()).toEqual(IssueState.CLOSED);
  });

  test('should not change ticket state to open when ticket is pending', async () => {
    // when
    const createdIssue: Issue = await issueService.createIssue(
      createIssueCreateDto('title', 'desc', IssueState.PENDING),
    );

    // then
    await expect(() =>
      issueService.updateIssue(createdIssue.getId(), IssueState.OPEN),
    ).rejects.toThrow(NotAcceptableException);
  });

  test('should not change ticket state to open when ticket is closed', async () => {
    // when
    const createdIssue: Issue = await issueService.createIssue(
      createIssueCreateDto('title', 'desc', IssueState.CLOSED),
    );

    // then
    await expect(() =>
      issueService.updateIssue(createdIssue.getId(), IssueState.OPEN),
    ).rejects.toThrow(NotAcceptableException);
  });

  test('should not change ticket state to pending when ticket is closed', async () => {
    // when
    const createdIssue: Issue = await issueService.createIssue(
      createIssueCreateDto('title', 'desc', IssueState.CLOSED),
    );

    // then
    await expect(() =>
      issueService.updateIssue(createdIssue.getId(), IssueState.PENDING),
    ).rejects.toThrow(NotAcceptableException);
  });

  const createIssueCreateDto = (
    title: string,
    desc: string,
    state: IssueState,
  ) => {
    return new CreateIssueDTO(title, desc, state);
  };
});
