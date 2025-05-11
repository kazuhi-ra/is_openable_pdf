import { is_openable_pdf } from '../dist/is_openable_pdf.js'

let wasmModule: typeof import('../dist/is_openable_pdf.js') | null = null

/**
 * Initialize WebAssembly module
 */
export async function initWasm(): Promise<void> {
  if (!wasmModule) {
    wasmModule = await import('../dist/is_openable_pdf.js')
  }
}

/**
 * Check if a PDF file is openable
 * @param file PDF file to check
 * @returns true if the PDF file is openable, false otherwise
 */
export async function isOpenablePdf(file: File): Promise<boolean> {
  if (!file) {
    return false
  }

  if (!wasmModule) {
    await initWasm()
  }

  const arrayBuffer = await file.arrayBuffer()
  const uint8Array = new Uint8Array(arrayBuffer)
  return is_openable_pdf(uint8Array)
}
