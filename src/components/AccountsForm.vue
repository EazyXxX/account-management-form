<script setup lang="ts">
import { ref } from 'vue'
import { Plus, Delete } from '@element-plus/icons-vue'

const accounts = ref([
  { label: '', type: 'local', login: '', password: '' },
])

const accountTypes = [
  { label: 'Local', value: 'local' },
  { label: 'LDAP', value: 'ldap' },
]
</script>

<template>
  <div>
    <div class="accounts-form-header">
      <h2>Учётные записи</h2>
      <el-button type="primary" class="accounts-form-add-btn">
        <el-icon><Plus /></el-icon>
        <span>Add</span>
      </el-button>
    </div>
    <el-form label-position="top">
      <el-row v-for="(account, idx) in accounts" :key="idx" :gutter="12" class="accounts-form-row">
        <el-col :span="6">
          <el-form-item label="Метки">
            <el-input v-model="account.label" maxlength="50" placeholder="Label(s)" />
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="Тип записи">
            <el-select v-model="account.type" placeholder="Type">
              <el-option v-for="type in accountTypes" :key="type.value" :label="type.label" :value="type.value" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="Логин">
            <el-input v-model="account.login" placeholder="Login" />
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="Пароль">
            <el-input v-model="account.password" type="password" show-password placeholder="Password" />
          </el-form-item>
        </el-col>
        <el-col :span="2" class="accounts-form-delete-col">
          <el-button>
            <el-icon><Delete /></el-icon>
          </el-button>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<style lang="scss" scoped>
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

  .el-col {
    max-height: 60px;
  }
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
</style> 