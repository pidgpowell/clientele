<script setup>
  const { show } = defineProps(["show"]);

  const getDomainFromUrl = (url) => {
    const urlObj = new URL(url);
    const parts = urlObj.hostname.split(".");
    const domain = parts.length > 1 ? parts.slice(-2).join(".") : parts[0];
    return domain;
  };

  const hasSecondTicketVendor = computed(() => show["ticket-url2"]);
</script>

<template>
  <p class="text-sm m-0 p-0 not-prose">
    <span
      v-if="hasSecondTicketVendor"
      class="block mt-1 whitespace-nowrap sm:mt-0"
      >Buy Tickets:
    </span>
    <a
      v-if="show['ticket-url']"
      class="block mt-0 mr-1 underline sm:inline-block"
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
      class="block underline sm:inline-block"
      :href="show['ticket-url2']"
      rel="noopener noreferrer"
    >
      {{ getDomainFromUrl(show["ticket-url2"]) }}
    </a>
  </p>
</template>
