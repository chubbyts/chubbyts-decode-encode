import { XMLBuilder } from 'fast-xml-parser';
import { throwableToError } from '@chubbyts/chubbyts-throwable-to-error/dist/throwable-to-error';
import type { Data } from '../index.js';
import { isArray, isBoolean, isNumber, isObject, isString, isNull } from '../index.js';
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
import { EncodeError } from './index.js';
import type { TypeEncoder } from './index.js';

const encodeHtmlEntities = (string: string) =>
  string.replace(/[\u00A0-\u9999<>&]/g, (i) => '&#' + i.charCodeAt(0) + ';');

const createXmlNode = (): Record<string, unknown> => {
  return {
    '?xml': [
      {
        '#text': '',
      },
    ],
    ':@': {
      '@_version': '1.0',
      '@_encoding': 'UTF-8',
    },
  };
};

const createJsonxAttributes = (): Record<string, unknown> => {
  return {
    ':@': {
      '@_xsi:schemaLocation': 'http://www.datapower.com/schemas/json jsonx.xsd',
      '@_xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
      '@_xmlns:json': 'http://www.ibm.com/xmlns/prod/2009/jsonx',
    },
  };
};

const createNullNode = (key: string | undefined = undefined): JsonxNullNode | (JsonxNullNode & WithName) => {
  const node = {
    [DATATYPE_NULL]: [],
  };

  if (key === undefined) {
    return node;
  }

  return {
    ...node,
    ':@': {
      '@_name': key,
    },
  };
};

const createBooleanNode = (
  value: boolean,
  key: string | undefined = undefined,
): JsonxBooleanNode | (JsonxBooleanNode & WithName) => {
  const node = {
    [DATATYPE_BOOLEAN]: [
      {
        '#text': value,
      },
    ],
  };

  if (key === undefined) {
    return node;
  }

  return {
    ...node,
    ':@': {
      '@_name': key,
    },
  };
};

const createNumberNode = (
  value: number,
  key: string | undefined = undefined,
): JsonxNumberNode | (JsonxNumberNode & WithName) => {
  const node = {
    [DATATYPE_NUMBER]: [
      {
        '#text': value,
      },
    ],
  };

  if (key === undefined) {
    return node;
  }

  return {
    ...node,
    ':@': {
      '@_name': key,
    },
  };
};

const createStringNode = (
  value: string,
  key: string | undefined = undefined,
): JsonxStringNode | (JsonxStringNode & WithName) => {
  const node = {
    [DATATYPE_STRING]: [
      {
        '#text': value === value.trim() ? encodeHtmlEntities(value) : `<![CDATA[${encodeHtmlEntities(value)}]]>`,
      },
    ],
  };

  if (key === undefined) {
    return node;
  }

  return {
    ...node,
    ':@': {
      '@_name': key,
    },
  };
};

const createNode = (value: Data, key: string | undefined = undefined): JsonxNode | (JsonxNode & WithName) => {
  if (isObject(value)) {
    return createObjectNode(value, key);
  } else if (isArray(value)) {
    return createArrayNode(value, key);
  } else if (isString(value)) {
    return createStringNode(value, key);
  } else if (isNumber(value)) {
    return createNumberNode(value, key);
  } else if (isBoolean(value)) {
    return createBooleanNode(value, key);
  } else if (isNull(value)) {
    return createNullNode(key);
  }

  throw new Error(`Unsupported value: ${JSON.stringify(value)}`);
};

const createArrayNode = (
  value: Array<Data>,
  key: string | undefined = undefined,
): JsonxArrayNode | (JsonxArrayNode & WithName) => {
  const elements = value.map((subValue) => createNode(subValue));

  const node = {
    [DATATYPE_ARRAY]: elements,
  };

  if (key === undefined) {
    return node;
  }

  return {
    ...node,
    ':@': {
      '@_name': key,
    },
  };
};

const createObjectNode = (
  value: { [key: string]: Data },
  key: string | undefined = undefined,
): JsonxObjectNode | (JsonxObjectNode & WithName) => {
  const elements = Object.entries(value).map(([subKey, subValue]) => createNode(subValue, subKey));

  const node = {
    [DATATYPE_OBJECT]: elements,
  };

  if (key === undefined) {
    return node;
  }

  return {
    ...node,
    ':@': {
      '@_name': key,
    },
  };
};

export const createJsonxTypeEncoder = (prettyPrint = false): TypeEncoder => {
  const builder = new XMLBuilder({
    preserveOrder: true,
    ignoreAttributes: false,
    processEntities: false,
    format: prettyPrint,
  });

  return {
    encode: (data: Data): string => {
      try {
        return builder.build([
          createXmlNode(),
          {
            ...createNode(data),
            ...createJsonxAttributes(),
          },
        ]) as string;
      } catch (e) {
        const error = throwableToError(e);

        throw new EncodeError(error.message, error.stack);
      }
    },
    contentType: 'application/jsonx+xml',
  };
};
