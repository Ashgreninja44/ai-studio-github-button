function createGithubButton(shareBtn) {

    const existing = document.getElementById("custom-github-btn");

    // Remove broken old button
    if (existing) {
        existing.remove();
    }

    const toolbar = shareBtn.parentElement;

    if (!toolbar) return;

    // Create button
    const btn = document.createElement("button");
    btn.id = "custom-github-btn";

    btn.innerHTML = `
        <img src="${chrome.runtime.getURL("github.png")}" />
        <span>GitHub</span>
    `;

    btn.onclick = () => {

        shareBtn.click();

        setTimeout(() => {

            const githubTab = [...document.querySelectorAll("button, div")]
                .find(el =>
                    el.innerText?.trim() === "GitHub"
                );

            if (githubTab) {
                githubTab.click();
                console.log("GitHub tab opened 🚀");
            }

        }, 700);
    };

    toolbar.insertBefore(btn, shareBtn);
}

function injectButton() {

    const buttons = [...document.querySelectorAll("button")];

    const shareBtn = buttons.find(
        btn => btn.innerText.trim() === "Share"
    );

    if (!shareBtn) return;

    const existing = document.getElementById("custom-github-btn");

    // Reinject if detached
    if (!existing || !document.body.contains(existing)) {
        createGithubButton(shareBtn);
    }
}

// Observe DOM
const observer = new MutationObserver(() => {
    injectButton();
});

observer.observe(document.body, {
    childList: true,
    subtree: true
});

// Initial inject
window.addEventListener("load", () => {
    injectButton();
});

// Extra fallback
setInterval(() => {
    injectButton();
}, 2000);