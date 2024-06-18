<script setup>
  const { show } = defineProps(["show"]);

  const getDomainFromUrl = (url) => {
    if (!url) return "";
    const urlObj = new URL(url);
    const parts = urlObj.hostname.split(".");
    const domain = parts.length > 1 ? parts.slice(-2).join(".") : parts[0];
    return domain;
  };

  const hasSecondTicketVendor = computed(() => show["ticket-url2"]);
</script>

<template>
  <p class="text-sm not-prose mt-2 sm:mt-1">
    <span
      v-if="hasSecondTicketVendor"
      class="block mt-1 whitespace-nowrap sm:mt-0"
      >Buy Tickets:
    </span>
    <div class="flex gap-2">
      <a
        v-if="show['ticket-url']"
        class="block mt-0 pt-0.5 pb-1 px-2 border-gray-400 rounded-sm border sm:p-0 sm:border-none underline sm:inline-block"
        :href="show['ticket-url']"
        rel="noopener noreferrer"
      >
        <template v-if="!hasSecondTicketVendor">Buy Tickets</template>
        <template v-if="hasSecondTicketVendor">{{
          getDomainFromUrl(show["ticket-url"])
        }}</template>
      </a>
      <a
        v-if="hasSecondTicketVendor"
        class="block underline pt-0.5 pb-1 px-2 border-gray-400 rounded-sm border sm:p-0 sm:border-none sm:inline-block"
        :href="show['ticket-url2']"
        rel="noopener noreferrer"
      >
        {{ getDomainFromUrl(show["ticket-url2"]) }}
      </a>
    </div>
  </p>
</template>
