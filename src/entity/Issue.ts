import { Column, Entity } from 'typeorm';
import { BaseEntity } from './BaseEntity';
import { NotAcceptableException } from '@nestjs/common';

export enum IssueState {
  OPEN = 'open',
  PENDING = 'pending',
  CLOSED = 'closed',
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

  changeToOpen(): void {
    if (this.state === IssueState.PENDING || this.state === IssueState.CLOSED) {
      throw new NotAcceptableException('Cannot change issue state to open');
    }

    this.state = IssueState.OPEN;
  }

  changeToPending(): void {
    if (this.state === IssueState.CLOSED) {
      throw new NotAcceptableException('Cannot change issue state to pending');
    }

    this.state = IssueState.PENDING;
  }

  changeToClosed(): void {
    this.state = IssueState.CLOSED;
  }

  getState(): IssueState {
    return this.state;
  }
}
