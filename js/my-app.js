let app = new Framework7({
  root: '#app',
  name: 'My App',
  id: 'com.myapp.test',
  view: {
    stackPages: true,
    pushState: true,
  },
  panel: {
    swipe: false,
    visibleBreakpoint: 1024,
  },
  lazy: {
    threshold: 50,
    sequential: false,
  },
  routes: routes,
});
let mainView = app.views.create('.view-main');
let $$ = Dom7;

get_home();
get_statistik();
get_informasi();
get_posts();
get_categories();

function get_home() {
  app.request.json('https://sidesa.androidcorners.com/api/admin/profile', ((data) => {
    let posts = data.data;
    console.log(posts);
    let tampilkan = '';
    posts.map((post) => {
      tampilkan = tampilkan + '<div class="col"><div class="content"><a href="#" id="baca" data-id="' + post.id + '" class="link sheet-open" data-sheet=".my-sheet-push"><img src="https://sidesa.androidcorners.com/storage/profils/' + post.image + '" alt="Desa"></a><h6>' + post.title + '</h6></div></div>';
    });
    $$("#dataHome").html(tampilkan);
  }))
}
$$("#dataHome").on("click", "#baca", function () {
  app.preloader.show();
  let id = $$(this).data("id");
  app.request.json(`https://sidesa.androidcorners.com/api/admin/profile/${id}`, function (data) {
    let post = data.data;
    let tampilkan = '<div class="block"><p>' + post.content + '</p></div>';
    $$("#detailHome").html(tampilkan);
    setTimeout(function () {
      app.preloader.hide();
    }, );
  });
});


function get_statistik() {
  app.request.json('https://sidesa.androidcorners.com/api/admin/statistiks', ((data) => {
    let posts = data.data;
    console.log(posts);
    let tampilkan = '';
    posts.map((post) => {
      tampilkan = tampilkan + '<div class="col"><div class="content"><a href="#" id="baca" data-id="' + post.id + '" class="link popup-open" data-popup=".my-sheet-push-stat"><img src="https://sidesa.androidcorners.com/storage/statistiks/' + post.image + '" alt="Desa"></a><h6>' + post.title + '</h6></div></div>';
    });
    $$("#dataStatistik").html(tampilkan);
  }))
}

$$("#dataStatistik").on("click", "#baca", function () {
  app.preloader.show();
  let id = $$(this).data("id");
  app.request.json(`https://sidesa.androidcorners.com/api/admin/statistiks/${id}`, function (data) {
    let post = data.data;
    let tampilkan = '<div class="block"><p>' + post.content + '</p></div>';
    $$("#detailStatistik").html(tampilkan);
    setTimeout(function () {
      app.preloader.hide();
    }, );
  });
});

function get_informasi() {
  app.request.json('https://sidesa.androidcorners.com/api/admin/info', ((data) => {
    let posts = data.data;
    console.log(posts);
    let tampilkan = '';
    posts.map((post) => {
      tampilkan = tampilkan + '<div class="col"><div class="content"><a href="#" id="baca" data-id="' + post.id + '" class="link popup-open" data-popup=".my-sheet-push-info"><img src="https://sidesa.androidcorners.com/storage/informasi/' + post.image + '" alt="Desa"></a><h6>' + post.title + '</h6></div></div>';
    });
    $$("#dataInformasi").html(tampilkan);
  }))
}

$$("#dataInformasi").on("click", "#baca", function () {
  app.preloader.show();
  let id = $$(this).data("id");
  app.request.json(`https://sidesa.androidcorners.com/api/admin/info/${id}`, function (data) {
    let post = data.data;
    let tampilkan = '<div class="block"><p>' + post.content + '</p></div>';
    $$("#detailInformasi").html(tampilkan);
    setTimeout(function () {
      app.preloader.hide();
    }, );
  });
});

function get_posts() {
  app.request.json('https://sidesa.androidcorners.com/api/web/posts', ((data) => {
    let posts = data.data.data;
    let tampilkan = '';
    console.log(posts);
    posts.map((post) => {
      tampilkan = tampilkan + '<div class="content"><img src="' + post.image + '" alt=""><div class="content-text"><h5><a href="">' + post.title + '</a></h5><span><i class="fa fa-calendar-alt"></i>' + post.created_at + '</span><span><i class="fa fa-user"></i>' + post.user.name + '</span><span><i class="fa fa-archway"></i>' + post.category.name + '</span><p>' + post.description + '</p><br><button id="baca" data-id="' + post.slug + '" class="buttons"><i class="fas fa-paper-plane"></i> Baca Selengkapnya</button></div></div><div class="separator"></div>';
    });
    $$("#DataPosts").html(tampilkan);
  }))
}

$$("#DataPosts").on("click", "#baca", function () {
  app.preloader.show();
  app.views.main.router.navigate('/detail/');
  let id = $$(this).data("id");
  app.request.json(`https://sidesa.androidcorners.com/api/web/posts/${id}`, function (data) {
    let posts = data.data.comments;
    let comment = '';
    posts.map((data) => {
      comment = comment + '<a href="#"><div class="content content-box"><i class="fas fa-user"></i><div class="service-title"><h4>' + data.name + '</h4><p>' + data.comment + '</p></div></div></a>';
    });
    $$("#datacomments").html(comment);
    let post = data.data;
    console.log(post);
    let tampilkan = '<img src="' + post.image + '" alt=""><div class="content-text"><h5><a href="">' + post.title + '</a></h5><span><i class="fa fa-calendar-alt"></i>21 January 2020</span><div class="accordion accordion-icon content-entry"><div class="list accordion-list"><ul><li class="accordion-item"><a href="" class="item-link item-content"><div class="item-inner"><div class="item-title"><i class="fas fa-check"></i>Content</div></div></a><div class="accordion-item-content"><p>' + post.content + '</p></div></li></ul></div></div></div>';
    $$("#datadetail").html(tampilkan);
    let button = '<button id="' + post.slug + '" onClick="reply_click(this.id)" class="buttons buttons-center">Comments</button>';
    $$("#comment").html(button);
    setTimeout(function () {
      app.preloader.hide();
    }, );
  });
});

function get_categories() {
  app.request.json('https://sidesa.androidcorners.com/api/web/categorySidebar', ((data) => {
    const posts = data.data;
    let tampilkan = '';
    console.log(posts);
    posts.map((post) => {
      tampilkan = tampilkan + '<div class="timeline__event  animated fadeInUp delay-3s timeline__event--type1"><div class="timeline__event__icon "><i class="fas fa-bacon"></i></div><div class="timeline__event__content "><div class="timeline__event__title"><a href="#" id="baca" data-id="' + post.slug + '" class="timeline__event__title"><i class="fas fa-clone"></i> ' + post.name + ' <span><i class="fa fa-chevron-right"></i></span></a></div></div></div>';
    });
    $$("#DataCategories").html(tampilkan);
  }))
}

$$("#DataCategories").on("click", "#baca", function () {
  app.dialog.preloader('Loading...');
  app.views.main.router.navigate('/detailpostcategory/');
  let id = $$(this).data("id");
  app.request.json(`https://sidesa.androidcorners.com/api/web/categories/${id}`, function (data) {
    let posts = data.data.posts;
    let tampilkan = '';
    console.log(posts);
    posts.map((post) => {
      tampilkan = tampilkan + '<div class="content"><img src="' + post.image + '" alt=""><div class="content-text"><h5><a href="">' + post.title + '</a></h5><span><i class="fa fa-calendar-alt"></i>' + post.created_at + '</span><span><i class="fa fa-archway"></i>' + post.category.name + '</span><p>' + post.description + '</p><br><button id="' + post.slug + '" onClick="selengkapnya(this.id)" class="buttons"><i class="fas fa-paper-plane"></i> Read More</button></div></div><div class="separator"></div>';
    });
    $$("#DataPostsCategory").html(tampilkan);
    setTimeout(function () {
      app.dialog.close();
    }, );
  });
});

function selengkapnya(clicked_id) {
  app.preloader.show();
  app.views.main.router.navigate('/detailpost/');
  let id = (clicked_id);
  app.request.json(`https://sidesa.androidcorners.com/api/web/posts/${id}`, function (data) {
    let posts = data.data.comments;
    let comment = '';
    posts.map((data) => {
      comment = comment + '<a href="#"><div class="content content-box"><i class="fas fa-user"></i><div class="service-title"><h4>' + data.name + '</h4><p>' + data.comment + '</p></div></div></a>';
    });
    $$("#datacomments").html(comment);
    let post = data.data;
    console.log(post);
    let tampilkan = '<img src="' + post.image + '" alt=""><div class="content-text"><h5><a href="">' + post.title + '</a></h5><span><i class="fa fa-calendar-alt"></i>21 January 2020</span><div class="accordion accordion-icon content-entry"><div class="list accordion-list"><ul><li class="accordion-item"><a href="" class="item-link item-content"><div class="item-inner"><div class="item-title"><i class="fas fa-check"></i>Content</div></div></a><div class="accordion-item-content"><p>' + post.content + '</p></div></li></ul></div></div></div>';
    $$("#datadetail").html(tampilkan);
    let button = '<button id="' + post.slug + '" onClick="reply_click(this.id)" class="buttons buttons-center">Comments</button>';
    $$("#comment").html(button);
    setTimeout(function () {
      app.preloader.hide();
    }, );
  });
}

$$("#kirim").click(function () {
  let name = $$("#datanama").val();
  let isi = $$("#isi").val();
  if (name == "" || isi == "") {
    app.dialog.alert("Silahkan lengkapi form di atas", "Error");
    return;
  } else {
    app.request({
      url: 'https://sidesa.androidcorners.com/api/admin/saran',
      dataType: 'text',
      data: {
        'name': name,
        'content': isi,
      },
      type: 'post',
      success: function () {
        app.dialog.alert("Saran Berhasil ditambahkan", "Sukses");
        $$("#nama").val("");
        $$("#isi").val("");
      },
    });
  }
});

function reply_click(clicked_id) {
  let slug = (clicked_id);
  let nama = $$("#nama").val();
  let email = $$("#email").val();
  let text = $$("#text").val();
  if (nama == "" || email == "" || text == "") {
    app.dialog.alert("Silahkan lengkapi form di atas", "Error");
    return;
  } else {
    app.request({
      url: 'https://sidesa.androidcorners.com/api/web/posts/storeComment',
      dataType: 'text',
      data: {
        'slug': slug,
        'name': nama,
        'email': email,
        'comment': text,
      },
      type: 'post',
      success: function () {
        app.dialog.alert("Komentar Berhasil ditambahkan", "Sukses");
        $$("#nama").val("");
        $$("#email").val("");
        $$("#text").val("");
      },
    });
  }
}