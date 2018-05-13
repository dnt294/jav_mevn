export default function (record) {
  for (var property in record) {
    if (record.hasOwnProperty(property) && (record[property] === null || record[property] === "")) {
      record[property] = undefined;
    }
  }
  return record;
}
