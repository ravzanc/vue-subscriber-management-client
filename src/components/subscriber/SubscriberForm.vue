<template>
  <form class="py-4" @submit.prevent="emitSubmit">
    <div class="mb-2">
      <label
        for="subscriber_email"
        class="text-gray-700 block text-sm font-bold capitalize"
      >
        email
      </label>
      <input
        id="subscriber_email"
        v-model="item.email"
        :class="[
          'mt-1 w-full px-3 py-2 border rounded',
          violations?.email ? 'border-red-500' : 'border-gray-300',
        ]"
        type="text"
        placeholder=""
      />
      <div
        v-if="violations?.email"
        class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm"
      >
        {{ violations.email }}
      </div>
    </div>
    <div class="mb-2">
      <label
        for="subscriber_name"
        class="text-gray-700 block text-sm font-bold capitalize"
      >
        name
      </label>
      <input
        id="subscriber_name"
        v-model="item.name"
        :class="[
          'mt-1 w-full px-3 py-2 border rounded',
          violations?.name ? 'border-red-500' : 'border-gray-300',
        ]"
        type="text"
        placeholder=""
      />
      <div
        v-if="violations?.name"
        class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm"
      >
        {{ violations.name }}
      </div>
    </div>
    <div class="mb-2">
      <label
        for="subscriber_state"
        class="text-gray-700 block text-sm font-bold capitalize"
      >
        state
      </label>
      <input
        id="subscriber_state"
        v-model="item.state"
        :class="[
          'mt-1 w-full px-3 py-2 border rounded',
          violations?.state ? 'border-red-500' : 'border-gray-300',
        ]"
        type="text"
        placeholder=""
      />
      <div
        v-if="violations?.state"
        class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm"
      >
        {{ violations.state }}
      </div>
    </div>
    <div class="mb-2">
      <label
        for="subscriber_createdAt"
        class="text-gray-700 block text-sm font-bold capitalize"
      >
        createdAt
      </label>
      <input
        id="subscriber_createdAt"
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
        for="subscriber_updatedAt"
        class="text-gray-700 block text-sm font-bold capitalize"
      >
        updatedAt
      </label>
      <input
        id="subscriber_updatedAt"
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
        for="subscriber_fieldValues"
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
        for="subscriber_id"
        class="text-gray-700 block text-sm font-bold capitalize"
      >
        id
      </label>
      <input
        id="subscriber_id"
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
import type { Subscriber } from "@/types/subscriber";
import type { SubmissionErrors } from "@/types/error";

const props = defineProps<{
  values?: Subscriber;
  errors?: SubmissionErrors;
}>();

const emit = defineEmits<{
  (e: "submit", item: Subscriber): void;
}>();

const violations = toRef(props, "errors");

let item: Ref<Subscriber> = ref({});

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
