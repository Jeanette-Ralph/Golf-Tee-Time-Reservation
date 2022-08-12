const userLogout = async () => {
  const response = await fetch("/api/users/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    // go to homepage after logging out
    document.location.replace("/");
  } else {
    alert(response.statusText);
  }
};
const logoutButton = document
  .querySelector("#logout-btn")
  .addEventListener("click", userLogout);
