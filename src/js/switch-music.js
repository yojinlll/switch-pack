{
  let view = {
    el: '.switch-music',
    template: `
      <div class="art-controller-wrapper">
        <div class="art">
          <div class="cover">
          </div>
          <div id="singer" class="singer"></div>
        </div>
        <div class="music-controller"></div>
      </div>
      <div class="song-list">
        <ul id="songList"></ul>
      </div>
    `,
    render(data){
      let $el = $(this.el)
      $el.html(this.template)
      let {songs, selectedSongId} = data
      let liList = songs.map((song) => {
        let $li = $('<li></li>').text(song.name).attr('data-song-id', song.id)
        // if(song.id === selectedSongId){ $li.addClass('active').siblings('.active').removeClass('active') }
        return $li
      })
      $el.find('ul').empty()
      liList.map((domLi) => {
        $el.find('ul').append(domLi)
      })

    },
    firstArtShow(data){
      let {songs} = data
      $('#singer').text(songs[0].name)
      if(songs[0].cover !== ''){
        $('#singer').attr('style', `background-image:url(${songs[0].cover})`)
      }

    },
    musicShow(){
      $(this.el).addClass('active')
    }
  }
  let model = {
    data: {
      songs: [],
      selectedSongId: undefined,
    },
    find(){
      let query = new AV.Query('Song')
      return query.find().then((songs) => {
        this.data.songs = songs.map((song) => {
          return {id: song.id, ...song.attributes}
        })
      })
      return songs
    }
  }
  let controller = {
    init(view, model){
      this.view = view
      this.model = model
      this.view.render(this.model.data)

      this.getAllSongs().then(()=>{
        this.view.firstArtShow(this.model.data)
      })


      console.log(1212)
      this.bindEvents()
      console.log($('#songList'))


      this.timer(3000).then(() => {
        this.view.musicShow()
        clearTimeout(this.timerId)
      })
    },
    getAllSongs(){
      return this.model.find().then(() => {
        this.view.render(this.model.data)
      })
    },
    bindEvents(){
      console.log($('.song-list'))
      $('.song-list').on('click', ()=>{
          console.log('fuck')
        }
      )
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