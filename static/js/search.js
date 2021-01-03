window.addEventListener("DOMContentLoaded", function(event)
{
  var index = null;
  var lookup = null;
  var queuedTerm = null;

  var form = document.getElementById("search");
  var input = document.getElementById("search-input");


  const results = document.querySelector("#search-results");
  const target = document.querySelector("#search-list");
  const template = document.getElementById("search-result");

  input.addEventListener("keyup", function(event)
    {
      var term = input.value.trim();
      if (term.length > 2) {
        startSearch(term);
      } else if (term.length === 0) {
        results.classList.remove('search__results--searching');
      }
    }, false);

  //input.addEventListener("blur", function(event)
   // {
   //   results.classList.remove('search__results--searching');
    //}, false);

  function startSearch(term)
  {
    form.setAttribute("data-running", "true");
    results.classList.add('search__results--searching');

    if (index)
    {
      search(term);
    }
    else if (queuedTerm)
    {
      queuedTerm = term;
    }
    else
    {
      queuedTerm = term;
      initIndex();
    }
  }

  function searchDone()
  {
    form.removeAttribute("data-running");

    queuedTerm = null;
  }

  function initIndex()
  {
    var request = new XMLHttpRequest();
    request.open("GET", "/search.json");
    request.responseType = "json";
    request.addEventListener("load", function(event)
      {
        lookup = {};
        index = lunr(function()
          {

            this.ref("uri");
            this.field("title");
            this.field("content");
            this.field("description");
            this.field("categories");

            for (var doc of request.response)
            {
              this.add(doc);
              lookup[doc.uri] = doc;
            }
          });

        search(queuedTerm);
      }, false);
    request.addEventListener("error", searchDone, false);
    request.send(null);
  }

  function search(term)
  {
    var results = index.search(term);

    while (target.firstChild)
      target.removeChild(target.firstChild);

    var title = document.createElement("h4");
    title.id = "search-results";
    title.className = "search__title small-caps";

    if (results.length == 0)
      title.textContent = `No results found for “${term}”`;
    else if (results.length == 1)
      title.textContent = `Found one result for “${term}”`;
    else
      title.textContent = `Found ${results.length} results for “${term}”`;
    target.appendChild(title);
    document.title = title.textContent;

    for (var result of results)
    {
      var doc = lookup[result.ref];

      var element = template.content.cloneNode(true);
      element.querySelector(".summary-title-link").href = doc.uri
      element.querySelector(".summary-title-link").textContent = doc.title;
      target.appendChild(element);
    }
    title.scrollIntoView(true);

    searchDone();
  }

  function truncate(text, minWords)
  {
    var match;
    var result = "";
    var wordCount = 0;
    var regexp = /(\S+)(\s*)/g;
    while (match = regexp.exec(text))
    {
      wordCount++;
      if (wordCount <= minWords)
        result += match[0];
      else
      {
        var char1 = match[1][match[1].length - 1];
        var char2 = match[2][0];
        if (/[.?!"]/.test(char1) || char2 == "\n")
          {
            result += match[1];
            break;
          }
          else
          result += match[0];
        }
    }
    return result;
  }
}, false);
