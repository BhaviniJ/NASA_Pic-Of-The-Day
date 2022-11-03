let sb = document.querySelector("#sb")
let newDate = document.querySelector("#dateSearch")
let content = document.querySelector("#content")
let save = document.querySelector("#save")
sendApiReq()
saveImg()
// console.log(localStorage)

newDate.addEventListener("click", () => {
    let newDate = document.querySelector("#dateSearch").value
    if (save.classList.value == "") {
        save.innerHTML = "Save";
        save.classList.value = "button primary";
    }
})
sb.addEventListener("click", () => {
    if (newDate == document.querySelector("#dateSearch").value) {
        console.log("Enter new date")
    } else {
        newDate = document.querySelector("#dateSearch").value
        document.querySelector("#content").innerHTML = ""
        sendApiReq(newDate)
    }
})
save.addEventListener("click", (data) => {
    if (save.classList.value == "") {
        save.innerHTML = "Save";
        save.classList.value = "button primary";
    } else {
        save.innerHTML = "Saved"
        save.classList.value = ""
        // localStorage.setItem("date", newDate.value)
        saveImg()
    }
})

async function sendApiReq(newDate) {
    let queryUrl = "https://api.nasa.gov/planetary/apod?"
    let api_key = "api_key=RHVpu8MsDUmfzlsHe29PUd42WDcbllMN4a9zGgY2"
    if (!newDate) {
        let query = queryUrl + api_key
        let queryData = await fetch(query)
        let data = await queryData.json()
        apiData(data)
    } else {
        let nDate = "&date=" + newDate
        let query = queryUrl + api_key + nDate
        let queryData = await fetch(query)
        let data = await queryData.json()
        apiData(data)
    }
}

function apiData(data) {
    let mt = data.media_type
    if (mt == "image") {
        document.querySelector("#content").innerHTML += `<a id="anch" href="${data.hdurl}"target="_blank"><img id="imgHdurl" src="${data.url}"/></a>`
    } else {
        document.querySelector("#content").innerHTML += `<iframe src="${data.url}"</iframe>`
    }
    document.querySelector("#exp").innerHTML = data.explanation;
    document.querySelector("#dateSearch").value = data.date
}
// window.addEventListener('hashchange', () => {
//     location.reload();
// })

function saveImg() {
    const savedLocation = document.querySelector("#savedImgs")
    const imgs = JSON.parse(localStorage.getItem("imgs")) || []
    const imgData = (imgDate, imgExp, imgUrl) => {
        imgs.push({
            imgDate,
            imgExp,
            // imgType,
            imgUrl,
        });
        // imgs.splice(0, imgs.length);
        localStorage.setItem("imgs", JSON.stringify(imgs));
        return { imgDate, imgExp, imgUrl };
    };

    const createImgElem = ({ imgDate, imgExp, imgUrl }) => {
        const imgDiv = document.createElement("div")
        // imgDiv.classList()
        const imgDivExp = document.createElement("p")
        const imgDivUrl = document.createElement("img")

        imgDivExp.innerText = imgExp;
        imgDivUrl.src = imgUrl;

        imgDiv.append(imgDivExp, imgDivUrl);
        savedLocation.appendChild(imgDiv);
    };

    imgs.forEach(createImgElem);

    const newImg = imgData(
 
        document.querySelector("#dateSearch").value,
        document.querySelector("#exp").innerHTML,
        document.querySelector("#imgHdurl").src,
        
    );
    createImgElem(newImg);
}
