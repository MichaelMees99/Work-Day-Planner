$(function () {
  // Display the current date in the header
  var currentDay = dayjs().format("MMM D, YYYY");
  $("#currentDay").text("Today is " + currentDay);

  // Function to generate time-blocks dynamically
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

  // Function to update the color of the time blocks
  function updateTimeBlocks() {
    $(".time-block").each(function() {
      var hour = parseInt($(this).attr("id").split("-")[1]);
      var currentHour = parseInt(dayjs().format('H'));

      $(this).removeClass("past present future");

      if (hour < currentHour) {
        $(this).addClass("past");
      } else if (hour === currentHour) {
        $(this).addClass("present");
      } else {
        $(this).addClass("future");
      }
    });
  }

  // Generate time blocks
  generateTimeBlocks();
  // Update time blocks immediately and then every minute
  updateTimeBlocks();
  setInterval(updateTimeBlocks, 60000);

  // Event listener for the save buttons
  $(document).on("click", ".saveBtn", function() {
    var hour = $(this).parent().attr("id");
    var text = $(this).siblings(".description").val();

    // Save the text to local storage
    localStorage.setItem(hour, text);
  });

  // Retrieve the saved events from local storage
  $(".time-block").each(function() {
    var hour = $(this).attr("id");
    var text = localStorage.getItem(hour);

    if (text !== null) {
      $(this).children(".description").val(text);
    }
  });
});