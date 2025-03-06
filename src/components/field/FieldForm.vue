<template>
  <form class="py-4" @submit.prevent="emitSubmit">
    <div class="mb-2">
      <label
        for="field_title"
        class="text-gray-700 block text-sm font-bold capitalize"
      >
        title
      </label>
      <input
        id="field_title"
        v-model="item.title"
        :class="[
          'mt-1 w-full px-3 py-2 border rounded',
          violations?.title ? 'border-red-500' : 'border-gray-300',
        ]"
        type="text"
        placeholder=""
      />
      <div
        v-if="violations?.title"
        class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm"
      >
        {{ violations.title }}
      </div>
    </div>
    <div class="mb-2">
      <label
        for="field_type"
        class="text-gray-700 block text-sm font-bold capitalize"
      >
        type
      </label>
      <select
        id="field_type"
        v-model="item.type"
        :class="[
          'mt-1 w-full px-3 py-2 border rounded',
          violations?.type ? 'border-red-500' : 'border-gray-300',
        ]"
      >
        <option value="date">date</option>
        <option value="number">number</option>
        <option value="string">string</option>
        <option value="boolean">boolean</option>
      </select>
      <div
        v-if="violations?.type"
        class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm"
      >
        {{ violations.type }}
      </div>
    </div>
    <div class="mb-2">
      <label
        for="field_createdAt"
        class="text-gray-700 block text-sm font-bold capitalize"
      >
        createdAt
      </label>
      <input
        id="field_createdAt"
        v-model="item.createdAt"
        :class="[
          'mt-1 w-full px-3 py-2 border rounded',
          violations?.createdAt ? 'border-red-500' : 'border-gray-300',
        ]"
        type="text"
        placeholder=""
      />
      <div
        v-if="violations?.createdAt"
        class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm"
      >
        {{ violations.createdAt }}
      </div>
    </div>
    <div class="mb-2">
      <label
        for="field_updatedAt"
        class="text-gray-700 block text-sm font-bold capitalize"
      >
        updatedAt
      </label>
      <input
        id="field_updatedAt"
        v-model="item.updatedAt"
        :class="[
          'mt-1 w-full px-3 py-2 border rounded',
          violations?.updatedAt ? 'border-red-500' : 'border-gray-300',
        ]"
        type="text"
        placeholder=""
      />
      <div
        v-if="violations?.updatedAt"
        class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm"
      >
        {{ violations.updatedAt }}
      </div>
    </div>
    <div class="mb-2">
      <label
        for="field_fieldValues"
        class="text-gray-700 block text-sm font-bold capitalize"
      >
        fieldValues
      </label>
      <FormRepeater
        :values="item.fieldValues"
        @update="(values: any[]) => (item.fieldValues = values)"
      />
      <div
        v-if="violations?.fieldValues"
        class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm"
      >
        {{ violations.fieldValues }}
      </div>
    </div>
    <div class="mb-2">
      <label
        for="field_id"
        class="text-gray-700 block text-sm font-bold capitalize"
      >
        id
      </label>
      <input
        id="field_id"
        v-model="item.id"
        :class="[
          'mt-1 w-full px-3 py-2 border rounded',
          violations?.id ? 'border-red-500' : 'border-gray-300',
        ]"
        type="text"
        placeholder=""
      />
      <div
        v-if="violations?.id"
        class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm"
      >
        {{ violations.id }}
      </div>
    </div>

    <button
      type="submit"
      class="px-6 py-2 bg-green-500 text-white font-medium rounded shadow-md hover:bg-green-600"
    >
      Submit
    </button>
  </form>
</template>

<script lang="ts" setup>
import { toRef, ref, type Ref } from "vue";
import FormRepeater from "@/components/common/FormRepeater.vue";
import { formatDateInput } from "@/utils/date";
import type { Field } from "@/types/field";
import type { SubmissionErrors } from "@/types/error";

const props = defineProps<{
  values?: Field;
  errors?: SubmissionErrors;
}>();

const emit = defineEmits<{
  (e: "submit", item: Field): void;
}>();

const violations = toRef(props, "errors");

let item: Ref<Field> = ref({});

if (props.values) {
  item.value = {
    ...props.values,
    publicationDate: formatDateInput(props.values.publicationDate),
    publicationDate: formatDateInput(props.values.publicationDate),
  };
}

function emitSubmit() {
  emit("submit", item.value);
}
</script>
