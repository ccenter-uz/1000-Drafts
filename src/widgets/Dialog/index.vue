<script setup>
import ContentCopy from "vue-material-design-icons/ContentCopy.vue";
import Check from "vue-material-design-icons/Check.vue";
import { ref, watch } from "vue";

const props = defineProps({
  text: String
})

let isCopied = ref(false);
</script>

<template>
  <v-dialog max-width="700" :scrollable="true" :persistent="true">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
        v-bind="activatorProps"
        variant="text"
        class="text-capitalize"
      >{{ text.split(" ").slice(0, 3).join(" ") }} ...</v-btn>
    </template>
  
    <template v-slot:default="{ isActive }">
      <v-card title="Примечание">
        <v-card-text>
          {{ text }}
        </v-card-text>
  
        <v-card-actions>
          <v-spacer></v-spacer>
  
          <v-btn
            :prepend-icon="isCopied ? Check : ContentCopy"
            :text="isCopied ? 'Скопировано' : 'Копировать'"
            :color="isCopied ? 'success' : null"
            variant="tonal"
            @click.prevent="$emit('copy-to-clipboard', text), (isCopied = true)"
          >
        </v-btn>
          <v-btn
            text="Закрыть"
            @click="(isActive.value = false), (isCopied = false)"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>