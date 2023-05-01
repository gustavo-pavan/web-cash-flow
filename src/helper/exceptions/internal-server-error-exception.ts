export class InternalServerErrorException extends Error {
  constructor() {
    super("Server Error!");
    this.name = "ServerErrorException";
  }
}
