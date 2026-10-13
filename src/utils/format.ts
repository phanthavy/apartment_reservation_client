export const formatKip = (amount: number | string) =>
  `${String(Math.round(Number(amount) || 0)).replace(/\B(?=(\d{3})+(?!\d))/g, ".")} Kip`;

export const formatShortDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short" });
