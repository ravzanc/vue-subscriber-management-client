import { defineStore } from "pinia";
import api from "@/utils/api";
import { extractHubURL } from "@/utils/mercure";
import type { Field } from "@/types/field";
import type { UpdateState } from "@/types/stores";
import type { SubmissionErrors } from "@/types/error";
import { SubmissionError } from "@/utils/error";

interface State extends UpdateState<Field> {}

export const useFieldUpdateStore = defineStore("fieldUpdate", {
  state: (): State => ({
    updated: undefined,
    retrieved: undefined,
    isLoading: false,
    error: undefined,
    hubUrl: undefined,
    violations: undefined,
  }),

  actions: {
    async retrieve(id: string) {
      this.setError("");
      this.toggleLoading();

      try {
        const response = await api(id);
        const data: Field = await response.json();
        const hubUrl = extractHubURL(response);

        this.toggleLoading();
        this.setRetrieved(data);

        if (hubUrl) {
          this.setHubUrl(hubUrl);
        }
      } catch (error) {
        this.toggleLoading();

        if (error instanceof Error) {
          this.setError(error.message);
        }
      }
    },

    async update(payload: Field) {
      this.setError("");
      this.toggleLoading();

      if (!this.retrieved?.["@id"]) {
        this.setError("No field found. Please reload");
        return;
      }

      try {
        const response = await api(this.retrieved["@id"], {
          method: "PATCH",
          headers: new Headers({ "Content-Type": "application/merge-patch+json" }),
          body: JSON.stringify(payload),
        });
        const data: Field = await response.json();

        this.toggleLoading();
        this.setUpdated(data);
      } catch (error) {
        this.toggleLoading();

        if (error instanceof SubmissionError) {
          this.setViolations(error.errors);
          this.setError(error.errors._error);
          return;
        }

        if (error instanceof Error) {
          this.setError(error.message);
        }
      }
    },

    setRetrieved(retrieved: Field) {
      this.retrieved = retrieved;
    },

    setUpdated(updated: Field) {
      this.updated = updated;
    },

    setHubUrl(hubUrl: URL) {
      this.hubUrl = hubUrl;
    },

    toggleLoading() {
      this.isLoading = !this.isLoading;
    },

    setError(error: string) {
      this.error = error;
    },

    setViolations(violations: SubmissionErrors) {
      this.violations = violations;
    },
  },
});
