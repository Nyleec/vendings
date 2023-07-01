
// JavaScript function to scroll to top
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

//navbar function to collapse on smaller screens
function toggleNavbar() {
    var navbarLinks = document.getElementById("navbarLinks");
    navbarLinks.classList.toggle("navbar-expanded");
}

const possibleSlots = [
  '9:00 AM',
  '10:00 AM',
  '11:00 AM',
  '12:00 PM',
  '1:00 PM',
  '2:00 PM',
  '3:00 PM',
  '4:00 PM'
];

function fetchSlots() {
  const dateInput = document.getElementById('date');
  const slotSelect = document.getElementById('slot');

  // Get the selected date
  const selectedDate = dateInput.value;
  // Fetch the unavailable slots from the API
  fetch(`/api/appointments`)
    .then(response => response.json())
    .then(data => {
      // Find the unavailable slots for the selected date
      const unavailableSlots = data.find(slot => slot.date === selectedDate);

      // Clear the previous options
      slotSelect.innerHTML = '';

      if (unavailableSlots) {
        // Get the available slots by filtering out the unavailable slots
        const availableSlots = getAvailableSlots(possibleSlots, unavailableSlots.slots);
        if (availableSlots.length > 0) {
          // Populate the select element with the available slots
          availableSlots.forEach(slot => {
            const option = document.createElement('option');
            option.textContent = slot;
            slotSelect.appendChild(option);
          });
        } else {
          // Display a message if no slots are available
          const option = document.createElement('option');
          option.textContent = 'No slots available';
          option.disabled = true;
          slotSelect.appendChild(option);
        }
      } else {
         // Disable the select element if no slots are available for the selected date
         const option = document.createElement('option');
         option.textContent = 'No slots available';
         option.disabled = true;
         slotSelect.appendChild(option);
       }
     })
     .catch(error => {
       console.error('Error fetching slots:', error);
     });
 }
 
 function getAvailableSlots(allSlots, unavailableSlots) {
   // Filter out the unavailable slots from the list of all slots
   const availableSlots = allSlots.filter(slot => !unavailableSlots.includes(slot));
   return availableSlots;
 }