## Motivation
In a browser environment, JavaScript alone cannot reliably detect whether a PDF file is password-protected—especially when the user password is set to the default (an empty string). Standard browser APIs do not provide sufficient detail for this check. This library uses WebAssembly to overcome that limitation by attempting to open the PDF directly, determining whether a password is required.

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
