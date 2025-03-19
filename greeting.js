function getQueryParams() {
  let params = new URLSearchParams(window.location.search);
  return {
      occasion: params.get('occasion'),
      message: params.get('message'),
      image: params.get('card')
  };
}

function typeWriterEffect(element, text, speed) {
  let i = 0;
  function typing() {
      if (i < text.length) {
          element.textContent += text.charAt(i);
          i++;
          setTimeout(typing, speed);
      } else {
          element.textContent = element.textContent.replace(/['"]/g, ""); // Xóa dấu nháy sau khi gõ xong
      }
  }
  typing();
}

window.onload = function () {
  let { occasion, message, image } = getQueryParams();
  let occasionText = document.getElementById('occasionText');
  let messageBox = document.getElementById('messageBox');
  let cardImage = document.getElementById('cardImage');
  
  occasionText.textContent = `Chúc mừng ${occasion}!`;
  typeWriterEffect(messageBox, message || "Lời chúc của bạn ở đây...", 50);
  cardImage.src = image || "asset/default.jpg";
};