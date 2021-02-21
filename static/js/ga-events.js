window.addEventListener("DOMContentLoaded", function(event) {

  const shareButtons = document.querySelectorAll('.social__link')

  shareButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      gtag('event', 'share', {
        'event_category' : 'engagement',
        'event_label' : 'method'
      })
    })
  })

}, false);
