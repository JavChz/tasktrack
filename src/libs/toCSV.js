// Function to convert JSON to CSV
function jsonToCsv(jsonObject) {
  const header = Object.keys(jsonObject[0]);
  const rows = jsonObject.map((obj) => header.map((key) => obj[key]));
  const csvContent = [header, ...rows].map((e) => e.join(",")).join("\n");
  return csvContent;
}

// Function to download CSV file
export function downloadCsv(jsonObject, fileName = "data.csv") {
  const csvContent = jsonToCsv(jsonObject);
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.setAttribute("href", url);
  link.setAttribute("download", fileName);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
