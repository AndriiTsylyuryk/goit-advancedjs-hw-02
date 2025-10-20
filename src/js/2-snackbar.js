import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const input = document.querySelector(".form");

input.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  const delayValue = Number(input.elements.delay.value);
  const stateValue = input.elements.state.value;

  if (!delayValue || delayValue <= 0) {
    iziToast.warning({
      title: "Warning",
      message: "Please enter a positive number for delay",
      position: "topRight",
    });
    return;
  }

  const prom = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (stateValue === "fulfilled") {
        resolve(delayValue);
      } else {
        reject(delayValue);
      }
    }, delayValue);
  });

  prom
    .then((delay) => {
      iziToast.success({
        title: "OK",
        message: `Fulfilled promise in ${delay}ms`,
        position: "topRight",
      });
      input.reset();
    })
    .catch((delay) => {
      iziToast.error({
        title: "Error",
        message: `Rejected promise in ${delay}ms`,
        position: "topRight",
      });
      input.reset();
    });
}
