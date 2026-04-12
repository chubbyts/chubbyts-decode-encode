import { XMLParser } from 'fast-xml-parser';
import { throwableToError } from '@chubbyts/chubbyts-throwable-to-error/dist/throwable-to-error';
import type {
  JsonxArrayNode,
  JsonxBooleanNode,
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

const getNodeName = (node: JsonxNode): string | undefined => {
  return (node as Partial<WithName>)[':@']?.['@_name'];
};

const getNodeType = (node: JsonxNode): string => {
  return Object.keys(node)[0] as string;
};

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
  switch (getNodeType(node)) {
    case DATATYPE_OBJECT:
      return convertObjectNode(node as JsonxObjectNode);
    case DATATYPE_ARRAY:
      return convertArrayNode(node as JsonxArrayNode);
    case DATATYPE_STRING:
      return convertStringNode(node as JsonxStringNode);
    case DATATYPE_NUMBER:
      return convertNumberNode(node as JsonxNumberNode);
    case DATATYPE_BOOLEAN:
      return convertBooleanNode(node as JsonxBooleanNode);
    case DATATYPE_NULL:
      return convertNullNode();
  }

  throw new Error(`Unsupported node: ${JSON.stringify(node)}`);
};

const convertArrayNode = (node: JsonxArrayNode): Array<Data> => {
  return node['json:array'].map(convertNode);
};

const convertNodeWithName = (node: JsonxNode): [string, Data] => {
  const name = getNodeName(node);

  if (undefined === name) {
    throw new Error(`Unsupported node: ${JSON.stringify(node)}`);
  }

  return [name, convertNode(node)];
};

const convertObjectNode = (node: JsonxObjectNode): Record<string, Data> => {
  return Object.fromEntries(node['json:object'].map(convertNodeWithName));
};

export const createJsonxTypeDecoder = (): TypeDecoder => {
  return {
    decode: (encodedData: string): Data => {
      try {
        const parser = new XMLParser({ preserveOrder: true, ignoreAttributes: false });

        return convertNode(parser.parse(encodedData)[1]);
      } catch (e) {
        const error = throwableToError(e);

        throw new DecodeError(error.message, error.stack);
      }
    },
    contentType: 'application/jsonx+xml',
  };
};
