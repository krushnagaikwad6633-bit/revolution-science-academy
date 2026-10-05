const form = document.getElementById("form");
const msg = document.getElementById("msg");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = form.elements["name"].value.trim();
  const mobile = form.elements["mobile"].value.trim();
  const course = form.elements["course"].value;
  const date = form.elements["date"].value;
  const time = form.elements["time"].value;

  const message =
    "New Appointment Request%0A%0A" +
    "Name: " + encodeURIComponent(name) + "%0A" +
    "Mobile: " + encodeURIComponent(mobile) + "%0A" +
    "Course: " + encodeURIComponent(course) + "%0A" +
    "Date: " + encodeURIComponent(date) + "%0A" +
    "Time: " + encodeURIComponent(time);

  const whatsappNumber = "918975142323";
  const whatsappURL =
    "https://wa.me/" + whatsappNumber + "?text=" + message;

  msg.textContent = "Opening WhatsApp...";

  window.open(whatsappURL, "_blank");
});
