// start settings box

// open and close the box, add spin class on icon and change icon

const settingsBox = document.querySelector(".settings-box");
const icons = document.querySelector(".settings-box .icon");
const leftIcon = document.querySelector(".settings-box .icon .fa-angle-left");
const rightIcon = document.querySelector(".settings-box .icon .fa-angle-right");
const setIcon = document.querySelector(".settings-box .setIcon .span .fa-gear");

icons.addEventListener(("click"), () => {
    settingsBox.classList.toggle("open")
    icons.classList.toggle("paint")
    leftIcon.classList.toggle("none")
    rightIcon.classList.toggle("none")
    setIcon.classList.toggle("fa-spin")
})

// close settings box by Escape key

document.addEventListener(("keyup"), (e) => {
    if (e.key === "Escape") {
        settingsBox.classList.remove("open")
        icons.classList.remove("paint")
        leftIcon.classList.add("none")
        rightIcon.classList.remove("none")
        setIcon.classList.remove("fa-spin")
    }
})


// box number 1
// change maine color when click on span

const colorsSpan = document.querySelectorAll(".settings-box .colors .choseen>span")

colorsSpan.forEach((span) => {
    span.addEventListener("click", () => {
        colorsSpan.forEach((spans) => {
            spans.classList.remove("active")
        })
        span.classList.add("active")
        //    console.log( span.dataset.color)
        document.documentElement.style.setProperty("--main-color", span.dataset.color)
        localStorage.setItem("main-color", span.dataset.color)
    })
})

// check localStorage data

let mainColor = localStorage.getItem("main-color");

if (mainColor !== null) {
    // console.log("ok")
    document.documentElement.style.setProperty("--main-color", mainColor)
    document.querySelector(`[data-color = "${mainColor}"]`).classList.add("active")
} else {
    document.querySelector(".settings-box .colors .choseen>span.clr1").classList.add("active")
}




// box number 2
// random background image

const yesNoSpans = document.querySelectorAll(".settings-box .option span")
let backgroundOption = true;

// add and remove active class and random background images
yesNoSpans.forEach((span) => {
    span.addEventListener(("click"), (e) => {
        yesNoSpans.forEach((a) => {
            a.classList.remove("active")
        })
        e.target.classList.add("active")

        if (e.target.classList.contains("yes")) {
            clearInterval(imgInterval)
            backgroundOption = true;
            randomImage()
            localStorage.setItem("bgOption", "yes")
        } else {
            clearInterval(imgInterval)
            localStorage.setItem("bgOption", "no")
            localStorage.setItem("numOfBgImg", landdingPage.style.backgroundImage)
        }
    })
})

// check localStorage data
if (localStorage.getItem("bgOption") === "yes") {
    backgroundOption = true
}
else if (localStorage.getItem("bgOption") === "no") {
    backgroundOption = false
};


// check background option and add active class
if (backgroundOption === true) {
    document.querySelector(".settings-box .option span.yes").classList.add("active")
} else (
    document.querySelector(".settings-box .option span.no").classList.add("active")
)



// toggol light and night mode

const mode = document.querySelector(".settings-box .mode>div span")
const span = document.querySelector(".settings-box .mode>div span")
mode.onclick = () => {
    span.classList.toggle("active")

    if (span.classList.contains("active")) {
        document.documentElement.style.setProperty("--light-color", "#302f2f")
        document.documentElement.style.setProperty("--night-color", "white")
    }
    else {
        document.documentElement.style.setProperty("--night-color", "#302f2f")
        document.documentElement.style.setProperty("--light-color", "white")
    }
}


// reset option

const resetBtn = document.querySelector(".settings-box .reset-options .reset");

resetBtn.onclick = () => {
    // localStorage.clear()

    localStorage.removeItem("bgOption")
    localStorage.removeItem("numOfBgImg")
    localStorage.removeItem("main-color")

    window.location.reload()
}

// end settings box

// start landing page
// start heading linkes

const ulLink = document.querySelector(".landding-page .header-area .links");
const menu = document.querySelector(".landding-page .header-area .menu");

menu.onclick = (e) => {
    e.stopPropagation()
    ulLink.classList.toggle("open-menu")
}

document.addEventListener(("click"), (e) => {

    if (e.target !== menu) {
        ulLink.classList.remove("open-menu")
    }
})

// end heading linkes

// start background image

const landdingPage = document.querySelector(".landding-page");

// Array of Background Image
let images = ["01.jpg", "02.jpg", "03.jpg", "04.jpg"]
let imgInterval;

function randomImage() {
    if (backgroundOption === true) {
        let ind = 0;
        imgInterval = setInterval(() => {
            if (ind < images.length) {
                landdingPage.style.backgroundImage = 'url(./image/' + images[ind++] + ')'
                // '+ +' === ${}
                ind === images.length ? ind = 0 : '';
            }
            // console.log(ind)
        }, 6000)
    }
    else {
        // check localStotage
        if (localStorage.getItem("numOfBgImg") !== null) {
            // console.log(localStorage.getItem("numOfBgImg"))
            landdingPage.style.backgroundImage = `${localStorage.getItem("numOfBgImg")}`
        }
    }
}

randomImage()


// end landing page

// start our skills

let skillsContainer = document.querySelector(".skills");
let skillsProggres = document.querySelectorAll(".our-skill .skill-box .progg span");

window.addEventListener(("scroll"), () => {

    if (window.scrollY >= skillsContainer.offsetTop - 300) {
        skillsProggres.forEach((p) => {
            p.style.width = `${p.dataset.width}`
        })
    }
    if (window.scrollY < skillsContainer.offsetTop - 600) {
        skillsProggres.forEach((p) => {
            p.style.width = `0`
        })
    }

    // another way

    // let skillsOfsetTop = skillsContainer.offsetTop;
    // console.log(skillsOfsetTop)

    // let skillsHeigt = skillsContainer.offsetHeight;
    // console.log(skillsHeigt)

    // let windowHeight = window.innerHeight;
    // console.log(windowHeight)

    // let windowScrolltop = window.pageYOffset;
    // console.log(windowScrolltop)

    // if (windowScrolltop > (skillsOfsetTop + skillsHeigt - windowHeight)) {
    //     skillsProggres.forEach((p) => {
    //         p.style.width = `${p.dataset.width}`
    //     })
    // }

})

// end our skills

// start our gallary

let gallaryImages = document.querySelectorAll(".our-gallary .image-box img");

gallaryImages.forEach((img) => {
    img.addEventListener(("click"), (e) => {

        // create and append overlay
        let popupOverlay = document.createElement("div");
        popupOverlay.className = "popup-overlay";
        document.body.appendChild(popupOverlay);

        // create and append popup box
        let popupBox = document.createElement("div");
        popupBox.className = `popup-box`;
        document.body.appendChild(popupBox);

        // create a text of image
        if (img.alt !== "") {
            // console.log(img.alt)
            let imageText = document.createElement("h4")
            imageText.appendChild(document.createTextNode(img.alt))
            popupBox.appendChild(imageText)
        }

        // add image
        let imageDiv = document.createElement("div")
        let iimage = document.createElement("img")
        imageDiv.className = `image-div`
        iimage.src = img.src
        imageDiv.appendChild(iimage)
        popupBox.appendChild(imageDiv)

        // add close span
        let closeSpan = document.createElement("span");
        closeSpan.className = "close-span";
        closeSpan.textContent = `X`
        popupBox.appendChild(closeSpan)

        closeSpan.onclick = () => { closeSpan.parentElement.remove(); popupOverlay.remove() }

        document.addEventListener(("keyup"), (e) => {
            if (e.key === "Escape") {
                closeSpan.parentElement.remove(); popupOverlay.remove()
            }
        })
    })
})
// end our gallary 



















