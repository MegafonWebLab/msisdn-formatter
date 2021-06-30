# @megafon/msisdn-formatter

[![npm (scoped with tag)](https://img.shields.io/npm/v/@megafon/msisdn-formatter/latest?label=%40megafon%2Fmsisdn-formatter)](https://www.npmjs.com/package/@megafon/msisdn-formatter/v/latest) 
[![msisdn CI](https://github.com/MegafonWebLab/msisdn-formatter/actions/workflows/auto-publish.yaml/badge.svg)](https://github.com/MegafonWebLab/msisdn-formatter/actions/workflows/auto-publish.yaml)

Russian msisdn normalizer and formatter.

## Installation

```
$ yarn add @megafon/msisdn-formatter
```

## Usage

```typescript
import { clean, pretty, PrettyFormats } from '@megafon/msisdn-formatter';

const userNumber = '+7 926 000-00-00';

console.log(clean(userNumber)); // Prints: '9260000000'
console.log(pretty(userNumber, PrettyFormats.ZETA)); // Prints: '+7 (926) 000-00-00'
```

### Available formats:

* alpha: 9161234567
* beta: 79161234567
* gamma: 916 123-4567
* delta: (916) 123-4567
* epsilon: +7 (916) 123-4567
* zeta: +7 (916) 123-45-67
* eta: +7 916 123-45-67

## Contributing

Follow [CONTRIBUTING.md](CONTRIBUTING.md) and [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md).
