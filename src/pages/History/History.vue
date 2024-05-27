<style src="./style.scss" lang="scss" />
<script setup>
import Magnify from "vue-material-design-icons/Magnify.vue";
import { ref, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { RETURN, GET } from "./api";
import Swal from "sweetalert2";
import { mdiSync } from "@mdi/js";

// CONSTANTS
const router = useRouter();
const route = useRoute();
let page = ref(Number(route.query.page) || 1);
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

const handleBack = async (e) => {
  const body = {
    id: e.id,
  };
  const res = await RETURN(body);
  res &&
    (Swal.fire({ title: "Успех", text: "Запись вернулась", icon: "success" }),
    await handleGet());
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
    console.error("Clipboard API not supported");
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
  <section class="history">
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
      <h1>История</h1>
    </div>

    <!-- SEARCH-PART -->
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
              <v-icon
                v-if="key == 'actions'"
                :icon="mdiSync"
                @click="handleBack(row)"
              />
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
  </section>
</template>
