export const ACCOUNT_TYPES = [
  { label: 'Локальная', value: 'local' },
  { label: 'LDAP', value: 'ldap' },
] as const

export const ACCOUNT_LIMITS = {
  MAX_ACCOUNTS: 10,
  MAX_LABEL_LENGTH: 50,
  MAX_LOGIN_LENGTH: 100,
  MAX_PASSWORD_LENGTH: 100,
} as const

export const VALIDATION_MESSAGES = {
  LOGIN_REQUIRED: 'Логин обязателен, максимум 100 символов',
  PASSWORD_REQUIRED: 'Пароль обязателен, максимум 100 символов',
} as const

export const UI_MESSAGES = {
  MAX_ACCOUNTS_TOOLTIP: 'Максимум 10 записей',
  LABEL_HINT: 'Для указания нескольких меток используйте ; как разделитель.',
} as const

export const ACCOUNT_DEFAULTS = {
  TYPE: 'local',
  LABEL: '',
  LOGIN: '',
  PASSWORD: '',
} as const 