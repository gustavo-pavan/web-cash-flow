export class ValidationException extends Error {
  constructor() {
    super("Validation Exception!");
    this.name = "ValidationException";
  }
}
