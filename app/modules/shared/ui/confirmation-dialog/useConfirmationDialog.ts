export function useConfirmationDialog() {
  const isDialogOpen = ref(false);

  function open() {
    isDialogOpen.value = true;
  }

  function cancel() {
    isDialogOpen.value = false;
  }

  function confirm() {
    isDialogOpen.value = false;
  }

  return {
    isDialogOpen,
    open,
    cancel,
    confirm,
  };
}
