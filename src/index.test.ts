import { describe, it, expect, beforeAll } from 'vitest'
import { isOpenablePdf, initWasm } from './index'
import { readFileSync } from 'node:fs'
import path from 'node:path'

describe('isOpenablePdf', () => {
  beforeAll(async () => {
    await initWasm()
  })

  it('should return true for non-encrypted PDF', async () => {
    expect(await isOpenablePdf(loadFile('no_password.pdf'))).toBe(true)
  })

  it('should return true for empty password PDF', async () => {
    expect(await isOpenablePdf(loadFile('user_password_empty.pdf'))).toBe(true)
  })

  it('should return true for AESv3 encrypted PDF with empty password', async () => {
    expect(await isOpenablePdf(loadFile('user_password_empty_aesv3.pdf'))).toBe(true)
  })

  it('should return false for password-protected PDF', async () => {
    expect(await isOpenablePdf(loadFile('user_password_set.pdf'))).toBe(false)
  })

  it('should return false for non-PDF files', async () => {
    expect(await isOpenablePdf(loadFile('kazuhira.jpeg'))).toBe(false)
  })

  it('should return false for null/undefined/empty', async () => {
    expect(await isOpenablePdf(null as unknown as File)).toBe(false)
    expect(await isOpenablePdf(undefined as unknown as File)).toBe(false)
    expect(await isOpenablePdf(new File([], 'empty.pdf', { type: 'application/pdf' }))).toBe(false)
  })
})

const loadFile = (fileName: string): File => {
  const buffer = readFileSync(path.join(process.cwd(), 'samples', fileName))
  const type = fileName.endsWith('.pdf') ? 'application/pdf' : 'image/jpeg'
  return new File([buffer], fileName, { type })
}
