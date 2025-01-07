export default ({ app }, inject) => {
  const anchor = error => {
    let anchor = document.querySelectorAll('.js-anchor')
    for (var i = 0; i < anchor.length; i++) {
      anchor[i].addEventListener('click', function(event) {
        const anchorTo = this.getAttribute('anchor-to')
        const element = document.getElementById(anchorTo)

        const topPosition =
          element.getBoundingClientRect().top + window.pageYOffset

        window.scrollTo({
          top: topPosition - 150,
          behavior: 'smooth'
        })
      })
    }
  }
  inject('anchor', anchor)
}
