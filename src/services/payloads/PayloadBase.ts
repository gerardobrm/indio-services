import { pick, merge } from 'lodash';

export type ModelLike = {
  [key: string]: any
}

export class PayloadBase {
  static new<T extends typeof PayloadBase>(this: T, model?: Partial<InstanceType<T>>, removeEmpty?: boolean): InstanceType<T> {
    const instance = new this() as InstanceType<T>;
    const keys = Object.keys(instance);
    if (model) {
      const props = pick(model, keys);
      merge(instance, props);
    }
    if (removeEmpty) {
      keys.forEach(key => {
        if (instance[key] === undefined) {
          delete instance[key];
        }
      })
    }
    return instance;
  }
}
