export default class NotImplementedException extends Error {
  constructor() {
    super("This method is not implemented");
  }
}
