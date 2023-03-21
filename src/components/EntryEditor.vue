<script lang="ts" setup>
import { ref, computed, onMounted } from "vue";
import EmojiField from "@/components/EmojiField.vue";
import ArrowCircleRight from "@/assets/icons/arrow-circle-right.svg?component";
import type Emoji from "@/types/Emoji";
import type Entry from "@/types/Entry";

// Data
const text = ref<string>("");
const emoji = ref<Emoji | null>(null);
const charCount = computed<number>(() => text.value.length);
const maxChar = ref<number>(280);
const journalTextArea = ref<HTMLTextAreaElement | null>(null);

// Mounted
onMounted(() => {
  journalTextArea.value?.focus();
});

// Events
const emit = defineEmits<{
  (e: "@create", entry: Entry): void;
}>();

// Methods
const handleTextInput = (evt: Event): void => {
  const textArea = evt.target as HTMLTextAreaElement;
  const textAreaValue = textArea.value;
  const _maxChar = maxChar.value;

  if (textAreaValue.length <= _maxChar) {
    text.value = textAreaValue;
  } else {
    text.value = textArea.value = textAreaValue.substring(0, _maxChar);
  }
};

const handleSubmitJournal = (): void => {
  emit("@create", {
    body: text.value,
    emoji: emoji.value,
    userId: 1,
    id: Math.random(),
    createdAt: new Date(),
  });

  text.value = "";
  emoji.value = null;
};
</script>

<template>
  <form class="entry-form" @submit.prevent="handleSubmitJournal">
    <textarea
      ref="journalTextArea"
      :value="text"
      placeholder="New Journal Entry for anapluss_codes"
      @keyup="handleTextInput"
    ></textarea>

    <EmojiField v-model="emoji" />

    <div class="entry-form-footer">
      <span>{{ charCount }} / {{ maxChar }}</span>
      <button>Remember <ArrowCircleRight width="20" /></button>
    </div>
  </form>
</template>
