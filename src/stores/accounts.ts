import { defineStore } from 'pinia'

export interface AccountLabel {
  text: string
}

export interface Account {
  label: AccountLabel[]
  type: string
  login: string
  password: string
}

function parseLabels(labelStr: string): AccountLabel[] {
  return labelStr
    .split(';')
    .map(l => l.trim())
    .filter(Boolean)
    .map(text => ({ text }))
}

export const useAccountsStore = defineStore('accounts', {
  state: () => ({
    accounts: [] as Account[],
  }),
  actions: {
    addAccount() {
      this.accounts.push({
        label: [],
        type: 'local',
        login: '',
        password: '',
      })
    },
    removeAccount(idx: number) {
      this.accounts.splice(idx, 1)
    },
    updateAccount(idx: number, data: { label: string; type: string; login: string; password: string }) {
      this.accounts[idx] = {
        label: parseLabels(data.label),
        type: data.type,
        login: data.login,
        password: data.password,
      }
    },
    setAccounts(accounts: Account[]) {
      this.accounts = accounts
    },
  },
  persist: true,
})
 