import { EventEmitter } from 'events';

export default class Issues extends EventEmitter {
  constructor() {
    super();
    this.issues = {};
  }

  addIssue(issueId, issue) {
    let newIssue = false;
    if (!this.issues[issueId]) {
      newIssue = true;
    }
    this.issues[issueId] = {
      ...issue,
      id: issueId,
    };
    if (newIssue) {
      this.emit('ADDED', this.issues[issueId]);
    } else {
      this.emit('UPDATED', this.issues[issueId]);
    }
  }

  clearIssue(issueId) {
    const issue = this.issues[issueId];
    if (issue) {
      delete this.issues[issueId];
      this.emit('DELETED', issue);
    }
  }

  getIssueList() {
    return Object.keys(this.issues).map(key => ({
      cursor: key,
      node: this.issues[key],
    }));
  }
}
