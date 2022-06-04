export const DATATYPE_OBJECT = 'json:object';
export const DATATYPE_ARRAY = 'json:array';
export const DATATYPE_BOOLEAN = 'json:boolean';
export const DATATYPE_STRING = 'json:string';
export const DATATYPE_NUMBER = 'json:number';
export const DATATYPE_NULL = 'json:null';

export type WithName = {
  ':@': {
    '@_name': string;
  };
};

export type JsonxNullNode = {
  [DATATYPE_NULL]: Array<never>;
};

export type JsonxBooleanNode = {
  [DATATYPE_BOOLEAN]: Array<{ '#text': boolean }>;
};

export type JsonxNumberNode = {
  [DATATYPE_NUMBER]: Array<{ '#text': number }>;
};

export type JsonxStringNode = {
  [DATATYPE_STRING]: Array<{ '#text': string }>;
};

export type JsonxArrayNode = {
  [DATATYPE_ARRAY]: Array<
    JsonxNullNode | JsonxBooleanNode | JsonxNumberNode | JsonxStringNode | JsonxArrayNode | JsonxObjectNode
  >;
};

export type JsonxObjectNode = {
  [DATATYPE_OBJECT]: Array<
    JsonxNullNode | JsonxBooleanNode | JsonxNumberNode | JsonxStringNode | JsonxArrayNode | JsonxObjectNode
  >;
};

export type JsonxNode =
  | JsonxNullNode
  | JsonxBooleanNode
  | JsonxNumberNode
  | JsonxStringNode
  | JsonxArrayNode
  | JsonxObjectNode;
