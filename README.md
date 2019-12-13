# json-deflate

> Shrink JSON data lenght by extracting property names with shorter ones. It is particularly efficent against a large heterogeneous collection.

[![NPM version](https://img.shields.io/npm/v/json-deflate.svg)](https://www.npmjs.com/package/json-deflate)

## Installation

```sh
npm install json-deflate
```

## Examples

```ts
import { deflate, restore } from 'json-deflater';

const originalData = [{
  "id": 1,
  "firstName": "Hazlett",
  "lastName": "Rapley",
  "email": "hrapley0@apple.com",
  "homeAddressLine": "91 Veith Lane",
  "homeAddressCity": "Atlanta",
  "homeAddressState": "Georgia",
  "homeAddressZip": "31132"
}, {
  "id": 2,
  "firstName": "Madalena",
  "lastName": "Joint",
  "email": "mjoint1@multiply.com",
  "homeAddressLine": "2 Gerald Court",
  "homeAddressCity": "Nashville",
  "homeAddressState": "Tennessee",
  "homeAddressZip": "37235"
}, {
  "id": 3,
  "firstName": "Erich",
  "lastName": "Barfford",
  "email": "ebarfford2@virginia.edu",
  "homeAddressLine": "22887 Rigney Place",
  "homeAddressCity": "Lexington",
  "homeAddressState": "Kentucky",
  "homeAddressZip": "40515"
}, {
  "id": 4,
  "firstName": "Allison",
  "lastName": "Radin",
  "email": "aradin3@newsvine.com",
  "homeAddressLine": "453 Sage Terrace",
  "homeAddressCity": "Columbus",
  "homeAddressState": "Georgia",
  "homeAddressZip": "31904"
}, {
  "id": 5,
  "firstName": "Rouvin",
  "lastName": "Pulsford",
  "email": "rpulsford4@odnoklassniki.ru",
  "homeAddressLine": "25 Scofield Terrace",
  "homeAddressCity": "Fresno",
  "homeAddressState": "California",
  "homeAddressZip": "93786"
}];

const compressedData = deflate(originalData);

const restoredData = deflate(originalData);

```
