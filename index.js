let selectedOccasion = "";

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
    let link = generateLink();
    if (link) {
        navigator.clipboard.writeText(link).then(() => {
            alert("Liên kết đã được sao chép!");
        });
    }
}

function openLink() {
    let link = generateLink();
    if (link) {
        window.open(link, '_blank');
    }
}