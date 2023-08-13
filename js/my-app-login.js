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
    var id = $$("#id").val();
    var nama = $$("#nama").val();
    var kelamin = $$("#kelamin").val();
    var alamat = $$("#alamat").val();
    var email = $$("#email").val();
    var tlp = $$("#tlp").val();
    app.request({
      url: "http://localhost/dblatihan/simpan.php",
      type: "POST",
      data: {
        id: id,
        nama: nama,
        kelamin: kelamin,
        alamat: alamat,
        email: email,
        tlp: tlp,
      },
      success: function (data) {
        app.dialog.alert("Berhasil Simpan Data!");
        $$("#id").val("");
        $$("#nama").val("");
        $$("#kelamin").val("");
        $$("#alamat").val("");
        $$("#email").val("");
        $$("#tlp").val("");
        app.views.main.router.navigate("/home/");
        baca();
      },
    });
  });
  $$("#tampil").on("click", "#hapus", function () {
    var id = $$(this).data("id");
    app.request.post(
      "http://localhost/dblatihan/hapus.php",
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
      "http://localhost/dblatihan/cari.php",
      {
        id: id,
      },
      function (data) {
        $$("#eid").val(data[0].id_anggota);
        $$("#enama").val(data[0].nama_anggota);
        $$("#ekelamin").val(data[0].kelamin);
        $$("#ealamat").val(data[0].alamat);
        $$("#eemail").val(data[0].email);
        $$("#etlp").val(data[0].tlp);
        app.views.main.router.navigate("/fubah/");
      }
    );
  });
  $$("#esimpan").click(function () {
    var id = $$("#eid").val();
    var nama = $$("#enama").val();
    var kelamin = $$("#ekelamin").val();
    var alamat = $$("#ealamat").val();
    var email = $$("#eemail").val();
    var tlp = $$("#etlp").val();
    app.request({
      url: "http://localhost/dblatihan/esimpan.php",
      type: "POST",
      data: {
        id: id,
        nama: nama,
        kelamin: kelamin,
        alamat: alamat,
        email: email,
        tlp: tlp,
      },
      success: function (data) {
        console.log(data);
        app.dialog.alert("Berhasil Ubah Data!");
        $$("#eid").val("");
        $$("#enama").val("");
        $$("#ekelamin").val("");
        $$("#ealamat").val("");
        $$("#eemail").val("");
        $$("#etlp").val("");
        app.views.main.router.navigate("/home/");
        baca();
      },
    });
  });
  
  function baca() {
    app.request.json("http://localhost/dblatihan/tampil.php", function (data) {
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
          data[i].id_anggota +
          "</td>" +
          "<td>" +
          data[i].nama_anggota +
          "</td>" +
          "<td>" +
          data[i].alamat +
          "</td>" +
          "<td>" +
          data[i].email +
          "</td>" +
          "<td>" +
          data[i].kelamin +
          "</td>" +
          "<td>" +
          data[i].tlp +
          "</td>" +
          "<td><a href='#' id='ubah' data-id='" +
          data[i].id_anggota +
          "'><i class='f7-icons'>arrow_2_circlepath</i></a> <a href='#' id='hapus' data-id='" +
          data[i].id_anggota +
          "'><i class='icon f7-icons color-red'>trash</i></a><td>" +
          "</tr>";
      }
      $$("#tampil").html(buatTabel);
    });
  }
  