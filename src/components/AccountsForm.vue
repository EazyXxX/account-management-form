<script setup lang="ts">
import { ref } from 'vue'
import { Plus, Delete } from '@element-plus/icons-vue'

const accounts = ref([
  { label: '', type: 'local', login: '', password: '' },
])

const accountTypes = [
  { label: 'Локальная', value: 'local' },
  { label: 'LDAP', value: 'ldap' },
]

const rules = {
  login: [
    { required: true, message: 'Логин обязателен', trigger: 'blur' },
    { min: 1, max: 100, message: 'Максимум 100 символов', trigger: 'blur' },
  ],
  password: [
    { required: true, message: 'Пароль обязателен', trigger: 'blur' },
    { min: 1, max: 100, message: 'Максимум 100 символов', trigger: 'blur' },
  ],
}

interface Account {
  label: string;
  type: string;
  login: string;
  password: string;
}

const isLocalType = (account: Account) => account.type === 'local'

const addAccount = () => {
  if (accounts.value.length < 10) {
    accounts.value.push({ label: '', type: 'local', login: '', password: '' })
  }
}

const removeAccount = (idx: number) => {
  accounts.value.splice(idx, 1)
}
</script>

<template>
  <div class="main-container">
    <div class="accounts-form-header">
      <h2>Учётные записи</h2>
      <el-button type="primary" class="accounts-form-add-btn" @click="addAccount" :disabled="accounts.length >= 10">
        <el-icon><Plus /></el-icon>
        <span>Добавить</span>
      </el-button>
    </div>
    <el-form label-position="top">
      <el-row class="accounts-form-labels" gutter="12">
        <el-col :span="6">Метки</el-col>
        <el-col :span="5">Тип записи</el-col>
        <el-col :span="5">Логин</el-col>
        <el-col :span="5">Пароль</el-col>
        <el-col :span="2"></el-col>
      </el-row>
      <el-row v-for="(account, idx) in accounts" :key="idx" :gutter="12" class="accounts-form-row">
        <el-col :span="6">
          <el-form-item>
            <el-input v-model="account.label" maxlength="50" placeholder="Название метки" />
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item>
            <el-select v-model="account.type" placeholder="Type">
              <el-option v-for="type in accountTypes" :key="type.value" :label="type.label" :value="type.value" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="isLocalType(account) ? 5 : 10">
          <el-form-item :prop="`accounts.${idx}.login`" :rules="rules.login" required>
            <el-input v-model="account.login" maxlength="100" placeholder="Значение" />
          </el-form-item>
        </el-col>
        <el-col v-if="isLocalType(account)" :span="5">
          <el-form-item :prop="`accounts.${idx}.password`" :rules="rules.password" required>
            <el-input v-model="account.password" type="password" show-password maxlength="100" placeholder="Пароль" />
          </el-form-item>
        </el-col>
        <el-col :span="2" class="accounts-form-delete-col">
            <el-button @click="removeAccount(idx)">
              <el-icon><Delete /></el-icon>
            </el-button>
        </el-col>
      </el-row>
    </el-form>
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
  align-items: center;

  .el-col {
    max-height: 60px;
  }
}

.accounts-form-delete-col {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  margin-bottom: 19px;
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

.accounts-form-item-placeholder {
  min-height: 32px;
}
</style> 