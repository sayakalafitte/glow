$(".openbtn").click(function () {//ボタンがクリックされたら
	$(this).toggleClass('active');//ボタン自身に activeクラスを付与し
    $("#g-nav").toggleClass('panelactive');//ナビゲーションにpanelactiveクラスを付与
});

$("#g-nav a").click(function () {//ナビゲーションのリンクがクリックされたら
    $(".openbtn").removeClass('active');//ボタンの activeクラスを除去し
    $("#g-nav").removeClass('panelactive');//ナビゲーションのpanelactiveクラスも除去
});

//画面が読み込まれたら＆リサイズされたら
$(window).on('load resize', function() {
    var windowWidth = window.innerWidth;
    var elements = $('.nav-list');//position: sticky;を指定している要素
    if (windowWidth >= 768) {/*768px以上にIE用のJSをきかせる*/
      Stickyfill.add(elements);
    }else{
      Stickyfill.remove(elements);
    } 
  });


  //スクロールした際の動きを関数でまとめる
function PageTopAnime() {

    var scroll = $(window).scrollTop(); //スクロール値を取得
    if (scroll >= 200){//200pxスクロールしたら
      $('#page-top').removeClass('DownMove');   // DownMoveというクラス名を除去して
      $('#page-top').addClass('UpMove');      // UpMoveというクラス名を追加して出現
    }else{//それ以外は
      if($('#page-top').hasClass('UpMove')){//UpMoveというクラス名が既に付与されていたら
        $('#page-top').removeClass('UpMove'); //  UpMoveというクラス名を除去し
        $('#page-top').addClass('DownMove');  // DownMoveというクラス名を追加して非表示
      }
    }
    
    var wH = window.innerHeight; //画面の高さを取得
    var footerPos =  $('#footer').offset().top; //footerの位置を取得
    if(scroll+wH >= (footerPos+10)) {
      var pos = (scroll+wH) - footerPos+10 //スクロールの値＋画面の高さからfooterの位置＋10pxを引いた場所を取得し
      $('#page-top').css('bottom',pos); //#page-topに上記の値をCSSのbottomに直接指定してフッター手前で止まるようにする
    }else{//それ以外は
      if($('#page-top').hasClass('UpMove')){//UpMoveというクラス名がついていたら
        $('#page-top').css('bottom','10px');// 下から10pxの位置にページリンクを指定
      }
    }
}

// 画面をスクロールをしたら動かしたい場合の記述
$(window).scroll(function () {
  PageTopAnime();/* スクロールした際の動きの関数を呼ぶ*/
});

// ページが読み込まれたらすぐに動かしたい場合の記述
$(window).on('load', function () {
  PageTopAnime();/* スクロールした際の動きの関数を呼ぶ*/
});

// #page-topをクリックした際の設定
$('#page-top').click(function () {
    $('body,html').animate({
        scrollTop: 0//ページトップまでスクロール
    }, 500);//ページトップスクロールの速さ。数字が大きいほど遅くなる
    return false;//リンク自体の無効化
});