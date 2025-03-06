import { defineStore } from "pinia";
import api from "@/utils/api";
import type { Field } from "@/types/field";
import type { DeleteState } from "@/types/stores";

interface State extends DeleteState<Field> {}

export const useFieldDeleteStore = defineStore("fieldDelete", {
  state: (): State => ({
    deleted: undefined,
    mercureDeleted: undefined,
    isLoading: false,
    error: undefined,
  }),

  actions: {
    async deleteItem(item: Field) {
      this.setError("");
      this.toggleLoading();

      if (!item?.["@id"]) {
        this.setError("No field found. Please reload");
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

    setDeleted(deleted: Field) {
      this.deleted = deleted;
    },

    setMercureDeleted(mercureDeleted: Field | undefined) {
      this.mercureDeleted = mercureDeleted;
    },

    setError(error: string) {
      this.error = error;
    },
  },
});
