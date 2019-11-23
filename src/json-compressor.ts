import { KeyGenerator } from './key-generator';

interface ICompressionResult {
  data: any;
  keys: { [key: string]: string };
}

interface ICompressionContext {
  keyGenerator: KeyGenerator;
  newKeyMap: { [key: string]: string };
  origKeyMap: { [key: string]: string };
}

export function compress(dataToBeCompressed: any): ICompressionResult {
  if (!dataToBeCompressed) {
    return dataToBeCompressed;
  }

  const keyGenerator = new KeyGenerator();
  const newKeyMap = {};
  const compressedData = deepCompress(dataToBeCompressed, {
    keyGenerator,
    newKeyMap,
    origKeyMap: {},
  });

  return {
    data: compressedData,
    keys: newKeyMap,
  };
}

function deepCompress(data: any, context: ICompressionContext): any {
  if (!data) {
    return data;
  }

  if (Array.isArray(data)) {
    const resultArray = [];
    for (const item of data) {
      resultArray.push(deepCompress(item, context));
    }
    return resultArray;
  } else if (isObject(data)) {
    const resultObject: { [key: string]: any } = {};
    for (const srcKey of Object.keys(data)) {
      const destKey = toCompactKey(srcKey, context);
      resultObject[destKey] = deepCompress(data[srcKey], context);
    }
    return resultObject;
  } else if (isString(data)) {
    return toCompactKey(data, context);
  }

  return data;
}

function toCompactKey(srcKey: string, context: ICompressionContext) {
  let destKey = context.origKeyMap[srcKey];
  if (!destKey) {
    destKey = context.keyGenerator.next();
    context.origKeyMap[srcKey] = destKey;
    context.newKeyMap[destKey] = srcKey;
  }

  return destKey;
}

export function decompress(dataToBeDecompressed: ICompressionResult): any {
  if (!dataToBeDecompressed) {
    return dataToBeDecompressed;
  }
  if (!dataToBeDecompressed.keys) {
    throw new Error('Missing keys information');
  }

  const decompressedData = deepDecompress(
    dataToBeDecompressed.data,
    dataToBeDecompressed.keys
  );
  return decompressedData;
}

function deepDecompress(data: any, keysMap: { [key: string]: string }): any {
  if (!data) {
    return data;
  }

  if (Array.isArray(data)) {
    const resultArray = [];
    for (const item of data) {
      resultArray.push(deepDecompress(item, keysMap));
    }
    return resultArray;
  } else if (isObject(data)) {
    const resultObject: { [key: string]: any } = {};
    for (const srcKey of Object.keys(data)) {
      const destKey = keysMap[srcKey];
      if (!destKey) {
        throw new Error('Corrupted data. Unknown key[' + srcKey + ']');
      }

      resultObject[destKey] = deepDecompress(data[srcKey], keysMap);
    }
    return resultObject;
  } else if (isString(data)) {
    return keysMap[data] || data;
  }

  return data;
}

function isObject(value: any): boolean {
  const type = typeof value;
  return value != null && (type === 'object' || type === 'function');
}

function isString(value: any): boolean {
  return typeof value === 'string';
}
