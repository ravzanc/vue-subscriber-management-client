<template>
  <div class="container mx-auto px-4 max-w-2xl mt-4">
    <div class="flex items-center justify-between">
      <router-link
        :to="{ name: 'SubscriberList' }"
        class="text-blue-600 hover:text-blue-800"
      >
        &lt; Back to list
      </router-link>

      <div>
        <router-link
          v-if="item"
          :to="{ name: 'SubscriberUpdate', params: { id: item['@id'] } }"
          class="px-6 py-2 mr-2 bg-green-600 text-white text-xs rounded shadow-md hover:bg-green-700"
        >
          Edit
        </router-link>
        <button
          class="px-6 py-2 bg-red-600 text-white text-xs rounded shadow-md hover:bg-red-700"
          @click="deleteItem"
        >
          Delete
        </button>
      </div>
    </div>

    <h1 class="text-3xl my-4">Show Subscriber {{ item?.["@id"] }}</h1>

    <div
      v-if="isLoading"
      class="bg-blue-100 rounded py-4 px-4 text-blue-700 text-sm"
      role="status"
    >
      Loading...
    </div>

    <div
      v-if="error || deleteError"
      class="bg-red-100 rounded py-4 px-4 my-2 text-red-700 text-sm"
      role="alert"
    >
      {{ error || deleteError }}
    </div>

    <div v-if="item" class="overflow-x-auto">
      <table class="min-w-full">
        <thead class="border-b">
          <tr>
            <th scope="col" class="text-sm font-medium px-6 py-4 text-left">
              Field
            </th>
            <th scope="col" class="text-sm font-medium px-6 py-4 text-left">
              Value
            </th>
          </tr>
        </thead>
        <tbody>
          <tr class="border-b">
            <th
              class="text-sm font-medium px-6 py-4 text-left capitalize"
              scope="row"
            >
              email
            </th>
            <td class="px-6 py-4 whitespace-nowrap text-sm">
            {{ item.email }}
                        </td>
          </tr>
          <tr class="border-b">
            <th
              class="text-sm font-medium px-6 py-4 text-left capitalize"
              scope="row"
            >
              name
            </th>
            <td class="px-6 py-4 whitespace-nowrap text-sm">
            {{ item.name }}
                        </td>
          </tr>
          <tr class="border-b">
            <th
              class="text-sm font-medium px-6 py-4 text-left capitalize"
              scope="row"
            >
              state
            </th>
            <td class="px-6 py-4 whitespace-nowrap text-sm">
            {{ item.state }}
                        </td>
          </tr>
          <tr class="border-b">
            <th
              class="text-sm font-medium px-6 py-4 text-left capitalize"
              scope="row"
            >
              createdAt
            </th>
            <td class="px-6 py-4 whitespace-nowrap text-sm">
            {{ formatDateTime(item.createdAt) }}
            </td>
          </tr>
          <tr class="border-b">
            <th
              class="text-sm font-medium px-6 py-4 text-left capitalize"
              scope="row"
            >
              updatedAt
            </th>
            <td class="px-6 py-4 whitespace-nowrap text-sm">
            {{ formatDateTime(item.updatedAt) }}
            </td>
          </tr>
          <tr class="border-b">
            <th
              class="text-sm font-medium px-6 py-4 text-left capitalize"
              scope="row"
            >
              fieldValues
            </th>
            <td class="px-6 py-4 whitespace-nowrap text-sm">
            <template v-if="router.hasRoute('FieldValueShow')">
              <router-link
                v-for="fieldvalue in item.field_values"
                :to="{ name: 'FieldValueShow', params: { id: fieldvalue } }"
                :key="fieldvalue"
                class="text-blue-600 hover:text-blue-800"
              >
                {{ fieldvalue }}

                <br />
              </router-link>
            </template>

            <template v-else>
              <p
                v-for="fieldvalue in item.field_values"
                :key="fieldvalue"
              >
                {{ fieldvalue }}
              </p>
            </template>
            </td>
          </tr>
          <tr class="border-b">
            <th
              class="text-sm font-medium px-6 py-4 text-left capitalize"
              scope="row"
            >
              id
            </th>
            <td class="px-6 py-4 whitespace-nowrap text-sm">
            {{ item.id }}
                        </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onBeforeUnmount } from "vue";
import { useRoute, useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { useSubscriberShowStore } from "@/stores/subscriber/show";
import { useSubscriberDeleteStore } from "@/stores/subscriber/delete";
import { formatDateTime } from "@/utils/date";
import { useMercureItem } from "@/composables/mercureItem";

const route = useRoute();
const router = useRouter();

const subscriberDeleteStore = useSubscriberDeleteStore();
const { error: deleteError, deleted } = storeToRefs(subscriberDeleteStore);

const subscriberShowStore = useSubscriberShowStore();
const { retrieved: item, isLoading, error } = storeToRefs(subscriberShowStore);

useMercureItem({
  store: subscriberShowStore,
  deleteStore: subscriberDeleteStore,
  redirectRouteName: "SubscriberList",
});

await subscriberShowStore.retrieve(decodeURIComponent(route.params.id as string));

async function deleteItem() {
  if (!item?.value) {
    subscriberDeleteStore.setError("This item does not exist anymore");
    return;
  }

  if (window.confirm("Are you sure you want to delete this subscriber?")) {
    await subscriberDeleteStore.deleteItem(item.value);

    if (deleted) {
      router.push({ name: "SubscriberList" });
    }
  }
}

onBeforeUnmount(() => {
  subscriberShowStore.$reset();
});
</script>

