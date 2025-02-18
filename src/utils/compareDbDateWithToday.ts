export function compareDbDateWithToday(dbDate: string | Date): boolean {
  const today = new Date();
  const todayStr = today.toISOString().split("T")[0];

  let paramDate: string;

  if (typeof dbDate != "string") {
    paramDate = dbDate.toISOString().split("T")[0];
  } else {
    paramDate = dbDate;
  }

  const comparation = paramDate == todayStr;
  return comparation;
}
