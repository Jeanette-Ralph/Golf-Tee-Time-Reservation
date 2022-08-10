// const { put } = require("../../controllers/api/bookTeeTimeRoute");

function updateTime(event) {
  event.preventDefault();
  // i see var to acquire values possibly user_id->get from session data?, id->get from the card? and availability->get from the card status
  console.log("buutttoonn");
  const id = event.target.getAttribute("data-id");
  // we are getting the id
  console.log(id);

  const updateInfo = {
    // this is in the get that gets the cards->need? were getting it in the fetch call
    // id: id,
    // this is in the get that creates the cards
    availability: false,
    // session data?-yes
    // user_id is not defined-fixed
  };

  /*     code: 'ER_TRUNCATED_WRONG_VALUE',
    errno: 1292,
    sqlState: '22007',
    sqlMessage: "Truncated incorrect DOUBLE value: ':1'",
    sql: 'UPDATE `teetimes` SET `user_id`=?,`updated_at`=? WHERE `id` = ?',
    parameters: [ 2, '2022-08-09 22:52:33', ':1' ]*/
  // PUT http://localhost:3001/api/book/:1 500 (Internal Server Error)

  fetch(`book/:${id}`, {
    // we want to update the information on the time card
    // put is not defined
    method: "PUT",
    body: updateInfo,
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

// document.querySelector(".book-time").addEventListener("click", updateTime);
