document.querySelector("book-time").addEventListener("submit", newTimeData);
// needs some work
const newTimeData = async (event) => {
  console.log("buutttoonn");
  event.preventDefault();
  // review id syntax
  if (event.target.hasAttribute("id")) {
    const user_id = event.target.getAttribute("user_id");
    const response = await fetch(`/api/book/${user_id}`, {
      method: "PUT",
      // we want to change the USER ID associated with it and change availability from true to false
      body: { id: req.params.user_id },
    });
    //    response to verify time is changing-go to user page?
    if (response.ok) {
      document.location.replace("/profile");
    } else {
      alert("Failed to book time");
    }
  }
};

// set button info to the command line
