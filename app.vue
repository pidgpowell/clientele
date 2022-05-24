<script setup>
const iconWidth = "100%";
const primaryDark = "#333";
const primaryLight = "#fff";
const primaryHover = "#000";
const formatDate = (date, options = { dateStyle: "medium" }) => {
  if (!Date.parse(date)) return;
  return Intl.DateTimeFormat("en", options).format(new Date(date));
};

const { data: home } = await useAsyncData("static", () => {
  return queryContent("/").findOne();
});

useHead({
  title: "The Clientele",
  htmlAttrs: {
    lang: "en",
  },
  meta: [
    { name: "og:title", content: `The Clientele` },
    { name: "description", content: `Official website of The Clientele` },
    { name: "og:description", content: `Official website of The Clientele` },
  ],
  link: [
    {
      rel: "preconnect",
      href: "https://fonts.googleapis.com",
    },
    {
      rel: "preconnect",
      href: "https://fonts.gstatic.com",
      crossorigin: true,
    },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Public+Sans:wght@100;700&display=swap",
    },
  ],
});
</script>

<template>
  <div class="p-4 pb-4 sm:p-16 sm:pb-4 grid gap-8 h-screen mb-2">
    <div class="flex flex-col gap-4 pr-1 sm:pr-0">
      <h1>
        <svg
          aria-labelledby="title"
          class="w-full h-auto fill-neutral-500"
          height="279"
          viewBox="0 0 1451 279"
          width="1451"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title id="title">The Clientele</title>
          <path
            d="m1194.378906 278.029297c-44.947265 0-72.292968-33.946701-72.292968-77.322266 0-45.261551 24.20227-79.207031 71.664062-79.207031 46.83313 0 68.835938 34.573776 68.835938 78.263672v4.400391h-112.210938c.314331 25.145355 17.287109 48.71875 44.318359 48.71875 21.687745 0 33.317139-10.999894 44.003907-28.601563l23.888672 13.515625c-13.830079 25.459564-39.604371 40.232422-68.207032 40.232422zm188.019532 0c-44.947266 0-72.292969-33.946701-72.292969-77.322266 0-45.261551 24.202392-79.207031 71.664062-79.207031 46.833252 0 68.833985 34.573776 68.833985 78.263672v4.400391h-112.210938c.314209 25.145355 17.28711 48.71875 44.31836 48.71875 21.687744 0 33.319091-10.999894 44.005859-28.601563l23.886719 13.515625c-13.830078 25.459564-39.602295 40.232422-68.205078 40.232422zm-315.775391-5.029297v-120.697266h-15.400391v-26.402343h15.400391v-56.263672h28.289062v56.263672h27.660157v26.402343h-27.660157v120.697266zm206.849609 0v-272.826172h28.28711v272.826172zm-121.527343-90.208984h82.351562c-3.45752-22.002167-17.916138-36.775391-40.546875-36.775391-22.002075 0-38.347168 15.716217-41.804687 36.775391zm188.019531 0h82.351562c-3.457519-22.002167-17.916015-36.775391-40.546875-36.775391-22.001953 0-38.347168 15.716217-41.804687 36.775391zm-390.953491-56.890992h-28.288453v147.099976h28.288453v-67.578003c0-26.716919 0-58.7771 36.460693-58.7771 28.917114 0 32.374512 16.973023 32.374512 42.118287v84.236816h28.288574v-87.694214c0-35.832153-10.686768-63.806274-52.176514-63.806274-17.916138 0-35.517822 8.486572-44.318603 24.202392h-.628662zm-34.918213 78.264649v-4.400391c0-43.689941-22.002076-78.26477-68.835205-78.26477-47.461792 0-71.664185 33.946167-71.664185 79.207763 0 43.375611 27.345581 77.321778 72.292725 77.321778 28.602783 0 54.376831-14.772827 68.206665-40.232422l-23.888062-13.515625c-10.686767 17.601684-22.316406 28.602783-44.004272 28.602783-27.031128 0-44.004273-23.57373-44.318604-48.719116zm-110.639283-21.373413c3.457398-21.059204 19.80188-36.775025 41.804078-36.775025 22.630737 0 37.089233 14.772828 40.546753 36.775025zm-39.233642-56.891236h-28.288452v147.099976h28.288452zm-14.144165-87.065673c-10.686768 0-19.487671 8.800903-19.487671 19.801879 0 10.686768 8.800903 19.17334 19.487671 19.17334 10.686767 0 19.487549-8.486572 19.487549-19.17334 0-11.000976-8.800782-19.801879-19.487549-19.801879zm-25.404785-38.660889h-28.288452v272.826538h28.288452zm-41.033326 46.83313c-17.916015-11.001099-38.975219-16.030152-59.720092-16.030152-69.778199 0-126.040772 54.69104-126.040772 124.78357 0 68.520996 55.948242 122.269043 123.526245 122.269043 20.744873 0 44.004273-5.972046 62.234619-16.658814v-34.889038c-17.601684 15.71582-39.91809 24.516602-63.17749 24.516602-52.805176 0-93.03772-44.318604-93.03772-96.180786 0-52.490723 40.546875-96.809327 93.66626-96.809327 22.316529 0 45.575928 8.17212 62.54895 23.2594zm-252.05371 157.158081v-4.400391c0-43.689941-22.002076-78.26477-68.835206-78.26477-47.461792 0-71.664184 33.946167-71.664184 79.207763 0 43.375611 27.345581 77.321778 72.292847 77.321778 28.602783 0 54.376709-14.772827 68.206543-40.232422l-23.88794-13.515625c-10.686768 17.601684-22.316528 28.602783-44.004272 28.602783-27.03125 0-44.004395-23.57373-44.318604-48.719116zm-110.639283-21.373413c3.45752-21.059204 19.80188-36.775025 41.804077-36.775025 22.630738 0 37.089356 14.772828 40.546753 36.775025zm-170.359436-182.617798v272.826538h28.288452v-67.578003c0-26.716919 0-58.7771 36.460694-58.7771 28.917053 0 32.374573 16.973023 32.374573 42.118287v84.236816h28.288452v-87.694214c0-35.832153-10.686768-63.806274-52.176453-63.806274-17.916077 0-35.517761 8.486572-44.318603 24.202392h-.628663v-145.528442zm-64.148498 62.863281h56.262573v-27.03125h-142.070923v27.03125h56.262573v209.963257h29.545777z"
            fill-rule="evenodd"
          />
        </svg>
      </h1>

      <div class="grid grid-cols-3 gap-2 sm:gap-4 max-w-[30%] lg:max-w-[20%] ml-auto">
        <twitter
          :width="iconWidth"
          :colorDark="primaryDark"
          :colorLight="primaryLight"
          :colorHover="primaryHover"
          url="https://twitter.com/theclientele"
        />
        <instagram
          :width="iconWidth"
          :colorDark="primaryDark"
          :colorLight="primaryLight"
          :colorHover="primaryHover"
          url="https://www.instagram.com/theclienteleband/"
        />
        <facebook
          :width="iconWidth"
          :colorDark="primaryDark"
          :colorLight="primaryLight"
          :colorHover="primaryHover"
          url="https://www.facebook.com/theclienteleofficial"
        />
      </div>

      <div
        v-if="home"
        class="-mt-6 md:-mt-12 xl:-mt-[5%] ml-[3.4vw] py-2 pl-6 md:pl-[3.7vw] border-l sm:border-l-2 border-gray-100 prose md:max-w-[59vw]"
      >
        <p class="date text-xs text-gray-500">{{ formatDate(home.date) }}</p>
        <h1 class="mt-0 mb-0">{{ home.title }}</h1>
        <ContentDoc v-if="home" :document="home" />
      </div>
    </div>

    <footer class="mt-auto py-1 px-1 text-right text-gray-500 text-[11px]">
      &copy; The Clientele {{ formatDate(new Date(), { year: "numeric" }) }}
    </footer>
  </div>
</template>

<style>
.prose h1 {
  @apply text-2xl mt-0 mb-6;

  @media all and (min-width: 1500px) {
    font-size: 2vw;
    line-height: 1;
  }

  font-family: "Public Sans", sans-serif;
  font-weight: 700;
}

.prose p {
  font-weight: 100;
  @apply text-lg mb-3 leading-snug;
  font-family: "Public Sans", sans-serif;

  @media all and (min-width: 1500px) {
    font-size: 1.3vw;
    line-height: 1.5;
  }
}

.prose p.date {
  @apply text-base mb-0 leading-snug;

  @media all and (min-width: 1500px) {
    font-size: 1vw;
    line-height: 1.5;
    @apply mb-2;
  }
}

.prose p a {
  @apply underline;
  @apply text-sky-800;
}

.prose p a:hover {
  @apply text-blue-700;
}

.prose table {
  margin: 2rem 0;
  font-family: "Public Sans", sans-serif;

  @media all and (min-width: 1500px) {
    font-size: 1.3vw;
    line-height: 1.5;
  }
}

.prose tbody td {
  padding-right: 1rem;
}

.prose tbody tr:first-of-type td {
  padding-top: 0.5rem;
}

.prose thead th {
  text-align: left;
  border-bottom: 1px #ddd solid;
}

.prose img {
  margin-bottom: 1rem;

  @media all and (min-width: 540px) {
    float: left;
    margin-right: 1.5rem;
  }
}
</style>
