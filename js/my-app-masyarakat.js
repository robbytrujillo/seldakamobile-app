var app = new Framework7({
  // App root element
  root: "#app",
  // App Name
  name: "My App",
  // App id
  id: "com.myapp.test",
  view: {
    stackPages: true,
  },
  // Enable swipe panel
  panel: {
    swipe: "left",
  },
  // Add default routes
  routes: [
    {
      path: "/about/",
      url: "about.html",
    },
    {
      path: "/tambah/",
      pageName: "tambah",
    },
    {
      path: "/home/",
      pageName: "home",
    },
    {
      path: "/fubah/",
      pageName: "fubah",
    },
  ],
  // ... other parameters
});

var mainView = app.views.create(".view-main");
var $$ = Dom7;
baca();
$$("#simpan").click(function () {
  var nik = $$("#nik").val();
  var nama = $$("#nama").val();
  var username = $$("#username").val();
  var password = $$("#password").val();
  var telp = $$("#telp").val();
  var foto_profile = $$("#foto_profile").val();
  app.request({
    url: "http://localhost/seldakam-api/masyarakat/simpan-masyarakat.php",
    type: "POST",
    data: {
      nik: nik,
      nama: nama,
      username: username,
      password: password,
      telp: telp,
      foto_profile: foto_profile,
    },
    success: function (data) {
      app.dialog.alert("Berhasil Simpan Data!");
      $$("#nik").val("");
      $$("#nama").val("");
      $$("#username").val("");
      $$("#password").val("");
      $$("#telp").val("");
      $$("#foto_profile").val("");
      app.views.main.router.navigate("/home/");
      baca();
    },
  });
});
$$("#tampil").on("click", "#hapus", function () {
  var id = $$(this).data("id");
  app.request.post(
    "http://localhost/seldakam-api/masyarakat/hapus-masyarakat.php",
    {
      id: id,
    },
    function (data) {
      app.dialog.alert("Berhasil dihapus!");
      baca();
    }
  );
});
$$("#tampil").on("click", "#ubah", function () {
  var id = $$(this).data("id");
  app.request.json(
    "http://localhost/seldakam-api/masyarakat/cari-masyarakat.php",
    {
      id: id,
    },
    function (data) {
      $$("#eid").val(data[0].nik);
      $$("#enama").val(data[0].nama);
      $$("#eusername").val(data[0].username);
      $$("#epassword").val(data[0].password);
      $$("#etelp").val(data[0].telp);
      $$("#efoto_profile").val(data[0].foto_profile);
      app.views.main.router.navigate("/fubah/");
    }
  );
});
$$("#esimpan").click(function () {
  var id = $$("#eid").val();
  var nama = $$("#enama").val();
  var username = $$("#eusername").val();
  var password = $$("#epassword").val();
  var telp = $$("#etelp").val();
  var foto_profile = $$("#foto_profile").val();
  app.request({
    url: "http://localhost/seldakam-api/masyarakat/esimpan-masyarakat.php",
    type: "POST",
    data: {
      id: id,
      nama: nama,
      username: username,
      password: password,
      telp: telp,
      foto_profile: foto_profile,
    },
    success: function (data) {
      console.log(data);
      app.dialog.alert("Berhasil Ubah Data!");
      $$("#eid").val("");
      $$("#enama").val("");
      $$("#eusername").val("");
      $$("#epassword").val("");
      $$("#etelp").val("");
      $$("#efoto_profile").val("");
      app.views.main.router.navigate("/home/");
      baca();
    },
  });
});

function baca() {
  app.request.json("http://localhost/seldakam-api/masyarakat/tampil-masyarakat.php", function (data) {
    var jlh = data.length;
    var i = "";
    console.log(data);
    var buatTabel = "";
    for (i = 0; i < jlh; i++) {
      buatTabel +=
        "<tr>" +
        "<td>" +
        (i + 1) +
        "</td>" +
        "<td>" +
        data[i].nik +
        "</td>" +
        "<td>" +
        data[i].nama +
        "</td>" +
        "<td>" +
        data[i].username +
        "</td>" +
        "<td>" +
        data[i].password +
        "</td>" +
        "<td>" +
        data[i].telp +
        "</td>" +
        "<td>" +
        data[i].foto_profile +
        "</td>" +
        "<td><a href='#' id='ubah' data-id='" +
        data[i].nik +
        "'><i class='f7-icons'>arrow_2_circlepath</i></a> <a href='#' id='hapus' data-id='" +
        data[i].nik +
        "'><i class='icon f7-icons color-red'>trash</i></a><td>" +
        "</tr>";
    }
    $$("#tampil").html(buatTabel);
  });
}
