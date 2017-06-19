export default next => async ({ endpoint, ...others }) => {
  const resp = await fetch(endpoint, others);

  const meta = {};
  resp.headers.forEach((value, key) => meta[key] = value);

  if (!resp.ok) {
    const error = new Error('Bad Response');
    error.statusCode = resp.statusCode;
    error.payload = await resp.text();
    error.meta = meta;
    throw error;
  }

  return next({
    payload: await resp.text(),
    meta,
  });
};
