$(function () {
  // this displays the current time in the header
  var currentDay = dayjs().format("MMM D, YYYY");
  $("#currentDay").text("Today is " + currentDay);

  // this function creates time-block dynamically
  function generateTimeBlocks() {
    var container = $(".container-fluid");

    for (let i = 0; i <= 24; i++) {
      var displayHour = i === 0 ? 12 : i > 12 ? i - 12 : i;
      var ampm = i < 12 || i === 24 ? 'AM' : 'PM';
      var timeBlock = `
        <div id="hour-${i}" class="row time-block">
          <div class="col-2 col-md-1 hour text-center py-3">${displayHour}${ampm}</div>
          <textarea class="col-8 col-md-10 description" rows="3"> </textarea>
          <button class="btn saveBtn col-2 col-md-1" aria-label="save">
            <i class="fas fa-save" aria-hidden="true"></i>
          </button>
        </div>
      `;
      container.append(timeBlock);
    }
  }

  // this function changes the color of the time-blocks depending on the time
  function updateTimeBlocks() {
    $(".time-block").each(function() {
      var hour = parseInt($(this).attr("id").split("-")[1]);
      var currentHour = parseInt(dayjs().format('H'));

      if (hour < currentHour) {
        $(this).addClass("past");
      } else if (hour === currentHour) {
        $(this).addClass("present");
      } else {
        $(this).addClass("future");
      }
    });
  }

  // This generate time blocks
  generateTimeBlocks();
  // This updates the time blocks immediately and then every minute
  updateTimeBlocks();
  setInterval(updateTimeBlocks, 60000);

  // This is an Event listener for the save buttons
  $(document).on("click", ".saveBtn", function() {
    var hour = $(this).parent().attr("id");
    var text = $(this).siblings(".description").val();
  
    // This saves the text to local storage
    localStorage.setItem(hour, text);
  
    // This displays a success message for information that has stored on local storage and places it above the time-blocks
    var successMessage = $("<div>").addClass("alert alert-success").text("Saved to local storage!");
    $(".container-fluid").prepend(successMessage);
  
    // This removes the success message after 3 seconds
    setTimeout(function() {
      successMessage.remove();
    }, 3000);
  });

  // This retrieves the saved events from local storage
  $(".time-block").each(function() {
    var hour = $(this).attr("id");
    var text = localStorage.getItem(hour);

    if (text !== null) {
      $(this).children(".description").val(text);
    }
  });
});