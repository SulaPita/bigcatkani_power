/*他沒有反應QQ
const sections = document.querySelectorAll(".section");

const observerOptions = {
    threshold: 0.2, // 當區塊至少有一半進入視窗時觸發
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("active"); // 可選，添加樣式
        } else {
            entry.target.classList.remove("active");
        }
    });
}, observerOptions);

sections.forEach((section) => {
    observer.observe(section);
});*/
