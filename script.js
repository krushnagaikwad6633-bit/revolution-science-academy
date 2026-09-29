const menu = document.querySelector(".menu");
const nav = document.querySelector("nav");
menu.addEventListener("click", () => {
  nav.style.display = nav.style.display === "flex" ? "none" : "flex";
  nav.style.flexDirection = "column";
  nav.style.position = "absolute";
  nav.style.top = "78px";
  nav.style.right = "4%";
  nav.style.background = "#fff";
  nav.style.padding = "18px";
  nav.style.borderRadius = "12px";
  nav.style.boxShadow = "0 15px 40px #0002";
});

document.querySelectorAll("nav a").forEach(a => a.addEventListener("click", () => {
  if (window.innerWidth <= 900) nav.style.display = "none";
}));

document.getElementById("appointmentForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const data = new FormData(this);
  const name = data.get("name");
  document.getElementById("formMessage").textContent =
    `Thanks, ${name}! Your appointment request has been recorded on this demo page.`;
  this.reset();
});
