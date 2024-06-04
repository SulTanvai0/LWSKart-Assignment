const urlProvider = ({ category, min, max, size, page, limit, query }) => {
  const baseurl = process.env.NEXT_PUBLIC_LWSKART_API_URl;

  let url = `${baseurl}/getDataBySearchParams?page=${page}&limit=${limit}`;

  if (category) {
    url = `${baseurl}/getDataBySearchParams?page=${page}&limit=${limit}&category=${category}`;
  }

  if (query) {
    url = `${baseurl}/getDataBySearchParams?page=${page}&limit=${limit}&query=${query}`;
  }

  if (min && max) {
    url = `${baseurl}/getDataBySearchParams?page=${page}&limit=${limit}&min=${min}&max=${max}`;
  }

  if (size) {
    url = `${baseurl}/getDataBySearchParams?page=${page}&limit=${limit}&size=${size}`;
  }

  if (category && min && max) {
    url = `${baseurl}/getDataBySearchParams?page=${page}&limit=${limit}&category=${category}&min=${min}&max=${max}`;
  }

  if (size && min && max) {
    url = `${baseurl}/getDataBySearchParams?page=${page}&limit=${limit}&min=${min}&max=${max}&size=${size}`;
  }
  if (size && category) {
    url = `${baseurl}/getDataBySearchParams?page=${page}&limit=${limit}&category=${category}&size=${size}`;
  }

  if (category && min && max && query) {
    url = `${baseurl}/getDataBySearchParams?page=${page}&limit=${limit}&query=${query}&category=${category}&min=${min}&max=${max}`;
  }

  if (size && min && max && query) {
    url = `${baseurl}/getDataBySearchParams?page=${page}&limit=${limit}&query=${query}&min=${min}&max=${max}&size=${size}`;
  }
  if (size && category && query) {
    url = `${baseurl}/getDataBySearchParams?page=${page}&limit=${limit}&query=${query}&category=${category}&size=${size}`;
  }

  return url;
};

export default urlProvider;
