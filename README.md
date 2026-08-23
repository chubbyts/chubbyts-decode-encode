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

A simple decode/encode solution for json / jsonx / url-encoded / xml / yaml.

## Requirements

 * node: 22
 * [@chubbyts/chubbyts-dic-config-factory][9]: ^1.0.0
 * [@chubbyts/chubbyts-dic-types][7]: ^2.3.0
 * [@chubbyts/chubbyts-throwable-to-error][2]: ^2.3.0
 * [fast-xml-builder][3]: ^1.3.0
 * [fast-xml-parser][4]: ^5.10.1
 * [qs][5]: ^6.15.3
 * [yaml][6]: ^2.9.0

## Installation

Through [NPM](https://www.npmjs.com) as [@chubbyts/chubbyts-decode-encode][1].

```ts
npm i @chubbyts/chubbyts-decode-encode@^2.5.1
```

## Usage

### Decoder

#### createDecoder

```ts
import { createDecoder } from '@chubbyts/chubbyts-decode-encode/dist/decoder/decoder';
import { createJsonTypeDecoder } from '@chubbyts/chubbyts-decode-encode/dist/decoder/json-type-decoder';

const decoder = createDecoder([createJsonTypeDecoder()]);
const data = decoder.decode('{"key":"value"}', 'application/json'); // or with 3th argument, for example { user: 'username1' }
// data: {key: "value"}
const contentTypes = decoder.contentTypes;
// contentTypes: ['application/json']
```

#### createJsonTypeDecoder

```ts
import { createJsonTypeDecoder } from '@chubbyts/chubbyts-decode-encode/dist/decoder/json-type-decoder';

const jsonTypeDecoder = createJsonTypeDecoder();
const data = jsonTypeDecoder.decode('{"key":"value"}');
// data: {key: "value"}
const contentType = jsonTypeDecoder.contentType;
// contentType: 'application/json'
```

#### createJsonxTypeDecoder

```ts
import { createJsonxTypeDecoder } from '@chubbyts/chubbyts-decode-encode/dist/decoder/jsonx-type-decoder';

const jsonxTypeDecoder = createJsonxTypeDecoder();
const data = jsonxTypeDecoder.decode(`
<?xml version="1.0" encoding="UTF-8"?>
<json:object>
  <json:string name="key">value</json:string>
</json:object>
`);
// data: {key: "value"}
const contentType = jsonxTypeDecoder.contentType;
// contentType: 'application/jsonx+xml'
```

#### createUrlEncodedTypeDecoder

```ts
import { createUrlEncodedTypeDecoder } from '@chubbyts/chubbyts-decode-encode/dist/decoder/url-encoded-type-decoder';

const urlEncodedTypeDecoder = createUrlEncodedTypeDecoder();
const data = urlEncodedTypeDecoder.decode('key=value');
// data: {key: "value"}
const contentType = urlEncodedTypeDecoder.contentType;
// contentType: 'application/x-www-form-urlencoded'
```

#### createYamlTypeDecoder

```ts
import { createYamlTypeDecoder } from '@chubbyts/chubbyts-decode-encode/dist/decoder/yaml-type-decoder';

const yamlTypeDecoder = createYamlTypeDecoder();
const data = yamlTypeDecoder.decode('key: value');
// data: {key: "value"}
const contentType = yamlTypeDecoder.contentType;
// contentType: 'application/x-yaml'
```

### Encoder

#### createEncoder

```ts
import { createEncoder } from '@chubbyts/chubbyts-encode-encode/dist/encoder/encoder';
import { createJsonTypeEncoder } from '@chubbyts/chubbyts-encode-encode/dist/encoder/json-type-encoder';

const encoder = createEncoder([createJsonTypeEncoder()]);
const encodedData = encoder.encode({key: "value"}, 'application/json'); // or with 3th argument, for example { user: 'username1' }
// encodedData: {"key":"value"}
const contentTypes = encoder.contentTypes;
// contentTypes: ['application/json']
```

#### createJsonTypeEncoder

```ts
import { createJsonTypeEncoder } from '@chubbyts/chubbyts-encode-encode/dist/encoder/json-type-encoder';

const jsonTypeEncoder = createJsonTypeEncoder();
const encodedData = jsonTypeEncoder.encode({key: "value"});
// encodedData: {"key":"value"}
const contentType = jsonTypeEncoder.contentType;
// contentTypes: 'application/json'
```

#### createJsonxTypeEncoder

```ts
import { createJsonxTypeEncoder } from '@chubbyts/chubbyts-encode-encode/dist/encoder/jsonx-type-encoder';

const jsonxTypeEncoder = createJsonxTypeEncoder();
const encodedData = jsonxTypeEncoder.encode({key: "value"});
// encodedData: <?xml version="1.0" encoding="UTF-8"?>
// <json:object>
//   <json:string name="key">value</json:string>
// </json:object>
const contentType = jsonxTypeEncoder.contentType;
// contentTypes: 'application/jsonx+xml'
```

#### createUrlEncodedTypeEncoder

```ts
import { createUrlEncodedTypeEncoder } from '@chubbyts/chubbyts-encode-encode/dist/encoder/url-encoded-type-encoder';

const urlEncodedTypeEncoder = createUrlEncodedTypeEncoder();
const encodedData = urlEncodedTypeEncoder.encode({key: "value"});
// encodedData: key=value
const contentType = urlEncodedTypeEncoder.contentType;
// contentTypes: 'application/x-www-form-urlencoded'
```

#### createYamlTypeEncoder

```ts
import { createYamlTypeEncoder } from '@chubbyts/chubbyts-encode-encode/dist/encoder/yaml-type-encoder';

const yamlTypeEncoder = createYamlTypeEncoder();
const encodedData = yamlTypeEncoder.encode({key: "value"});
// encodedData: key: value
const contentType = yamlTypeEncoder.contentType;
// contentTypes: 'application/x-yaml'
```

### Service factories (chubbyts-dic-config)

The package ships service factories (abstract factories built on [chubbyts-dic-config-factory][9]) for a [chubbyts-dic-config][8] (or any [chubbyts-dic-types][7] compatible) container within `@chubbyts/chubbyts-decode-encode/dist/service-factory`:

 * `typeDecodersServiceFactory`: all shipped type decoders (json, jsonx, urlencoded, yaml)
 * `typeEncodersServiceFactory`: all shipped type encoders (json, jsonx, urlencoded, yaml), `config.debug` enables pretty printing for json / jsonx
 * `decoderServiceFactory`: the decoder, built from the `typeDecoders` service if registered, the shipped type decoders otherwise
 * `encoderServiceFactory`: the encoder, built from the `typeEncoders` service if registered, the shipped type encoders otherwise

```ts
import type { ConfigFactory } from '@chubbyts/chubbyts-dic-config/dist/dic-config';
import { createContainerByConfigFactory } from '@chubbyts/chubbyts-dic-config/dist/dic-config';
import type { Decoder } from '@chubbyts/chubbyts-decode-encode/dist/decoder/decoder';
import type { Encoder } from '@chubbyts/chubbyts-decode-encode/dist/encoder/encoder';
import { decoderServiceFactory, encoderServiceFactory } from '@chubbyts/chubbyts-decode-encode/dist/service-factory';

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

To replace the type decoders / encoders, register a `typeDecoders` / `typeEncoders` service:

```ts
import type { TypeDecoder } from '@chubbyts/chubbyts-decode-encode/dist/decoder/decoder';
import { createJsonTypeDecoder } from '@chubbyts/chubbyts-decode-encode/dist/decoder/json-type-decoder';

const container = createContainerByConfigFactory({
  dependencies: {
    factories: new Map<string, ConfigFactory>([
      ['decoder', decoderServiceFactory()],
      ['typeDecoders', (): Array<TypeDecoder> => [createJsonTypeDecoder(), createCustomTypeDecoder()]],
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
