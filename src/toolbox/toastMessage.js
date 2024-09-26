const toastMessage = ({ message = "", type = "warning", delay = 3000 }) => {
  let toastCount = 0;
  return {
    triggerToast: () => {
      toastCount++;
      if (toastCount < 2) {
        console[type](message);
        setTimeout(() => {
          toastCount = 0;
        }, delay);
      }
    },
  };
};

export default toastMessage;
