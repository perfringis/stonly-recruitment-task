import { NotAcceptableException } from '@nestjs/common';
import { Issue, IssueState } from 'src/entity/Issue';

describe('Issue unit test', () => {
  test('should not change issue ticket to open while ticket is pending', () => {
    // given
    const issue: Issue = new Issue(
      'Issue title',
      'Issue desc',
      IssueState.PENDING,
    );

    // when

    // then
    expect(() => issue.changeToOpen()).toThrow(
      new NotAcceptableException('Cannot change issue state to open'),
    );
  });

  test('should not change issue ticket to open while ticket is closed', () => {
    // given
    const issue: Issue = new Issue(
      'Issue title',
      'Issue desc',
      IssueState.CLOSED,
    );
    // when

    // then
    expect(() => issue.changeToOpen()).toThrow(
      new NotAcceptableException('Cannot change issue state to open'),
    );
  });

  test('should not change issue ticket to pending while ticket is closed', () => {
    // given
    const issue: Issue = new Issue(
      'Issue title',
      'Issue desc',
      IssueState.CLOSED,
    );
    // when

    // then
    expect(() => issue.changeToPending()).toThrow(
      new NotAcceptableException('Cannot change issue state to pending'),
    );
  });

  test('should change issue ticket to pending while ticket is open', () => {
    // given
    const issue: Issue = new Issue(
      'Issue title',
      'Issue desc',
      IssueState.OPEN,
    );

    // when
    issue.changeToPending();

    // then
    expect(issue.getState()).toEqual(IssueState.PENDING);
  });

  test('should change issue ticket to closed while ticket is open', () => {
    // given
    const issue: Issue = new Issue(
      'Issue title',
      'Issue desc',
      IssueState.OPEN,
    );

    // when
    issue.changeToClosed();

    // then
    expect(issue.getState()).toEqual(IssueState.CLOSED);
  });

  test('should change issue ticket to closed while ticket is pending', () => {
    // given
    const issue: Issue = new Issue(
      'Issue title',
      'Issue desc',
      IssueState.PENDING,
    );

    // when
    issue.changeToClosed();

    // then
    expect(issue.getState()).toEqual(IssueState.CLOSED);
  });

  test('should change issue ticket to open while ticket is open', () => {
    // given
    const issue: Issue = new Issue(
      'Issue title',
      'Issue desc',
      IssueState.OPEN,
    );

    // when
    issue.changeToOpen();

    // then
    expect(issue.getState()).toEqual(IssueState.OPEN);
  });

  test('should change issue ticket to pending while ticket is pending', () => {
    // given
    const issue: Issue = new Issue(
      'Issue title',
      'Issue desc',
      IssueState.PENDING,
    );

    // when
    issue.changeToPending();

    // then
    expect(issue.getState()).toEqual(IssueState.PENDING);
  });

  test('should change issue ticket to closed while ticket is closed', () => {
    // given
    const issue: Issue = new Issue(
      'Issue title',
      'Issue desc',
      IssueState.CLOSED,
    );

    // when
    issue.changeToClosed();

    // then
    expect(issue.getState()).toEqual(IssueState.CLOSED);
  });
});
