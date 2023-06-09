document.addEventListener('DOMContentLoaded', () => {
  const cardElement = document.getElementById('card');
  const messageElement = document.getElementById('message');
  const titleElement = document.getElementById('title');
  const shareButton = document.getElementById('share-button');
  const infoButton = document.getElementById('info-button');

  // generate a random token and store it in local storage
  const generateToken = () => {
    return Math.random().toString(36).substr(2, 9);
  };

  // add click event listener to share button
  shareButton.addEventListener('click', async () => {
    // generate a new token and create a share link with the message, title, and token in the query parameters
    const token = generateToken();
    const shareUrl = `${window.location.origin}${window.location.pathname}?message=${encodeURIComponent(
      messageElement.innerText
    )}&title=${encodeURIComponent(titleElement.innerText)}&token=${encodeURIComponent(token)}`;

    // Make a POST request to the API endpoint to shorten the URL
    fetch('https://shashi.000.pe/api.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ longUrl: shareUrl }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.status === 'success') {
          const shortUrl = data.shortUrl;
          // auto open WhatsApp with the generated short link
          const clickSymbol = '\uD83D\uDC49'; // Unicode characters for "FINGER POINTING RIGHT"
          const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
            `Click ${clickSymbol} ${shortUrl}`
          )}`;
          window.open(whatsappUrl, '_blank');
        } else {
          alert('Error: ' + data.message);
        }
      })
      .catch(error => {
        alert('Error: ' + error.message);
      });
  });







// rest of the code...

// add touchstart event listener to share button
shareButton.addEventListener('touchstart', () => {
  // set the duration for long press (in milliseconds)
  const longPressDuration = 1000;

  // store the start timestamp of touch
  const touchStartTimestamp = Date.now();

  // create a long press timer
  const longPressTimer = setTimeout(() => {
    // generate a new token and create the share URL
    const token = generateToken();
    const shareUrl = `${window.location.origin}${window.location.pathname}?message=${encodeURIComponent(
      messageElement.innerText
    )}&title=${encodeURIComponent(titleElement.innerText)}&token=${encodeURIComponent(token)}`;

    // Make a GET request to the TinyURL API to shorten the URL
    fetch(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(shareUrl)}`)
      .then(response => response.text())
      .then(shortUrl => {
        // auto open WhatsApp with the generated short link
        const clickSymbol = '\uD83D\uDC49'; // Unicode characters for "FINGER POINTING RIGHT"
        const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
          `Click ${clickSymbol} ${shortUrl}`
        )}`;
        window.open(whatsappUrl, '_blank');
      })
      .catch(error => {
        alert('Error: ' + error.message);
      });
  }, longPressDuration);

  // clear the long press timer when touch ends
  shareButton.addEventListener('touchend', () => {
    clearTimeout(longPressTimer);

    // calculate touch duration
    const touchEndTimestamp = Date.now();
    const touchDuration = touchEndTimestamp - touchStartTimestamp;

    // if touch duration is less than 500ms, trigger the click event
    if (touchDuration < 500) {
      shareButton.click();
    }
  });
});

// rest of the code...







// rest of the code remains the same...


  // clear the long press timer when touch ends
  shareButton.addEventListener('touchend', () => {
    clearTimeout(longPressTimer);

    // calculate touch duration
    const touchEndTimestamp = Date.now();
    const touchDuration = touchEndTimestamp - touchStartTimestamp;

    // if touch duration is less than 500ms, trigger the click event
    if (touchDuration < 500) {
      shareButton.click();
    }
  });

  // add click event listener to info button
  infoButton.addEventListener('click', () => {
    alert(
      'Introducing the latest tool by Shashi: the One-Time Message Sender. Iss tool ki madad se aap kisi ko message bhej sakte ho, jo sirf ek baar dikhayi dega, phir hamesha ke liye delete ho jaayega. Yeh tool sensitive information aur private conversations ke liye accha option hai.'
    );
  });

  // check if a message, title, and token are present in the URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  const message = urlParams.get('message');
  const title = urlParams.get('title');
  const token = urlParams.get('token');

  // Typing effect function for default message
  function typingEffect() {
    const defaultMessage = 'Enter your message here';
    let currentText = '';
    let index = 0;

    function type() {
      if (index < defaultMessage.length) {
        currentText += defaultMessage.charAt(index);
        messageElement.innerText = currentText;
        index++;
        setTimeout(type, Math.random() * 200 + 50); // Adjust the typing speed here
      }
    }

    type();
  }

  // Typing effect function for error message
  function typingErrorMessage() {
    const errorMessage = 'This message has already been viewed. Tap to edit and send.';
    let currentText = '';
    let index = 0;

    function type() {
      if (index < errorMessage.length) {
        currentText += errorMessage.charAt(index);
        messageElement.innerText = currentText;
        index++;
        setTimeout(type, Math.random() * 200 + 50); // Adjust the typing speed here
      }
    }

    type();
  }

  if (message && title && token) {
    // if a message, title, and token are present, check if the token is valid
    const viewedToken = localStorage.getItem(token);

    if (!viewedToken) {
      // if the token is not found in local storage, display the message and title
      messageElement.innerText = message;
      titleElement.innerText = title;

      // store the token in local storage to mark it as viewed
      localStorage.setItem(token, 'viewed');
    } else {
      // if the token is found in local storage, show an error message with typing effect
      typingErrorMessage();
      titleElement.innerText = 'Sorry';
    }
  } else {
    // if no message, title, or token are present, show the default message and title
    messageElement.innerText = 'Enter your message here';
    titleElement.innerText = 'Enter Your Name';

    if (!message && !title && !token) {
      // Apply typing effect only when there are no message link parameters
      typingEffect();
    }
  }

  const card = document.querySelector('.card');

  function toggleGlow() {
    card.classList.toggle('disable-glow');
  }

  function createStars() {
    const numStars = 200;
    const container = document.querySelector('.stars');

    for (let i = 0; i < numStars; i++) {
      const star = document.createElement('div');
      star.className = 'star';
      container.appendChild(star);

      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight;


      star.style.left = `${x}px`;
      star.style.top = `${y}px`;

      const duration = Math.random() * 2 + 1;
      star.style.animationDuration = `${duration}s`;
    }
  }

  createStars();

  card.addEventListener('click', toggleGlow);
});
