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

// will show current date
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

// Returns signature image as data URL (see https://mdn.io/todataurl for the list of possible parameters)
// signaturePad.toDataURL(); // save image as PNG
// signaturePad.toDataURL("image/jpeg"); // save image as JPEG
// signaturePad.toDataURL("image/svg+xml"); // save image as SVG

// Draws signature image from data URL.
// NOTE: This method does not populate internal data structure that represents drawn signature. Thus, after using #fromDataURL, #toData won't work properly.
// signaturePad.fromDataURL("data:image/png;base64,iVBORw0K...");

// Returns signature image as an array of point groups
// const data = signaturePad.toData();

// Draws signature image from an array of point groups
// signaturePad.fromData(data);

// Clears the canvas
// signaturePad.clear();

// Returns true if canvas is empty, otherwise returns false
// signaturePad.isEmpty();

// Unbinds all event handlers
// signaturePad.off();

// Rebinds all event handlers
// signaturePad.on();

document.getElementById('clear-button').addEventListener('click', function () {
  signaturePad.clear();
});