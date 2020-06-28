var uploadUrl = "https://face-recognition-masked-unmasked.cognitiveservices.azure.com/customvision/v3.0/Prediction/68e29f1e-edea-4108-85e4-4a92480efe57/classify/iterations/Final%20AI%20Model/image";
var threshold = 0.8;

window.onload = function() {
    setTimeout(logoDisappear, 2000);
}

function logoDisappear() {
    document.getElementById('logo').style.display = "none";
    document.body.style.backgroundImage = "url('img/face-blur2.png')";
}

function upload(file) {

    // HTTP Request
    let xhr = new XMLHttpRequest();
    xhr.open("POST", uploadUrl);
    xhr.setRequestHeader('Prediction-Key', '04b3d203a0b74db08bba5834f5f43223');
    xhr.setRequestHeader('Content-Type', 'application/octet-stream');
    xhr.send(file);
    xhr.onload = () => {
        let x = xhr.response;
        var objJson = JSON.parse(x);
        console.log(xhr.response);
        let maxProb = 0;
        let maxName = "";
        objJson.predictions.forEach(num => {
            if (num.probability > maxProb) {
                maxProb = num.probability;
                maxName = num.tagName;
            }
        });
        if (maxProb > threshold) {
            document.getElementById('nameSpan').innerHTML = maxName;
            document.getElementById('probSpan').innerHTML = (maxProb * 100).toFixed(4) + "%";
        } else {
            document.getElementById('nameSpan').innerHTML = "No close matches found";
            document.getElementById('nameSpan').style.left = "34%";
        }
    }

    //Display the same image from input
    var oFReader = new FileReader();
    oFReader.readAsDataURL(document.getElementById("upload-image").files[0]);
    oFReader.onload = function(oFREvent) {
        document.getElementById("uploadPreview").src = oFREvent.target.result;
    };
    document.getElementById("uploadPreview").style.display = "block";
};