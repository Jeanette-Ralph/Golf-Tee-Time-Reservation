const btn = document.querySelectorAll(".book-time");
btn.forEach((btn) => {
  btn.addEventListener("click", updateTime);
});

function updateTime(event) {
  const id = event.target.getAttribute("data-id");
  const userId = event.target.getAttribute("data-user-id");
  const updateInfo = {
    availability: false,
  };

  let timeUp = fetch(`book/${id}`, {
    method: "PUT",
    body: JSON.stringify(updateInfo),
    headers: {
      "Content-Type": "application/json",
    },
  });
  let email = fetch("/api/book/send", {
    method: "POST",
    body: JSON.stringify({
      email: userId,
    }),
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
