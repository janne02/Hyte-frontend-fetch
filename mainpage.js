document.addEventListener('DOMContentLoaded', function() {
    // Get the logout button
    const logoutButton = document.getElementById('logout-button');

    // Add click event listener to the logout button
    logoutButton.addEventListener('click', function(event) {
      // Prevent the default behavior of the button (e.g., submitting a form)
      event.preventDefault();
      
      // Perform logout
      activelogout();
    });
});

// Function to perform logout
async function activelogout() {
    // Clear the localStorage
    localStorage.clear();
    
    // Alert the user that logout was successful
    window.alert("Logout successful");
    
    // Redirect the user to the login page
    window.location.href = 'login.html';
}