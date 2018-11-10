{
  let view = {
    el: '.switch-slider',
    template: `
      <div class="slider">
        <div class="carousel">
          <ul class="img-ct">
            <li data-index=0><a href=""><img src="http://cdn.jirengu.com/book.jirengu.com/img/1.jpg" alt="1.jpg"></a></li>
            <li data-index=1><a href=""><img src="http://cdn.jirengu.com/book.jirengu.com/img/2.jpg" alt="2.jpg"></a></li>
            <li data-index=2><a href=""><img src="http://cdn.jirengu.com/book.jirengu.com/img/3.jpg" alt="3.jpg"></a></li>
            <li data-index=3><a href=""><img src="http://cdn.jirengu.com/book.jirengu.com/img/4.jpg" alt="4.jpg"></a></li>
          </ul>
          <a class="btn btn-pre" href="#">&lt;</a>
          <a class="btn btn-next" href="#">&gt;</a>
          <div class="bullet-ct">
            <ul class="bullet">
              <li class="active"></li>
              <li></li>
              <li></li>
              <li></li>
            </ul> 
          </div>
        </div>
      </div>
    `,
    render(data){
      let $el = $(this.el)
      $el.html(this.template)
      console.log(3333)
    },
  }
  let model = {}
  let controller = {
    init(view, model){
      this.view = view
      this.model = model
      this.view.render()
      this.bindEvents()
    },
    bindEvents(){
        var $imgCt = $('.img-ct'),
          $preBtn = $('.btn-pre'),
          $nextBtn = $('.btn-next'),
          $bullet = $('.bullet');

        var $firstImg = $imgCt.find('li').first(),
          $lastImg = $imgCt.find('li').last();

        var curPageIndex = 0;
        var imgLength = $imgCt.children().length;
        var isAnimate = false;

        $imgCt.prepend($lastImg.clone())
        $imgCt.append($firstImg.clone())

        $imgCt.width($firstImg.width() * $imgCt.children().length)
        $imgCt.css('left', '-300px')

        $preBtn.on('click', function(e){
          e.preventDefault();
          playPre();
        })

        $nextBtn.on('click', function(e){
          e.preventDefault();
          playNext();
        })



        function playNext(n){
          if(isAnimate) return;
          isAnimate = true;
          $imgCt.animate({
            left: '-=300'
          }, function(){
            curPageIndex++;
            if(curPageIndex === imgLength){
              $imgCt.css({'left': '-300px'})
              curPageIndex = 0
            }
            isAnimate = false;
            setBullet();
          })
        }

        function playPre(){
          if(isAnimate) return;
          isAnimate = true;
          $imgCt.animate({
            left: '+=300'
          }, function(){
            curPageIndex--;
            if(curPageIndex < 0){
              $imgCt.css('left', -(imgLength*$firstImg.width()));
              curPageIndex = imgLength - 1
            }
            isAnimate = false;
            setBullet()
          })
        }

        function setBullet(){
          $bullet.children()
            .removeClass('active')
            .eq(curPageIndex)
            .addClass('active')
        }
    },
  }

  controller.init(view, model)
}