let imgBox = document.querySelector("#imgBox");
let qrImg = document.querySelector("#qrImg");
let qrText = document.querySelector("#qrText");
let qrHistory = [
    {
        hisImg :  qrImg.src,
        hisText :  qrText.value,
    }
]
let changeColor = document.querySelector("#color-input");
let colorWithoutHash = "";

function generateQR(){
    qrImg.src = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data="+qrText.value +"&bgcolor=" + colorWithoutHash;
}
let btn = document.querySelector("#btn");
btn.addEventListener("click",function(){
    if(qrText.value == ""){
        warning();
    }
    else{
        colorWithoutHash = changeColor.value.split("#").join("");
        generateQR();
        qrImg.style.margin = "20px";
        para.style.fontSize = "15px";
        para.style.textDecoration = "none";
        warn.remove();
        qrText.style.border = "2px solid green";
        showHistory();
    }
});

let para = document.querySelector("p");
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

let reset = document.querySelector("#resetbtn");
let mainCon = document.querySelector(".mainContainer");
let container = document.querySelector(".container");
reset.addEventListener("click",function(){
    if(qrText.value == ""){
        warning();
    }
    else{
        qrImg.style.margin = "0px";
        qrText.value = "";
        qrImg.src = "";
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

let copyBtn = document.querySelector(".fa-copy");
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
        alert("URL copied to clipboard!");
        warn.remove();
    }
})

let loader = document.querySelector(".progress");
qrImg.addEventListener("load",function(){
    loader.style.display = "none";
})

let downBtn = document.querySelector("#downloadbtn");
downBtn.addEventListener("click",function(){
    if(qrText.value == "" ){
        warning();
    }
    else{
        let downloadLink = document.createElement("a");
        downloadLink.href = qrImg.src;
        downloadLink.download = "download_image.jpg";
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


let historybtn = document.querySelector("#historybtn");
historybtn.addEventListener("click",function(){
    addBox1.innerHTML = `
    <p class="afterdelete">History has been deleted</p>
    `;
    isHis = true;

})

