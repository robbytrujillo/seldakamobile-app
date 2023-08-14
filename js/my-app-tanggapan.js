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
  var id_tanggapan = $$("#id_tanggapan").val();
  var id_pengaduan = $$("#id_pengaduan").val();
  var tgl_tanggapan = $$("#tgl_tanggapan").val();
  var tanggapan = $$("#tanggapan").val();
  var id_petugas = $$("#id_petugas").val();
  app.request({
    url: "http://localhost/seldakam-api/tanggapan/simpan-tanggapan.php",
    type: "POST",
    data: {
      id_tanggapan: id_tanggapan,
      id_pengaduan: id_pengaduan,
      tgl_tanggapan: tgl_tanggapan,
      tanggapan: tanggapan,
      id_petugas: id_petugas,
    },
    success: function (data) {
      app.dialog.alert("Berhasil Simpan Data!");
      $$("#id_tanggapan").val("");
      $$("#id_pengaduan").val("");
      $$("#tgl_tanggapan").val("");
      $$("#tanggapan").val("");
      $$("#id_petugas").val("");
      app.views.main.router.navigate("/home/");
      baca();
    },
  });
});
$$("#tampil").on("click", "#hapus", function () {
  var id = $$(this).data("id");
  app.request.post(
    "http://localhost/seldakam-api/tanggapan/hapus-tanggapan.php",
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
    "http://localhost/seldakam-api/tanggapan/cari-tanggapan.php",
    {
      id: id,
    },
    function (data) {
      $$("#eid").val(data[0].id_tanggapan);
      $$("#eid_pengaduan").val(data[0].id_pengaduan);
      $$("#etgl_tanggapan").val(data[0].tgl_tanggapan);
      $$("#etanggapan").val(data[0].tanggapan);
      $$("#eid_petugas").val(data[0].id_petugas);
      app.views.main.router.navigate("/fubah/");
    }
  );
});
$$("#esimpan").click(function () {
  var id = $$("#eid").val();
  var id_pengaduan = $$("#eid_pengaduan").val();
  var tgl_tanggapan = $$("#etgl_tanggapan").val();
  var tanggapan = $$("#etanggapan").val();
  var id_petugas = $$("#eid_petugas").val();
  app.request({
    url: "http://localhost/seldakam-api/tanggapan/esimpan-tanggapan.php",
    type: "POST",
    data: {
      id: id,
      id_pengaduan: id_pengaduan,
      tgl_tanggapan: tgl_tanggapan,
      tanggapan: tanggapan,
      id_petugas: id_petugas,
    },
    success: function (data) {
      console.log(data);
      app.dialog.alert("Berhasil Ubah Data!");
      $$("#eid_tanggapan").val("");
      $$("#eid_pengaduan").val("");
      $$("#etgl_tanggapan").val("");
      $$("#etanggapan").val("");
      $$("#eid_petugas").val("");
      app.views.main.router.navigate("/home/");
      baca();
    },
  });
});

function baca() {
  app.request.json("http://localhost/seldakam-api/tanggapan/tampil-tanggapan.php", function (data) {
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
        data[i].id_tanggapan +
        "</td>" +
        "<td>" +
        data[i].id_pengaduan +
        "</td>" +
        "<td>" +
        data[i].tgl_tanggapan +
        "</td>" +
        "<td>" +
        data[i].tanggapan +
        "</td>" +
        "<td>" +
        data[i].id_petugas +
        "</td>" +
        "<td><a href='#' id='ubah' data-id='" +
        data[i].id_tanggapan +
        "'><i class='f7-icons'>arrow_2_circlepath</i></a> <a href='#' id='hapus' data-id='" +
        data[i].id_tanggapan +
        "'><i class='icon f7-icons color-red'>trash</i></a><td>" +
        "</tr>";
    }
    $$("#tampil").html(buatTabel);
  });
}
