export class UnauthorizedException extends Error {
  constructor() {
    super("Unauthorized Exception!");
    this.name = "UnauthorizedException";
  }
}
