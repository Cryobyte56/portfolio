document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM fully loaded, running eyes.js...");

  let eyes = document.querySelectorAll(".eye");

  document.addEventListener("mousemove", (e) => {
    eyes.forEach((eye) => {
      let pupil = eye.querySelector(".pupil");
      let eyeArea = eye.getBoundingClientRect();
      let R = eyeArea.width / 2, // Outer radius (eye)
        r = 10; // Inner radius (pupil)

      let x = e.clientX - (eyeArea.left + R),
        y = e.clientY - (eyeArea.top + R),
        dist = Math.sqrt(x * x + y * y),
        maxDist = R - r,
        angle = Math.atan2(y, x);

      let moveX = Math.cos(angle) * Math.min(dist, maxDist);
      let moveY = Math.sin(angle) * Math.min(dist, maxDist);

      pupil.setAttribute("cx", 25 + moveX);
      pupil.setAttribute("cy", 25 + moveY);
    });
  });
});
