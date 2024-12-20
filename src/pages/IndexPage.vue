<template>
  <q-page class="row q-pt-xl">
    <div class="full-width q-px-xl">
      <div class="q-mb-xl">
        <q-input
          v-model="tempData.name"
          label="姓名"
          error-message="Name is Required"
          :error="!nameIsValid"
        />
        <q-input
          v-model="tempData.age"
          label="年齡"
          :error-message="ageErrMsg"
          :error="!ageIsValid"
        />
        <q-btn
          v-if="isEditMode"
          color="primary"
          class="q-mt-md"
          @click="editUser"
          :disabled="!nameIsValid || !ageIsValid"
        >
          修改
        </q-btn>
        <q-btn
          v-else
          color="primary"
          class="q-mt-md"
          @click="addUser"
          :disabled="!nameIsValid || !ageIsValid"
        >
          新增
        </q-btn>
      </div>

      <q-table
        flat
        bordered
        ref="tableRef"
        :rows="blockData"
        :columns="(tableConfig as QTableProps['columns'])"
        row-key="id"
        hide-pagination
        separator="cell"
        :rows-per-page-options="[0]"
      >
        <template v-slot:header="props">
          <q-tr :props="props">
            <q-th v-for="col in props.cols" :key="col.name" :props="props">
              {{ col.label }}
            </q-th>
            <q-th></q-th>
          </q-tr>
        </template>

        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td
              v-for="col in props.cols"
              :key="col.name"
              :props="props"
              style="min-width: 120px"
            >
              <div>{{ col.value }}</div>
            </q-td>
            <q-td class="text-right" auto-width v-if="tableButtons.length > 0">
              <q-btn
                @click="handleClickOption(btn, props.row)"
                v-for="(btn, index) in tableButtons"
                :key="index"
                size="sm"
                color="grey-6"
                round
                dense
                :icon="btn.icon"
                class="q-ml-md"
                padding="5px 5px"
              >
                <q-tooltip
                  transition-show="scale"
                  transition-hide="scale"
                  anchor="top middle"
                  self="bottom middle"
                  :offset="[10, 10]"
                >
                  {{ btn.label }}
                </q-tooltip>
              </q-btn>
            </q-td>
          </q-tr>
        </template>
        <template v-slot:no-data="{ icon }">
          <div
            class="full-width row flex-center items-center text-primary q-gutter-sm"
            style="font-size: 18px"
          >
            <q-icon size="2em" :name="icon" />
            <span> 無相關資料 </span>
          </div>
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { QTableProps } from 'quasar';
import { computed, onMounted, ref } from 'vue';
import apiUser from '../api/user';

interface btnType {
  label: string;
  icon: string;
  status: string;
}

const isEditMode = ref(false);
const blockData = ref([
  {
    name: 'test',
    age: 25,
  },
]);
const tableConfig = ref([
  {
    label: '姓名',
    name: 'name',
    field: 'name',
    align: 'left',
  },
  {
    label: '年齡',
    name: 'age',
    field: 'age',
    align: 'left',
  },
]);
const tableButtons = ref([
  {
    label: '編輯',
    icon: 'edit',
    status: 'edit',
  },
  {
    label: '刪除',
    icon: 'delete',
    status: 'delete',
  },
]);

const tempData = ref({
  name: '',
  age: '',
});

onMounted(() => {
  apiUser.getAll().then((res) => (blockData.value = res));
});

const nameIsValid = computed(() => !!tempData.value.name);
const ageIsValid = computed(() => {
  if (!tempData.value.age) return false;
  try {
    return parseInt(tempData.value.age) > 0;
  } catch (e) {
    return false;
  }
});

const ageErrMsg = computed(() => {
  if (!tempData.value.age) return 'Age is Required';
  try {
    const age = parseInt(tempData.value.age);
    if (isNaN(age)) return 'Age must be a number';
    else if (parseInt(tempData.value.age) > 0) return '';
    else return 'Age must be greater than 0';
  } catch (e) {
    return 'Age must be a number';
  }
});

function editUser() {
  if (!nameIsValid.value || !ageIsValid.value) return;

  apiUser
    .update({
      id: tempData.value.id,
      name: tempData.value.name,
      age: parseInt(tempData.value.age),
    })
    .then(() => {
      isEditMode.value = false;
      tempData.value = { name: '', age: '' };
      apiUser.getAll().then((res) => (blockData.value = res));
    });
}

function addUser() {
  if (!nameIsValid.value || !ageIsValid.value) return;

  apiUser
    .create({
      name: tempData.value.name,
      age: parseInt(tempData.value.age),
    })
    .then(() => {
      tempData.value = { name: '', age: '' };
      apiUser.getAll().then((res) => (blockData.value = res));
    });
}

function handleClickOption(btn: btnType, data) {
  // ...

  if (btn.status === 'edit') {
    isEditMode.value = true;
    tempData.value = { ...data };
  }

  if (btn.status === 'delete') {
    apiUser.delete(data.id).then(() => {
      apiUser.getAll().then((res) => (blockData.value = res));
    });
  }
}
</script>

<style lang="scss" scoped>
.q-table th {
  font-size: 20px;
  font-weight: bold;
}

.q-table tbody td {
  font-size: 18px;
}
</style>
