import { Column, Entity } from 'typeorm';
import { BaseEntity } from './BaseEntity';
import { NotAcceptableException } from '@nestjs/common';

export enum IssueState {
  OPEN = 'OPEN',
  PENDING = 'PENDING',
  CLOSED = 'CLOSED',
}

@Entity({ name: 'issue' })
export class Issue extends BaseEntity {
  @Column({ name: 'title', type: 'varchar', length: 255 })
  private title: string;

  @Column({ name: 'description', type: 'varchar', length: 255 })
  private description: string;

  @Column({ name: 'state', type: 'enum', enum: IssueState })
  private state: IssueState;

  constructor(title: string, description: string, state: IssueState) {
    super();

    this.title = title;
    this.description = description;
    this.state = state;
  }

  public changeToOpen(): void {
    if (this.state === IssueState.PENDING || this.state === IssueState.CLOSED) {
      throw new NotAcceptableException('Cannot change issue state to open');
    }

    this.state = IssueState.OPEN;
  }

  public changeToPending(): void {
    if (this.state === IssueState.CLOSED) {
      throw new NotAcceptableException('Cannot change issue state to pending');
    }

    this.state = IssueState.PENDING;
  }

  public changeToClosed(): void {
    this.state = IssueState.CLOSED;
  }

  public getTitle(): string {
    return this.title;
  }

  public getDescription(): string {
    return this.description;
  }

  public getState(): IssueState {
    return this.state;
  }
}
