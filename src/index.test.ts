import { describe, it, expect, beforeAll } from 'vitest'
import { isOpenablePdf, initWasm } from './index'
import { readFileSync } from 'node:fs'
import path from 'node:path'

describe('isOpenablePdf', () => {
  beforeAll(async () => {
    await initWasm()
  })

  it('should return true for a PDF file without password protection', async () => {
    const filePath = path.join(process.cwd(), 'samples', 'no_password.pdf')
    const buffer = readFileSync(filePath)
    const target = new File([buffer], 'no_password.pdf', {
      type: 'application/pdf',
    })
    expect(await isOpenablePdf(target)).toBe(true)
  })

  it('should return true for a PDF file with empty password', async () => {
    const filePath = path.join(process.cwd(), 'samples', 'user_password_empty.pdf')
    const buffer = readFileSync(filePath)
    const target = new File([buffer], 'user_password_empty.pdf', {
      type: 'application/pdf',
    })
    expect(await isOpenablePdf(target)).toBe(true)
  })

  it('should return false for a password-protected PDF file', async () => {
    const filePath = path.join(process.cwd(), 'samples', 'user_password_set.pdf')
    const buffer = readFileSync(filePath)
    const target = new File([buffer], 'user_password_set.pdf', {
      type: 'application/pdf',
    })
    expect(await isOpenablePdf(target)).toBe(false)
  })

  it('should return false for non-PDF files', async () => {
    const filePath = path.join(process.cwd(), 'samples', 'kazuhira.jpeg')
    const buffer = readFileSync(filePath)
    const target = new File([buffer], 'kazuhira.jpeg', {
      type: 'image/jpeg',
    })
    expect(await isOpenablePdf(target)).toBe(false)
  })

  it('should return false when file is null', async () => {
    expect(await isOpenablePdf(null as unknown as File)).toBe(false)
  })
})
