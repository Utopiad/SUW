const _API_URL = {
  protocol: "http://",
  ip: "163.172.29.197",
  port: ":3000",
  route: {
    login: "/login"
  }
}
export default function requestAPI(route, method, data) {
  let r, m, d;
  r = _API_URL.protocol + _API_URL.ip + _API_URL.port;

  if (route === "login") {
    r = r + _API_URL.route.login;
  }
  else {
    throw "Bad route request";
  }

  if (method === "POST" || method === "post") {
    m = 'POST';
  }
  else {
    throw "bad method request";
  }

  return fetch(r, {
    method: m,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
}
