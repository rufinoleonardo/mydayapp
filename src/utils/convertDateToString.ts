export function convertDateToString(date: Date): string {
  let strDate = date.toISOString();
  let returnedDate = strDate.split("T")[0];
  return returnedDate;
}
