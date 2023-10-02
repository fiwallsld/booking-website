function formatDate(date) {
  const subDate = date.split("T")[0].split("-");

  const res = `${subDate[2]}/${subDate[1]}/${subDate[0]}`;
  return res;
}

export default formatDate;
