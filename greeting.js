let border=document.getElementById('Card')
function getQueryParams() {
  let params = new URLSearchParams(window.location.search);
  return {
      message: params.get('message'),
      image: params.get('card'),
      occasion:params.get('occasion')
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
          element.textContent = element.textContent.replace(/['"]/g, ""); 
      }
  }
  typing();
}

window.onload = function () {

 
  let { occasion, message, image } = getQueryParams();
  let occasionText = document.getElementById('occasionText');
  let messageBox = document.getElementById('messageBox');
  let cardImage = document.getElementById('cardImage');
  setFavicon(image)
  if(occasion=='14/2') border.style.border='5px solid rgb(155, 34, 23)';
  occasionText.innerHTML=occasion;
  typeWriterEffect(messageBox, message || "Lời chúc của bạn ở đây...", 100);
  cardImage.src = image || "asset/default.jpg";
};
function setFavicon(url) {
  let link = document.querySelector("link[rel~='icon']");
  if (!link) {
    link = document.createElement('link');
    link.rel = 'icon';
    document.head.appendChild(link);
  }
  link.href = url;
}

 
