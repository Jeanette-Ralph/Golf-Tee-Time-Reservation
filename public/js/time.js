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
  // i see var to acquire values possibly user_id->get from session data?, id->get from the card? and availability->get from the card status
  console.log("buutttoonn");
  const id = event.target.getAttribute("data-id");
  // we are getting the id
  console.log(event);

  const updateInfo = {
    // this is in the get that gets the cards->need? were getting it in the fetch call
    // id: id,
    // this is in the get that creates the cards
    availability: false,
    // session data?-yes
    // user_id is not defined-fixed
  };
  console.log(updateInfo);

  fetch(`book/${id}`, {
    // we want to update the information on the time card
    // put is not defined
    method: "PUT",
    body: JSON.stringify(updateInfo),
    headers: {
      "Content-Type": "application/json",
    },
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
// function whichButton(test) {
//   console.log(test);
// }
