$(document).ready(function () {
    $("#submit").click(function (e) {
        var validate = Validate();
        $("#message").html(validate);
        if (validate.length == 0) {
            CallAPI(1);
        }
    });

    $("#message").on("click", ".result", function () {
        var resourceId = $(this).attr("resourceId");
        $.ajax({
            url: "https://api.themoviedb.org/3/tv/" + resourceId + "?language=en-US",
            data: {
                api_key: "45f7260793efb5b85e804c92955fc90f"
            },
            dataType: 'json',
            success: function (result, status, xhr) {
                $("#modalTitleH4").html(result["name"]);

                var image = result["poster_path"] == null ? "Image/filme.jpg" : "https://image.tmdb.org/t/p/w500/" + result["poster_path"];
                var biography = result["overview"] == null ? "No information available" : result["overview"];

                var resultHtml = "<p class=\"text-center\"><img class=\"image-card\" src=\"" + image + "\"/><div class=\"bio\">" + biography + "</p>";
                resultHtml += "Popularity => " + result["popularity"] + "</p><p>Seasons => " + result["number_of_seasons"] + "</p><p>Number of episodes => " + result["number_of_episodes"] + "</div>";

                $("#modalBodyDiv").html(resultHtml)
                 $("imageDiv").modal("hide")
                $("#myModal").modal("show");
            },
            error: function (xhr, status, error) {
                $("#message").html("Result: " + status + " " + error + " " + xhr.status + " " + xhr.statusText)
            }
        });
    });

    $(document).ajaxStart(function () {
        $(".imageDiv img").show();
    });

    $(document).ajaxStop(function () {
        $(".imageDiv img").hide();
    });


    function CallAPI(page) {
        $.ajax({
            url: "https://api.themoviedb.org/3/search/tv?language=en-US&query=" + $("#searchInput").val() + "&page=" + page + "&include_adult=false",
            data: { "api_key": "45f7260793efb5b85e804c92955fc90f" },
            dataType: "json",
            success: function (result, status, xhr) {
                var resultHtml = $("<div class=\"resultDiv\"><p></p>");
                for (i = 0; i < result["results"].length; i++) {

                    var image = result["results"][i]["poster_path"] == null ? "Image/filme.jpg" : "https://image.tmdb.org/t/p/original/" + result["results"][i]["poster_path"];

                    resultHtml.append("<div class=\"result\" resourceId=\"" + result["results"][i]["id"] + "\">" + "<img src=\"" + image + "\" />" + "<p><a>" + result["results"][i]["name"] + "</a></p></div>")
                }

                resultHtml.append("</div>");
                $("#message").html(resultHtml);

            },
            error: function (xhr, status, error) {
                $("#message").html("Result: " + status + " " + error + " " + xhr.status + " " + xhr.statusText)
            }
        });
    }
    
    function Validate() {
        var errorMessage = "";
        if ($("#searchInput").val() == "") {
            errorMessage += "Insire text !!!";
        }
        return errorMessage;
    }
});