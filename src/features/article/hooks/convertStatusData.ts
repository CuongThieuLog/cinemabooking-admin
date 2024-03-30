export function convertStatusData(status: number) {
  return status == 1 || status == 3 || status == 4 ? 1 : 2
}
