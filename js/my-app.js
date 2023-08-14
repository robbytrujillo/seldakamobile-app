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
      path: "/pengaduan/",
      url: "pengaduan.html",
    },
    {
      path: "/tanggapan/",
      url: "tanggapan.html",
    },
    {
      path: "/petugas/",
      url: "petugas.html",
    },
    {
      path: "/masyarakat/",
      url: "masyarakat.html",
    },
    {
      path: "/fubah/",
      pageName: "fubah",
    },
  ],
  // ... other parameters
});
