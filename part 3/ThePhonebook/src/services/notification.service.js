const timeoutDuration = 5000;

const showNotification = (type, msg, cb) => {
  cb({
    type,
    msg,
  });
  setTimeout(() => {
    const resetNotification = {
      type: "",
      msg: "",
    };
    cb(resetNotification);
  }, timeoutDuration);
};

export default {
  showNotification,
};
