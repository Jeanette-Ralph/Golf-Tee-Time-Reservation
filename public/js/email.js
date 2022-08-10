const btn = document.querySelectorAll(".email-time");

btn.forEach((btn) => {
  // btn.addEventListener("click", function () {
  //   let buttonId = btn.getAttribute("data-id");
  //   updateTime(buttonId);
  // });
  console.log("email button");
  btn.addEventListener("click", email);
});

function email(event) {
  // event.preventDefault();
  console.log(" email buutttoonn");
  const id = event.target.getAttribute("data-user_id");
  // we are getting the id
  console.log(event);

  // const updateInfo = {
  //   availability: false,
  // };
  // console.log(updateInfo);

  fetch(`book/${id}`, {
    method: "POST",
    // body: JSON.stringify(updateInfo),
    // headers: {
    //   "Content-Type": "application/json",
    // },
  })
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
