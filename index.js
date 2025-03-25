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
        showGif(true, () => {
            navigator.clipboard.writeText(link).then(() => {
                showShareOptions();
            });
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
function showGif(type=true, callbacks) {
    let gifContainer = document.getElementById("gifContainer");
    let successMessage = document.getElementById("successMessage");

    // Hiện GIF
    gifContainer.style.display = "block";

    setTimeout(() => {
        gifContainer.style.display = "none";
        if(type) {
            successMessage.style.display = "block";
            setTimeout(() => {
                successMessage.style.display = "none"; 
                if (callbacks) callbacks();
            }, 1500);
        } else {
            if (callbacks) callbacks();
        }
    }, 4000);
}
function showShareOptions() {
    let shareContainer = document.getElementById("shareContainer");
    shareContainer.style.display = "block";
}

function closeShare() {
    let shareContainer = document.getElementById("shareContainer");
    shareContainer.style.display = "none";
}

function shareTo(platform) {
    let link = generateLink();
    if (!link) return;

    let shareUrl = "";
    let shareTitle = "Thiệp chúc mừng";
    let shareDescription = "Gửi lời chúc tuyệt vời đến bạn!";
    let shareText = `${shareTitle}\n${shareDescription}\n\nXem thiệp tại: `;

    switch (platform) {
        case "facebook":
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(link)}&quote=${encodeURIComponent(shareText)}`;
            break;
        case "zalo":
            shareUrl = `https://zalo.me/share?url=${encodeURIComponent(link)}&text=${encodeURIComponent(shareText)}`;
            break;
        case "twitter":
            shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(link)}&text=${encodeURIComponent(shareText)}`;
            break;
    }

    if (shareUrl) {
        // Thêm loading state
        const shareBtn = document.querySelector(`.share-btn.${platform}`);
        const originalText = shareBtn.innerHTML;
        shareBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang chia sẻ...';
        shareBtn.disabled = true;

        // Mở cửa sổ chia sẻ
        const shareWindow = window.open(shareUrl, "_blank", "width=600,height=400");
        
        // Kiểm tra nếu cửa sổ bị chặn
        if (!shareWindow) {
            alert("Vui lòng cho phép popup để chia sẻ!");
            shareBtn.innerHTML = originalText;
            shareBtn.disabled = false;
            return;
        }

        // Khôi phục trạng thái nút sau 2 giây
        setTimeout(() => {
            shareBtn.innerHTML = originalText;
            shareBtn.disabled = false;
        }, 2000);
    }
}

// Thêm xử lý đóng chia sẻ khi click bên ngoài
document.addEventListener('click', function(event) {
    const shareContainer = document.getElementById('shareContainer');
    if (event.target === shareContainer) {
        closeShare();
    }
});

// Thêm xử lý đóng chia sẻ khi nhấn ESC
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeShare();
    }
});