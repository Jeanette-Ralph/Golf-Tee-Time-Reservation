const btn = document.querySelectorAll(".book-time");

btn.forEach((btn) => {
  // btn.addEventListener("click", function () {
  //   let buttonId = btn.getAttribute("data-id");
  //   updateTime(buttonId);
  // });
  btn.addEventListener("click", updateTime);
});

function updateTime(event) {
  // event.preventDefault();
  console.log("buutttoonn");
  const id = event.target.getAttribute("data-id");
  // we are getting the id
  console.log(event);

  const updateInfo = {
    availability: false,
  };
  console.log(updateInfo);

  let timeUp = fetch(`book/${id}`, {
    method: "PUT",
    body: JSON.stringify(updateInfo),
    headers: {
      "Content-Type": "application/json",
    },
  });
  let email = fetch(`book/send`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  Promise.all([timeUp, email])
    .then((res) => {
      if (200) {
        return "See you on the links";
      } else {
        return "nope";
      }
    })
    .then((data) => console.log(data))
    .catch((err) => console.log("Error message:"));
}
