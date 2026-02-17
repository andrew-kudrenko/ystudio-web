export default defineAppConfig({
  ui: {
    card: {
      slots: {
        root: "rounded-lg overflow-hidden",
        header: "p-2 sm:px-4",
        body: "p-2 sm:p-4",
        footer: "p-2 sm:px-4",
      },
    },
    formField: {
      default: {
        container: "mt-1 relative w-full",
      },
    },
    input: {
      default: {
        input: "w-full",
      },
    },
    select: {
      default: {
        base: "w-full",
      },
    },
  },
});
