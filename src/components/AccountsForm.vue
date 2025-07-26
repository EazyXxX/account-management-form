<script setup lang="ts">
import { ref, watch } from 'vue'
import { Plus, Delete, QuestionFilled } from '@element-plus/icons-vue'
import { useAccountsStore } from '../stores/accounts'
import {
  ACCOUNT_TYPES,
  ACCOUNT_LIMITS,
  VALIDATION_MESSAGES,
  UI_MESSAGES,
} from '../constants/accounts'

const store = useAccountsStore()

interface EditAccount {
  label: string
  type: string
  login: string
  password: string
  valid: boolean
  errors: { login: string; password: string }
}

// Локальное представление для редактирования (строка меток)
const editAccounts = ref<EditAccount[]>(store.accounts.map(acc => ({
  ...acc,
  label: acc.label.map(l => l.text).join('; '),
  valid: true,
  errors: { login: '', password: '' },
})))

watch(
  () => store.accounts,
  (newAccounts) => {
    editAccounts.value = newAccounts.map(acc => ({
      ...acc,
      label: acc.label.map(l => l.text).join('; '),
      valid: true,
      errors: { login: '', password: '' },
    }))
  },
  { deep: true }
)

const validateAccount = (acc: EditAccount): boolean => {
  let valid = true
  acc.errors = { login: '', password: '' }
  if (!acc.login || acc.login.length > ACCOUNT_LIMITS.MAX_LOGIN_LENGTH) {
    acc.errors.login = VALIDATION_MESSAGES.LOGIN_REQUIRED
    valid = false
  }
  if (acc.type === 'local') {
    if (!acc.password || acc.password.length > ACCOUNT_LIMITS.MAX_PASSWORD_LENGTH) {
      acc.errors.password = VALIDATION_MESSAGES.PASSWORD_REQUIRED
      valid = false
    }
  }
  acc.valid = valid
  return valid
}

const addAccount = () => {
  store.addAccount()
}

const removeAccount = (idx: number) => {
  store.removeAccount(idx)
}

const handleBlurOrChange = (acc: EditAccount, idx: number) => {
  if (validateAccount(acc)) {
    store.updateAccount(idx, acc)
  }
}

const isLocalType = (account: EditAccount) => account.type === 'local'
</script>

<template>
  <div class="main-container">
    <div class="accounts-form-header">
      <h2>Учётные записи</h2>
      <el-button type="primary" class="accounts-form-add-btn" @click="addAccount" :disabled="editAccounts.length >= ACCOUNT_LIMITS.MAX_ACCOUNTS">
        <el-tooltip v-if="editAccounts.length >= ACCOUNT_LIMITS.MAX_ACCOUNTS" placement="top" :content="UI_MESSAGES.MAX_ACCOUNTS_TOOLTIP">
          <div class="add-button-content">
            <el-icon><Plus /></el-icon>
            <span>Добавить</span>
          </div>
        </el-tooltip>
        <div v-else class="add-button-content">
          <el-icon><Plus /></el-icon>
          <span>Добавить</span>
        </div>
      </el-button>
    </div>
    <el-row class="accounts-form-labels" :gutter="12">
      <el-col :span="6">
        <span>Метки</span>
        <el-tooltip placement="top" :content="UI_MESSAGES.LABEL_HINT">
          <el-icon class="meta-hint-icon"><QuestionFilled /></el-icon>
        </el-tooltip>
      </el-col>
      <el-col :span="5"><span>Тип записи</span></el-col>
      <el-col :span="editAccounts[0] && isLocalType(editAccounts[0]) ? 5 : 10"><span>Логин</span></el-col>
      <el-col v-if="editAccounts[0] && isLocalType(editAccounts[0])" :span="5"><span>Пароль</span></el-col>
      <el-col :span="2"></el-col>
    </el-row>
    <div>
      <el-form
        v-for="(account, idx) in editAccounts"
        :key="idx"
        label-position="top"
        class="accounts-form-row-form"
        :class="{ 'has-error': account.errors.login || account.errors.password }"
      >
        <el-row :gutter="12" class="accounts-form-row">
          <el-col :span="6">
            <el-form-item>
              <el-input
                v-model="account.label"
                :maxlength="ACCOUNT_LIMITS.MAX_LABEL_LENGTH"
                placeholder="Название метки"
                @blur="handleBlurOrChange(account, idx)"
              />
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item>
              <el-select v-model="account.type" placeholder="Type" @change="handleBlurOrChange(account, idx)">
                <el-option v-for="type in ACCOUNT_TYPES" :key="type.value" :label="type.label" :value="type.value" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="isLocalType(account) ? 5 : 10">
            <el-form-item :error="account.errors.login || ''" required>
              <el-input
                v-model="account.login"
                :maxlength="ACCOUNT_LIMITS.MAX_LOGIN_LENGTH"
                placeholder="Значение"
                @blur="handleBlurOrChange(account, idx)"
              />
            </el-form-item>
          </el-col>
          <el-col v-if="isLocalType(account)" :span="5">
            <el-form-item :error="account.errors.password || ''" required>
              <el-input
                v-model="account.password"
                type="password"
                show-password
                :maxlength="ACCOUNT_LIMITS.MAX_PASSWORD_LENGTH"
                placeholder="Пароль"
                @blur="handleBlurOrChange(account, idx)"
              />
            </el-form-item>
          </el-col>
          <el-col :span="2" class="accounts-form-delete-col">
            <el-form-item>
              <el-button @click="removeAccount(idx)">
                <el-icon><Delete /></el-icon>
              </el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.main-container {
  min-width: 700px;
}

.accounts-form-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.accounts-form-hint {
  margin-bottom: 16px;
}

.accounts-form-row {
  margin-bottom: 12px;
  align-items: flex-end;
  transition: margin-bottom 0.3s ease;

  .el-col {
    max-height: 60px;
  }
}

.accounts-form-row.has-error {
  margin-bottom: 34px;
}

.accounts-form-row-form {
  transition: margin-bottom 0.3s ease;
}

.accounts-form-row-form.has-error {
  margin-bottom: 26px;
}

.accounts-form-delete-col {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.accounts-form-delete-col .el-button {
  width: 30px;
  height: 30px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.accounts-form-add-btn {
  display: flex;
  align-items: center;
  gap: 8px;
}

.add-button-content {
  display: flex;
  align-items: center;
  gap: 8px;
}

.accounts-form-item-placeholder {
  min-height: 32px;
}

.meta-hint {
  font-size: 12px;
  color: #888;
  margin-top: 2px;
}

.meta-form-item {
  display: flex;
  align-items: center;
  gap: 6px;
}

.meta-hint-icon {
  color: #909399;
  font-size: 18px;
  cursor: pointer;
  margin-left: 10px;
}

.marks-label {
  
}

.meta-input-row {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 6px;
}

.accounts-form-labels .el-col {
  display: flex;
  flex-direction: row;
  align-items: center;
}
</style> 