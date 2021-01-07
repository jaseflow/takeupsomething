window.addEventListener('DOMContentLoaded', function(event) {
  const header = document.querySelector('.header')

  var spy = new Gumshoe('#TableOfContents a', {
    offset: () => {
      return header.getBoundingClientRect().height + 32
    }
  });
}, false);
