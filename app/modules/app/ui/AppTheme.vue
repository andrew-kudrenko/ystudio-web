<template>
  <UTheme
    :ui="{
      modal: {
        header: 'sm:p-2 p-2 ',
        body: 'sm:p-2 p-2 flex flex-col gap-2',
        footer: 'sm:p-2 p-2',
      },
      pageHeader: {
        root: 'mb-2 py-2',
        wrapper: 'flex-row flex-wrap items-center justify-between gap-2',
        headline: 'mb-1',
        title: 'text-2xl sm:text-2xl',
        description: 'mt-0.5 text-base',
      },
      pageAside: {
        root: 'py-2 px-2 lg:pe-4',
      },
      pageBody: {
        base: 'mt-2',
      },
      footer: {
        container: 'p-2',
        center: 'gap-x-0.5',
        right: 'gap-x-0.5',
      },
      card: {
        header: 'sm:p-2',
        body: 'sm:p-2',
        footer: 'sm:p-2',
      },
      table: {
        th: 'p-2',
        td: 'p-2',
      },
      formField: {
        root: 'w-full',
      },
      input: {
        root: 'w-full',
      },
      inputNumber: {
        root: 'w-full',
      },
      textarea: {
        root: 'w-full',
      },
      select: {
        base: 'w-full',
      },
    }"
  >
    <slot />
  </UTheme>
</template>
