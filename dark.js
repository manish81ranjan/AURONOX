const toggleSwitch = document.getElementById('toggle-switch');
    
    // Check saved user preference in localStorage
    if (localStorage.getItem("theme") === "dark") {
      document.body.classList.add("dark-mode");
      toggleSwitch.checked = true;
    }
    
    toggleSwitch.addEventListener("change", function() {
      if (this.checked) {
        document.body.classList.add("dark-mode");
        localStorage.setItem("theme", "dark");
      } else {
        document.body.classList.remove("dark-mode");
        localStorage.setItem("theme", "light");
      }
    });
