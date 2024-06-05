<style src="./style.scss" lang="scss" />
<script setup>
import Magnify from "vue-material-design-icons/Magnify.vue";
import Plus from "vue-material-design-icons/Plus.vue";
import { ref, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { CREATE, GET, END, UPDATE } from "./api";
import Swal from "sweetalert2";
import { mdiPen, mdiCheckBold } from "@mdi/js";

// CONSTANTS
const router = useRouter();
const route = useRoute();
let page = ref(Number(route.query.page) || 1);
let dialog = ref(false);
let endDialog = ref(false);
let record = ref(null);
let search = ref(route.query.search || "");
const pageSizes = ["10", "20", "50", "100"];
const pageSize = ref(route.query.pageSize || 10);
const totalPage = ref(0);
const rows = ref([]);

// METHODS
const handleGet = async () => {
  const res = await GET(
    route.query.search,
    route.query.page,
    route.query.pageSize
  );
  totalPage.value = res.total;
  rows.value = res.search;
};

onMounted(async () => {
  await handleGet();
});

watch(
  () => ({
    search: route.query.search,
    page: route.query.page,
    pageSize: route.query.pageSize,
  }),
  async () => {
    await handleGet();
  }
);

const handlePageSizeChange = async (e) => {
  pageSize.value = e;
  router.push({
    query: {
      search: route.query.search,
      page: route.query.page,
      pageSize: e,
    },
  });
};
const handlePageChange = async (e) => {
  page.value = e;
  router.push({
    query: {
      search: route.query.search,
      page: e,
      pageSize: route.query.pageSize,
    },
  });
};
const handleSubmit = async (e) => {
  if (record.value !== null) {
    const formData = new FormData(e.currentTarget);
    const body = {
      name: formData.get("fio"),
      phone: formData.get("phone"),
      pinfl: formData.get("pinfl"),
      note: formData.get("note"),
      created_by: formData.get("created_by"),
    };
    if (body.name && body.phone && body.pinfl && body.created_by && body.note) {
      const res = await UPDATE(body, record.value.id);
      res &&
        ((dialog.value = false),
        Swal.fire({ title: "Успех", text: "Запись изменено", icon: "success" }),
        handleGet());
    } else {
      console.log("Fill all fields");
    }
  } else {
    const formData = new FormData(e.currentTarget);
    const body = {
      name: formData.get("fio"),
      phone: formData.get("phone"),
      pinfl: formData.get("pinfl"),
      note: formData.get("note"),
      created_by: formData.get("created_by"),
    };
    if (body.name && body.phone && body.pinfl && body.created_by && body.note) {
      const res = await CREATE(body);
      res &&
        ((dialog.value = false),
        Swal.fire({ title: "Успех", text: "Запись создана", icon: "success" }),
        handleGet());
    } else {
      console.log("Fill all fields");
    }
  }
};

const handleEnd = async (e) => {
  const formData = new FormData(e.currentTarget);
  const body = {
    id: record.value.id,
    end_by: formData.get("operator_number"),
  };
  if (body.end_by) {
    const res = await END(body);
    res &&
      ((endDialog.value = false),
      Swal.fire({ title: "Успех", text: "Запись завершена", icon: "success" }),
      handleGet());
  } else {
    console.log("Fill all fields");
  }
};
const copyToClipboard = async (text) => {
  if (navigator.clipboard) {
    try {
      await navigator.clipboard.writeText(text);
      alert("Text copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  } else {
    const textArea = document.createElement("textarea");
    textArea.value = text;

    textArea.style.position = "absolute";
    textArea.style.left = "-999999px";

    document.body.prepend(textArea);
    textArea.select();

    try {
      document.execCommand("copy");
    } catch (error) {
      console.error(error);
    } finally {
      textArea.remove();
    }
  }
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
    title: "Телефон",
    key: "phone",
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
    key: "created_at",
  },
  {
    title: "Оператор создал",
    key: "created_by",
  },
  {
    title: "Действия",
    key: "actions",
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
        @click="(dialog = true), (record = null)"
        >Создать</v-btn
      >
    </div>
    <div class="search_part w-100 my-3">
      <v-text-field
        @click:append-inner="
          router.push({ query: { search: search, page: 1, pageSize: 10 } }),
            (page = 1),
            (pageSize = 10)
        "
        @keydown.enter="
          router.push({ query: { search: search, page: 1, pageSize: 10 } }),
            (page = 1),
            (pageSize = 10)
        "
        label="Поиск"
        v-model="search"
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
          <tr v-if="rows && rows?.length > 0" v-for="row in rows">
            <td
              v-for="{ key } in columns"
              :class="key === 'created_by' ? 'text-center' : 'text-left'"
              @click.prevent="key === 'note' && copyToClipboard(row['note'])"
              :style="key === 'note' && 'cursor:pointer'"
            >
              <v-tooltip
                v-if="key === 'note'"
                :text="row['note']"
                activator="parent"
                location="bottom"
              >
              </v-tooltip>
              {{
                row[key] === row["note"]
                  ? row["note"]?.length > 15
                    ? row["note"].slice(0, 10) + "..."
                    : row["note"]
                  : row[key]
              }}
              <div class="d-flex align-center justify-space-evenly">
                <v-icon
                  v-if="key == 'actions'"
                  :icon="mdiPen"
                  color="orange"
                  @click="(dialog = true), (record = row)"
                />
                <v-icon
                  v-if="key == 'actions'"
                  color="green"
                  :icon="mdiCheckBold"
                  @click="(endDialog = true), (record = row)"
                />
              </div>
            </td>
          </tr>
          <tr v-else-if="rows && rows?.length == 0">
            <td class="text-center my-4" style="font-weight: 600">
              Ничего не найдено
            </td>
          </tr>
        </tbody>
      </v-table>
      <!-- PAGINATION -->
      <div class="w-100 d-flex align-center justify-end my-3">
        <p class="text mr-3">Всего записей: {{ totalPage }}</p>
        <v-select
          class="select"
          v-model="pageSize"
          :items="pageSizes"
          density="compact"
          hide-details
          variant="outlined"
          @update:model-value="handlePageSizeChange"
        />
        <v-pagination
          :length="totalPage"
          v-model="page"
          density="comfortable"
          @update:model-value="handlePageChange"
        />
      </div>
    </div>
    <!-- CREATE -->
    <v-dialog v-model="dialog" width="500">
      <v-card title="Создать" subtitle="Создание записи">
        <v-form
          @submit.prevent="handleSubmit"
          id="create-form"
          class="w-100 px-3 mt-5"
        >
          <v-text-field
            name="fio"
            :model-value="record && record.name"
            variant="outlined"
            label="Ф.И.О"
            density="compact"
            color="info"
            :rules="[(v) => !!v || 'Ф.И.О обязательное поле']"
          />
          <v-text-field
            name="phone"
            :model-value="record && record.phone"
            variant="outlined"
            label="Телефон"
            density="compact"
            color="info"
            :rules="[(v) => !!v || 'Телефон обязательное поле']"
          />
          <v-text-field
            name="pinfl"
            :model-value="record && record.pinfl"
            variant="outlined"
            label="Пинфл"
            density="compact"
            color="info"
            :rules="[(v) => !!v || 'Пинфл обязательное поле']"
          />
          <v-textarea
            :auto-grow="true"
            name="note"
            :model-value="record && record.note"
            variant="outlined"
            label="Примечание"
            density="compact"
            color="info"
            :rules="[(v) => !!v || 'Примечание обязательное поле']"
          />
          <v-text-field
            name="created_by"
            :model-value="record && record.created_by"
            variant="outlined"
            label="Номер оператора"
            density="compact"
            color="info"
            :rules="[(v) => !!v || 'Обязательное поле']"
          />
          <v-card-actions>
            <v-spacer />
            <v-btn color="red" @click="dialog = false">Отмена</v-btn>
            <v-btn color="info" type="submit" form="create-form"
              >Сохранить</v-btn
            >
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
    <!-- END -->
    <v-dialog v-model="endDialog" width="500">
      <v-card
        title="Завершить"
        subtitle="Чтобы завершить запись укажите номер оператора"
      >
        <v-form
          id="end-form"
          @submit.prevent="handleEnd"
          class="w-100 px-3 mt-5"
        >
          <v-text-field
            name="operator_number"
            variant="outlined"
            label="Номер оператора"
            density="compact"
            color="info"
            :rules="[(v) => !!v || 'Обязательное поле']"
          />
          <v-card-actions>
            <v-spacer />
            <v-btn color="red" @click="endDialog = false">Отмена</v-btn>
            <v-btn color="info" type="submit" form="end-form">Сохранить</v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </section>
</template>
