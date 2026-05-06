export const formatDateTime = (dateString) => {
  if (!dateString) return "N/A";

  try {
    const date = new Date(dateString.replace(" ", "T"));

    return date.toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  } catch (error) {
    return dateString; // fallback if error
  }
};