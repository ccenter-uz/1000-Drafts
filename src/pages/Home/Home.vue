<style src="./style.scss" lang="scss" />
<script setup>
import Magnify from "vue-material-design-icons/Magnify.vue";
import Plus from "vue-material-design-icons/Plus.vue";
import { ref } from "vue";
import { useRouter } from "vue-router";
import Dialog from "../../shared/ui/Dialog/Dialog.vue";
// CONSTANTS
const router = useRouter();
const page = ref(1);
const dialog = ref(false);
// METHODS
const handlePageChange = (e) => {
  page.value = e;
  router.push(`?page=${e}`);
};
// DATAS
const columns = [
  {
    title: "№",
    key: "id",
  },
  {
    title: "ФИО",
    key: "name",
  },
  {
    title: "Пинфл",
    key: "pinfl",
  },
  {
    title: "Примечание",
    key: "note",
  },
  {
    title: "Создано",
    key: "created",
  },
  {
    title: "Действия",
    key: "actions",
  },
];

const rows = [
  {
    id: 1,
    name: "Фазилова Анастасия Александровна",
    pinfl: "123456789012",
    note: "Примечание ",
    created: "21.05.2024, Абдуллаева Робия Уласенова",
  },
  {
    id: 2,
    name: "Фазилова Анастасия Александровна",
    pinfl: "123456789012",
    note: "Примечание ",
    created: "21.05.2024, Абдуллаева Робия Уласенова",
  },
  {
    id: 3,
    name: "Фазилова Анастасия Александровна",
    pinfl: "123456789012",
    note: "Примечание ",
    created: "21.05.2024, Абдуллаева Робия Уласенова",
  },
];
</script>

<template>
  <section class="home">
    <div
      class="title_part h-25"
      style="
        width: fit-content;
        border-radius: 4px;
        background-color: grey;
        padding: 8px 16px;
        color: #fff;
      "
    >
      <h1>Главная</h1>
    </div>
    <div class="create_part w-100 my-3 d-flex justify-end">
      <v-btn
        color="info"
        :prepend-icon="Plus"
        class="d-flex align-center justify-center"
        >Создать</v-btn
      >
    </div>
    <div class="search_part w-100 my-3">
      <v-text-field
        label="Поиск"
        aria-label="Поиск"
        variant="outlined"
        clearable
        :append-inner-icon="Magnify"
        density="compact"
        color="info"
      />
    </div>

    <div class="table_part">
      <v-table>
        <thead>
          <tr>
            <th v-for="column in columns" class="text-left">
              {{ column.title }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in rows">
            <td v-for="{ key } in columns" class="text-left">
              <v-tooltip
                v-if="key === 'note'"
                :text="row['note']"
                activator="parent"
                location="bottom"
              >
              </v-tooltip>
              {{ row[key] }}
              <v-btn
                v-if="key == 'actions'"
                color="warning"
                class="d-flex align-center justify-center"
              >
                Завершить
              </v-btn>
            </td>
          </tr>
        </tbody>
      </v-table>
      <!-- PAGINATION -->
      <div class="w-100 d-flex justify-end my-3">
        <v-pagination
          :length="6"
          v-model="page"
          density="comfortable"
          @update:model-value="handlePageChange"
        />
      </div>
    </div>
    <!-- DIALOG -->
    <Dialog :dialog="dialog" />
  </section>
</template>
