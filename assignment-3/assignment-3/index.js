let count = 0;

function state() {
    var request = document.getElementById("switch");
    let path;
    if (count % 2 == 0) {
        path = "assets/on.png";
        request.innerHTML = "Turn off";
    }
    else {
        path = "assets/off.png";
        request.innerHTML = "Turn on";
    }
    count++;
    document.getElementById("Image").src = path;
}
