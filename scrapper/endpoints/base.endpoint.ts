import EnvService from "../services/env.service";

export default abstract class Endpoint {
  protected baseUrl;

  constructor(baseUrl: string) {
    this.baseUrl = `${EnvService.getBuilderUrl()}/${baseUrl}`;
  }
}
