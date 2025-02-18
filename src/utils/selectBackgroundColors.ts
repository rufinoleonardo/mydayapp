export function selectBackgroundColor(id: number): string {
  const cardColors = [
    "#a6157f",
    "#d45816",
    "#0d867c",
    "#685062",
    "#1A535C",
    "#ab581c",
    "#4ECDC4",
    "#FF6B6B",
    "#556270",
    "#4A90E2",
  ];

  const index = id % cardColors.length;
  const selectedColor = cardColors[index];
  return selectedColor;
}
