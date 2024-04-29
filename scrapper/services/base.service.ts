export default abstract class Service {
  abstract init(): void | Promise<void>;
}
