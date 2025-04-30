$(document).on("keydown", function (event) {
    $("h1").text(event.key);
});


$("h1").on("mouseover", function (event) {
    $(this).css("color", "green");
});