# @kazuhi-ra/is-openable-pdf

A WebAssembly library to check if a PDF can be opened when the user password is either not set or is the default (empty string).

## Install

```bash
npm install @kazuhi-ra/is-openable-pdf
```

## Quick Start

```typescript
import { isOpenablePdf } from '@kazuhi-ra/is-openable-pdf';

// Check a File object
const isOpenable = await isOpenablePdf(file);
```

## API

```typescript
isOpenablePdf(file: File | Uint8Array): Promise<boolean>
```

## License

MIT
