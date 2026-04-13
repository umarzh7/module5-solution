(function (global) {

var dc = {};

var homeHtmlUrl = "snippets/home-snippet.html";
var allCategoriesUrl =
  "https://coursera-jhu-default-rtdb.firebaseio.com/categories.json";

var homeHtmlTemplate;

var $ajaxUtils = window.$ajaxUtils;

// Загружаем главную страницу
dc.loadHome = function () {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", homeHtmlUrl, true);

  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      homeHtmlTemplate = xhr.responseText;
      insertRandomCategory();
    }
  };

  xhr.send(null);
};

// Вставка случайной категории
function insertRandomCategory() {
  $ajaxUtils.sendGetRequest(
    allCategoriesUrl,
    function (categories) {
      var randomCategory = chooseRandomCategory(categories);

      var html = insertProperty(
        homeHtmlTemplate,
        "randomCategoryShortName",
        "'" + randomCategory.short_name + "'"
      );

      document.querySelector("#main-content").innerHTML = html;
    }
  );
}

// Выбор случайной категории
function chooseRandomCategory(categories) {
  var randomIndex = Math.floor(Math.random() * categories.length);
  return categories[randomIndex];
}

// Подстановка значения
function insertProperty(string, propName, propValue) {
  var propToReplace = "{{" + propName + "}}";
  return string.replace(new RegExp(propToReplace, "g"), propValue);
}

// Заглушка для загрузки меню
dc.loadMenuItems = function (categoryShort) {
  document.querySelector("#main-content").innerHTML =
    "<h2>Loaded category: " + categoryShort + "</h2>";
};

document.addEventListener("DOMContentLoaded", function () {
  dc.loadHome();
});

global.$dc = dc;

})(window);
