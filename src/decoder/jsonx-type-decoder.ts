import { XMLParser } from 'fast-xml-parser';
import { throwableToError } from '@chubbyts/chubbyts-throwable-to-error/dist/throwable-to-error';
import type {
  JsonxArrayNode,
  JsonxBooleanNode,
  JsonxNullNode,
  JsonxNumberNode,
  JsonxObjectNode,
  JsonxStringNode,
  JsonxNode,
  WithName,
} from '../jsonx-datatypes.js';
import {
  DATATYPE_ARRAY,
  DATATYPE_BOOLEAN,
  DATATYPE_NULL,
  DATATYPE_NUMBER,
  DATATYPE_OBJECT,
  DATATYPE_STRING,
} from '../jsonx-datatypes.js';
import type { Data } from '../data.js';
import { DecodeError } from './decoder.js';
import type { TypeDecoder } from './decoder.js';

const decodeHtmlEntities = (string: string) =>
  string.replace(/&#\d+;/gm, (code) =>
    String.fromCharCode((code.match(/\d+/) as RegExpMatchArray)[0] as unknown as number),
  );

const isWithName = (node: unknown): node is WithName =>
  typeof node === 'object' &&
  null !== node &&
  typeof (node as WithName)[':@'] === 'object' &&
  (node as WithName)[':@'] !== null &&
  typeof (node as WithName)[':@']['@_name'] === 'string';

const isObjectNode = (node: JsonxNode): node is JsonxObjectNode =>
  Object.keys(node)[0] === DATATYPE_OBJECT && Array.isArray((node as JsonxObjectNode)[DATATYPE_OBJECT]);
const isArrayNode = (node: JsonxNode): node is JsonxArrayNode =>
  Object.keys(node)[0] === DATATYPE_ARRAY && Array.isArray((node as JsonxArrayNode)[DATATYPE_ARRAY]);
const isStringNode = (node: JsonxNode): node is JsonxStringNode =>
  Object.keys(node)[0] === DATATYPE_STRING && Array.isArray((node as JsonxStringNode)[DATATYPE_STRING]);
const isNumberNode = (node: JsonxNode): node is JsonxNumberNode =>
  Object.keys(node)[0] === DATATYPE_NUMBER && Array.isArray((node as JsonxNumberNode)[DATATYPE_NUMBER]);
const isBooleanNode = (node: JsonxNode): node is JsonxBooleanNode =>
  Object.keys(node)[0] === DATATYPE_BOOLEAN && Array.isArray((node as JsonxBooleanNode)[DATATYPE_BOOLEAN]);
const isNullNode = (node: JsonxNode): node is JsonxNullNode =>
  Object.keys(node)[0] === DATATYPE_NULL && Array.isArray((node as JsonxNullNode)[DATATYPE_NULL]);

const convertNullNode = (): null => {
  return null;
};

const convertBooleanNode = (node: JsonxBooleanNode): boolean => {
  return node['json:boolean'][0]['#text'];
};

const convertNumberNode = (node: JsonxNumberNode): number => {
  return node['json:number'][0]['#text'];
};

const convertStringNode = (node: JsonxStringNode): string => {
  return decodeHtmlEntities(node['json:string'][0]['#text']);
};

const convertNode = (node: JsonxNode): Data => {
  if (isObjectNode(node)) {
    return convertObjectNode(node);
  } else if (isArrayNode(node)) {
    return convertArrayNode(node);
  } else if (isStringNode(node)) {
    return convertStringNode(node);
  } else if (isNumberNode(node)) {
    return convertNumberNode(node);
  } else if (isBooleanNode(node)) {
    return convertBooleanNode(node);
  } else if (isNullNode(node)) {
    return convertNullNode();
  }

  throw new Error(`Unsupported node: ${JSON.stringify(node)}`);
};

const convertArrayNode = (node: JsonxArrayNode): Array<Data> => {
  return node['json:array'].map(convertNode);
};

const convertNodeWithName = (node: JsonxNode): [string, Data] => {
  if (isObjectNode(node) && isWithName(node)) {
    return [node[':@']['@_name'], convertObjectNode(node)];
  } else if (isArrayNode(node) && isWithName(node)) {
    return [node[':@']['@_name'], convertArrayNode(node)];
  } else if (isStringNode(node) && isWithName(node)) {
    return [node[':@']['@_name'], convertStringNode(node)];
  } else if (isNumberNode(node) && isWithName(node)) {
    return [node[':@']['@_name'], convertNumberNode(node)];
  } else if (isBooleanNode(node) && isWithName(node)) {
    return [node[':@']['@_name'], convertBooleanNode(node)];
  } else if (isNullNode(node) && isWithName(node)) {
    return [node[':@']['@_name'], convertNullNode()];
  }

  throw new Error(`Unsupported node: ${JSON.stringify(node)}`);
};

const convertObjectNode = (node: JsonxObjectNode): Record<string, Data> => {
  return Object.fromEntries(node['json:object'].map(convertNodeWithName));
};

export const createJsonxTypeDecoder = (): TypeDecoder => {
  return {
    decode: (encodedData: string): Data => {
      try {
        const parser = new XMLParser({ preserveOrder: true, ignoreAttributes: false, htmlEntities: false });

        return convertNode(parser.parse(encodedData)[1]);
      } catch (e) {
        const error = throwableToError(e);

        throw new DecodeError(error.message, error.stack);
      }
    },
    contentType: 'application/jsonx+xml',
  };
};
