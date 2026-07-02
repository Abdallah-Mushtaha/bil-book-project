import '@testing-library/jest-dom/vitest'
import { vi } from 'vitest'

// server-only بيرمي error لو اتشغل بره بيئة Next.js الحقيقية
vi.mock('server-only', () => ({}))