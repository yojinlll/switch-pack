{
  let view = {
    el: '.switch-canvas',
    template: `
       <iframe src="https://yojinlll.github.io/canvas-demo/" frameborder="0"></iframe>
    `,
    render(data){
      let $el = $(this.el)
      $el.html(this.template)
    },
    canvasShow(){
      $(this.el).addClass('active')
    }
  }
  let model = {}
  let controller = {
    init(view, model){
      this.view = view
      this.model = model
      this.view.render()

      this.timer(3000).then(() => {
        this.view.canvasShow()
        clearTimeout(this.timerId)
      })
    },
    timerId: undefined,
    timer(ms){
      return new Promise((resolve) => {
        this.timerId = setTimeout(resolve, ms)
        return this.timerId
      })
    },
  }

  controller.init(view, model)
}