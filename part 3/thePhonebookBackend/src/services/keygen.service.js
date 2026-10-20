const genId = () => {
  const sec = new Date().getMilliseconds();
  return (Math.random() * sec * 100).toFixed();
};

exports.genId = genId;
