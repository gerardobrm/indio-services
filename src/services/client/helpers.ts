import { camelCase, upperFirst } from 'lodash';
import { Data } from './Types';

export function getPayloadType(payload: any) {
  const entity = Array.isArray(payload) ? payload[0] : payload;
  if (!entity) return;

  const entityKeys = Object.keys(entity);
  const idKeys = entityKeys.filter(x => x.match(/id$/i)).sort((a,b) => a.length - b.length);
  const keys = idKeys.concat(entityKeys.filter(k => !idKeys.includes(k)));
  const types = keys.map(key => {
    const value = entity[key];
    const guesedClass = upperFirst(key.replace(/ies$/, 'y').replace(/s$/, ''));
    const typeName = (type: string) => (type === 'object' ? guesedClass : type);

    let type = getType(entity[key]);
    type = (type === 'array' ? `${typeName(getType(value[0]))}[]` : type);
    type = typeName(type);
    return type;
  });
  const lines = keys.map((k,i) => `  ${k}: ${types[i]}`).join('\n');
  const result = `{\n${lines}\n}`;
  return result;
};

function getType(value: any) {
  const boxedType = Object.prototype.toString.call(value);
  let type = boxedType.replace(/\[object (\w+)\]/, '$1').toLowerCase();
  type = ['null', 'undefined'].includes(type) ? 'any' : type;
  return type;
}

export function logEntity(data: Data, url: string) {
  const item = Array.isArray(data) ? data[0] : data;
  const lastSegment = url.match(/\/(\w+)\??/).slice(-1)[0];
  const resourceName = upperFirst(camelCase(lastSegment));
  const type = `${resourceName} ${getPayloadType(item)}`;
  console.groupCollapsed(decodeURIComponent(url));
  console.log(type)
  console.groupEnd();
};
