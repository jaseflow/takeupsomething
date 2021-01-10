window.addEventListener('DOMContentLoaded', function(event) {

  const body = document.querySelector('body')
  const target = document.getElementById('stick-target')

  let lastScrollY = 0
  let ticking = false

  let isStuck = false
  let targetTop
  if(target) {
    targetTop = Math.floor((target.getBoundingClientRect().top - 140) + document.documentElement.scrollTop)
  }


  if(window.innerWidth > 959 && target) {
    if (window.scrollY >= targetTop && !isStuck) {
      document.querySelector('body').classList.add('stuck')
      isStuck = true
    }

    const update = () => {
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
  }

}, false);
