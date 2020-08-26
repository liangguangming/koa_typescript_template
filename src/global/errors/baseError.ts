export default abstract class BaseError extends Error {
  public code: number;

  constructor(public message: string) {
    super(message);
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      code: this.code,
    };
  }
}
