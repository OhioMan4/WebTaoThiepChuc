let selectedOccasion = "";
let typeofGif=document.getElementById("giftype");


function scrollToForm() {
    document.getElementById("formSection").scrollIntoView({ behavior: "smooth" });
}

function scrollToCards() {
    document.getElementById("cardSection").scrollIntoView({ behavior: "smooth" });
}

function selectCard(card, occasion) {
    document.querySelectorAll(".card").forEach(c => c.classList.remove("selected"));
    card.classList.add("selected");
    selectedOccasion = occasion;
}

function generateLink() {
    let message = document.getElementById("message").value;
    let selectedCard = document.querySelector(".card.selected");
    if (!message || !selectedCard) {
        alert("Vui lòng nhập lời chúc và chọn thiệp!");
        return;
    }
    let encodedMessage = encodeURIComponent(message);
    let cardSrc = encodeURIComponent(selectedCard.src);
    return `http://127.0.0.1:5500/greeting.html?occasion=${encodeURIComponent(selectedOccasion)}&message=${encodedMessage}&card=${cardSrc}`;
}
function copyLink() {
    typeofGif.src="asset/sending.gif"
    let link = generateLink();
    if (link) {
        showGif(true);
        navigator.clipboard.writeText(link).then(() => {
        });
    }
}

function openLink() {
    typeofGif.src="asset/open.gif"
    let link = generateLink();
    if (link) {
        showGif(false,()=>{
        window.open(link, '_blank')
    });
    }
}
function showGif(type=true,callbacks) {
    let gifContainer = document.getElementById("gifContainer");
    let successMessage = document.getElementById("successMessage");

    // Hiện GIF
    gifContainer.style.display = "block";

    setTimeout(() => {
        gifContainer.style.display = "none";
        if(type) successMessage.style.display = "block";

        setTimeout(() => {
            successMessage.style.display = "none"; 
            callbacks();
        }, 1500);
    }, 4000);
}