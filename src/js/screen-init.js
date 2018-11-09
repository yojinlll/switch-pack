{
  let view = {
    el: '.screen-init',
    template: `
      <div class="logo-left">
        <div class="inside-left">
          <div class="circle-left"></div>
        </div>
      </div>
      <div class="logo-right">
        <div class="circle-right"></div>
      </div>
    `,
    render(){
      $(this.el).html(this.template)
    },
    screenInitNone(){
      $(this.el).addClass('active')
      let timerId = setTimeout(() => {
        $(this.el).css('display', 'none')
        clearTimeout(timerId)
      }, 1000)
    }
  }
  let model = {}
  let controller = {
    init(view, model){
      this.view = view
      this.model = model
      this.view.render()

      this.timer(2000).then(() => {
        this.view.screenInitNone()
        clearTimeout(this.timerId)
      })
    },
    timerId: undefined,
    timer(ms){
      return new Promise((resolve) => {
        this.timerId = setTimeout(resolve, ms)
        return this.timerId
      })
    }
  }

  controller.init(view, model)
}