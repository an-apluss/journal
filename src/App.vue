<script setup lang="ts">
// import { reactive, type InjectionKey } from "vue";
import { reactive } from "vue";
import TheHeader from "@/components/TheHeader.vue";
import EntryEditor from "./components/EntryEditor.vue";
import EntryCard from "@/components/EntryCard.vue";
import type Entry from "./types/Entry";
// import type User from "./types/User";

const entries: Entry[] = reactive([]);
// const user: User = reactive({
//   id: 1,
//   username: "anapluss_codes",
//   settings: [],
// });
// const userInjectionKey = Symbol() as InjectionKey<User>;

// provide(userInjectionKey, user);

const handleCreateJournal = (entry: Entry) => {
  if (
    Object.keys(entry).length < 1 ||
    entry.body === "" ||
    entry.emoji === null
  ) {
    return;
  }

  entries.push(entry);
};
</script>

<template>
  <main class="container m-auto p-10">
    <TheHeader />
    <EntryEditor @@create="handleCreateJournal" />
    <ul>
      <li v-for="(entry, index) in entries" :key="index">
        <EntryCard :entry="entry" />
      </li>
    </ul>
  </main>
</template>
