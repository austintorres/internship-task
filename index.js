var image_url = document.getElementById('signature-pad').toDataURL();
console.log(image_url);
$("#covid-form").on('submit', function(event) {
  event.preventDefault()
  // 1. AJAX request (submitting the signature)
  $.ajax({
    type: "POST",
    url: "https://www.quixi.com/signature_data",
    data: {
      image_data: image_url
    }
  })
  .then(function(res) {
    // 2. Submitting the name/color form after signature was complete
    return $.ajax({
      type: "POST",
      url: "https://www.quixi.com/internship-form",
      data: {
        name: name,
        color: color
      }
    })
  })
})

// show current date
var d = new Date();
var curr_date = d.getDate();
var curr_month = d.getMonth() + 1; // months are zero based
var curr_year = d.getFullYear();
document.getElementById("date").innerHTML = (curr_month + "/" + curr_date + "/" + curr_year);

// Signature pad
var canvas = document.querySelector("#signature-pad");
var signaturePad = new SignaturePad(canvas);
signaturePad.penColor = "rgb(0, 0, 0)";

function resizeCanvas() {
  var ratio =  Math.max(window.devicePixelRatio || 1, 1);
  canvas.width = canvas.offsetWidth * ratio;
  canvas.height = canvas.offsetHeight * ratio;
  canvas.getContext("2d").scale(ratio, ratio);
  signaturePad.clear(); // otherwise isEmpty() might return incorrect value
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

document.getElementById('clear-button').addEventListener('click', function () {
  signaturePad.clear();
});