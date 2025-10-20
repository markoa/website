export const formatDate = (timestamp, { includeTime = true } = {}) => {
  const date = new Date(timestamp);
  const now = new Date();

  const day = date.getDate();
  const month = date
    .toLocaleDateString("en-US", { month: "short" })
    .toLowerCase();

  const year =
    date.getFullYear() !== now.getFullYear() ? ` ${date.getFullYear()}` : "";

  if (!includeTime) {
    return `${day} ${month}${year}`;
  }

  const time = date
    .toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    })
    .toLowerCase();

  return `${day} ${month}${year}, ${time}`;
};
