// needs some work
const newTimeData = async (event) => {
  console.log("buutttoonn");
  event.preventDefault();
  if (event.target.hasAttribute("id")) {
    const user_id = event.target.getAttribute("user_id");
    const response = await fetch(`/api/book/${user_id}`, {
      method: "POST",
      // we want to change the USER ID associated with it and change availability from true to false
      body: { id: req.params.user_id },
    });
    //    response to verify time is changing-
    if (response.ok) {
      document.location.replace("/book");
    } else {
      alert("Failed to change time");
    }
  }
};

document.querySelector("book-time").addEventListener("submit", newTimeData);
