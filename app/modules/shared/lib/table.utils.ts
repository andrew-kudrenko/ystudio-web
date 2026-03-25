export function indicesOfSelectedRows(
  selectedRows: Record<number, boolean>,
): number[] {
  return Object.keys(selectedRows).map(Number);
}
