            // Function to set a cookie
            function setCookie(name, value, days) {
                var expires = "";
                if (days) {
                    var date = new Date();
                    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                    expires = "; expires=" + date.toUTCString();
                }
                document.cookie = name + "=" + (value || "") + expires + "; path=/";
            }
            // Function to get a cookie value
            function getCookie(name) {
                var nameEQ = name + "=";
                var ca = document.cookie.split(';');
                for (var i = 0; i < ca.length; i++) {
                    var c = ca[i];
                    while (c.charAt(0) == ' ') {
                        c = c.substring(1, c.length);
                    }
                    if (c.indexOf(nameEQ) == 0) {
                        return c.substring(nameEQ.length, c.length);
                    }
                }
                return null;
            }
            // Function to save data to cookies
            function saveDataToCookies() {
                var nameElement = document.querySelector(".name");
                var usernameElement = document.querySelector(".username");
                var imageInputElement = document.querySelector(".input");
                var extra_link = document.querySelector(".label-text");
                // Get the values from the respective elements
                var name = nameElement.innerText;
                var username = usernameElement.innerText;
                var imageInput = imageInputElement.value;
                var extra_link_text = extra_link.innerText;
                // Save the values to cookies
                setCookie("name", name, 365); // Set the cookie with a validity of 365 days
                setCookie("username", username, 365);
                setCookie("link_input", extra_link_text, 365);
            }
            // Event listener for name field
            var nameElement = document.querySelector(".name");
            nameElement.addEventListener("input", function() {
                saveDataToCookies();
            });
            // Event listener for username field
            var usernameElement = document.querySelector(".username");
            usernameElement.addEventListener("input", function() {
                saveDataToCookies();
            });
            // var linkElement = document.querySelector(".username");
            //  usernameElement.addEventListener("input", function() {
            //saveDataToCookies();
            //  });
            // Function to populate fields from cookies
            function populateFieldsFromCookies() {
                var name = getCookie("name");
                var username = getCookie("username");
                if (localStorage.getItem('storedImage')) {
                    const displayImage = document.querySelector(".profile-image");
                    displayImage.src = localStorage.getItem('storedImage');
                } // var actual_linkInput = getCookie("link_input");
                // Set the values of the respective elements from the cookies
                if (name) {
                    nameElement.innerText = name;
                }
                if (username) {
                    usernameElement.innerText = username;
                }
            }
            /* if (actual_linkInput) {
               extra_link.innerText = actual_linkInput;
             }
               */
            // Call the function to populate fields from cookies when the page is loaded
            populateFieldsFromCookies();
        
            var trxt = document.querySelector(".input");

            function downloadImages() {
                if (trxt.value == "") {
                    var stringArray = [document.querySelector(".main-tweet").innerText];
                } else {
                    //  var stringArray = trxt.value.split("|");
                    var stringArray = trxt.value.split("\n").map(function(item) {
                        return item.trim();
                    });
                }
                console.log(stringArray);
                var container = document.getElementById("container");
                var tweet = document.querySelector(".main-tweet");
                var downloadIndex = 0;

                function generateAndDownloadImage() {
                    if (localStorage.getItem('storedImage')) {
                        const displayImage = document.querySelector(".profile-image");
                        displayImage.src = localStorage.getItem('storedImage');
                    }
                    if (downloadIndex >= stringArray.length) {
                        return;
                    }
                    tweet.innerText = stringArray[downloadIndex];
                    html2canvas(container, {
                        scale: 5, // Increase the scale value for higher quality
                        removeContainer: true, // Remove the container from the rendered image
                        backgroundColor: null // Set the background color to be transparent
                    }).then(function(canvas) {
                        var link = document.createElement("a");
                        link.download = "imggen_" + (downloadIndex + 1) + ".png";
                        link.href = canvas.toDataURL("image/png");
                        link.click();
                        downloadIndex++;
                        generateAndDownloadImage(); // Recursive call for the next string in the array
                    });
                }
                generateAndDownloadImage();
            }
            document.getElementById("downloadButton").addEventListener("click", downloadImages);

            function changeProfileImage() {
                const input = document.createElement("input");
                input.type = "file";
                input.accept = "image/*";
                input.addEventListener("change", handleImageChange);
                input.click();
            }

            function handleImageChange(event) {
                const file = event.target.files[0];
                const reader = new FileReader();
                reader.onload = function(event) {
                    const profileImage = document.querySelector(".profile-image");
                    profileImage.src = event.target.result;
                    localStorage.setItem('storedImage', event.target.result);
                    saveDataToCookies();
                };
                reader.readAsDataURL(file);
            }
            var bgbutton = document.querySelectorAll(".background li");
            bgbutton.forEach(function(button) {
                button.addEventListener("click", function() {
                    // Get the computed style of an element
                    var styles = getComputedStyle(button);
                    // Access the value of the CSS variable
                    var bgValue = styles.getPropertyValue("--bg");
                    // Output: the value of --bg variable
                    document.querySelector("#container").style.background = bgValue;
                });
            });
            var switchElement = document.getElementById("mySwitch");
            var linkElement = document.querySelector(".link");
            var switchElement2 = document.getElementById("mySwitch2");
            switchElement.addEventListener("change", function() {
                if (this.checked) {
                    linkElement.style.display = "flex"; // Show the link
                } else {
                    linkElement.style.display = "none"; // Hide the link
                }
            });
            /*switchElement2.addEventListener("change", function () {
              if (this.checked) {
                // Show hamburger
              } else {
                // Hide hamburger
              }
            });*/
            var slider = document.getElementById('slider');
            var container = document.querySelector('#container');
            var slider2 = document.getElementById('slider2');
            var slider3 = document.getElementById('slider3');
            slider.addEventListener('input', function() {
                var sliderValue = this.value;
                var containerWidth = (sliderValue / 100) * 100;
                container.style.minHeight = containerWidth + 'px';
                container.style.height = containerWidth + 'px';
                container.style.maxHeight = containerWidth + 'px';
                translateLink(sliderValue);
            });
            slider.addEventListener('change', function() {
                var sliderValue = this.value;
                container.style.minHeight = containerWidth + 'px';
                container.style.height = containerWidth + 'px';
                container.style.maxHeight = containerWidth + 'px';
                translateLink(sliderValue);
            });

            function translateLink(sliderValue) {
                if (window.innerWidth > 768) {
                    document.querySelector(".link").style.top = "calc(" - sliderValue + "px - 8px)";
                } else {
                    document.querySelector(".link").style.top = "calc(" + sliderValue + "px - 20px)";
                }
            }
            slider2.addEventListener('input', function() {
                var sliderValue = this.value;
                container.style.borderRadius = sliderValue + 'px';
            });
            slider2.addEventListener('change', function() {
                var sliderValue = this.value;
                container.style.borderRadius = sliderValue + 'px';
            });
            slider3.addEventListener('input', function() {
                var sliderValue = this.value;
                document.querySelector('.main-tweet').style.fontSize = sliderValue + "px";
            });
            slider3.addEventListener('change', function() {
                var sliderValue = this.value;
                document.querySelector('.main-tweet').style.fontSize = sliderValue + "px";
            });
            // Assuming you haan element with the ID 'myElement'
            // Check if the browser width is greater than 768 pixels
            function storeImage() {
                const input = document.getElementById('imageInput');
                const file = input.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        const imageData = e.target.result;
                        // Store image data in localStorage
                        localStorage.setItem('storedImage', imageData);
                        console.log('Image stored successfully.');
                    };
                    reader.readAsDataURL(file);
                } else {
                    console.error('No file selected.');
                }
            }
