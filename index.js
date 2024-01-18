let imgBox = document.querySelector("#imgBox");
let qrImg = document.querySelector("#qrImg");
let qrText = document.querySelector("#qrText");
let historybtn = document.querySelector("#historybtn");
let changeColor = document.querySelector("#color-input");
let para = document.querySelector("p");
let reset = document.querySelector("#resetbtn");
let mainCon = document.querySelector(".mainContainer");
let container = document.querySelector(".container");
let copyBtn = document.querySelector(".fa-copy");
let qrHistory = [
    {
        hisImg :  qrImg.src,
        hisText :  qrText.value,
    }
]
let colorWithoutHash = "";

function generateQR(){
    if(qrText.value !== ""){
        colorWithoutHash = changeColor.value.split("#").join("");
        qrImg.src = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" + qrText.value + "&bgcolor=" + colorWithoutHash;
    }
    else{
        qrImg.src = "resources/download.png"; 
    }
}
qrText.addEventListener("keyup",function(e){
    colorWithoutHash = changeColor.value.split("#").join("");
    generateQR();
    qrImg.classList.add("qrImg");
    para.style.fontSize = "15px";
    para.style.textDecoration = "none";
    warn.remove();
    qrText.style.border = "2px solid green";
    if(e.key == "Enter" && qrText.value == ""){
        warning();
    }
    if(e.key == "Enter"){
        showHistory();
    }
})
// let btn = document.querySelector("#btn");
// btn.addEventListener("click",function(){
//     if(qrText.value == ""){
//         warning();
//     }
//     else{
//         colorWithoutHash = changeColor.value.split("#").join("");
//         generateQR();
//         qrImg.style.margin = "20px";
//         para.style.fontSize = "15px";
//         para.style.textDecoration = "none";
//         warn.remove();
//         qrText.style.border = "2px solid green";
//         showHistory();
//     }
// });

para.addEventListener("click",function(){
    para.style.textDecoration = "underline";
    para.style.fontSize = "10px";
    qrText.style.scale = "1.01";
    qrText.style.border = "2px solid green";
})
qrText.addEventListener("click",function(){
    para.style.color = "green"
    para.style.textDecoration = "underline green";
    para.style.fontSize = "10px";
    
})

reset.addEventListener("click",function(){
    if(qrText.value == ""){
        warning();
    }
    else{
        qrText.value = "";
        qrImg.src = "resources/download.png"; 
        warn.remove();
        historyBox.remove();
    }

})

let isWarn = true;
let warn = document.createElement("p");
function warning(){
    if(isWarn == true){
        warn.innerText = `Enter Something`;
        warn.style.color = "red";
        warn.style.fontSize = "10px";
        warn.style.margin = "0px";
        mainCon.after(warn);
        warn.style.textDecoration = "underline";
        warn.style.textAlign = "end";
        qrText.style.border = "2px solid red";
        isWarn = false;
        para.style.color = "red"
        para.style.textDecoration = "underline red"
    }
}

copyBtn.addEventListener("click",function(){
    if(qrText.value == "" || qrImg.src == "file:///D:/WebDevlopment/JavaScriptProject/QRCodeGenerator/QRcodeGenerator.html"){
        warning();
    }
    else{
        let tempTextarea = document.createElement("input");
        container.append(tempTextarea);
        tempTextarea.value = qrImg.src;
        tempTextarea.select();
        document.execCommand("copy");
        tempTextarea.remove();
        warn.remove();
        showPopUp();
        console.log("Copied");
    }
})


let downBtn = document.querySelector("#downloadbtn");
downBtn.addEventListener("click",function(){
    if(qrText.value == "" ){
        warning();
    }
    else{
        let downloadLink = document.createElement("a");
        downloadLink.href = qrImg.src;
        downloadLink.download = "computer";
        downloadLink.type = "image/jpeg";
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    }
})

let isHis = true;
let addBox1 = document.querySelector(".addBox");
function showHistory() {
    if(isHis == true){
        addBox1.innerHTML = ``;
        isHis = false;
    }
    document.querySelector(".empty-history").innerText = "";
    let historyBox = document.createElement("div");
    let historyImg1 = document.querySelector(".historyImg");
    historyBox.classList.add("historyBox");
    historyBox.innerHTML =
        `<h4>${qrText.value}</h4>
        <a href="${qrImg.src}" class="imgURL">${qrImg.src}</a>
        <img src="${qrImg.src}" alt="" class="historyImg">
        `;
    addBox1.prepend(historyBox);
    console.log(qrText.value);
    console.log(qrImg.src);
    qrHistory.push(qrImg.src);
}


historybtn.addEventListener("click",function(){
    addBox1.innerHTML = `
    <p class="empty-history">History has been deleted</p>
    `;
    isHis = true;
})


function showPopUp(){
    let popUp = document.querySelector(".pop-up");
    popUp.style.display = "block";

    setTimeout(function(){
        popUp.style.display = "none";
    },500);
}