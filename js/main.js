var gg = new GraphGenerator("cemasma");

window.onload = function () {
    gg.generate();
    gg.appendToImg("image");
}

function textChangeListener(textInput) {
    document.getElementsByTagName("h1")[0].innerText = textInput.value;
    gg.setText(textInput.value);
    gg.generate();
    gg.appendToImg("image");
}