const userPhotoInput = document.getElementById('user-photo');
const uploadUI = document.getElementById('upload-ui');
const resultUI = document.getElementById('result-ui');
const processedImage = document.getElementById('processed-image');
const loader = document.getElementById('processing-loader');
const actionBar = document.getElementById('action-bar');
const historyContainer = document.getElementById('recent-tries-container');

// 1. Handle File Upload
userPhotoInput.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        
        // UI Transition
        uploadUI.className = 'state-hidden';
        resultUI.className = 'state-visible';
        loader.style.display = 'flex';
        actionBar.style.visibility = 'visible';

        reader.onload = function(event) {
            // Simulate AI delay
            setTimeout(() => {
                processedImage.src = event.target.result;
                loader.style.display = 'none';
            }, 1500);
        };
        reader.readAsDataURL(file);
    }
});

// 2. Save to Recent Tries
function saveToRecent() {
    if (!processedImage.src) return;

    // Remove empty message if it exists
    const emptyMsg = historyContainer.querySelector('.empty-history-msg');
    if (emptyMsg) emptyMsg.remove();

    // Create New History Item
    const img = document.createElement('img');
    img.src = processedImage.src;
    img.className = 'history-item';
    
    // Add to the top of the history list
    historyContainer.prepend(img);
}

// 3. Reset Fitting (Keeps image but allows re-try)
function resetFitting() {
    loader.style.display = 'flex';
    setTimeout(() => loader.style.display = 'none', 1000);
}

// 4. Remove Image (Back to Start)
function removeImage() {
    uploadUI.className = 'state-visible';
    resultUI.className = 'state-hidden';
    actionBar.style.visibility = 'hidden';
    userPhotoInput.value = "";
}


// Add this to your script.js or at the bottom of try-on.html
window.onload = function() {
    // 1. Get the URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const selectedDress = urlParams.get('dress');

    // 2. If a dress was passed in the URL, update the "Selected Product" image
    if (selectedDress) {
        const productImg = document.getElementById('product-to-try');
        const dressNameElement = document.getElementById('product-name');

        // Update the image source (make sure the path matches your assets folder)
        productImg.src = "/assets/" + selectedDress;

        // Optional: Clean up the name for display (e.g., formal1.jpg -> Formal 1)
        const cleanName = selectedDress.split('.')[0].replace(/^\w/, (c) => c.toUpperCase());
        if(dressNameElement) dressNameElement.innerText = cleanName;
    }
}

function addToCart(productName, productPrice) {
  console.log(`Add to Cart clicked for: ${productName}, Price: ${productPrice}`);
  let cartItem = {
    name: productName,
    price: productPrice,
    quantity: 1
  };

  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  // Check if the item already exists in the cart
  const existingItem = cart.find(item => item.name === productName);
  if (existingItem) {
    existingItem.quantity += 1;
    console.log(`Updated quantity for: ${productName}, New Quantity: ${existingItem.quantity}`);
  } else {
    cart.push(cartItem);
    console.log(`Added new item to cart: ${productName}`);
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  console.log('Cart updated:', cart);
}

  const menuToggle = document.getElementById("menuToggle");
  const navbarLinks = document.getElementById("navbarLinks");

  menuToggle.addEventListener("click", () => {
    navbarLinks.classList.toggle("active");
  });



