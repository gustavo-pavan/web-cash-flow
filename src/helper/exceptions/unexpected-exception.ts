export class UnexpectedException extends Error {
  constructor() {
    super("Unexpected Exception!");
    this.name = "UnexpectedException";
  }
}
