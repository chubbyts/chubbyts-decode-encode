# chubbyts-decode-encode

[![CI](https://github.com/chubbyts/chubbyts-decode-encode/actions/workflows/ci.yml/badge.svg?branch=master)](https://github.com/chubbyts/chubbyts-decode-encode/actions/workflows/ci.yml)
[![Coverage Status](https://coveralls.io/repos/github/chubbyts/chubbyts-decode-encode/badge.svg?branch=master)](https://coveralls.io/github/chubbyts/chubbyts-decode-encode?branch=master)
[![Mutation testing badge](https://img.shields.io/endpoint?style=flat&url=https%3A%2F%2Fbadge-api.stryker-mutator.io%2Fgithub.com%2Fchubbyts%2Fchubbyts-decode-encode%2Fmaster)](https://dashboard.stryker-mutator.io/reports/github.com/chubbyts/chubbyts-decode-encode/master)
[![npm-version](https://img.shields.io/npm/v/@chubbyts/chubbyts-decode-encode.svg)](https://www.npmjs.com/package/@chubbyts/chubbyts-decode-encode)

[![bugs](https://sonarcloud.io/api/project_badges/measure?project=chubbyts_chubbyts-decode-encode&metric=bugs)](https://sonarcloud.io/dashboard?id=chubbyts_chubbyts-decode-encode)
[![code_smells](https://sonarcloud.io/api/project_badges/measure?project=chubbyts_chubbyts-decode-encode&metric=code_smells)](https://sonarcloud.io/dashboard?id=chubbyts_chubbyts-decode-encode)
[![coverage](https://sonarcloud.io/api/project_badges/measure?project=chubbyts_chubbyts-decode-encode&metric=coverage)](https://sonarcloud.io/dashboard?id=chubbyts_chubbyts-decode-encode)
[![duplicated_lines_density](https://sonarcloud.io/api/project_badges/measure?project=chubbyts_chubbyts-decode-encode&metric=duplicated_lines_density)](https://sonarcloud.io/dashboard?id=chubbyts_chubbyts-decode-encode)
[![ncloc](https://sonarcloud.io/api/project_badges/measure?project=chubbyts_chubbyts-decode-encode&metric=ncloc)](https://sonarcloud.io/dashboard?id=chubbyts_chubbyts-decode-encode)
[![sqale_rating](https://sonarcloud.io/api/project_badges/measure?project=chubbyts_chubbyts-decode-encode&metric=sqale_rating)](https://sonarcloud.io/dashboard?id=chubbyts_chubbyts-decode-encode)
[![alert_status](https://sonarcloud.io/api/project_badges/measure?project=chubbyts_chubbyts-decode-encode&metric=alert_status)](https://sonarcloud.io/dashboard?id=chubbyts_chubbyts-decode-encode)
[![reliability_rating](https://sonarcloud.io/api/project_badges/measure?project=chubbyts_chubbyts-decode-encode&metric=reliability_rating)](https://sonarcloud.io/dashboard?id=chubbyts_chubbyts-decode-encode)
[![security_rating](https://sonarcloud.io/api/project_badges/measure?project=chubbyts_chubbyts-decode-encode&metric=security_rating)](https://sonarcloud.io/dashboard?id=chubbyts_chubbyts-decode-encode)
[![sqale_index](https://sonarcloud.io/api/project_badges/measure?project=chubbyts_chubbyts-decode-encode&metric=sqale_index)](https://sonarcloud.io/dashboard?id=chubbyts_chubbyts-decode-encode)
[![vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=chubbyts_chubbyts-decode-encode&metric=vulnerabilities)](https://sonarcloud.io/dashboard?id=chubbyts_chubbyts-decode-encode)

## Description

Decode and encode request/response bodies by content type: json, jsonx, ndjson, url-encoded and yaml.

Strings are decoded into plain data (objects, arrays, strings, numbers, booleans and null) and encoded back. Each format can be registered under additional content types, for example `application/problem+json` or `application/yaml`.

## Requirements

 * node: 22
 * [@chubbyts/chubbyts-dic-config-factory][9]: ^1.1.0
 * [@chubbyts/chubbyts-dic-types][7]: ^2.4.0
 * [@chubbyts/chubbyts-throwable-to-error][2]: ^2.4.0
 * [fast-xml-builder][3]: ^1.3.1
 * [fast-xml-parser][4]: ^5.11.2
 * [qs][5]: ^6.16.1
 * [yaml][6]: ^2.9.1

## Installation

Through [NPM](https://www.npmjs.com) as [@chubbyts/chubbyts-decode-encode][1].

```sh
npm i @chubbyts/chubbyts-decode-encode@^2.8.0
```

## Usage

### Data

Every type decoder returns and every type encoder accepts `Data`, the json data model:

```ts
type Data = { [key: string]: Data } | Array<Data> | string | number | boolean | null;
```

The matching type guards `isNull`, `isBoolean`, `isNumber`, `isString`, `isArray` and `isObject` (plain objects only) can be imported from `@chubbyts/chubbyts-decode-encode/data`.

```ts
import { isObject } from '@chubbyts/chubbyts-decode-encode/data';

isObject({ key: 'value' }); // true
isObject(new Date()); // false
```

### Decoder

#### createDecoder

```ts
import { createDecoder } from '@chubbyts/chubbyts-decode-encode/decoder/decoder';
import { createJsonTypeDecoder } from '@chubbyts/chubbyts-decode-encode/decoder/json-type-decoder';

const decoder = createDecoder([createJsonTypeDecoder()]);
const data = decoder.decode('{"key":"value"}', 'application/json');
// data: { key: 'value' }
const contentTypes = decoder.contentTypes;
// contentTypes: ['application/json']
```

The `Decoder` type accepts an optional third argument `context` (`Record<string, unknown>`). The shipped decoder ignores it, it exists for custom `Decoder` implementations, for example one that decodes depending on the current user.

#### createJsonTypeDecoder

```ts
import { createJsonTypeDecoder } from '@chubbyts/chubbyts-decode-encode/decoder/json-type-decoder';

const jsonTypeDecoder = createJsonTypeDecoder();
const data = jsonTypeDecoder.decode('{"key":"value"}');
// data: { key: 'value' }
const contentType = jsonTypeDecoder.contentType;
// contentType: 'application/json'

// any other json based content type, like `application/problem+json` (RFC 9457)
const problemJsonTypeDecoder = createJsonTypeDecoder('application/problem+json');
```

#### createJsonxTypeDecoder

```ts
import { createJsonxTypeDecoder } from '@chubbyts/chubbyts-decode-encode/decoder/jsonx-type-decoder';

const jsonxTypeDecoder = createJsonxTypeDecoder();
const data = jsonxTypeDecoder.decode(`
<?xml version="1.0" encoding="UTF-8"?>
<json:object>
  <json:string name="key">value</json:string>
</json:object>
`);
// data: { key: 'value' }
const contentType = jsonxTypeDecoder.contentType;
// contentType: 'application/jsonx+xml'
```

#### createNdjsonTypeDecoder

[NDJSON](https://github.com/ndjson/ndjson-spec) / [JSON Lines](https://jsonlines.org): one json document per line, decoded into an array.

```ts
import { createNdjsonTypeDecoder } from '@chubbyts/chubbyts-decode-encode/decoder/ndjson-type-decoder';

const ndjsonTypeDecoder = createNdjsonTypeDecoder();
const data = ndjsonTypeDecoder.decode('{"key":"value1"}\n{"key":"value2"}\n');
// data: [{ key: 'value1' }, { key: 'value2' }]
const contentType = ndjsonTypeDecoder.contentType;
// contentType: 'application/jsonl'

// any other ndjson / json lines content type, like `application/x-ndjson`
const xNdjsonTypeDecoder = createNdjsonTypeDecoder('application/x-ndjson');

// silently ignore empty lines
const lenientNdjsonTypeDecoder = createNdjsonTypeDecoder('application/jsonl', true);
```

`\n` and `\r\n` line endings are accepted, the line terminator after the last line is optional. Empty lines (including lines with only json whitespace: space, tab, `\r`) are not valid json and throw a `DecodeError`, unless `ignoreEmptyLines` (second argument) is `true`. The `DecodeError` message starts with the line number, for example `Line 3: ...`.

There is no registered media type for ndjson / json lines, so the service factories register all common ones: `application/jsonl`, `application/x-jsonl`, `text/jsonl`, `application/ndjson` and `application/x-ndjson`.

#### createUrlEncodedTypeDecoder

```ts
import { createUrlEncodedTypeDecoder } from '@chubbyts/chubbyts-decode-encode/decoder/url-encoded-type-decoder';

const urlEncodedTypeDecoder = createUrlEncodedTypeDecoder();
const data = urlEncodedTypeDecoder.decode('key=value');
// data: { key: 'value' }
const contentType = urlEncodedTypeDecoder.contentType;
// contentType: 'application/x-www-form-urlencoded'
```

Values are converted to their json type: `true` and `false` become booleans, `null` becomes `null` and a value becomes a number only if the number converts back to the exact same string, so `01` or `1.0` stay strings.

```ts
const data = urlEncodedTypeDecoder.decode('a=1&b=true&c=null&d=01&e[]=x');
// data: { a: 1, b: true, c: null, d: '01', e: ['x'] }
```

#### createYamlTypeDecoder

```ts
import { createYamlTypeDecoder } from '@chubbyts/chubbyts-decode-encode/decoder/yaml-type-decoder';

const yamlTypeDecoder = createYamlTypeDecoder();
const data = yamlTypeDecoder.decode('key: value');
// data: { key: 'value' }
const contentType = yamlTypeDecoder.contentType;
// contentType: 'application/x-yaml'

// the registered media type `application/yaml` (RFC 9512)
const officialYamlTypeDecoder = createYamlTypeDecoder('application/yaml');
```

### Encoder

#### createEncoder

```ts
import { createEncoder } from '@chubbyts/chubbyts-decode-encode/encoder/encoder';
import { createJsonTypeEncoder } from '@chubbyts/chubbyts-decode-encode/encoder/json-type-encoder';

const encoder = createEncoder([createJsonTypeEncoder()]);
const encodedData = encoder.encode({ key: 'value' }, 'application/json');
// encodedData: '{"key":"value"}'
const contentTypes = encoder.contentTypes;
// contentTypes: ['application/json']
```

The `Encoder` type accepts an optional third argument `context` (`Record<string, unknown>`). The shipped encoder ignores it, it exists for custom `Encoder` implementations, for example one that encodes depending on the current user.

#### createJsonTypeEncoder

```ts
import { createJsonTypeEncoder } from '@chubbyts/chubbyts-decode-encode/encoder/json-type-encoder';

const jsonTypeEncoder = createJsonTypeEncoder();
const encodedData = jsonTypeEncoder.encode({ key: 'value' });
// encodedData: '{"key":"value"}'
const contentType = jsonTypeEncoder.contentType;
// contentType: 'application/json'

// pretty printed
const prettyJsonTypeEncoder = createJsonTypeEncoder(true);

// any other json based content type, like `application/problem+json` (RFC 9457)
const problemJsonTypeEncoder = createJsonTypeEncoder(false, 'application/problem+json');
```

#### createJsonxTypeEncoder

```ts
import { createJsonxTypeEncoder } from '@chubbyts/chubbyts-decode-encode/encoder/jsonx-type-encoder';

const jsonxTypeEncoder = createJsonxTypeEncoder(true); // pretty printed, defaults to false
const encodedData = jsonxTypeEncoder.encode({ key: 'value' });
// encodedData:
// <?xml version="1.0" encoding="UTF-8"?>
// <json:object xsi:schemaLocation="http://www.datapower.com/schemas/json jsonx.xsd" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:json="http://www.ibm.com/xmlns/prod/2009/jsonx">
//   <json:string name="key">value</json:string>
// </json:object>
const contentType = jsonxTypeEncoder.contentType;
// contentType: 'application/jsonx+xml'
```

#### createNdjsonTypeEncoder

```ts
import { createNdjsonTypeEncoder } from '@chubbyts/chubbyts-decode-encode/encoder/ndjson-type-encoder';

const ndjsonTypeEncoder = createNdjsonTypeEncoder();
const encodedData = ndjsonTypeEncoder.encode([{ key: 'value1' }, { key: 'value2' }]);
// encodedData: '{"key":"value1"}\n{"key":"value2"}\n'
const contentType = ndjsonTypeEncoder.contentType;
// contentType: 'application/jsonl'

// any other ndjson / json lines content type, like `application/x-ndjson`
const xNdjsonTypeEncoder = createNdjsonTypeEncoder('application/x-ndjson');
```

Every line, including the last one, is terminated by `\n`. Only arrays can be encoded, any other value throws an `EncodeError`.

#### createUrlEncodedTypeEncoder

```ts
import { createUrlEncodedTypeEncoder } from '@chubbyts/chubbyts-decode-encode/encoder/url-encoded-type-encoder';

const urlEncodedTypeEncoder = createUrlEncodedTypeEncoder();
const encodedData = urlEncodedTypeEncoder.encode({ a: 1, b: true, c: null, d: [1, 2] });
// encodedData: 'a=1&b=true&c=null&d[0]=1&d[1]=2'
const contentType = urlEncodedTypeEncoder.contentType;
// contentType: 'application/x-www-form-urlencoded'
```

#### createYamlTypeEncoder

```ts
import { createYamlTypeEncoder } from '@chubbyts/chubbyts-decode-encode/encoder/yaml-type-encoder';

const yamlTypeEncoder = createYamlTypeEncoder();
const encodedData = yamlTypeEncoder.encode({ key: 'value' });
// encodedData: 'key: value\n'
const contentType = yamlTypeEncoder.contentType;
// contentType: 'application/x-yaml'

// the registered media type `application/yaml` (RFC 9512)
const officialYamlTypeEncoder = createYamlTypeEncoder('application/yaml');
```

### Custom type decoders / encoders

A type decoder / encoder is a plain object with a `contentType` and a `decode` / `encode` function. This adds `text/plain`, where the body is a single string:

```ts
import type { Data } from '@chubbyts/chubbyts-decode-encode/data';
import { isString } from '@chubbyts/chubbyts-decode-encode/data';
import type { TypeDecoder } from '@chubbyts/chubbyts-decode-encode/decoder/decoder';
import { createDecoder } from '@chubbyts/chubbyts-decode-encode/decoder/decoder';
import type { TypeEncoder } from '@chubbyts/chubbyts-decode-encode/encoder/encoder';
import { EncodeError, createEncoder } from '@chubbyts/chubbyts-decode-encode/encoder/encoder';

const createTextTypeDecoder = (): TypeDecoder => ({
  decode: (encodedData: string): Data => encodedData,
  contentType: 'text/plain',
});

const createTextTypeEncoder = (): TypeEncoder => ({
  encode: (data: Data): string => {
    if (!isString(data)) {
      throw new EncodeError(`Unsupported value: ${JSON.stringify(data)}, expected a string`);
    }

    return data;
  },
  contentType: 'text/plain',
});

const decoder = createDecoder([createTextTypeDecoder()]);
const encoder = createEncoder([createTextTypeEncoder()]);
```

### Errors

* `decode` throws a `DecodeError` (`@chubbyts/chubbyts-decode-encode/decoder/decoder`) if the encoded data is invalid, for example a json syntax error. In a http context this usually maps to `400 Bad Request`.
* `encode` of the jsonx and ndjson type encoders throws an `EncodeError` (`@chubbyts/chubbyts-decode-encode/encoder/encoder`) if a value cannot be represented, for ndjson anything but an array.
* `decode` / `encode` of the decoder / encoder throw an `Error` if the content type is not supported, the message lists the supported content types. In a http context this usually maps to `415 Unsupported Media Type` (decoder) or `406 Not Acceptable` (encoder).

```ts
import { DecodeError } from '@chubbyts/chubbyts-decode-encode/decoder/decoder';

try {
  decoder.decode('{', 'application/json');
} catch (e) {
  if (e instanceof DecodeError) {
    // invalid request body
  }
}
```

### Service factories (chubbyts-dic-config)

The package ships service factories (abstract factories built on [chubbyts-dic-config-factory][9]) for a [chubbyts-dic-config][8] (or any [chubbyts-dic-types][7] compatible) container within `@chubbyts/chubbyts-decode-encode/service-factory`:

 * `typeDecodersServiceFactory`: all shipped type decoders (json, jsonx, ndjson as `application/jsonl`, `application/x-jsonl`, `text/jsonl`, `application/ndjson` and `application/x-ndjson`, urlencoded, yaml as `application/x-yaml` and `application/yaml`)
 * `typeEncodersServiceFactory`: all shipped type encoders (json, jsonx, ndjson as `application/jsonl`, `application/x-jsonl`, `text/jsonl`, `application/ndjson` and `application/x-ndjson`, urlencoded, yaml as `application/x-yaml` and `application/yaml`), `config.debug` enables pretty printing for json / jsonx
 * `decoderServiceFactory`: the decoder, built from the `typeDecoders` service if registered, the shipped type decoders otherwise
 * `encoderServiceFactory`: the encoder, built from the `typeEncoders` service if registered, the shipped type encoders otherwise

```ts
import type { ConfigFactory } from '@chubbyts/chubbyts-dic-config/dic-config';
import { createContainerByConfigFactory } from '@chubbyts/chubbyts-dic-config/dic-config';
import type { Decoder } from '@chubbyts/chubbyts-decode-encode/decoder/decoder';
import type { Encoder } from '@chubbyts/chubbyts-decode-encode/encoder/encoder';
import { decoderServiceFactory, encoderServiceFactory } from '@chubbyts/chubbyts-decode-encode/service-factory';

const container = createContainerByConfigFactory({
  debug: false,
  dependencies: {
    factories: new Map<string, ConfigFactory>([
      ['decoder', decoderServiceFactory()],
      ['encoder', encoderServiceFactory()],
    ]),
  },
})();

const decoder = container.get<Decoder>('decoder');
const encoder = container.get<Encoder>('encoder');
```

To replace the type decoders / encoders, register a `typeDecoders` / `typeEncoders` service (`createTextTypeDecoder` from [Custom type decoders / encoders](#custom-type-decoders--encoders)):

```ts
import type { TypeDecoder } from '@chubbyts/chubbyts-decode-encode/decoder/decoder';
import { createJsonTypeDecoder } from '@chubbyts/chubbyts-decode-encode/decoder/json-type-decoder';

const container = createContainerByConfigFactory({
  dependencies: {
    factories: new Map<string, ConfigFactory>([
      ['decoder', decoderServiceFactory()],
      ['typeDecoders', (): Array<TypeDecoder> => [createJsonTypeDecoder(), createTextTypeDecoder()]],
    ]),
  },
})();
```

#### With names

To use different decoders / encoders in different parts of an application, the same factories can be registered multiple times with a name, which gets appended to each service id (`decoderapi`, `typeDecodersapi`, ...).

```ts
const container = createContainerByConfigFactory({
  dependencies: {
    factories: new Map<string, ConfigFactory>([
      ['decoder', decoderServiceFactory()],
      ['decoderapi', decoderServiceFactory('api')],
      ['typeDecodersapi', (): Array<TypeDecoder> => [createJsonTypeDecoder()]],
    ]),
  },
})();

const decoder = container.get<Decoder>('decoder'); // all shipped type decoders
const apiDecoder = container.get<Decoder>('decoderapi'); // json only
```

## Copyright

2026 Dominik Zogg

[1]: https://www.npmjs.com/package/@chubbyts/chubbyts-decode-encode
[2]: https://www.npmjs.com/package/@chubbyts/chubbyts-throwable-to-error
[3]: https://www.npmjs.com/package/fast-xml-builder
[4]: https://www.npmjs.com/package/fast-xml-parser
[5]: https://www.npmjs.com/package/qs
[6]: https://www.npmjs.com/package/yaml
[7]: https://www.npmjs.com/package/@chubbyts/chubbyts-dic-types
[8]: https://www.npmjs.com/package/@chubbyts/chubbyts-dic-config
[9]: https://www.npmjs.com/package/@chubbyts/chubbyts-dic-config-factory
