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
  var id_pengaduan = $$("#id_pengaduan").val();
  var tgl_pengaduan = $$("#tgl_pengaduan").val();
  var nik = $$("#nik").val();
  var isi_laporan = $$("#isi_laporan").val();
  var foto = $$("#foto").val();
  var status = $$("#status").val();
  app.request({
    url: "http://localhost/seldakam-api/pengaduan/simpan-pengaduan.php",
    type: "POST",
    data: {
      id_pengaduan: id_pengaduan,
      tgl_pengaduan: tgl_pengaduan,
      nik: nik,
      isi_laporan: isi_laporan,
      foto: foto,
      status: status,
    },
    success: function (data) {
      app.dialog.alert("Berhasil Simpan Data!");
      $$("#id_pengaduan").val("");
      $$("#tgl_pengaduan").val("");
      $$("#nik").val("");
      $$("#isi_laporan").val("");
      $$("#foto").val("");
      $$("#status").val("");
      app.views.main.router.navigate("/home/");
      baca();
    },
  });
});
$$("#tampil").on("click", "#hapus", function () {
  var id = $$(this).data("id");
  app.request.post(
    "http://localhost/seldakam-api/pengaduan/hapus-pengaduan.php",
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
    "http://localhost/seldakam-api/pengaduan/cari-pengaduan.php",
    {
      id: id,
    },
    function (data) {
      $$("#eid").val(data[0].id_pengaduan);
      $$("#etgl_pengaduan").val(data[0].tgl_pengaduan);
      $$("#enik").val(data[0].nik);
      $$("#eisi_laporan").val(data[0].isi_laporan);
      $$("#efoto").val(data[0].foto);
      $$("#estatus").val(data[0].status);
      app.views.main.router.navigate("/fubah/");
    }
  );
});
$$("#esimpan").click(function () {
  var id = $$("#eid").val();
  var tgl_pengaduan = $$("#etgl_pengaduan").val();
  var nik = $$("#enik").val();
  var isi_laporan = $$("#isi_laporan").val();
  var foto = $$("#efoto").val();
  var status = $$("#estatus").val();
  app.request({
    url: "http://localhost/seldakam-api/pengaduan/esimpan-pengaduan.php",
    type: "POST",
    data: {
      id: id,
      tgl_pengaduan: tgl_pengaduan,
      nik: nik,
      isi_laporan: isi_laporan,
      foto: foto,
      status: status,
    },
    success: function (data) {
      console.log(data);
      app.dialog.alert("Berhasil Ubah Data!");
      $$("#eid_pengaduan").val("");
      $$("#etgl_pengaduan").val("");
      $$("#enik").val("");
      $$("#eisi_laporan").val("");
      $$("#efoto").val("");
      $$("#estatus").val("");
      app.views.main.router.navigate("/home/");
      baca();
    },
  });
});

function baca() {
  app.request.json("http://localhost/seldakam-api/pengaduan/tampil-pengaduan.php", function (data) {
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
        data[i].id_pengaduan +
        "</td>" +
        "<td>" +
        data[i].tgl_pengaduan +
        "</td>" +
        "<td>" +
        data[i].nik +
        "</td>" +
        "<td>" +
        data[i].isi_laporan +
        "</td>" +
        "<td>" +
        data[i].foto +
        "</td>" +
        "<td>" +
        data[i].status +
        "</td>" +
        "<td><a href='#' id='ubah' data-id='" +
        data[i].id_pengaduan +
        "'><i class='f7-icons'>arrow_2_circlepath</i></a> <a href='#' id='hapus' data-id='" +
        data[i].id_pengaduan +
        "'><i class='icon f7-icons color-red'>trash</i></a><td>" +
        "</tr>";
    }
    $$("#tampil").html(buatTabel);
  });
}
