export const groupByArray = (xs, key) => {
  return xs.reduce(function (rv, x) {
    let v = key instanceof Function ? key(x) : x[key];
    let el = rv.find((r) => r && r.key === v);
    if (el) {
      el.values.push(x);
    } else {
      rv.push({ key: v, values: [x] });
    }
    return rv;
  }, []);
};

export const timeFormat = (num) => {
  var hours = Math.floor(num / 60);
  var minutes = num % 60;
  return `${hours}h ${minutes}min`;
};

export const dateFormat = (date) => {
  const arr = date.split("-");
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const year = arr[0];
  const month = arr[1];
  const day = arr[2];

  const monthFormat = (m) => {
    switch (m) {
      case "01":
        return months[0];
      case "02":
        return months[1];
      case "03":
        return months[2];
      case "04":
        return months[3];
      case "05":
        return months[4];
      case "06":
        return months[5];
      case "07":
        return months[6];
      case "08":
        return months[7];
      case "09":
        return months[8];
      case "10":
        return months[9];
      case "11":
        return months[10];
      case "12":
        return months[11];
      default:
        return m;
    }
  };

  return `${monthFormat(month)} ${day}, ${year}`;
};

export const handleErrors = (response) => {
  if (!response.ok) {
    return Promise.reject(response);
    // throw Error(response.statusMessage);
  }
  return response;
};

export const fetchHandler = (res) => {
  if (res.status >= 400 && res.status < 600) {
    return Promise.reject(res);
  }
  return res.json();
};
