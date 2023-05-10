const HEADERS_PARAMS = {
    headers: {
      'Content-Type': 'application/json',
    },
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
  };

const get = async (url: string) => {
   const response = await fetch(url, { ...HEADERS_PARAMS, method: 'GET' });
   return response.json();
};

const post = async (url: string, data = {}) => {
    const response = await fetch(url, { ...HEADERS_PARAMS, method: 'POST', body: JSON.stringify(data) });
    return response.json();
 };

export { get, post };