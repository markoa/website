export const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  const now = new Date();

  const day = date.getDate();
  const month = date
    .toLocaleDateString("en-US", { month: "short" })
    .toLowerCase();
  const time = date
    .toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    })
    .toLowerCase();

  const year =
    date.getFullYear() !== now.getFullYear() ? ` ${date.getFullYear()}` : "";

  return `${day} ${month}${year}, ${time}`;
};
