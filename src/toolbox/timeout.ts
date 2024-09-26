function timeout(delay: number) {
  return new Promise((resole) => {
    setTimeout(() => {
      resole(true);
    }, delay);
  });
}

export default timeout;
