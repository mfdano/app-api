/**
 * 
 * MockModel defines base contract for mock models
 *
 */
export abstract class MockModel<T> {
  protected abstract model: T;

  constructor(createModelData: T) {
    this.constructorSpy(createModelData);
  }

  constructorSpy(_createModelData: T): void {}

  findOne(): { exec: () => T } {
    return {
      exec: (): T => this.model
    }
  }

  async find(): Promise<T[]> {
    return [this.model]
  }

  async save(): Promise<T> {
    return this.model;
  }

  async findOneAndUpdate(): Promise<T> {
    return this.model;
  }
}