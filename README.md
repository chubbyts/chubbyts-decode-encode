# chubbyts-decode-encode

[![CI](https://github.com/chubbyts/chubbyts-decode-encode/workflows/CI/badge.svg?branch=master)](https://github.com/chubbyts/chubbyts-decode-encode/actions?query=workflow%3ACI)
[![Coverage Status](https://coveralls.io/repos/github/chubbyts/chubbyts-decode-encode/badge.svg?branch=master)](https://coveralls.io/github/chubbyts/chubbyts-decode-encode?branch=master)
[![Infection MSI](https://badge.stryker-mutator.io/github.com/chubbyts/chubbyts-decode-encode/master)](https://dashboard.stryker-mutator.io/reports/github.com/chubbyts/chubbyts-decode-encode/master)
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

 * node: 14
 * [@chubbyts/chubbyts-throwable-to-error][2]: ^1.0.0
 * [fast-xml-parser][3]: ^4.0.8
 * [qs][4]: ^6.10.5
 * [yaml][5]: ^2.1.1

## Installation

Through [NPM](https://www.npmjs.com) as [@chubbyts/chubbyts-decode-encode][1].

```ts
npm i @chubbyts/chubbyts-decode-encode@^1.0.3
```

## Usage

### Decoder

#### createDecoder

```ts
import { createDecoder } from '@chubbyts/chubbyts-decode-encode/dist/decoder';
import { createJsonTypeDecoder } from '@chubbyts/chubbyts-decode-encode/dist/decoder/json-type-decoder';

const decoder = createDecoder([createJsonTypeDecoder()]);
const data = decoder.decode('{"key":"value"}', 'application/json');
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

const urlEncodedTypeDecoder = createUrlEncodedTypeDecoder();\"
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
import { createEncoder } from '@chubbyts/chubbyts-encode-encode/dist/encoder';
import { createJsonTypeEncoder } from '@chubbyts/chubbyts-encode-encode/dist/encoder/json-type-encoder';

const encoder = createEncoder([createJsonTypeEncoder()]);
const encodedData = encoder.encode({key: "value"}, 'application/json');dec
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

## Copyright

Dominik Zogg 2022

[1]: https://www.npmjs.com/package/@chubbyts/chubbyts-decode-encode
[2]: https://www.npmjs.com/package/@chubbyts/chubbyts-throwable-to-error
[3]: https://www.npmjs.com/package/fast-xml-parser
[4]: https://www.npmjs.com/package/qs
[5]: https://www.npmjs.com/package/yaml
