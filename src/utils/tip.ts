function calculateTipPerPerson({
  percentage,
  bill,
  peopleCount,
}: {
  percentage: number
  bill: number
  peopleCount: number
}): { tip: number; total: number } {
  const perPerson = bill / peopleCount
  const tip = perPerson * (percentage / 100)

  return { tip: tip, total: perPerson + tip }
}

export { calculateTipPerPerson }
