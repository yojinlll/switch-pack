{
  let view = {
    el: '.switch-music',
    template: `
      <div class="art">
        <div class="cover">
        </div>
        <div class="singer"></div>
      </div>
      <div class="controller"></div>
      <div class="song-list">
        <ul></ul>
      </div>
    `,
    render(){
      $(this.el).html(this.template)
    },
    musicShow(){
      $(this.el).addClass('active')
      console.log(121212)
    }
  }
  let model = {}
  let controller = {
    init(view, model){
      this.view = view
      this.model = model
      this.view.render()

      this.timer(3000).then(() => {
        this.view.musicShow()
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