import { defineStore } from "pinia";
import api from "@/utils/api";
import type { Subscriber } from "@/types/subscriber";
import type { DeleteState } from "@/types/stores";

interface State extends DeleteState<Subscriber> {}

export const useSubscriberDeleteStore = defineStore("subscriberDelete", {
  state: (): State => ({
    deleted: undefined,
    mercureDeleted: undefined,
    isLoading: false,
    error: undefined,
  }),

  actions: {
    async deleteItem(item: Subscriber) {
      this.setError("");
      this.toggleLoading();

      if (!item?.["@id"]) {
        this.setError("No subscriber found. Please reload");
        return;
      }

      try {
        await api(item["@id"], { method: "DELETE" });

        this.toggleLoading();
        this.setDeleted(item);
        this.setMercureDeleted(undefined);
      } catch (error) {
        this.toggleLoading();

        if (error instanceof Error) {
          this.setError(error.message);
        }
      }
    },

    toggleLoading() {
      this.isLoading = !this.isLoading;
    },

    setDeleted(deleted: Subscriber) {
      this.deleted = deleted;
    },

    setMercureDeleted(mercureDeleted: Subscriber | undefined) {
      this.mercureDeleted = mercureDeleted;
    },

    setError(error: string) {
      this.error = error;
    },
  },
});
