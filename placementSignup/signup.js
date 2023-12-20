// Captha code Starts

let captcha;
function generate() {
  // Clear old input
  document.getElementById("submit").value = "";

  // Access the element to store
  // the generated captcha
  captcha = document.getElementById("image");
  let uniquechar = "";

  const randomchar =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  // Generate captcha for length of
  // 5 with random character
  for (let i = 1; i < 5; i++) {
    uniquechar += randomchar.charAt(Math.random() * randomchar.length);
  }

  captcha.innerHTML = uniquechar;

  // Captcha code ends
}

document.querySelector("#form").addEventListener("submit", signUp);
function signUp(event) {
  event.preventDefault();

  // for captcha
  const usr_input = document.getElementById("submit").value;

  const email = document.getElementById("email");
  const username = document.getElementById("name");
  const address = document.getElementById("address");
  const mob = document.getElementById("mob");
  const password = document.getElementById("password");
  const password1 = document.getElementById("password1");

  if (password.value !== password1.value) {
    swal({
      title: "Incorrect Password",
      text: "Password and Confirm Password are not Same",
      icon: "error",
    });
    return;
  }

  fetch("http://localhost:7070/user", {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      const comp = data.find((ele) => ele.email === email.value);
      if (comp) {
        swal({
          title: "Error!!",
          text: "User Already Exist !",
          icon: "error",
        });
      } else {
        if (usr_input === captcha.innerHTML) {
          const dataobj = {
            email: email.value,
            name: username.value,
            address: address.value,
            mob: mob.value,
            password: password.value,
          };
          fetch("http://localhost:7070/user", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(dataobj),
          })
            .then((res) => {
              res.json();
              swal("Signin Successfull !!");
            })
            .then((data) => {
              window.location.href = "../signin/signin.html";
            });
        } else {
          swal({
            title: "Captcha Error !!",
            text: "Enter the Correct Captcha !",
            icon: "error",
          });
          generate();
        }
      }
    });
}
