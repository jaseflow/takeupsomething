window.addEventListener('DOMContentLoaded', function(event) {

  const body = document.querySelector('body')
  const target = document.getElementById('stick-target')

  let lastScrollY = 0
  let ticking = false

  let isStuck = false
  let targetTop = Math.floor((target.getBoundingClientRect().top - 140) + document.documentElement.scrollTop)


  if (window.scrollY >= targetTop && !isStuck) {
    document.querySelector('body').classList.add('stuck')
    isStuck = true
  }

  const update = () => {
    console.log('window scroll ', window.scrollY)
    console.log('target top: ', targetTop)
    console.log('is stuck: ', isStuck)
    if (window.scrollY >= targetTop && !isStuck) {
      document.querySelector('body').classList.add('stuck')
      isStuck = true
    } else if (window.scrollY < targetTop && isStuck) {
      document.querySelector('body').classList.remove('stuck')
      isStuck = false
    }
    ticking = false
  }

  const requestTick = () => {
    if (!ticking) {
      window.requestAnimationFrame(update)
      ticking: true
    }
  }

  const onScroll = () => {
    lastScrollY = window.scrollY
    requestTick()
  }

  window.addEventListener('scroll', onScroll)

}, false);
