const STELLER_NOT_SHOW = 0;
const STELLER_SHOW = 1;
const STELLER_CLOSE = -1 ;

var startTime = null;
var isPageLoad = false;
var oldScroll = 0;
var statusNewSteller = STELLER_NOT_SHOW;
var oneThridHeight = 0;

window.onbeforeunload = function() { 
    //save data when reload 
    localStorage.setItem("statusNewSteller", statusNewSteller);
    localStorage.setItem("startTime", startTime);
}


window.onload = function () {

    initData();
    isPageLoad = true;
    //get height document
    oneThridHeight = document.documentElement.scrollHeight / 3;
};

window.onscroll = function () {
    //block scroll before page loaded
    if (!isPageLoad) return;

    //detect when newsletter close and wait for 10 minute
    if (startTime == null) { 
        startTime = new Date().getTime();
    } else {
        if (statusNewSteller == STELLER_CLOSE) {
            var endDate = new Date().getTime();
            var freezeTime = endDate - startTime;
            if (freezeTime  >= (10000)) statusNewSteller = STELLER_NOT_SHOW;
            console.log(freezeTime);
        }
    }

    //show newsteller when scroll one third page
    if (oldScroll < this.scrollY) {
        if (this.scrollY >= oneThridHeight && (statusNewSteller == STELLER_NOT_SHOW || statusNewSteller == STELLER_SHOW)    ) {
            openNewSteller();
        }
    }
    oldScroll = this.scrollY
}

function initData () {
    //get data from local
    
}

function hideNotif() {
    let notifElement = document.getElementById("notif-panel");
    let imgLogo = document.querySelector(".logo");
    notifElement.setAttribute("class","anim-slide-up");
    imgLogo.style.transform = "translate(30px,100%)";
}

function openNewSteller() {
    statusNewSteller = STELLER_SHOW;
    console.log ("open");
    let newSteller = document.getElementById("newsletter-panel");
    let styleNewSteller = document.querySelector("#newsletter-panel");
    styleNewSteller.style.display = "unset"; 
    newSteller.setAttribute("class","anim-slide-up-open");
    styleNewSteller.style.opacity = "0.9"; 
}

function closeNewSteller() {
    startTime = new Date().getTime();
    statusNewSteller = STELLER_CLOSE;
    let newSteller = document.getElementById("newsletter-panel");
    let styleNewSteller = document.querySelector("#newsletter-panel");
    newSteller.setAttribute("class","anim-slide-down");
    styleNewSteller.style.opacity = "0"; 

    setTimeout ((function() {
        styleNewSteller.style.display = "none"; 
    }),1000)
}