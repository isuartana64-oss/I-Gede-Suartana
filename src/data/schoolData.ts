/**
 * Data Resmi SMAN 1 Selat
 * Kabupaten Karangasem, Bali
 * Berisi data 49 Guru, 22 Mata Pelajaran, dan seluruh Siswa Kelas X, XI, XII
 */

export interface Teacher {
  no: number;
  name: string;
  nip: string;
  roleTitle: string;
  mapel: string[];
}

export interface Student {
  no: number;
  nis: string;
  name: string;
  gender: 'L' | 'P';
  className: string;
}

export const OFFICIAL_SUBJECTS: string[] = [
  "Agama Hindu",
  "PPKn",
  "Bahasa Indonesia",
  "Bahasa Indonesia TL",
  "Matematika",
  "Matematika TL",
  "Bahasa Inggris",
  "Bahasa Inggris TL",
  "Penjasorkes",
  "Informatika",
  "Seni Budaya",
  "Bahasa Bali",
  "Fisika",
  "Kimia",
  "Biologi",
  "Geografi",
  "Ekonomi",
  "Sosiologi",
  "Sejarah",
  "Bahasa Jepang",
  "Antropologi",
  "Prakarya dan Kewirausahaan"
];

export const OFFICIAL_CLASSES: string[] = [
  "X-A",
  "X-B",
  "X-C",
  "X-D",
  "X-E",
  "X-F",
  "X-G",
  "X-H",
  "XI-A",
  "XI-B",
  "XI-C",
  "XI-D",
  "XI-E",
  "XI-F",
  "XI-G",
  "XII-A",
  "XII-B",
  "XII-C",
  "XII-D",
  "XII-E",
  "XII-F",
  "XII-G"
];

export const INITIAL_TEACHERS: Teacher[] = [
  {
    "no": 1,
    "name": "I Komang Sudana Martayasa, S.Pd., M.Pd.",
    "nip": "19720420 199802 1 001",
    "roleTitle": "Kepala SMAN 1 Selat",
    "mapel": [
      "Kepala Sekolah"
    ]
  },
  {
    "no": 2,
    "name": "Dra. Ni Made Astini, M.Pd.H.",
    "nip": "19670508 200501 2 002",
    "roleTitle": "Guru Mapel",
    "mapel": [
      "Agama Hindu"
    ]
  },
  {
    "no": 3,
    "name": "Drs. I Made Berata, M.Pd.H.",
    "nip": "19680813 200801 1 013",
    "roleTitle": "Guru Mapel",
    "mapel": [
      "Agama Hindu"
    ]
  },
  {
    "no": 4,
    "name": "Ni Made Murtiasih, M.Pd.H.",
    "nip": "19800515 200701 2 030",
    "roleTitle": "Guru Mapel",
    "mapel": [
      "Agama Hindu"
    ]
  },
  {
    "no": 5,
    "name": "I Kadek Juniarta, S.Pd.",
    "nip": "19900616 202421 1 009",
    "roleTitle": "Guru Mapel",
    "mapel": [
      "Agama Hindu"
    ]
  },
  {
    "no": 6,
    "name": "Drs. I Made Yasa, M.Psi",
    "nip": "19690513 199702 1 002",
    "roleTitle": "Guru Mapel",
    "mapel": [
      "PPKn"
    ]
  },
  {
    "no": 7,
    "name": "Ni Wayan Sugipariani, S.Pd.",
    "nip": "19870210 202321 2 029",
    "roleTitle": "Guru Mapel",
    "mapel": [
      "PPKn"
    ]
  },
  {
    "no": 8,
    "name": "Ni Made Ariadi, S.Pd., M.Pd.",
    "nip": "19730606 200312 2 004",
    "roleTitle": "Guru Mapel",
    "mapel": [
      "Bahasa Indonesia",
      "Bahasa Indonesia TL"
    ]
  },
  {
    "no": 9,
    "name": "Ni Nyoman Widiani, S.Pd., M.Pd.",
    "nip": "19810423 200902 2 005",
    "roleTitle": "Guru Mapel",
    "mapel": [
      "Bahasa Indonesia",
      "Bahasa Indonesia TL"
    ]
  },
  {
    "no": 10,
    "name": "I Komang Budiasa, S.Pd.",
    "nip": "19880406 201101 1 003",
    "roleTitle": "Guru Mapel",
    "mapel": [
      "Bahasa Indonesia",
      "Bahasa Indonesia TL"
    ]
  },
  {
    "no": 11,
    "name": "Ni Made Puput Sutarmi, S.Pd.",
    "nip": "19890215 202421 2 022",
    "roleTitle": "Guru Mapel",
    "mapel": [
      "Bahasa Indonesia",
      "Bahasa Jepang"
    ]
  },
  {
    "no": 12,
    "name": "Ida Bagus Nyoman Gelgel, S.Pd.",
    "nip": "19670110 199203 1 012",
    "roleTitle": "Guru Mapel",
    "mapel": [
      "Matematika",
      "Matematika TL"
    ]
  },
  {
    "no": 13,
    "name": "Luh Mahayani Ngurah Putri, S.Pd., M.Pd.",
    "nip": "19810626 200312 2 005",
    "roleTitle": "Guru Mapel",
    "mapel": [
      "Matematika",
      "Matematika TL"
    ]
  },
  {
    "no": 14,
    "name": "Made Ayu Dwidasari, S.Pd.",
    "nip": "19890210 202221 2 002",
    "roleTitle": "Guru Mapel",
    "mapel": [
      "Matematika",
      "Matematika TL"
    ]
  },
  {
    "no": 15,
    "name": "Ni Nyoman Sri Wahyuni, S.Pd.",
    "nip": "19860726 202221 2 021",
    "roleTitle": "Guru Mapel",
    "mapel": [
      "Matematika",
      "Matematika TL"
    ]
  },
  {
    "no": 16,
    "name": "Elinda Nuha Handaruningrum, S.Pd.",
    "nip": "20011102 202521 2 041",
    "roleTitle": "Guru Mapel",
    "mapel": [
      "Matematika",
      "Informatika"
    ]
  },
  {
    "no": 17,
    "name": "Ni Luh Sudita, S.Pd.",
    "nip": "19690615 199512 2 005",
    "roleTitle": "Guru Mapel",
    "mapel": [
      "Sejarah"
    ]
  },
  {
    "no": 18,
    "name": "I Made Sutarjana, S.Pd.",
    "nip": "19691226 200701 1 020",
    "roleTitle": "Guru Mapel",
    "mapel": [
      "Sejarah"
    ]
  },
  {
    "no": 19,
    "name": "I Wayan Warsika, S.Pd., M.Pd.H.",
    "nip": "19691231 199512 1 019",
    "roleTitle": "Guru Mapel",
    "mapel": [
      "Bahasa Inggris",
      "Bahasa Inggris TL"
    ]
  },
  {
    "no": 20,
    "name": "I Wayan Mudayasa, S.Pd.",
    "nip": "19700622 199512 1 001",
    "roleTitle": "Guru Mapel",
    "mapel": [
      "Bahasa Inggris",
      "Bahasa Inggris TL"
    ]
  },
  {
    "no": 21,
    "name": "Ni Wayan Sari, S.Pd.",
    "nip": "19700910 200012 2 004",
    "roleTitle": "Guru Mapel",
    "mapel": [
      "Bahasa Inggris",
      "Bahasa Inggris TL"
    ]
  },
  {
    "no": 22,
    "name": "Dewi Krisna Yuliawati, S.Pd.",
    "nip": "19800704 200604 2 021",
    "roleTitle": "Guru Mapel",
    "mapel": [
      "Bahasa Inggris",
      "Bahasa Inggris TL"
    ]
  },
  {
    "no": 23,
    "name": "Dian Risma Padmayanti, S.Pd.",
    "nip": "19960408 202421 2 013",
    "roleTitle": "Guru Mapel",
    "mapel": [
      "Bahasa Inggris",
      "Bahasa Inggris TL"
    ]
  },
  {
    "no": 24,
    "name": "I Wayan Suarsana, S.Pd.",
    "nip": "19680517 199512 1 003",
    "roleTitle": "Guru Mapel",
    "mapel": [
      "Penjasorkes"
    ]
  },
  {
    "no": 25,
    "name": "Ni Nengah Astuti Dewi, S.Pd., M.Pd.H.",
    "nip": "19791111 200501 2 012",
    "roleTitle": "Guru Mapel",
    "mapel": [
      "Penjasorkes"
    ]
  },
  {
    "no": 26,
    "name": "I Kadek Sudiptiana, S.Pd.",
    "nip": "19921010 202321 1 027",
    "roleTitle": "Guru Mapel",
    "mapel": [
      "Penjasorkes"
    ]
  },
  {
    "no": 27,
    "name": "Ni Made Sudiani, S.Sn., M.Pd.H.",
    "nip": "19730212 200801 2 021",
    "roleTitle": "Guru Mapel",
    "mapel": [
      "Seni Budaya"
    ]
  },
  {
    "no": 28,
    "name": "I Ketut Sudita Hartawan, S.Sn.",
    "nip": "19711205 202221 1 001",
    "roleTitle": "Guru Mapel",
    "mapel": [
      "Seni Budaya"
    ]
  },
  {
    "no": 29,
    "name": "I Gede Suartana, S.Pd.",
    "nip": "19880406 202421 1 017",
    "roleTitle": "Wakasek Kurikulum & Guru Mapel",
    "mapel": [
      "Prakarya dan Kewirausahaan"
    ]
  },
  {
    "no": 30,
    "name": "I Nyoman Sadri, SS, M.Pd.H.",
    "nip": "19681231 200501 1 091",
    "roleTitle": "Guru Mapel",
    "mapel": [
      "Bahasa Bali"
    ]
  },
  {
    "no": 31,
    "name": "I Wayan Diatmika, S.Pd.B.",
    "nip": "19910417 202421 1 013",
    "roleTitle": "Guru Mapel",
    "mapel": [
      "Bahasa Bali"
    ]
  },
  {
    "no": 32,
    "name": "Dra. Ni Ketut Ayu Suastini, M.Pd.H.",
    "nip": "19700520 200501 2 013",
    "roleTitle": "Guru Mapel",
    "mapel": [
      "Biologi"
    ]
  },
  {
    "no": 33,
    "name": "Drs. I Nengah Wikrama",
    "nip": "19671231 200604 1 170",
    "roleTitle": "Guru Mapel",
    "mapel": [
      "Biologi"
    ]
  },
  {
    "no": 34,
    "name": "Ayu Arisca Apriani, S.Pd.",
    "nip": "19970412 202321 2 020",
    "roleTitle": "Guru Mapel",
    "mapel": [
      "Fisika"
    ]
  },
  {
    "no": 35,
    "name": "I Ketut Jati Astawa, S.Pd.",
    "nip": "19860422 202421 1 009",
    "roleTitle": "Guru Mapel",
    "mapel": [
      "Fisika",
      "Informatika"
    ]
  },
  {
    "no": 36,
    "name": "I Gusti Bagus Jelantik, S.Pd.",
    "nip": "19680713 199002 1 003",
    "roleTitle": "Guru Mapel",
    "mapel": [
      "Kimia",
      "Prakarya dan Kewirausahaan"
    ]
  },
  {
    "no": 37,
    "name": "I Made Windia, S.Pd.",
    "nip": "19700516 200604 1 010",
    "roleTitle": "Guru Mapel",
    "mapel": [
      "Kimia"
    ]
  },
  {
    "no": 38,
    "name": "I Gusti Ayu Agung Cynthia Putri, S.Pd.",
    "nip": "19930218 202421 2 043",
    "roleTitle": "Guru Mapel",
    "mapel": [
      "Kimia"
    ]
  },
  {
    "no": 39,
    "name": "I Wayan Suardinata, S.Pd.",
    "nip": "20000903 202521 1 016",
    "roleTitle": "Guru Mapel",
    "mapel": [
      "Kimia",
      "Prakarya dan Kewirausahaan"
    ]
  },
  {
    "no": 40,
    "name": "Putu Ekawati, SE, M.Pd.H.",
    "nip": "19701022 200312 2 004",
    "roleTitle": "Guru Mapel",
    "mapel": [
      "Ekonomi"
    ]
  },
  {
    "no": 41,
    "name": "I Gusti Ngurah Rai, SE",
    "nip": "19731229 202521 1 028",
    "roleTitle": "Guru Mapel",
    "mapel": [
      "Ekonomi",
      "Prakarya dan Kewirausahaan"
    ]
  },
  {
    "no": 42,
    "name": "I Ketut Darta, S.Pd.",
    "nip": "19680204 199702 1 001",
    "roleTitle": "Guru Mapel",
    "mapel": [
      "Geografi"
    ]
  },
  {
    "no": 43,
    "name": "Ni Putu Ari Aristianti, S.Pd.",
    "nip": "19970412 202221 2 008",
    "roleTitle": "Guru Mapel",
    "mapel": [
      "Geografi"
    ]
  },
  {
    "no": 44,
    "name": "I Wayan Gede Sudarsana, SH",
    "nip": "19720717 200801 1 016",
    "roleTitle": "Guru Mapel",
    "mapel": [
      "Sosiologi"
    ]
  },
  {
    "no": 45,
    "name": "Fajriah Vivia Wulandari, S.Pd.",
    "nip": "19990714 202421 2 014",
    "roleTitle": "Guru Mapel",
    "mapel": [
      "Sosiologi"
    ]
  },
  {
    "no": 46,
    "name": "Ida Bagus Putu Suniantara, S.Pd.",
    "nip": "19810307 200801 1 016",
    "roleTitle": "Guru Mapel",
    "mapel": [
      "Bahasa Indonesia",
      "Bahasa Jepang"
    ]
  },
  {
    "no": 47,
    "name": "Ni Komang Geari Oktaviari, S.Pd.",
    "nip": "19901002 202521 2 072",
    "roleTitle": "Guru Mapel",
    "mapel": [
      "Bahasa Jepang"
    ]
  },
  {
    "no": 48,
    "name": "Drs. I Ketut Astika",
    "nip": "19670330 200604 1 009",
    "roleTitle": "Guru Mapel",
    "mapel": [
      "Antropologi"
    ]
  },
  {
    "no": 49,
    "name": "Luh Putu Suma Prastyaningrum, S.Pd.",
    "nip": "19830908 202421 2 007",
    "roleTitle": "Guru Mapel",
    "mapel": [
      "Biologi",
      "Informatika"
    ]
  }
];

export const INITIAL_STUDENTS: Student[] = [
  {
    "no": 1,
    "nis": "7056",
    "name": "I Gde Marco Kanna Winayaka",
    "gender": "L",
    "className": "XII-A"
  },
  {
    "no": 2,
    "nis": "7057",
    "name": "I Gede Krisna Wahyudi Putra",
    "gender": "L",
    "className": "XII-A"
  },
  {
    "no": 3,
    "nis": "7058",
    "name": "I Gusti Agung Devayoga Pastika",
    "gender": "L",
    "className": "XII-A"
  },
  {
    "no": 4,
    "nis": "7059",
    "name": "I Gusti Ayu Anggi Purnama Dewi",
    "gender": "P",
    "className": "XII-A"
  },
  {
    "no": 5,
    "nis": "7060",
    "name": "I Kadek Dhira Astra Pramana",
    "gender": "L",
    "className": "XII-A"
  },
  {
    "no": 6,
    "nis": "7061",
    "name": "I Kadek Suka Pradana",
    "gender": "L",
    "className": "XII-A"
  },
  {
    "no": 7,
    "nis": "7062",
    "name": "I Ketut Widnyana Artha",
    "gender": "L",
    "className": "XII-A"
  },
  {
    "no": 8,
    "nis": "7063",
    "name": "I Komang Agus Sila Artha Wiguna",
    "gender": "L",
    "className": "XII-A"
  },
  {
    "no": 9,
    "nis": "7064",
    "name": "I Komang Bagus Pradita Wirata",
    "gender": "L",
    "className": "XII-A"
  },
  {
    "no": 10,
    "nis": "7065",
    "name": "I Komang Satria Widnya Suryabratha",
    "gender": "L",
    "className": "XII-A"
  },
  {
    "no": 11,
    "nis": "7066",
    "name": "I Komang Widi Ardana",
    "gender": "L",
    "className": "XII-A"
  },
  {
    "no": 12,
    "nis": "7067",
    "name": "I Made Dhika Prayoga",
    "gender": "L",
    "className": "XII-A"
  },
  {
    "no": 13,
    "nis": "7068",
    "name": "I Made Hendra Dwika Tanaya",
    "gender": "L",
    "className": "XII-A"
  },
  {
    "no": 14,
    "nis": "7069",
    "name": "I Wayan Sastrawan",
    "gender": "L",
    "className": "XII-A"
  },
  {
    "no": 15,
    "nis": "7070",
    "name": "Kadek Bagus Raka Parwata Wikantara",
    "gender": "L",
    "className": "XII-A"
  },
  {
    "no": 16,
    "nis": "7071",
    "name": "Kadek Mutia Trihapsari Hartawan",
    "gender": "P",
    "className": "XII-A"
  },
  {
    "no": 17,
    "nis": "7072",
    "name": "Luh Ayu Rai Parwita Wikantari",
    "gender": "P",
    "className": "XII-A"
  },
  {
    "no": 18,
    "nis": "7073",
    "name": "Ni Kadek Ayu Nita Devi",
    "gender": "P",
    "className": "XII-A"
  },
  {
    "no": 19,
    "nis": "7074",
    "name": "Ni Kadek Ayu Prasetya Utami",
    "gender": "P",
    "className": "XII-A"
  },
  {
    "no": 20,
    "nis": "7211",
    "name": "Ni Kadek Casey Quinn Febita",
    "gender": "P",
    "className": "XII-A"
  },
  {
    "no": 21,
    "nis": "7075",
    "name": "Ni Kadek Ratna Apriani",
    "gender": "P",
    "className": "XII-A"
  },
  {
    "no": 22,
    "nis": "7076",
    "name": "Ni Kadek Riana Sinta Yanti",
    "gender": "P",
    "className": "XII-A"
  },
  {
    "no": 23,
    "nis": "7077",
    "name": "Ni Kadek Yunita Satriani",
    "gender": "P",
    "className": "XII-A"
  },
  {
    "no": 24,
    "nis": "7078",
    "name": "Ni Ketut Tirta Parwitha Sari",
    "gender": "P",
    "className": "XII-A"
  },
  {
    "no": 25,
    "nis": "7290",
    "name": "Ni Komang Ayu Desy Natalia Putri",
    "gender": "P",
    "className": "XII-A"
  },
  {
    "no": 26,
    "nis": "7079",
    "name": "Ni Komang Ayu Pradita Utami",
    "gender": "P",
    "className": "XII-A"
  },
  {
    "no": 27,
    "nis": "7080",
    "name": "Ni Komang Tiara Dramika",
    "gender": "P",
    "className": "XII-A"
  },
  {
    "no": 28,
    "nis": "7081",
    "name": "Ni Komang Widyantari",
    "gender": "P",
    "className": "XII-A"
  },
  {
    "no": 29,
    "nis": "7082",
    "name": "Ni Luh Ade Mariani",
    "gender": "P",
    "className": "XII-A"
  },
  {
    "no": 30,
    "nis": "7083",
    "name": "Ni Luh Diah Sasmita Prajnyaniti",
    "gender": "P",
    "className": "XII-A"
  },
  {
    "no": 31,
    "nis": "7084",
    "name": "Ni Luh Putu Wiliandari Purnama Dewi",
    "gender": "P",
    "className": "XII-A"
  },
  {
    "no": 32,
    "nis": "7085",
    "name": "Ni Nyoman Suryantari",
    "gender": "P",
    "className": "XII-A"
  },
  {
    "no": 33,
    "nis": "7086",
    "name": "Ni Putu Eka Yuan Dewi",
    "gender": "P",
    "className": "XII-A"
  },
  {
    "no": 34,
    "nis": "7087",
    "name": "Ni Putu Okta Widhiastuti",
    "gender": "P",
    "className": "XII-A"
  },
  {
    "no": 35,
    "nis": "7088",
    "name": "Ni Putu Sukma Wirayanti",
    "gender": "P",
    "className": "XII-A"
  },
  {
    "no": 36,
    "nis": "7089",
    "name": "Putu Cristian Cahyo Saputra",
    "gender": "L",
    "className": "XII-A"
  },
  {
    "no": 1,
    "nis": "7257",
    "name": "I Gede Adi Gunawan",
    "gender": "L",
    "className": "XII-B"
  },
  {
    "no": 2,
    "nis": "7090",
    "name": "I Gede Agus Rehan Diana Putra",
    "gender": "L",
    "className": "XII-B"
  },
  {
    "no": 3,
    "nis": "7258",
    "name": "I Gede Dipa Permana",
    "gender": "L",
    "className": "XII-B"
  },
  {
    "no": 4,
    "nis": "7091",
    "name": "I Gede Seneng Aryana Artawan",
    "gender": "L",
    "className": "XII-B"
  },
  {
    "no": 5,
    "nis": "7092",
    "name": "I Gede Wahyu Adi Mertha",
    "gender": "L",
    "className": "XII-B"
  },
  {
    "no": 6,
    "nis": "7093",
    "name": "I Gusti Agung Bayu Narendra Putra",
    "gender": "L",
    "className": "XII-B"
  },
  {
    "no": 7,
    "nis": "7230",
    "name": "I Gusti Ayu Risma Yanti",
    "gender": "P",
    "className": "XII-B"
  },
  {
    "no": 8,
    "nis": "7124",
    "name": "I Gusti Ayu Savitri Narayani",
    "gender": "P",
    "className": "XII-B"
  },
  {
    "no": 9,
    "nis": "7231",
    "name": "I Gusti Bagus Andre Pradita",
    "gender": "L",
    "className": "XII-B"
  },
  {
    "no": 10,
    "nis": "7233",
    "name": "I Gusti Ngurah Restu Ardana",
    "gender": "L",
    "className": "XII-B"
  },
  {
    "no": 11,
    "nis": "7263",
    "name": "I Kadek Agus Karmita",
    "gender": "L",
    "className": "XII-B"
  },
  {
    "no": 12,
    "nis": "7096",
    "name": "I Kadek Dwi Suyadnya",
    "gender": "L",
    "className": "XII-B"
  },
  {
    "no": 13,
    "nis": "7097",
    "name": "I Kadek Nova Aditia Putra",
    "gender": "L",
    "className": "XII-B"
  },
  {
    "no": 14,
    "nis": "7100",
    "name": "I Ketut Pasek Danaskara",
    "gender": "L",
    "className": "XII-B"
  },
  {
    "no": 15,
    "nis": "7162",
    "name": "I Ketut Widiantara",
    "gender": "L",
    "className": "XII-B"
  },
  {
    "no": 16,
    "nis": "7101",
    "name": "I Made Pasek Surya Sugita",
    "gender": "L",
    "className": "XII-B"
  },
  {
    "no": 17,
    "nis": "7102",
    "name": "I Nengah Budi Arsana",
    "gender": "L",
    "className": "XII-B"
  },
  {
    "no": 18,
    "nis": "7103",
    "name": "I Nengah Sumartha Darma Yasa",
    "gender": "L",
    "className": "XII-B"
  },
  {
    "no": 19,
    "nis": "7104",
    "name": "I Wayan Kiyan Subrata Pradana Putra",
    "gender": "L",
    "className": "XII-B"
  },
  {
    "no": 20,
    "nis": "7244",
    "name": "Ida Ayu Laksmi Atmani",
    "gender": "P",
    "className": "XII-B"
  },
  {
    "no": 21,
    "nis": "7106",
    "name": "Kadek Rio Winanta",
    "gender": "L",
    "className": "XII-B"
  },
  {
    "no": 22,
    "nis": "7245",
    "name": "Kadek Yoanita Panna Quinara",
    "gender": "P",
    "className": "XII-B"
  },
  {
    "no": 23,
    "nis": "7108",
    "name": "Ni Kadek Kesya Prameswari",
    "gender": "P",
    "className": "XII-B"
  },
  {
    "no": 24,
    "nis": "7109",
    "name": "Ni Kadek Manis Juliantari",
    "gender": "P",
    "className": "XII-B"
  },
  {
    "no": 25,
    "nis": "7110",
    "name": "Ni Kadek Melda Santika Dewi",
    "gender": "P",
    "className": "XII-B"
  },
  {
    "no": 26,
    "nis": "7112",
    "name": "Ni Komang Ayu Indah Lestari",
    "gender": "P",
    "className": "XII-B"
  },
  {
    "no": 27,
    "nis": "7113",
    "name": "Ni Komang Ayu Mediani",
    "gender": "P",
    "className": "XII-B"
  },
  {
    "no": 28,
    "nis": "7114",
    "name": "Ni Komang Desi Rimayani",
    "gender": "P",
    "className": "XII-B"
  },
  {
    "no": 29,
    "nis": "7115",
    "name": "Ni Komang Ernita",
    "gender": "P",
    "className": "XII-B"
  },
  {
    "no": 30,
    "nis": "7116",
    "name": "Ni Luh Ade Dwi Cahyani",
    "gender": "P",
    "className": "XII-B"
  },
  {
    "no": 31,
    "nis": "7117",
    "name": "Ni Luh Putu Arcyntia Paramiswari",
    "gender": "P",
    "className": "XII-B"
  },
  {
    "no": 32,
    "nis": "7118",
    "name": "Ni Made Ayu Septiani",
    "gender": "P",
    "className": "XII-B"
  },
  {
    "no": 33,
    "nis": "7119",
    "name": "Ni Putu Dhea Frilia Anindita",
    "gender": "P",
    "className": "XII-B"
  },
  {
    "no": 34,
    "nis": "7154",
    "name": "Ni Putu Diva Sasi Purnami",
    "gender": "P",
    "className": "XII-B"
  },
  {
    "no": 35,
    "nis": "7121",
    "name": "Ni Putu Oka Permata Dewi",
    "gender": "P",
    "className": "XII-B"
  },
  {
    "no": 36,
    "nis": "7123",
    "name": "Putu Gita Ariska Dewi",
    "gender": "P",
    "className": "XII-B"
  },
  {
    "no": 1,
    "nis": "7259",
    "name": "I Gusti Ayu Agung Indah Swari",
    "gender": "P",
    "className": "XII-C"
  },
  {
    "no": 2,
    "nis": "7125",
    "name": "I Gusti Ayu Widya Ningrat",
    "gender": "P",
    "className": "XII-C"
  },
  {
    "no": 3,
    "nis": "7126",
    "name": "I Gusti Ayu Windi Indriyani",
    "gender": "P",
    "className": "XII-C"
  },
  {
    "no": 4,
    "nis": "7262",
    "name": "I Gusti Bagus Tri Wiguna",
    "gender": "L",
    "className": "XII-C"
  },
  {
    "no": 5,
    "nis": "7127",
    "name": "I Gusti Lanang Dwi Adieksa Putra",
    "gender": "L",
    "className": "XII-C"
  },
  {
    "no": 6,
    "nis": "7128",
    "name": "I Kadek Agus Dwi Saputra",
    "gender": "L",
    "className": "XII-C"
  },
  {
    "no": 7,
    "nis": "7234",
    "name": "I Kadek Puji Antara",
    "gender": "L",
    "className": "XII-C"
  },
  {
    "no": 8,
    "nis": "7235",
    "name": "I Kadek Sukanadi",
    "gender": "L",
    "className": "XII-C"
  },
  {
    "no": 9,
    "nis": "7130",
    "name": "I Ketut Arjun Budi Yasa",
    "gender": "L",
    "className": "XII-C"
  },
  {
    "no": 10,
    "nis": "7237",
    "name": "I Ketut Widia Pratama",
    "gender": "L",
    "className": "XII-C"
  },
  {
    "no": 11,
    "nis": "7132",
    "name": "I Komang Agus Sucipta Adnyana",
    "gender": "L",
    "className": "XII-C"
  },
  {
    "no": 12,
    "nis": "7133",
    "name": "I Komang Arsana Sriatmaja",
    "gender": "L",
    "className": "XII-C"
  },
  {
    "no": 13,
    "nis": "7134",
    "name": "I Komang Gede Wijaya",
    "gender": "L",
    "className": "XII-C"
  },
  {
    "no": 14,
    "nis": "7135",
    "name": "I Komang Prendi Swara",
    "gender": "L",
    "className": "XII-C"
  },
  {
    "no": 15,
    "nis": "7136",
    "name": "I Komang Surya Arta",
    "gender": "L",
    "className": "XII-C"
  },
  {
    "no": 16,
    "nis": "7138",
    "name": "I Made Arta Dwitanaya",
    "gender": "L",
    "className": "XII-C"
  },
  {
    "no": 17,
    "nis": "7139",
    "name": "I Made Yuda Dwipayana",
    "gender": "L",
    "className": "XII-C"
  },
  {
    "no": 18,
    "nis": "7205",
    "name": "I Putu Erik Aditya Putra",
    "gender": "L",
    "className": "XII-C"
  },
  {
    "no": 19,
    "nis": "7243",
    "name": "I Putu Widia Pranata",
    "gender": "L",
    "className": "XII-C"
  },
  {
    "no": 20,
    "nis": "7140",
    "name": "Ketut Pedro Aditya Putra",
    "gender": "L",
    "className": "XII-C"
  },
  {
    "no": 21,
    "nis": "7274",
    "name": "Ni Kadek Ita Dwi Lestari",
    "gender": "P",
    "className": "XII-C"
  },
  {
    "no": 22,
    "nis": "7142",
    "name": "Ni Kadek Listya Jayantari",
    "gender": "P",
    "className": "XII-C"
  },
  {
    "no": 23,
    "nis": "7143",
    "name": "Ni Kadek Manis Nopiantari",
    "gender": "P",
    "className": "XII-C"
  },
  {
    "no": 24,
    "nis": "7276",
    "name": "Ni Kadek Seri Susanti",
    "gender": "P",
    "className": "XII-C"
  },
  {
    "no": 25,
    "nis": "7277",
    "name": "Ni Kadek Srinadi",
    "gender": "P",
    "className": "XII-C"
  },
  {
    "no": 26,
    "nis": "7279",
    "name": "Ni Ketut Ayu Meita Listiari",
    "gender": "P",
    "className": "XII-C"
  },
  {
    "no": 27,
    "nis": "7248",
    "name": "Ni Komang Ayu Permata Sari",
    "gender": "P",
    "className": "XII-C"
  },
  {
    "no": 28,
    "nis": "7249",
    "name": "Ni Komang Juliantari",
    "gender": "P",
    "className": "XII-C"
  },
  {
    "no": 29,
    "nis": "7146",
    "name": "Ni Komang Perli Septya Parwati",
    "gender": "P",
    "className": "XII-C"
  },
  {
    "no": 30,
    "nis": "7250",
    "name": "Ni Komang Sinta Triani Putri",
    "gender": "P",
    "className": "XII-C"
  },
  {
    "no": 31,
    "nis": "7148",
    "name": "Ni Luh Putu Arsiniasih",
    "gender": "P",
    "className": "XII-C"
  },
  {
    "no": 32,
    "nis": "7149",
    "name": "Ni Luh Putu Eka Novayanti",
    "gender": "P",
    "className": "XII-C"
  },
  {
    "no": 33,
    "nis": "7252",
    "name": "Ni Luh Putu Kirana Maharani",
    "gender": "P",
    "className": "XII-C"
  },
  {
    "no": 34,
    "nis": "7152",
    "name": "Ni Nyoman Buda",
    "gender": "P",
    "className": "XII-C"
  },
  {
    "no": 35,
    "nis": "7155",
    "name": "Ni Putu Eka Widiantari",
    "gender": "P",
    "className": "XII-C"
  },
  {
    "no": 36,
    "nis": "7255",
    "name": "Ni Wayan Dewi Dama Yanti",
    "gender": "P",
    "className": "XII-C"
  },
  {
    "no": 1,
    "nis": "7159",
    "name": "I Gede Bakti Arya Putera",
    "gender": "L",
    "className": "XII-D"
  },
  {
    "no": 2,
    "nis": "7192",
    "name": "I Gede Wijaya",
    "gender": "L",
    "className": "XII-D"
  },
  {
    "no": 3,
    "nis": "7194",
    "name": "I Gusti Agung Prastayana",
    "gender": "L",
    "className": "XII-D"
  },
  {
    "no": 4,
    "nis": "7195",
    "name": "I Gusti Ayu Agung Mas Witaningsih",
    "gender": "P",
    "className": "XII-D"
  },
  {
    "no": 5,
    "nis": "7196",
    "name": "I Gusti Bagus Angga Raditya Putra",
    "gender": "L",
    "className": "XII-D"
  },
  {
    "no": 6,
    "nis": "7197",
    "name": "I Gusti Bagus Rama Wira Sena",
    "gender": "L",
    "className": "XII-D"
  },
  {
    "no": 7,
    "nis": "7198",
    "name": "I Gusti Lanang Ardy Kusuma",
    "gender": "L",
    "className": "XII-D"
  },
  {
    "no": 8,
    "nis": "7199",
    "name": "I Gusti Ngurah Restu Putra",
    "gender": "L",
    "className": "XII-D"
  },
  {
    "no": 9,
    "nis": "7160",
    "name": "I Kadek Ari Wiguna",
    "gender": "L",
    "className": "XII-D"
  },
  {
    "no": 10,
    "nis": "7264",
    "name": "I Kadek Arya Ardita",
    "gender": "L",
    "className": "XII-D"
  },
  {
    "no": 11,
    "nis": "7201",
    "name": "I Kadek Revan Juni Sastra Cahyadi Putra",
    "gender": "L",
    "className": "XII-D"
  },
  {
    "no": 12,
    "nis": "7163",
    "name": "I Komang Adwaita Mahayana",
    "gender": "L",
    "className": "XII-D"
  },
  {
    "no": 13,
    "nis": "7270",
    "name": "I Komang Hendra Tri",
    "gender": "L",
    "className": "XII-D"
  },
  {
    "no": 14,
    "nis": "7166",
    "name": "I Komang Widiantara",
    "gender": "L",
    "className": "XII-D"
  },
  {
    "no": 15,
    "nis": "7167",
    "name": "I Made Aldi Pranata",
    "gender": "L",
    "className": "XII-D"
  },
  {
    "no": 16,
    "nis": "7203",
    "name": "I Nyoman Pande Yoga Triguna",
    "gender": "L",
    "className": "XII-D"
  },
  {
    "no": 17,
    "nis": "7170",
    "name": "I Putu Agus Sagita Permana",
    "gender": "L",
    "className": "XII-D"
  },
  {
    "no": 18,
    "nis": "7272",
    "name": "I Putu Pajar Arsana",
    "gender": "L",
    "className": "XII-D"
  },
  {
    "no": 19,
    "nis": "7206",
    "name": "I Wayan Gajah Mada Wiraguna Sutawa",
    "gender": "L",
    "className": "XII-D"
  },
  {
    "no": 20,
    "nis": "7208",
    "name": "Kadek Lanang Dauh Widiana Putra",
    "gender": "L",
    "className": "XII-D"
  },
  {
    "no": 21,
    "nis": "7172",
    "name": "Ni Kadek Ayu Aristya Pebriyanti",
    "gender": "P",
    "className": "XII-D"
  },
  {
    "no": 22,
    "nis": "7210",
    "name": "Ni Kadek Ayu Jelita Mulandari",
    "gender": "P",
    "className": "XII-D"
  },
  {
    "no": 23,
    "nis": "7212",
    "name": "Ni Kadek Cessa Paramitha",
    "gender": "P",
    "className": "XII-D"
  },
  {
    "no": 24,
    "nis": "7174",
    "name": "Ni Kadek Marta Meisita",
    "gender": "P",
    "className": "XII-D"
  },
  {
    "no": 25,
    "nis": "7178",
    "name": "Ni Ketut Shinta Lestari",
    "gender": "P",
    "className": "XII-D"
  },
  {
    "no": 26,
    "nis": "7219",
    "name": "Ni Komang Adi Tri Purnami",
    "gender": "P",
    "className": "XII-D"
  },
  {
    "no": 27,
    "nis": "7220",
    "name": "Ni Luh Ayu Sulastri",
    "gender": "P",
    "className": "XII-D"
  },
  {
    "no": 28,
    "nis": "7218",
    "name": "Ni Luh Nisma Dewi",
    "gender": "P",
    "className": "XII-D"
  },
  {
    "no": 29,
    "nis": "7182",
    "name": "Ni Made Asti Dewi Yanti",
    "gender": "P",
    "className": "XII-D"
  },
  {
    "no": 30,
    "nis": "7183",
    "name": "Ni Made Wangi Marianti",
    "gender": "P",
    "className": "XII-D"
  },
  {
    "no": 31,
    "nis": "7215",
    "name": "Ni Putu Apriliani",
    "gender": "P",
    "className": "XII-D"
  },
  {
    "no": 32,
    "nis": "7222",
    "name": "Ni Putu Eva Trisnayanti",
    "gender": "P",
    "className": "XII-D"
  },
  {
    "no": 33,
    "nis": "7223",
    "name": "Ni Putu Gita Kharista Lestari",
    "gender": "P",
    "className": "XII-D"
  },
  {
    "no": 34,
    "nis": "7187",
    "name": "Ni Putu Revina Pradnya Sinta",
    "gender": "P",
    "className": "XII-D"
  },
  {
    "no": 35,
    "nis": "7189",
    "name": "Ni Wayan Eka Sri Wahyuni",
    "gender": "P",
    "className": "XII-D"
  },
  {
    "no": 36,
    "nis": "7224",
    "name": "Ni Wayan Suniantari",
    "gender": "P",
    "className": "XII-D"
  },
  {
    "no": 1,
    "nis": "7226",
    "name": "I Dewa Ayu Sri Laksmi Pradnyawati",
    "gender": "P",
    "className": "XII-E"
  },
  {
    "no": 2,
    "nis": "7094",
    "name": "I Gusti Ayu Wulantari",
    "gender": "P",
    "className": "XII-E"
  },
  {
    "no": 3,
    "nis": "7266",
    "name": "I Kadek Sukerta",
    "gender": "L",
    "className": "XII-E"
  },
  {
    "no": 4,
    "nis": "7129",
    "name": "I Ketut Adi Setiawan",
    "gender": "L",
    "className": "XII-E"
  },
  {
    "no": 5,
    "nis": "7267",
    "name": "I Ketut Apang Ariama",
    "gender": "L",
    "className": "XII-E"
  },
  {
    "no": 6,
    "nis": "7131",
    "name": "I Ketut Arsa Wibawa",
    "gender": "L",
    "className": "XII-E"
  },
  {
    "no": 7,
    "nis": "7268",
    "name": "I Komang Agus Tirtayoga",
    "gender": "L",
    "className": "XII-E"
  },
  {
    "no": 8,
    "nis": "7202",
    "name": "I Komang Putra Widnyana",
    "gender": "L",
    "className": "XII-E"
  },
  {
    "no": 9,
    "nis": "7271",
    "name": "I Putu Eka Suarbawa",
    "gender": "L",
    "className": "XII-E"
  },
  {
    "no": 10,
    "nis": "7105",
    "name": "Ida Ayu Komala Putri",
    "gender": "P",
    "className": "XII-E"
  },
  {
    "no": 11,
    "nis": "7207",
    "name": "Kadek Aulia Pradnya Dewi",
    "gender": "P",
    "className": "XII-E"
  },
  {
    "no": 12,
    "nis": "7107",
    "name": "Komang Tri Angi Arsintha Devi",
    "gender": "P",
    "className": "XII-E"
  },
  {
    "no": 13,
    "nis": "7209",
    "name": "Ni Kadek Amix Septiyani",
    "gender": "P",
    "className": "XII-E"
  },
  {
    "no": 14,
    "nis": "7141",
    "name": "Ni Kadek Dwi Sukasih",
    "gender": "P",
    "className": "XII-E"
  },
  {
    "no": 15,
    "nis": "7213",
    "name": "Ni Kadek Eva Rahayuningsih",
    "gender": "P",
    "className": "XII-E"
  },
  {
    "no": 16,
    "nis": "7214",
    "name": "Ni Kadek Mei Dwi Yanti",
    "gender": "P",
    "className": "XII-E"
  },
  {
    "no": 17,
    "nis": "7216",
    "name": "Ni Kadek Sri Artini",
    "gender": "P",
    "className": "XII-E"
  },
  {
    "no": 18,
    "nis": "7144",
    "name": "Ni Kadek Suarini",
    "gender": "P",
    "className": "XII-E"
  },
  {
    "no": 19,
    "nis": "7145",
    "name": "Ni Kadek Wisnu Sri Arianti",
    "gender": "P",
    "className": "XII-E"
  },
  {
    "no": 20,
    "nis": "7176",
    "name": "Ni Kadek Wulan Dian Lestari",
    "gender": "P",
    "className": "XII-E"
  },
  {
    "no": 21,
    "nis": "7111",
    "name": "Ni Ketut Ayu Ria Asih",
    "gender": "P",
    "className": "XII-E"
  },
  {
    "no": 22,
    "nis": "7147",
    "name": "Ni Luh Ade Dwi Ari Ristiantini",
    "gender": "P",
    "className": "XII-E"
  },
  {
    "no": 23,
    "nis": "7221",
    "name": "Ni Luh Putu Vera",
    "gender": "P",
    "className": "XII-E"
  },
  {
    "no": 24,
    "nis": "7150",
    "name": "Ni Luh Sabantari",
    "gender": "P",
    "className": "XII-E"
  },
  {
    "no": 25,
    "nis": "7122",
    "name": "Ni Wayan Astini",
    "gender": "P",
    "className": "XII-E"
  },
  {
    "no": 26,
    "nis": "7157",
    "name": "Pasek Agung Wibisana",
    "gender": "L",
    "className": "XII-E"
  },
  {
    "no": 1,
    "nis": "7227",
    "name": "I Gede Diva Aditya Wiguna",
    "gender": "L",
    "className": "XII-F"
  },
  {
    "no": 2,
    "nis": "7228",
    "name": "I Gede Yudira Putra",
    "gender": "L",
    "className": "XII-F"
  },
  {
    "no": 3,
    "nis": "7261",
    "name": "I Gusti Ayu Novita Sari",
    "gender": "P",
    "className": "XII-F"
  },
  {
    "no": 4,
    "nis": "7225",
    "name": "I Gusti Ayu Sintia Rinati",
    "gender": "P",
    "className": "XII-F"
  },
  {
    "no": 5,
    "nis": "7236",
    "name": "I Kadek Sumerta",
    "gender": "L",
    "className": "XII-F"
  },
  {
    "no": 6,
    "nis": "7238",
    "name": "I Komang Bagus Pradnyana",
    "gender": "L",
    "className": "XII-F"
  },
  {
    "no": 7,
    "nis": "7269",
    "name": "I Komang Darma Putra",
    "gender": "L",
    "className": "XII-F"
  },
  {
    "no": 8,
    "nis": "7240",
    "name": "I Nyoman Ari",
    "gender": "L",
    "className": "XII-F"
  },
  {
    "no": 9,
    "nis": "7242",
    "name": "I Putu Eka Mahadita",
    "gender": "L",
    "className": "XII-F"
  },
  {
    "no": 10,
    "nis": "7175",
    "name": "Ni Kadek Nita Purnamaningsih",
    "gender": "P",
    "className": "XII-F"
  },
  {
    "no": 11,
    "nis": "7275",
    "name": "Ni Kadek Ponita",
    "gender": "P",
    "className": "XII-F"
  },
  {
    "no": 12,
    "nis": "7278",
    "name": "Ni Kadek Widya Pebrianti",
    "gender": "P",
    "className": "XII-F"
  },
  {
    "no": 13,
    "nis": "7177",
    "name": "Ni Ketut Ayu Puspayanti",
    "gender": "P",
    "className": "XII-F"
  },
  {
    "no": 14,
    "nis": "7280",
    "name": "Ni Ketut Lestari",
    "gender": "P",
    "className": "XII-F"
  },
  {
    "no": 15,
    "nis": "7281",
    "name": "Ni Ketut Suartini",
    "gender": "P",
    "className": "XII-F"
  },
  {
    "no": 16,
    "nis": "7282",
    "name": "Ni Komang Astini",
    "gender": "P",
    "className": "XII-F"
  },
  {
    "no": 17,
    "nis": "7179",
    "name": "Ni Komang Ayu Andini",
    "gender": "P",
    "className": "XII-F"
  },
  {
    "no": 18,
    "nis": "7180",
    "name": "Ni Komang Suati",
    "gender": "P",
    "className": "XII-F"
  },
  {
    "no": 19,
    "nis": "7151",
    "name": "Ni Made Laksmi Devi",
    "gender": "P",
    "className": "XII-F"
  },
  {
    "no": 20,
    "nis": "7184",
    "name": "Ni Nyoman Ayu Mariani",
    "gender": "P",
    "className": "XII-F"
  },
  {
    "no": 21,
    "nis": "7284",
    "name": "Ni Putu Apriliyani",
    "gender": "P",
    "className": "XII-F"
  },
  {
    "no": 22,
    "nis": "7153",
    "name": "Ni Putu Ari Suastini",
    "gender": "P",
    "className": "XII-F"
  },
  {
    "no": 23,
    "nis": "7185",
    "name": "Ni Putu Desi Anggawati",
    "gender": "P",
    "className": "XII-F"
  },
  {
    "no": 24,
    "nis": "7286",
    "name": "Ni Putu Rika Widiani",
    "gender": "P",
    "className": "XII-F"
  },
  {
    "no": 25,
    "nis": "7288",
    "name": "Ni Putu Sri Utami Kencana Dewi",
    "gender": "P",
    "className": "XII-F"
  },
  {
    "no": 26,
    "nis": "7156",
    "name": "Ni Wayan Supiantari",
    "gender": "P",
    "className": "XII-F"
  },
  {
    "no": 1,
    "nis": "7158",
    "name": "I Agus Predi",
    "gender": "L",
    "className": "XII-G"
  },
  {
    "no": 2,
    "nis": "7193",
    "name": "I Gusti Agung Ngurah Sugata",
    "gender": "L",
    "className": "XII-G"
  },
  {
    "no": 3,
    "nis": "7229",
    "name": "I Gusti Ayu Agung Novitalia Putri",
    "gender": "P",
    "className": "XII-G"
  },
  {
    "no": 4,
    "nis": "7260",
    "name": "I Gusti Ayu Agung Widya Pramayanti",
    "gender": "P",
    "className": "XII-G"
  },
  {
    "no": 5,
    "nis": "7200",
    "name": "I Kadek Adi Adnyana",
    "gender": "L",
    "className": "XII-G"
  },
  {
    "no": 6,
    "nis": "7161",
    "name": "I Kadek Nova Bayu Saputra",
    "gender": "L",
    "className": "XII-G"
  },
  {
    "no": 7,
    "nis": "7098",
    "name": "I Kadek Puja Astawa",
    "gender": "L",
    "className": "XII-G"
  },
  {
    "no": 8,
    "nis": "7099",
    "name": "I Kadek Yudik Darma Wiseka",
    "gender": "L",
    "className": "XII-G"
  },
  {
    "no": 9,
    "nis": "7164",
    "name": "I Komang Agus Mudiarta",
    "gender": "L",
    "className": "XII-G"
  },
  {
    "no": 10,
    "nis": "7165",
    "name": "I Komang Budiarta",
    "gender": "L",
    "className": "XII-G"
  },
  {
    "no": 11,
    "nis": "7239",
    "name": "I Komang Pande Ariantara",
    "gender": "L",
    "className": "XII-G"
  },
  {
    "no": 12,
    "nis": "7137",
    "name": "I Komang Wahyu Pramana Padmayuna",
    "gender": "L",
    "className": "XII-G"
  },
  {
    "no": 13,
    "nis": "7168",
    "name": "I Made Ariana",
    "gender": "L",
    "className": "XII-G"
  },
  {
    "no": 14,
    "nis": "7169",
    "name": "I Nyoman Gede Suteja",
    "gender": "L",
    "className": "XII-G"
  },
  {
    "no": 15,
    "nis": "7204",
    "name": "I Putu Adnyana",
    "gender": "L",
    "className": "XII-G"
  },
  {
    "no": 16,
    "nis": "7241",
    "name": "I Putu Agus Arya Donata",
    "gender": "L",
    "className": "XII-G"
  },
  {
    "no": 17,
    "nis": "7171",
    "name": "I Wayan Juliantara",
    "gender": "L",
    "className": "XII-G"
  },
  {
    "no": 18,
    "nis": "7291",
    "name": "Made Celsie Okta Anjani",
    "gender": "P",
    "className": "XII-G"
  },
  {
    "no": 19,
    "nis": "7246",
    "name": "Ni Kadek Ayu Chandrawati",
    "gender": "P",
    "className": "XII-G"
  },
  {
    "no": 20,
    "nis": "7173",
    "name": "Ni Kadek Manis",
    "gender": "P",
    "className": "XII-G"
  },
  {
    "no": 21,
    "nis": "7247",
    "name": "Ni Kadek Sariani",
    "gender": "P",
    "className": "XII-G"
  },
  {
    "no": 22,
    "nis": "7217",
    "name": "Ni Kadek Sri Utami",
    "gender": "P",
    "className": "XII-G"
  },
  {
    "no": 23,
    "nis": "7251",
    "name": "Ni Komang Sukma Ardani",
    "gender": "P",
    "className": "XII-G"
  },
  {
    "no": 24,
    "nis": "7181",
    "name": "Ni Luh Erna Wati",
    "gender": "P",
    "className": "XII-G"
  },
  {
    "no": 25,
    "nis": "7253",
    "name": "Ni Luh Putu Sriwadi",
    "gender": "P",
    "className": "XII-G"
  },
  {
    "no": 26,
    "nis": "7283",
    "name": "Ni Made Sintya Dewi",
    "gender": "P",
    "className": "XII-G"
  },
  {
    "no": 27,
    "nis": "7254",
    "name": "Ni Putu Ayu Sriningsih",
    "gender": "P",
    "className": "XII-G"
  },
  {
    "no": 28,
    "nis": "7285",
    "name": "Ni Putu Diah April Yanti",
    "gender": "P",
    "className": "XII-G"
  },
  {
    "no": 29,
    "nis": "7186",
    "name": "Ni Putu Diah Sapitri",
    "gender": "P",
    "className": "XII-G"
  },
  {
    "no": 30,
    "nis": "7188",
    "name": "Ni Wayan Ayu Dewi Antari",
    "gender": "P",
    "className": "XII-G"
  },
  {
    "no": 31,
    "nis": "7190",
    "name": "Ni Wayan Juni Ariati",
    "gender": "P",
    "className": "XII-G"
  },
  {
    "no": 32,
    "nis": "7287",
    "name": "Ni Wayan Riska Yanti",
    "gender": "P",
    "className": "XII-G"
  },
  {
    "no": 33,
    "nis": "7256",
    "name": "Ni Wayan Suriartini",
    "gender": "P",
    "className": "XII-G"
  },
  {
    "no": 34,
    "nis": "7191",
    "name": "Putu Deswinta Dewi",
    "gender": "P",
    "className": "XII-G"
  },
  {
    "no": 1,
    "nis": "7292",
    "name": "Ayu Handayani Devika",
    "gender": "P",
    "className": "XI-A"
  },
  {
    "no": 2,
    "nis": "7428",
    "name": "I Gede Eka Ardiana",
    "gender": "L",
    "className": "XI-A"
  },
  {
    "no": 3,
    "nis": "7293",
    "name": "I Gede Putra Waisnawa",
    "gender": "L",
    "className": "XI-A"
  },
  {
    "no": 4,
    "nis": "7294",
    "name": "I Gusti Agung Bagus Putra Pratama",
    "gender": "L",
    "className": "XI-A"
  },
  {
    "no": 5,
    "nis": "7295",
    "name": "I Gusti Agung Radia Vallent Sidemen",
    "gender": "L",
    "className": "XI-A"
  },
  {
    "no": 6,
    "nis": "7396",
    "name": "I Gusti Ayu Agung Tri Cahyani",
    "gender": "P",
    "className": "XI-A"
  },
  {
    "no": 7,
    "nis": "7296",
    "name": "I Gusti Ayu Sri Amrita Padmawati",
    "gender": "P",
    "className": "XI-A"
  },
  {
    "no": 8,
    "nis": "7440",
    "name": "I Ketut Hary Wijaya",
    "gender": "L",
    "className": "XI-A"
  },
  {
    "no": 9,
    "nis": "7298",
    "name": "I Ketut Nova Ananta Putra",
    "gender": "L",
    "className": "XI-A"
  },
  {
    "no": 10,
    "nis": "7299",
    "name": "I Komang Bayu Indra Kusuma",
    "gender": "L",
    "className": "XI-A"
  },
  {
    "no": 11,
    "nis": "7301",
    "name": "I Komang Satria Wiguna",
    "gender": "L",
    "className": "XI-A"
  },
  {
    "no": 12,
    "nis": "7443",
    "name": "I Komang Wisma Pradnyana",
    "gender": "L",
    "className": "XI-A"
  },
  {
    "no": 13,
    "nis": "7303",
    "name": "I Made Jati Darmaputra",
    "gender": "L",
    "className": "XI-A"
  },
  {
    "no": 14,
    "nis": "7304",
    "name": "I Made Parama Danadyaksa Permadi",
    "gender": "L",
    "className": "XI-A"
  },
  {
    "no": 15,
    "nis": "7306",
    "name": "I Putu Galang Aditya",
    "gender": "L",
    "className": "XI-A"
  },
  {
    "no": 16,
    "nis": "7309",
    "name": "Luh Tu Sri Purnami Ayu",
    "gender": "P",
    "className": "XI-A"
  },
  {
    "no": 17,
    "nis": "7510",
    "name": "Muhammad Zaky Abdee Arianto",
    "gender": "L",
    "className": "XI-A"
  },
  {
    "no": 18,
    "nis": "7310",
    "name": "Ni Kadek Astiti Asih",
    "gender": "P",
    "className": "XI-A"
  },
  {
    "no": 19,
    "nis": "7414",
    "name": "Ni Kadek Pasek Suci Pradnyani",
    "gender": "P",
    "className": "XI-A"
  },
  {
    "no": 20,
    "nis": "7311",
    "name": "Ni Kadek Sinar Trisna Yani",
    "gender": "P",
    "className": "XI-A"
  },
  {
    "no": 21,
    "nis": "7312",
    "name": "Ni Ketut Ayu Wijani",
    "gender": "P",
    "className": "XI-A"
  },
  {
    "no": 22,
    "nis": "7313",
    "name": "Ni Komang Nadia Pratiwi",
    "gender": "P",
    "className": "XI-A"
  },
  {
    "no": 23,
    "nis": "7314",
    "name": "Ni Komang Triamita Ardani",
    "gender": "P",
    "className": "XI-A"
  },
  {
    "no": 24,
    "nis": "7315",
    "name": "Ni Komang Trisna Manik Sudani",
    "gender": "P",
    "className": "XI-A"
  },
  {
    "no": 25,
    "nis": "7316",
    "name": "Ni Luh Putu Eka Yuliani",
    "gender": "P",
    "className": "XI-A"
  },
  {
    "no": 26,
    "nis": "7318",
    "name": "Ni Luh Raniasih",
    "gender": "P",
    "className": "XI-A"
  },
  {
    "no": 27,
    "nis": "7319",
    "name": "Ni Made Intan Karisma Karya",
    "gender": "P",
    "className": "XI-A"
  },
  {
    "no": 28,
    "nis": "7320",
    "name": "Ni Made Nita Daging Fajariani Dewi",
    "gender": "P",
    "className": "XI-A"
  },
  {
    "no": 29,
    "nis": "7424",
    "name": "Ni Nengah Prawidya Adnya Swari",
    "gender": "P",
    "className": "XI-A"
  },
  {
    "no": 30,
    "nis": "7321",
    "name": "Ni Nyoman Trisna Ari Utami",
    "gender": "P",
    "className": "XI-A"
  },
  {
    "no": 31,
    "nis": "7322",
    "name": "Ni Putu Eka Komala Sari",
    "gender": "P",
    "className": "XI-A"
  },
  {
    "no": 32,
    "nis": "7323",
    "name": "Ni Putu Fajarina Nareswari",
    "gender": "P",
    "className": "XI-A"
  },
  {
    "no": 33,
    "nis": "7325",
    "name": "Ni Putu Putri Ratyasari",
    "gender": "P",
    "className": "XI-A"
  },
  {
    "no": 1,
    "nis": "7326",
    "name": "I Gede Agus Pande Wiguna",
    "gender": "L",
    "className": "XI-B"
  },
  {
    "no": 2,
    "nis": "7499",
    "name": "I Gede Widiarta",
    "gender": "L",
    "className": "XI-B"
  },
  {
    "no": 3,
    "nis": "7432",
    "name": "I Gusti Agung Okta Satria Adnyana",
    "gender": "L",
    "className": "XI-B"
  },
  {
    "no": 4,
    "nis": "7327",
    "name": "I Gusti Ayu Agung Widya Julyandari",
    "gender": "P",
    "className": "XI-B"
  },
  {
    "no": 5,
    "nis": "7463",
    "name": "I Gusti Ayu Aprilia Pratiwi",
    "gender": "P",
    "className": "XI-B"
  },
  {
    "no": 6,
    "nis": "7398",
    "name": "I Gusti Ayu Widya Nikayani",
    "gender": "P",
    "className": "XI-B"
  },
  {
    "no": 7,
    "nis": "7437",
    "name": "I Gusti Ngurah Adi Adnyana",
    "gender": "L",
    "className": "XI-B"
  },
  {
    "no": 8,
    "nis": "7328",
    "name": "I Kadek Nanda Arya Wiguna",
    "gender": "L",
    "className": "XI-B"
  },
  {
    "no": 9,
    "nis": "7330",
    "name": "I Kadek Satya Wirayuda",
    "gender": "L",
    "className": "XI-B"
  },
  {
    "no": 10,
    "nis": "7471",
    "name": "I Komang Agus Tapa",
    "gender": "L",
    "className": "XI-B"
  },
  {
    "no": 11,
    "nis": "7331",
    "name": "I Komang Hardiasa",
    "gender": "L",
    "className": "XI-B"
  },
  {
    "no": 12,
    "nis": "7333",
    "name": "I Made Sena Arinata",
    "gender": "L",
    "className": "XI-B"
  },
  {
    "no": 13,
    "nis": "7334",
    "name": "I Made Tangkas Cahyana",
    "gender": "L",
    "className": "XI-B"
  },
  {
    "no": 14,
    "nis": "7337",
    "name": "I Wayan Agus Eka Putra",
    "gender": "L",
    "className": "XI-B"
  },
  {
    "no": 15,
    "nis": "7339",
    "name": "Kadek Dimas Vernanda",
    "gender": "L",
    "className": "XI-B"
  },
  {
    "no": 16,
    "nis": "7478",
    "name": "Luh Ayunda Pramunisya",
    "gender": "P",
    "className": "XI-B"
  },
  {
    "no": 17,
    "nis": "7341",
    "name": "Ni Kadek Dwi Antari Purnama Dewi",
    "gender": "P",
    "className": "XI-B"
  },
  {
    "no": 18,
    "nis": "7481",
    "name": "Ni Kadek Dwi Payanti",
    "gender": "P",
    "className": "XI-B"
  },
  {
    "no": 19,
    "nis": "7342",
    "name": "Ni Kadek Listya Maharani",
    "gender": "P",
    "className": "XI-B"
  },
  {
    "no": 20,
    "nis": "7483",
    "name": "Ni Kadek Sandiasih",
    "gender": "P",
    "className": "XI-B"
  },
  {
    "no": 21,
    "nis": "7484",
    "name": "Ni Kadek Sulistya Dewi",
    "gender": "P",
    "className": "XI-B"
  },
  {
    "no": 22,
    "nis": "7344",
    "name": "Ni Ketut Angun Trisna Cahaya",
    "gender": "P",
    "className": "XI-B"
  },
  {
    "no": 23,
    "nis": "7486",
    "name": "Ni Ketut Juli Arianti",
    "gender": "P",
    "className": "XI-B"
  },
  {
    "no": 24,
    "nis": "7487",
    "name": "Ni Komang Dita Juli Lestari",
    "gender": "P",
    "className": "XI-B"
  },
  {
    "no": 25,
    "nis": "7488",
    "name": "Ni Luh Ade Dewi Anggreni",
    "gender": "P",
    "className": "XI-B"
  },
  {
    "no": 26,
    "nis": "7457",
    "name": "Ni Luh Ade Dwi Muli Adnyani",
    "gender": "P",
    "className": "XI-B"
  },
  {
    "no": 27,
    "nis": "7355",
    "name": "Ni Luh Septi Muliandari",
    "gender": "P",
    "className": "XI-B"
  },
  {
    "no": 28,
    "nis": "7356",
    "name": "Ni Luh Ulandari",
    "gender": "P",
    "className": "XI-B"
  },
  {
    "no": 29,
    "nis": "7357",
    "name": "Ni Nengah Rismayanti",
    "gender": "P",
    "className": "XI-B"
  },
  {
    "no": 30,
    "nis": "7490",
    "name": "Ni Nyoman Bellisya Putri",
    "gender": "P",
    "className": "XI-B"
  },
  {
    "no": 31,
    "nis": "7492",
    "name": "Ni Wayan Wina Ramayanti",
    "gender": "P",
    "className": "XI-B"
  },
  {
    "no": 32,
    "nis": "7493",
    "name": "Putu Tangkas Devandra Widi",
    "gender": "L",
    "className": "XI-B"
  },
  {
    "no": 1,
    "nis": "7363",
    "name": "I Gusti Agung Ayu Indah",
    "gender": "P",
    "className": "XI-C"
  },
  {
    "no": 2,
    "nis": "7431",
    "name": "I Gusti Agung Ayu Kenran Apta Nareswari",
    "gender": "P",
    "className": "XI-C"
  },
  {
    "no": 3,
    "nis": "7433",
    "name": "I Gusti Ayu Diah Wardani",
    "gender": "P",
    "className": "XI-C"
  },
  {
    "no": 4,
    "nis": "7435",
    "name": "I Gusti Ayu Widiantari",
    "gender": "P",
    "className": "XI-C"
  },
  {
    "no": 5,
    "nis": "7465",
    "name": "I Gusti Ayu Yesika Tri Utami",
    "gender": "P",
    "className": "XI-C"
  },
  {
    "no": 6,
    "nis": "7364",
    "name": "I Kadek Agus Adi Putra",
    "gender": "L",
    "className": "XI-C"
  },
  {
    "no": 7,
    "nis": "7438",
    "name": "I Kadek Dika Dirgantara Putra",
    "gender": "L",
    "className": "XI-C"
  },
  {
    "no": 8,
    "nis": "7366",
    "name": "I Kadek Marta Kusumantara",
    "gender": "L",
    "className": "XI-C"
  },
  {
    "no": 9,
    "nis": "7470",
    "name": "I Ketut Subita Yasa",
    "gender": "L",
    "className": "XI-C"
  },
  {
    "no": 10,
    "nis": "7367",
    "name": "I Ketut Wisnu Adi Artha",
    "gender": "L",
    "className": "XI-C"
  },
  {
    "no": 11,
    "nis": "7473",
    "name": "I Komang Ari Saputra",
    "gender": "L",
    "className": "XI-C"
  },
  {
    "no": 12,
    "nis": "7442",
    "name": "I Komang Tri Wiguna",
    "gender": "L",
    "className": "XI-C"
  },
  {
    "no": 13,
    "nis": "7302",
    "name": "I Komang Yoga Pradnyana",
    "gender": "L",
    "className": "XI-C"
  },
  {
    "no": 14,
    "nis": "7368",
    "name": "I Made Agus Tirta",
    "gender": "L",
    "className": "XI-C"
  },
  {
    "no": 15,
    "nis": "7369",
    "name": "I Made Dwi Damar Palwaguna",
    "gender": "L",
    "className": "XI-C"
  },
  {
    "no": 16,
    "nis": "7370",
    "name": "I Putu Agus Arya Putra",
    "gender": "L",
    "className": "XI-C"
  },
  {
    "no": 17,
    "nis": "7305",
    "name": "I Putu Dika Pratama",
    "gender": "L",
    "className": "XI-C"
  },
  {
    "no": 18,
    "nis": "7374",
    "name": "I Wayan Mahendra Aryana Dinata",
    "gender": "L",
    "className": "XI-C"
  },
  {
    "no": 19,
    "nis": "7445",
    "name": "Ida Ayu Chandra Widnyani",
    "gender": "P",
    "className": "XI-C"
  },
  {
    "no": 20,
    "nis": "7446",
    "name": "Komang Ayu Dina Pristayani",
    "gender": "P",
    "className": "XI-C"
  },
  {
    "no": 21,
    "nis": "7378",
    "name": "Ni Kadek Dwi Nita Purnama Sari",
    "gender": "P",
    "className": "XI-C"
  },
  {
    "no": 22,
    "nis": "7450",
    "name": "Ni Kadek Dwi Widyantari",
    "gender": "P",
    "className": "XI-C"
  },
  {
    "no": 23,
    "nis": "7451",
    "name": "Ni Kadek Dwitya Sumardani Putri",
    "gender": "P",
    "className": "XI-C"
  },
  {
    "no": 24,
    "nis": "7452",
    "name": "Ni Kadek Dwix Setia Ningsih",
    "gender": "P",
    "className": "XI-C"
  },
  {
    "no": 25,
    "nis": "7381",
    "name": "Ni Kadek Nandiasih",
    "gender": "P",
    "className": "XI-C"
  },
  {
    "no": 26,
    "nis": "7383",
    "name": "Ni Komang Julianti Purnamasari",
    "gender": "P",
    "className": "XI-C"
  },
  {
    "no": 27,
    "nis": "7456",
    "name": "Ni Komang Trisnawati",
    "gender": "P",
    "className": "XI-C"
  },
  {
    "no": 28,
    "nis": "7384",
    "name": "Ni Luh Ade Maharsiti",
    "gender": "P",
    "className": "XI-C"
  },
  {
    "no": 29,
    "nis": "7458",
    "name": "Ni Luh Desi Natalia Fridayanti",
    "gender": "P",
    "className": "XI-C"
  },
  {
    "no": 30,
    "nis": "7390",
    "name": "Ni Luh Putu Purnama Dewi",
    "gender": "P",
    "className": "XI-C"
  },
  {
    "no": 31,
    "nis": "7459",
    "name": "Ni Luh Sri Widiantari",
    "gender": "P",
    "className": "XI-C"
  },
  {
    "no": 32,
    "nis": "7461",
    "name": "Ni Made Dina Purnama Yanti",
    "gender": "P",
    "className": "XI-C"
  },
  {
    "no": 33,
    "nis": "7392",
    "name": "Ni Putu Diah Anggreni",
    "gender": "P",
    "className": "XI-C"
  },
  {
    "no": 34,
    "nis": "7393",
    "name": "Ni Putu Melani",
    "gender": "P",
    "className": "XI-C"
  },
  {
    "no": 1,
    "nis": "7394",
    "name": "Ayu Putu Mulya Dewi",
    "gender": "P",
    "className": "XI-D"
  },
  {
    "no": 2,
    "nis": "7434",
    "name": "I Gusti Ayu Dwi Septiari",
    "gender": "P",
    "className": "XI-D"
  },
  {
    "no": 3,
    "nis": "7399",
    "name": "I Kadek Billy Wardana Putra",
    "gender": "L",
    "className": "XI-D"
  },
  {
    "no": 4,
    "nis": "7401",
    "name": "I Kadek Yaswika",
    "gender": "L",
    "className": "XI-D"
  },
  {
    "no": 5,
    "nis": "7405",
    "name": "I Ketut Surya Artha Jaya",
    "gender": "L",
    "className": "XI-D"
  },
  {
    "no": 6,
    "nis": "7406",
    "name": "I Ketut Yudi Yuwana",
    "gender": "L",
    "className": "XI-D"
  },
  {
    "no": 7,
    "nis": "7407",
    "name": "I Komang Agus Trio Widianta",
    "gender": "L",
    "className": "XI-D"
  },
  {
    "no": 8,
    "nis": "7332",
    "name": "I Made Dwi Tirta Yasa",
    "gender": "L",
    "className": "XI-D"
  },
  {
    "no": 9,
    "nis": "7335",
    "name": "I Nengah Tangkas Wedana",
    "gender": "L",
    "className": "XI-D"
  },
  {
    "no": 10,
    "nis": "7409",
    "name": "I Putu Aditya Wiratama",
    "gender": "L",
    "className": "XI-D"
  },
  {
    "no": 11,
    "nis": "7410",
    "name": "I Putu Parnawan",
    "gender": "L",
    "className": "XI-D"
  },
  {
    "no": 12,
    "nis": "7411",
    "name": "I Putu Santika",
    "gender": "L",
    "className": "XI-D"
  },
  {
    "no": 13,
    "nis": "7338",
    "name": "I Wayan Budiartawan",
    "gender": "L",
    "className": "XI-D"
  },
  {
    "no": 14,
    "nis": "7412",
    "name": "Luh Ade Deviana Sekaputri",
    "gender": "P",
    "className": "XI-D"
  },
  {
    "no": 15,
    "nis": "7509",
    "name": "Luh Bintang Suantari",
    "gender": "P",
    "className": "XI-D"
  },
  {
    "no": 16,
    "nis": "7413",
    "name": "Ni Kade Juni Anggreni",
    "gender": "P",
    "className": "XI-D"
  },
  {
    "no": 17,
    "nis": "7511",
    "name": "Ni Kadek Ayu Riska Yani",
    "gender": "P",
    "className": "XI-D"
  },
  {
    "no": 18,
    "nis": "7453",
    "name": "Ni Kadek Nisa Ditaryanti",
    "gender": "P",
    "className": "XI-D"
  },
  {
    "no": 19,
    "nis": "7514",
    "name": "Ni Kadek Nusari",
    "gender": "P",
    "className": "XI-D"
  },
  {
    "no": 20,
    "nis": "7415",
    "name": "Ni Kadek Rika Damayanti",
    "gender": "P",
    "className": "XI-D"
  },
  {
    "no": 21,
    "nis": "7345",
    "name": "Ni Ketut Arianti",
    "gender": "P",
    "className": "XI-D"
  },
  {
    "no": 22,
    "nis": "7417",
    "name": "Ni Ketut Ayu Aprilia Yanti",
    "gender": "P",
    "className": "XI-D"
  },
  {
    "no": 23,
    "nis": "7346",
    "name": "Ni Ketut Diah Catur Pebrianti",
    "gender": "P",
    "className": "XI-D"
  },
  {
    "no": 24,
    "nis": "7418",
    "name": "Ni Ketut Purnama Dewi",
    "gender": "P",
    "className": "XI-D"
  },
  {
    "no": 25,
    "nis": "7517",
    "name": "Ni Ketut Sri Mahayuni",
    "gender": "P",
    "className": "XI-D"
  },
  {
    "no": 26,
    "nis": "7419",
    "name": "Ni Komang Ayu Mila Sri Utami",
    "gender": "P",
    "className": "XI-D"
  },
  {
    "no": 27,
    "nis": "7455",
    "name": "Ni Komang Trisna Ari Sugandawati",
    "gender": "P",
    "className": "XI-D"
  },
  {
    "no": 28,
    "nis": "7351",
    "name": "Ni Luh Ami Julia Rasti",
    "gender": "P",
    "className": "XI-D"
  },
  {
    "no": 29,
    "nis": "7352",
    "name": "Ni Luh Eka Sudyantini",
    "gender": "P",
    "className": "XI-D"
  },
  {
    "no": 30,
    "nis": "7354",
    "name": "Ni Luh Sekariani",
    "gender": "P",
    "className": "XI-D"
  },
  {
    "no": 31,
    "nis": "7426",
    "name": "Ni Putu Eka Juni Pratiwi",
    "gender": "P",
    "className": "XI-D"
  },
  {
    "no": 32,
    "nis": "7524",
    "name": "Ni Putu Juli Lestari",
    "gender": "P",
    "className": "XI-D"
  },
  {
    "no": 33,
    "nis": "7359",
    "name": "Putu Yoga Premananda",
    "gender": "L",
    "className": "XI-D"
  },
  {
    "no": 1,
    "nis": "7496",
    "name": "I Dewa Gede Budi Septiawan",
    "gender": "L",
    "className": "XI-E"
  },
  {
    "no": 2,
    "nis": "7429",
    "name": "I Gede Rama Raditya Primawijaya",
    "gender": "L",
    "className": "XI-E"
  },
  {
    "no": 3,
    "nis": "7497",
    "name": "I Gede Sloki Arta Wiguna",
    "gender": "L",
    "className": "XI-E"
  },
  {
    "no": 4,
    "nis": "7362",
    "name": "I Gede Vaicha Tirtana",
    "gender": "L",
    "className": "XI-E"
  },
  {
    "no": 5,
    "nis": "7397",
    "name": "I Gusti Ayu Cihna Dewi",
    "gender": "P",
    "className": "XI-E"
  },
  {
    "no": 6,
    "nis": "7464",
    "name": "I Gusti Ayu Ita Artika",
    "gender": "P",
    "className": "XI-E"
  },
  {
    "no": 7,
    "nis": "7404",
    "name": "I Ketut Suardika",
    "gender": "L",
    "className": "XI-E"
  },
  {
    "no": 8,
    "nis": "7441",
    "name": "I Komang Krisnanda Septian Adiharta",
    "gender": "L",
    "className": "XI-E"
  },
  {
    "no": 9,
    "nis": "7371",
    "name": "I Putu Deva Pratama Putra",
    "gender": "L",
    "className": "XI-E"
  },
  {
    "no": 10,
    "nis": "7376",
    "name": "Ni Kadek Ananda Wardani",
    "gender": "P",
    "className": "XI-E"
  },
  {
    "no": 11,
    "nis": "7512",
    "name": "Ni Kadek Devi Mita Utari",
    "gender": "P",
    "className": "XI-E"
  },
  {
    "no": 12,
    "nis": "7377",
    "name": "Ni Kadek Dwi Antari",
    "gender": "P",
    "className": "XI-E"
  },
  {
    "no": 13,
    "nis": "7379",
    "name": "Ni Kadek Juliantini",
    "gender": "P",
    "className": "XI-E"
  },
  {
    "no": 14,
    "nis": "7380",
    "name": "Ni Kadek Listiantari",
    "gender": "P",
    "className": "XI-E"
  },
  {
    "no": 15,
    "nis": "7516",
    "name": "Ni Kadek Widiantari",
    "gender": "P",
    "className": "XI-E"
  },
  {
    "no": 16,
    "nis": "7382",
    "name": "Ni Kadek Yuliani",
    "gender": "P",
    "className": "XI-E"
  },
  {
    "no": 17,
    "nis": "7416",
    "name": "Ni Kadek Yuni Antari",
    "gender": "P",
    "className": "XI-E"
  },
  {
    "no": 18,
    "nis": "7519",
    "name": "Ni Komang Ari",
    "gender": "P",
    "className": "XI-E"
  },
  {
    "no": 19,
    "nis": "7420",
    "name": "Ni Komang Dwi Astiti Karyaningsih",
    "gender": "P",
    "className": "XI-E"
  },
  {
    "no": 20,
    "nis": "7348",
    "name": "Ni Komang Ebi Seri Terisna",
    "gender": "P",
    "className": "XI-E"
  },
  {
    "no": 21,
    "nis": "7385",
    "name": "Ni Luh Astini",
    "gender": "P",
    "className": "XI-E"
  },
  {
    "no": 22,
    "nis": "7421",
    "name": "Ni Luh Eka Sudiatnyani",
    "gender": "P",
    "className": "XI-E"
  },
  {
    "no": 23,
    "nis": "7389",
    "name": "Ni Luh Putu Oktaviani",
    "gender": "P",
    "className": "XI-E"
  },
  {
    "no": 24,
    "nis": "7391",
    "name": "Ni Luh Sintyasih",
    "gender": "P",
    "className": "XI-E"
  },
  {
    "no": 25,
    "nis": "7422",
    "name": "Ni Luh Udiani Putri",
    "gender": "P",
    "className": "XI-E"
  },
  {
    "no": 26,
    "nis": "7460",
    "name": "Ni Made Ayu Intan Sentini",
    "gender": "P",
    "className": "XI-E"
  },
  {
    "no": 27,
    "nis": "7423",
    "name": "Ni Made Diah Widiastiti",
    "gender": "P",
    "className": "XI-E"
  },
  {
    "no": 28,
    "nis": "7425",
    "name": "Ni Nyoman Setiani",
    "gender": "P",
    "className": "XI-E"
  },
  {
    "no": 29,
    "nis": "7324",
    "name": "Ni Putu Fully Nandina Anita Sani",
    "gender": "P",
    "className": "XI-E"
  },
  {
    "no": 30,
    "nis": "7427",
    "name": "Ni Putu Sinta Dewi",
    "gender": "P",
    "className": "XI-E"
  },
  {
    "no": 1,
    "nis": "7462",
    "name": "I Gede Agus Suryanta",
    "gender": "L",
    "className": "XI-F"
  },
  {
    "no": 2,
    "nis": "7360",
    "name": "I Gede Arsana",
    "gender": "L",
    "className": "XI-F"
  },
  {
    "no": 3,
    "nis": "7361",
    "name": "I Gede Eka Bayu Arta",
    "gender": "L",
    "className": "XI-F"
  },
  {
    "no": 4,
    "nis": "7466",
    "name": "I Kadek Arta Guna",
    "gender": "L",
    "className": "XI-F"
  },
  {
    "no": 5,
    "nis": "7467",
    "name": "I Kadek Dwi",
    "gender": "L",
    "className": "XI-F"
  },
  {
    "no": 6,
    "nis": "7297",
    "name": "I Kadek Juliardana",
    "gender": "L",
    "className": "XI-F"
  },
  {
    "no": 7,
    "nis": "7365",
    "name": "I Kadek Juniawan",
    "gender": "L",
    "className": "XI-F"
  },
  {
    "no": 8,
    "nis": "7439",
    "name": "I Kadek Suratdana",
    "gender": "L",
    "className": "XI-F"
  },
  {
    "no": 9,
    "nis": "7469",
    "name": "I Kadek Wisnu Aditya",
    "gender": "L",
    "className": "XI-F"
  },
  {
    "no": 10,
    "nis": "7300",
    "name": "I Komang Eka Aryana",
    "gender": "L",
    "className": "XI-F"
  },
  {
    "no": 11,
    "nis": "7444",
    "name": "I Made Artha Suka Wijaya",
    "gender": "L",
    "className": "XI-F"
  },
  {
    "no": 12,
    "nis": "7474",
    "name": "I Putu Arta Yasa",
    "gender": "L",
    "className": "XI-F"
  },
  {
    "no": 13,
    "nis": "7475",
    "name": "I Putu Dana",
    "gender": "L",
    "className": "XI-F"
  },
  {
    "no": 14,
    "nis": "7476",
    "name": "I Putu Dwi Kusuma",
    "gender": "L",
    "className": "XI-F"
  },
  {
    "no": 15,
    "nis": "7307",
    "name": "I Putu Sandiarta",
    "gender": "L",
    "className": "XI-F"
  },
  {
    "no": 16,
    "nis": "7372",
    "name": "I Wayan Admika Saputra",
    "gender": "L",
    "className": "XI-F"
  },
  {
    "no": 17,
    "nis": "7373",
    "name": "I Wayan Kardi Sucipta",
    "gender": "L",
    "className": "XI-F"
  },
  {
    "no": 18,
    "nis": "7340",
    "name": "Komang Tri Ajeng Wati",
    "gender": "P",
    "className": "XI-F"
  },
  {
    "no": 19,
    "nis": "7447",
    "name": "Krisna Yogananda",
    "gender": "L",
    "className": "XI-F"
  },
  {
    "no": 20,
    "nis": "7477",
    "name": "Luh Ayu Septiari",
    "gender": "P",
    "className": "XI-F"
  },
  {
    "no": 21,
    "nis": "7375",
    "name": "Ni Kadek Ami Oktapiantari",
    "gender": "P",
    "className": "XI-F"
  },
  {
    "no": 22,
    "nis": "7448",
    "name": "Ni Kadek Arianti",
    "gender": "P",
    "className": "XI-F"
  },
  {
    "no": 23,
    "nis": "7449",
    "name": "Ni Kadek Arpiani",
    "gender": "P",
    "className": "XI-F"
  },
  {
    "no": 24,
    "nis": "7482",
    "name": "Ni Kadek Luh Juniantari",
    "gender": "P",
    "className": "XI-F"
  },
  {
    "no": 25,
    "nis": "7343",
    "name": "Ni Kadek Rista Mustari",
    "gender": "P",
    "className": "XI-F"
  },
  {
    "no": 26,
    "nis": "7485",
    "name": "Ni Ketut Ayu Sumirah",
    "gender": "P",
    "className": "XI-F"
  },
  {
    "no": 27,
    "nis": "7347",
    "name": "Ni Ketut Meisya Lestari",
    "gender": "P",
    "className": "XI-F"
  },
  {
    "no": 28,
    "nis": "7454",
    "name": "Ni Komang Deviana Lestari",
    "gender": "P",
    "className": "XI-F"
  },
  {
    "no": 29,
    "nis": "7349",
    "name": "Ni Komang Melani Putri",
    "gender": "P",
    "className": "XI-F"
  },
  {
    "no": 30,
    "nis": "7386",
    "name": "Ni Luh Ayu Sefiyanti",
    "gender": "P",
    "className": "XI-F"
  },
  {
    "no": 31,
    "nis": "7387",
    "name": "Ni Luh Eka Martini",
    "gender": "P",
    "className": "XI-F"
  },
  {
    "no": 32,
    "nis": "7388",
    "name": "Ni Luh Putu Juliantari",
    "gender": "P",
    "className": "XI-F"
  },
  {
    "no": 33,
    "nis": "7489",
    "name": "Ni Luh Suari",
    "gender": "P",
    "className": "XI-F"
  },
  {
    "no": 34,
    "nis": "7491",
    "name": "Ni Putu Devi Kastari",
    "gender": "P",
    "className": "XI-F"
  },
  {
    "no": 1,
    "nis": "7494",
    "name": "Ayu Nia Ulandari",
    "gender": "P",
    "className": "XI-G"
  },
  {
    "no": 2,
    "nis": "7495",
    "name": "I Dewa Ayu Windi",
    "gender": "P",
    "className": "XI-G"
  },
  {
    "no": 3,
    "nis": "7395",
    "name": "I Gede Agus Nova Sudiatmika",
    "gender": "L",
    "className": "XI-G"
  },
  {
    "no": 4,
    "nis": "7498",
    "name": "I Gede Surya Paramarta",
    "gender": "L",
    "className": "XI-G"
  },
  {
    "no": 5,
    "nis": "7430",
    "name": "I Gede Wira Dharma Antara",
    "gender": "L",
    "className": "XI-G"
  },
  {
    "no": 6,
    "nis": "7436",
    "name": "I Gusti Bagus Pramana Yoga",
    "gender": "L",
    "className": "XI-G"
  },
  {
    "no": 7,
    "nis": "7500",
    "name": "I Kadek Adi Kusuma",
    "gender": "L",
    "className": "XI-G"
  },
  {
    "no": 8,
    "nis": "7501",
    "name": "I Kadek Agus Winaya",
    "gender": "L",
    "className": "XI-G"
  },
  {
    "no": 9,
    "nis": "7502",
    "name": "I Kadek Arta Saputra",
    "gender": "L",
    "className": "XI-G"
  },
  {
    "no": 10,
    "nis": "7503",
    "name": "I Kadek Kerta Sukanadi",
    "gender": "L",
    "className": "XI-G"
  },
  {
    "no": 11,
    "nis": "7329",
    "name": "I Kadek Neros Wresti Primarta",
    "gender": "L",
    "className": "XI-G"
  },
  {
    "no": 12,
    "nis": "7504",
    "name": "I Kadek Nova Wiguna",
    "gender": "L",
    "className": "XI-G"
  },
  {
    "no": 13,
    "nis": "7400",
    "name": "I Kadek Saputra",
    "gender": "L",
    "className": "XI-G"
  },
  {
    "no": 14,
    "nis": "7506",
    "name": "I Ketut Ruminten",
    "gender": "L",
    "className": "XI-G"
  },
  {
    "no": 15,
    "nis": "7403",
    "name": "I Ketut Septiadi",
    "gender": "L",
    "className": "XI-G"
  },
  {
    "no": 16,
    "nis": "7472",
    "name": "I Komang Agus Wiranatha",
    "gender": "L",
    "className": "XI-G"
  },
  {
    "no": 17,
    "nis": "7408",
    "name": "I Komang Jaya Suharta",
    "gender": "L",
    "className": "XI-G"
  },
  {
    "no": 18,
    "nis": "7507",
    "name": "I Komang Yogantara",
    "gender": "L",
    "className": "XI-G"
  },
  {
    "no": 19,
    "nis": "7508",
    "name": "I Putu Gede Suputra",
    "gender": "L",
    "className": "XI-G"
  },
  {
    "no": 20,
    "nis": "7336",
    "name": "I Putu Sunadri",
    "gender": "L",
    "className": "XI-G"
  },
  {
    "no": 21,
    "nis": "7479",
    "name": "Luh De Agustina Hendrawati",
    "gender": "P",
    "className": "XI-G"
  },
  {
    "no": 22,
    "nis": "7480",
    "name": "Ni Kadek Dewi Widiawati",
    "gender": "P",
    "className": "XI-G"
  },
  {
    "no": 23,
    "nis": "7513",
    "name": "Ni Kadek Dwi Pradnyani",
    "gender": "P",
    "className": "XI-G"
  },
  {
    "no": 24,
    "nis": "7515",
    "name": "Ni Kadek Rita Apriyanti",
    "gender": "P",
    "className": "XI-G"
  },
  {
    "no": 25,
    "nis": "7518",
    "name": "Ni Komang Apriani",
    "gender": "P",
    "className": "XI-G"
  },
  {
    "no": 26,
    "nis": "7520",
    "name": "Ni Komang Ayu Trisna Damayanti",
    "gender": "P",
    "className": "XI-G"
  },
  {
    "no": 27,
    "nis": "7521",
    "name": "Ni Komang Muliani",
    "gender": "P",
    "className": "XI-G"
  },
  {
    "no": 28,
    "nis": "7350",
    "name": "Ni Komang Tirta Sudhyanti",
    "gender": "P",
    "className": "XI-G"
  },
  {
    "no": 29,
    "nis": "7353",
    "name": "Ni Luh Milani Putri",
    "gender": "P",
    "className": "XI-G"
  },
  {
    "no": 30,
    "nis": "7522",
    "name": "Ni Putu Agustina",
    "gender": "P",
    "className": "XI-G"
  },
  {
    "no": 31,
    "nis": "7358",
    "name": "Ni Putu Apsari Wahyunika Dewi Sembadha",
    "gender": "P",
    "className": "XI-G"
  },
  {
    "no": 32,
    "nis": "7523",
    "name": "Ni Putu Ayu Astri Utami Dewi",
    "gender": "P",
    "className": "XI-G"
  },
  {
    "no": 33,
    "nis": "7525",
    "name": "Ni Putu Rania Widiantari",
    "gender": "P",
    "className": "XI-G"
  },
  {
    "no": 1,
    "nis": "7526",
    "name": "I Gede Agus Devdan Saputra",
    "gender": "L",
    "className": "X-A"
  },
  {
    "no": 2,
    "nis": "7527",
    "name": "I Gusti Ayu Putri Nova Karmini",
    "gender": "P",
    "className": "X-A"
  },
  {
    "no": 3,
    "nis": "7528",
    "name": "I Gusti Ngurah Darma Aditya",
    "gender": "L",
    "className": "X-A"
  },
  {
    "no": 4,
    "nis": "7529",
    "name": "I Kadek Arya Pradnyana",
    "gender": "L",
    "className": "X-A"
  },
  {
    "no": 5,
    "nis": "7530",
    "name": "I Kadek Kamar",
    "gender": "L",
    "className": "X-A"
  },
  {
    "no": 6,
    "nis": "7531",
    "name": "I Kadek Kardiana",
    "gender": "L",
    "className": "X-A"
  },
  {
    "no": 7,
    "nis": "7532",
    "name": "I Kadek Reifan Febrian Setiawan",
    "gender": "L",
    "className": "X-A"
  },
  {
    "no": 8,
    "nis": "7533",
    "name": "I Kadek Wisnu Prabawa",
    "gender": "L",
    "className": "X-A"
  },
  {
    "no": 9,
    "nis": "7534",
    "name": "I Ketut Bagus Sadewa Aditya",
    "gender": "L",
    "className": "X-A"
  },
  {
    "no": 10,
    "nis": "7535",
    "name": "I Ketut Lingga Suarsa",
    "gender": "L",
    "className": "X-A"
  },
  {
    "no": 11,
    "nis": "7536",
    "name": "I Komang Agung Nakula Aditya",
    "gender": "L",
    "className": "X-A"
  },
  {
    "no": 12,
    "nis": "7537",
    "name": "I Komang Deva Surya Putra Pratama",
    "gender": "L",
    "className": "X-A"
  },
  {
    "no": 13,
    "nis": "7538",
    "name": "I Komang Hesa Sukmadinata",
    "gender": "L",
    "className": "X-A"
  },
  {
    "no": 14,
    "nis": "7539",
    "name": "I Komang Mahendra Wahyudiantara Putra",
    "gender": "L",
    "className": "X-A"
  },
  {
    "no": 15,
    "nis": "7540",
    "name": "I Komang Yoga Mahendra Yana",
    "gender": "L",
    "className": "X-A"
  },
  {
    "no": 16,
    "nis": "7541",
    "name": "I Made Dicky Saputra",
    "gender": "L",
    "className": "X-A"
  },
  {
    "no": 17,
    "nis": "7542",
    "name": "I Made Krishnanda Nara Yana",
    "gender": "L",
    "className": "X-A"
  },
  {
    "no": 18,
    "nis": "7543",
    "name": "I Nyoman Manik Yoga Nanda",
    "gender": "L",
    "className": "X-A"
  },
  {
    "no": 19,
    "nis": "7544",
    "name": "Ni Kadek Citra Lestari",
    "gender": "P",
    "className": "X-A"
  },
  {
    "no": 20,
    "nis": "7545",
    "name": "Ni Kadek Ening Ekadyayi",
    "gender": "P",
    "className": "X-A"
  },
  {
    "no": 21,
    "nis": "7546",
    "name": "Ni Kadek Lia Antari",
    "gender": "P",
    "className": "X-A"
  },
  {
    "no": 22,
    "nis": "7547",
    "name": "Ni Kadek Merta Asih",
    "gender": "P",
    "className": "X-A"
  },
  {
    "no": 23,
    "nis": "7548",
    "name": "Ni Kadek Nindya Praba Jayanti",
    "gender": "P",
    "className": "X-A"
  },
  {
    "no": 24,
    "nis": "7549",
    "name": "Ni Kadek Sevilla Dwi Parwati",
    "gender": "P",
    "className": "X-A"
  },
  {
    "no": 25,
    "nis": "7550",
    "name": "Ni Kadek Yulia Pramesti Dewi",
    "gender": "P",
    "className": "X-A"
  },
  {
    "no": 26,
    "nis": "7551",
    "name": "Ni Komang Ari Agustini",
    "gender": "P",
    "className": "X-A"
  },
  {
    "no": 27,
    "nis": "7552",
    "name": "Ni Luh Andini Prabayanti",
    "gender": "P",
    "className": "X-A"
  },
  {
    "no": 28,
    "nis": "7553",
    "name": "Ni Luh Juliastini",
    "gender": "P",
    "className": "X-A"
  },
  {
    "no": 29,
    "nis": "7554",
    "name": "Ni Luh Putu Bella Artha Nanditha",
    "gender": "P",
    "className": "X-A"
  },
  {
    "no": 30,
    "nis": "7555",
    "name": "Ni Luh Putu Bintang Pratiwi",
    "gender": "P",
    "className": "X-A"
  },
  {
    "no": 31,
    "nis": "7556",
    "name": "Ni Luh Putu Febriyanti",
    "gender": "P",
    "className": "X-A"
  },
  {
    "no": 32,
    "nis": "7557",
    "name": "Ni Luh Widiastini",
    "gender": "P",
    "className": "X-A"
  },
  {
    "no": 33,
    "nis": "7558",
    "name": "Ni Made Desi Widya Wardani",
    "gender": "P",
    "className": "X-A"
  },
  {
    "no": 34,
    "nis": "7559",
    "name": "Ni Made Devi Suprabawati",
    "gender": "P",
    "className": "X-A"
  },
  {
    "no": 35,
    "nis": "7560",
    "name": "Ni Nyoman Putri Krisna Dewi",
    "gender": "P",
    "className": "X-A"
  },
  {
    "no": 36,
    "nis": "7561",
    "name": "Ni Putu Nita Anantya",
    "gender": "P",
    "className": "X-A"
  },
  {
    "no": 1,
    "nis": "7562",
    "name": "I Gede Agus Rizki Saputra",
    "gender": "L",
    "className": "X-B"
  },
  {
    "no": 2,
    "nis": "7563",
    "name": "I Gede Apri Pradana",
    "gender": "L",
    "className": "X-B"
  },
  {
    "no": 3,
    "nis": "7564",
    "name": "I Gede Panca Kumara",
    "gender": "L",
    "className": "X-B"
  },
  {
    "no": 4,
    "nis": "7565",
    "name": "I Gede Sutama",
    "gender": "L",
    "className": "X-B"
  },
  {
    "no": 5,
    "nis": "7566",
    "name": "I Gusti Ayu Keysha Dianing Laksmi",
    "gender": "P",
    "className": "X-B"
  },
  {
    "no": 6,
    "nis": "7567",
    "name": "I Gusti Ayu Mulia Devi Naraswary",
    "gender": "P",
    "className": "X-B"
  },
  {
    "no": 7,
    "nis": "7568",
    "name": "I Gusti Bagus Arta Pradnyana",
    "gender": "L",
    "className": "X-B"
  },
  {
    "no": 8,
    "nis": "7569",
    "name": "I Gusti Gede Oka Dwipa Sardika",
    "gender": "L",
    "className": "X-B"
  },
  {
    "no": 9,
    "nis": "7570",
    "name": "I Kadek Ari Dwi Raditya",
    "gender": "L",
    "className": "X-B"
  },
  {
    "no": 10,
    "nis": "7571",
    "name": "I Kadek Buda Adipramana",
    "gender": "L",
    "className": "X-B"
  },
  {
    "no": 11,
    "nis": "7572",
    "name": "I Kadek Suartha Kanti Praja Untara",
    "gender": "L",
    "className": "X-B"
  },
  {
    "no": 12,
    "nis": "7573",
    "name": "I Ketut Sirya Nadi",
    "gender": "L",
    "className": "X-B"
  },
  {
    "no": 13,
    "nis": "7574",
    "name": "I Komang Agus Narayana",
    "gender": "L",
    "className": "X-B"
  },
  {
    "no": 14,
    "nis": "7575",
    "name": "I Komang Saptha Dewa Permana",
    "gender": "L",
    "className": "X-B"
  },
  {
    "no": 15,
    "nis": "7576",
    "name": "I Putu Adi Saputra",
    "gender": "L",
    "className": "X-B"
  },
  {
    "no": 16,
    "nis": "7577",
    "name": "I Putu Agus Arta Adi Putra",
    "gender": "L",
    "className": "X-B"
  },
  {
    "no": 17,
    "nis": "7578",
    "name": "I Putu Eka Arianta",
    "gender": "L",
    "className": "X-B"
  },
  {
    "no": 18,
    "nis": "7579",
    "name": "I Putu Pasek Wira Cita",
    "gender": "L",
    "className": "X-B"
  },
  {
    "no": 19,
    "nis": "7580",
    "name": "Jiselle Rawika Suryana",
    "gender": "P",
    "className": "X-B"
  },
  {
    "no": 20,
    "nis": "7581",
    "name": "Kadek Agus Krisna Mahardika",
    "gender": "L",
    "className": "X-B"
  },
  {
    "no": 21,
    "nis": "7582",
    "name": "Ni Kadek Devi Apriliani",
    "gender": "P",
    "className": "X-B"
  },
  {
    "no": 22,
    "nis": "7583",
    "name": "Ni Ketut Ariantini",
    "gender": "P",
    "className": "X-B"
  },
  {
    "no": 23,
    "nis": "7584",
    "name": "Ni Ketut Ayu Sugiantari",
    "gender": "P",
    "className": "X-B"
  },
  {
    "no": 24,
    "nis": "7585",
    "name": "Ni Ketut Dewik Juniarista",
    "gender": "P",
    "className": "X-B"
  },
  {
    "no": 25,
    "nis": "7586",
    "name": "Ni Ketut Manis Nopayanti",
    "gender": "P",
    "className": "X-B"
  },
  {
    "no": 26,
    "nis": "7587",
    "name": "Ni Ketut Padminingsih",
    "gender": "P",
    "className": "X-B"
  },
  {
    "no": 27,
    "nis": "7588",
    "name": "Ni Ketut Vina Kartika Dewi",
    "gender": "P",
    "className": "X-B"
  },
  {
    "no": 28,
    "nis": "7589",
    "name": "Ni Komang Listia Dewi",
    "gender": "P",
    "className": "X-B"
  },
  {
    "no": 29,
    "nis": "7590",
    "name": "Ni Komang Pande Ayu Widyawati",
    "gender": "P",
    "className": "X-B"
  },
  {
    "no": 30,
    "nis": "7591",
    "name": "Ni Komang Utami",
    "gender": "P",
    "className": "X-B"
  },
  {
    "no": 31,
    "nis": "7592",
    "name": "Ni Luh Ayu Muliasari",
    "gender": "P",
    "className": "X-B"
  },
  {
    "no": 32,
    "nis": "7593",
    "name": "Ni Luh Sri Diana Putri",
    "gender": "P",
    "className": "X-B"
  },
  {
    "no": 33,
    "nis": "7594",
    "name": "Ni Putu Diah Ratna Sari",
    "gender": "P",
    "className": "X-B"
  },
  {
    "no": 34,
    "nis": "7595",
    "name": "Ni Putu Intan Purnama Sari",
    "gender": "P",
    "className": "X-B"
  },
  {
    "no": 35,
    "nis": "7596",
    "name": "Ni Putu Sasmita Eka Widiari",
    "gender": "P",
    "className": "X-B"
  },
  {
    "no": 36,
    "nis": "7597",
    "name": "Ni Wayan Nita Peratiwi",
    "gender": "P",
    "className": "X-B"
  },
  {
    "no": 1,
    "nis": "7598",
    "name": "I Gede Mahardika Teja Saputra",
    "gender": "L",
    "className": "X-C"
  },
  {
    "no": 2,
    "nis": "7599",
    "name": "I Gede Raditya Wikantara Putra",
    "gender": "L",
    "className": "X-C"
  },
  {
    "no": 3,
    "nis": "7600",
    "name": "I Gusti Ayu Yuliana Putri",
    "gender": "P",
    "className": "X-C"
  },
  {
    "no": 4,
    "nis": "7601",
    "name": "I Gusti Lanang Agung Rama Putra",
    "gender": "L",
    "className": "X-C"
  },
  {
    "no": 5,
    "nis": "7602",
    "name": "I Kadek Dimas Pebrila Antara",
    "gender": "L",
    "className": "X-C"
  },
  {
    "no": 6,
    "nis": "7603",
    "name": "I Kadek Dipa Dwipayana",
    "gender": "L",
    "className": "X-C"
  },
  {
    "no": 7,
    "nis": "7604",
    "name": "I Kadek Oka Widiantara",
    "gender": "L",
    "className": "X-C"
  },
  {
    "no": 8,
    "nis": "7605",
    "name": "I Kadek Sujana Putra",
    "gender": "L",
    "className": "X-C"
  },
  {
    "no": 9,
    "nis": "7606",
    "name": "I Kadek Sukadiana",
    "gender": "L",
    "className": "X-C"
  },
  {
    "no": 10,
    "nis": "7607",
    "name": "I Ketut Merta Yasa",
    "gender": "L",
    "className": "X-C"
  },
  {
    "no": 11,
    "nis": "7608",
    "name": "I Ketut Pasek Widiastawa",
    "gender": "L",
    "className": "X-C"
  },
  {
    "no": 12,
    "nis": "7609",
    "name": "I Komang Dira Agastya Putra",
    "gender": "L",
    "className": "X-C"
  },
  {
    "no": 13,
    "nis": "7610",
    "name": "I Made Pasek Arya Dana",
    "gender": "L",
    "className": "X-C"
  },
  {
    "no": 14,
    "nis": "7611",
    "name": "I Nengah Widya Kusuma Parwata",
    "gender": "L",
    "className": "X-C"
  },
  {
    "no": 15,
    "nis": "7612",
    "name": "I Putu Adit Pratama Putra",
    "gender": "L",
    "className": "X-C"
  },
  {
    "no": 16,
    "nis": "7613",
    "name": "I Putu Pradnya Wiweka",
    "gender": "L",
    "className": "X-C"
  },
  {
    "no": 17,
    "nis": "7614",
    "name": "I Putu Suryadipa",
    "gender": "L",
    "className": "X-C"
  },
  {
    "no": 18,
    "nis": "7615",
    "name": "I Putu Wiguna",
    "gender": "L",
    "className": "X-C"
  },
  {
    "no": 19,
    "nis": "7616",
    "name": "Komang Trisna Putri Ardaswari",
    "gender": "P",
    "className": "X-C"
  },
  {
    "no": 20,
    "nis": "7617",
    "name": "Mabelle Rinrada Suryana",
    "gender": "P",
    "className": "X-C"
  },
  {
    "no": 21,
    "nis": "7618",
    "name": "Ni Kadek Arysta Wedaningsih",
    "gender": "P",
    "className": "X-C"
  },
  {
    "no": 22,
    "nis": "7619",
    "name": "Ni Kadek Cindy Arselina",
    "gender": "P",
    "className": "X-C"
  },
  {
    "no": 23,
    "nis": "7620",
    "name": "Ni Kadek Santiani",
    "gender": "P",
    "className": "X-C"
  },
  {
    "no": 24,
    "nis": "7621",
    "name": "Ni Kadek Santiari",
    "gender": "P",
    "className": "X-C"
  },
  {
    "no": 25,
    "nis": "7622",
    "name": "Ni Kadek Sentia Dewi",
    "gender": "P",
    "className": "X-C"
  },
  {
    "no": 26,
    "nis": "7623",
    "name": "Ni Komang Ayudya Paramitha",
    "gender": "P",
    "className": "X-C"
  },
  {
    "no": 27,
    "nis": "7624",
    "name": "Ni Luh Mei Linda",
    "gender": "P",
    "className": "X-C"
  },
  {
    "no": 28,
    "nis": "7625",
    "name": "Ni Luh Saskia Kirana Dewi",
    "gender": "P",
    "className": "X-C"
  },
  {
    "no": 29,
    "nis": "7626",
    "name": "Ni Nyoman Okta Darmayanthi",
    "gender": "P",
    "className": "X-C"
  },
  {
    "no": 30,
    "nis": "7627",
    "name": "Ni Putu Ayu Sri Maharani",
    "gender": "P",
    "className": "X-C"
  },
  {
    "no": 31,
    "nis": "7628",
    "name": "Ni Putu Dilayanti",
    "gender": "P",
    "className": "X-C"
  },
  {
    "no": 32,
    "nis": "7629",
    "name": "Ni Putu Novita Sari",
    "gender": "P",
    "className": "X-C"
  },
  {
    "no": 33,
    "nis": "7630",
    "name": "Ni Putu Revitha Yuniaswari Pradani",
    "gender": "P",
    "className": "X-C"
  },
  {
    "no": 34,
    "nis": "7631",
    "name": "Ni Wayan Dea Sumardyani",
    "gender": "P",
    "className": "X-C"
  },
  {
    "no": 35,
    "nis": "7632",
    "name": "Ni Wayan Kartika Meidiantari",
    "gender": "P",
    "className": "X-C"
  },
  {
    "no": 36,
    "nis": "7633",
    "name": "Ni Wayan Wulan Budyanti",
    "gender": "P",
    "className": "X-C"
  },
  {
    "no": 1,
    "nis": "7634",
    "name": "I Gede Desta Putra Dana",
    "gender": "L",
    "className": "X-D"
  },
  {
    "no": 2,
    "nis": "7635",
    "name": "I Gede Oka Arnawa",
    "gender": "L",
    "className": "X-D"
  },
  {
    "no": 3,
    "nis": "7636",
    "name": "I Gede Okta Sandyana",
    "gender": "L",
    "className": "X-D"
  },
  {
    "no": 4,
    "nis": "7637",
    "name": "I Gede Satya Wibawa",
    "gender": "L",
    "className": "X-D"
  },
  {
    "no": 5,
    "nis": "7638",
    "name": "I Gede Wisantara",
    "gender": "L",
    "className": "X-D"
  },
  {
    "no": 6,
    "nis": "7639",
    "name": "I Gede Yuda",
    "gender": "L",
    "className": "X-D"
  },
  {
    "no": 7,
    "nis": "7640",
    "name": "I Gusti Ayu Agung Tri Purnama Devi",
    "gender": "P",
    "className": "X-D"
  },
  {
    "no": 8,
    "nis": "7641",
    "name": "I Gusti Ngurah Lesmana Putra Wiguna",
    "gender": "L",
    "className": "X-D"
  },
  {
    "no": 9,
    "nis": "7642",
    "name": "I Gusti Ngurah Rai Laksman Maheswara",
    "gender": "L",
    "className": "X-D"
  },
  {
    "no": 10,
    "nis": "7643",
    "name": "I Kadek Dwi Apriliawan",
    "gender": "L",
    "className": "X-D"
  },
  {
    "no": 11,
    "nis": "7644",
    "name": "I Kadek Raehan Prabasuara",
    "gender": "L",
    "className": "X-D"
  },
  {
    "no": 12,
    "nis": "7645",
    "name": "I Komang Ardi Kumara Yana",
    "gender": "L",
    "className": "X-D"
  },
  {
    "no": 13,
    "nis": "7646",
    "name": "I Nyoman Suardana",
    "gender": "L",
    "className": "X-D"
  },
  {
    "no": 14,
    "nis": "7647",
    "name": "I Putu Agus Setiawan",
    "gender": "L",
    "className": "X-D"
  },
  {
    "no": 15,
    "nis": "7648",
    "name": "I Putu Arta",
    "gender": "L",
    "className": "X-D"
  },
  {
    "no": 16,
    "nis": "7649",
    "name": "I Putu Kusuma Anggara Pratama",
    "gender": "L",
    "className": "X-D"
  },
  {
    "no": 17,
    "nis": "7650",
    "name": "I Putu Nadi Arta",
    "gender": "L",
    "className": "X-D"
  },
  {
    "no": 18,
    "nis": "7651",
    "name": "Ketut Febi Suastini",
    "gender": "P",
    "className": "X-D"
  },
  {
    "no": 19,
    "nis": "7652",
    "name": "Ni Kadek Dinda Wily Andita",
    "gender": "P",
    "className": "X-D"
  },
  {
    "no": 20,
    "nis": "7653",
    "name": "Ni Kadek Dwi Wijayanti",
    "gender": "P",
    "className": "X-D"
  },
  {
    "no": 21,
    "nis": "7654",
    "name": "Ni Kadek Mitha Pradnya Dewi",
    "gender": "P",
    "className": "X-D"
  },
  {
    "no": 22,
    "nis": "7655",
    "name": "Ni Kadek Natasia Dewi",
    "gender": "P",
    "className": "X-D"
  },
  {
    "no": 23,
    "nis": "7656",
    "name": "Ni Kadek Sintiya Septiari",
    "gender": "P",
    "className": "X-D"
  },
  {
    "no": 24,
    "nis": "7657",
    "name": "Ni Kadek Widia Putri",
    "gender": "P",
    "className": "X-D"
  },
  {
    "no": 25,
    "nis": "7658",
    "name": "Ni Ketut Sri Diantari",
    "gender": "P",
    "className": "X-D"
  },
  {
    "no": 26,
    "nis": "7659",
    "name": "Ni Komang Ayu Artini",
    "gender": "P",
    "className": "X-D"
  },
  {
    "no": 27,
    "nis": "7660",
    "name": "Ni Komang Mesya Trisna Dewi",
    "gender": "P",
    "className": "X-D"
  },
  {
    "no": 28,
    "nis": "7661",
    "name": "Ni Komang Seri Ratnasari",
    "gender": "P",
    "className": "X-D"
  },
  {
    "no": 29,
    "nis": "7662",
    "name": "Ni Luh Dian Cahyanti",
    "gender": "P",
    "className": "X-D"
  },
  {
    "no": 30,
    "nis": "7663",
    "name": "Ni Luh Putu Aprilia Wati",
    "gender": "P",
    "className": "X-D"
  },
  {
    "no": 31,
    "nis": "7664",
    "name": "Ni Luh Widiantari",
    "gender": "P",
    "className": "X-D"
  },
  {
    "no": 32,
    "nis": "7665",
    "name": "Ni Nyoman Amanda Perlina Putri",
    "gender": "P",
    "className": "X-D"
  },
  {
    "no": 33,
    "nis": "7666",
    "name": "Ni Putu Linda Suwantari",
    "gender": "P",
    "className": "X-D"
  },
  {
    "no": 34,
    "nis": "7667",
    "name": "Ni Wayan Indah Swandari",
    "gender": "P",
    "className": "X-D"
  },
  {
    "no": 35,
    "nis": "7668",
    "name": "Ni Wayan Sri Astiti",
    "gender": "P",
    "className": "X-D"
  },
  {
    "no": 1,
    "nis": "7669",
    "name": "Ayu Tika Dewi",
    "gender": "P",
    "className": "X-E"
  },
  {
    "no": 2,
    "nis": "7670",
    "name": "I Dewa Putu Erik Saputra",
    "gender": "L",
    "className": "X-E"
  },
  {
    "no": 3,
    "nis": "7671",
    "name": "I Gede Aditya Tangkas Diputra",
    "gender": "L",
    "className": "X-E"
  },
  {
    "no": 4,
    "nis": "7672",
    "name": "I Gede Januarta Saputra",
    "gender": "L",
    "className": "X-E"
  },
  {
    "no": 5,
    "nis": "7673",
    "name": "I Gusti Agung Ayu Alita Putri",
    "gender": "P",
    "className": "X-E"
  },
  {
    "no": 6,
    "nis": "7675",
    "name": "I Kadek Adi Agustyana",
    "gender": "L",
    "className": "X-E"
  },
  {
    "no": 7,
    "nis": "7676",
    "name": "I Kadek Agus Panji Siwantara",
    "gender": "L",
    "className": "X-E"
  },
  {
    "no": 8,
    "nis": "7677",
    "name": "I Kadek Aria Antara",
    "gender": "L",
    "className": "X-E"
  },
  {
    "no": 9,
    "nis": "7678",
    "name": "I Kadek Arta Ediantara",
    "gender": "L",
    "className": "X-E"
  },
  {
    "no": 10,
    "nis": "7679",
    "name": "I Kadek Arya Mahardika",
    "gender": "L",
    "className": "X-E"
  },
  {
    "no": 11,
    "nis": "7680",
    "name": "I Kadek Suputrawan",
    "gender": "L",
    "className": "X-E"
  },
  {
    "no": 12,
    "nis": "7681",
    "name": "I Komang Cahya Saskara Putra",
    "gender": "L",
    "className": "X-E"
  },
  {
    "no": 13,
    "nis": "7682",
    "name": "I Komang Satria Merta Adiguna",
    "gender": "L",
    "className": "X-E"
  },
  {
    "no": 14,
    "nis": "7683",
    "name": "I Made Yudi Tresna Aryanta",
    "gender": "L",
    "className": "X-E"
  },
  {
    "no": 15,
    "nis": "7684",
    "name": "I Putu Angga Pratama",
    "gender": "L",
    "className": "X-E"
  },
  {
    "no": 16,
    "nis": "7685",
    "name": "I Putu Arys Wibawa Mahottama",
    "gender": "L",
    "className": "X-E"
  },
  {
    "no": 17,
    "nis": "7686",
    "name": "I Putu Krisna Kusuma Putra",
    "gender": "L",
    "className": "X-E"
  },
  {
    "no": 18,
    "nis": "7687",
    "name": "I Putu Pasek Widiarta",
    "gender": "L",
    "className": "X-E"
  },
  {
    "no": 19,
    "nis": "7688",
    "name": "Komang Trisia Wilasni Dewi",
    "gender": "P",
    "className": "X-E"
  },
  {
    "no": 20,
    "nis": "7689",
    "name": "Ni Kadek Erna Juniantari",
    "gender": "P",
    "className": "X-E"
  },
  {
    "no": 21,
    "nis": "7690",
    "name": "Ni Kadek Eva Pradnya Sistya Rani",
    "gender": "P",
    "className": "X-E"
  },
  {
    "no": 22,
    "nis": "7691",
    "name": "Ni Kadek Novayani",
    "gender": "P",
    "className": "X-E"
  },
  {
    "no": 23,
    "nis": "7692",
    "name": "Ni Kadek Ratih Ginanti Suastika",
    "gender": "P",
    "className": "X-E"
  },
  {
    "no": 24,
    "nis": "7693",
    "name": "Ni Ketut Indah Dewi Antari",
    "gender": "P",
    "className": "X-E"
  },
  {
    "no": 25,
    "nis": "7694",
    "name": "Ni Komang Triska Apriliani",
    "gender": "P",
    "className": "X-E"
  },
  {
    "no": 26,
    "nis": "7695",
    "name": "Ni Komang Wangi Asih",
    "gender": "P",
    "className": "X-E"
  },
  {
    "no": 27,
    "nis": "7696",
    "name": "Ni Luh Tari",
    "gender": "P",
    "className": "X-E"
  },
  {
    "no": 28,
    "nis": "7697",
    "name": "Ni Luh Vika Aruna Devi",
    "gender": "P",
    "className": "X-E"
  },
  {
    "no": 29,
    "nis": "7698",
    "name": "Ni Nyoman Windari",
    "gender": "P",
    "className": "X-E"
  },
  {
    "no": 30,
    "nis": "7699",
    "name": "Ni Putu Ayu Suartuti Adnyani Sandi",
    "gender": "P",
    "className": "X-E"
  },
  {
    "no": 31,
    "nis": "7700",
    "name": "Ni Putu Ratrika Purnami",
    "gender": "P",
    "className": "X-E"
  },
  {
    "no": 32,
    "nis": "7701",
    "name": "Ni Putu Sandra Dewi Lestari",
    "gender": "P",
    "className": "X-E"
  },
  {
    "no": 33,
    "nis": "7702",
    "name": "Ni Putu Siva Ratna Nanditha",
    "gender": "P",
    "className": "X-E"
  },
  {
    "no": 34,
    "nis": "7703",
    "name": "Pande Komang Adi Wiguna",
    "gender": "L",
    "className": "X-E"
  },
  {
    "no": 1,
    "nis": "7704",
    "name": "I Gede Aris Sugiantara",
    "gender": "L",
    "className": "X-F"
  },
  {
    "no": 2,
    "nis": "7705",
    "name": "I Gusti Agung Dharma Putra Sanjaya",
    "gender": "L",
    "className": "X-F"
  },
  {
    "no": 3,
    "nis": "7706",
    "name": "I Gusti Bagus Ardika",
    "gender": "L",
    "className": "X-F"
  },
  {
    "no": 4,
    "nis": "7707",
    "name": "I Kadek Adi Pradnyana",
    "gender": "L",
    "className": "X-F"
  },
  {
    "no": 5,
    "nis": "7708",
    "name": "I Kadek Agus Ananda Mahareta",
    "gender": "L",
    "className": "X-F"
  },
  {
    "no": 6,
    "nis": "7709",
    "name": "I Kadek Juniadi",
    "gender": "L",
    "className": "X-F"
  },
  {
    "no": 7,
    "nis": "7710",
    "name": "I Kadek Kusuma Sila Arta",
    "gender": "L",
    "className": "X-F"
  },
  {
    "no": 8,
    "nis": "7711",
    "name": "I Ketut Putra Aditya",
    "gender": "L",
    "className": "X-F"
  },
  {
    "no": 9,
    "nis": "7712",
    "name": "I Ketut Sukenadi",
    "gender": "L",
    "className": "X-F"
  },
  {
    "no": 10,
    "nis": "7713",
    "name": "I Ketut Wiratama",
    "gender": "L",
    "className": "X-F"
  },
  {
    "no": 11,
    "nis": "7714",
    "name": "I Komang Adi Wiguna Saputra",
    "gender": "L",
    "className": "X-F"
  },
  {
    "no": 12,
    "nis": "7715",
    "name": "I Komang Neka Widiartana",
    "gender": "L",
    "className": "X-F"
  },
  {
    "no": 13,
    "nis": "7716",
    "name": "I Putu Adi Ananta",
    "gender": "L",
    "className": "X-F"
  },
  {
    "no": 14,
    "nis": "7717",
    "name": "I Putu Aditya Pratama",
    "gender": "L",
    "className": "X-F"
  },
  {
    "no": 15,
    "nis": "7718",
    "name": "I Putu Satria Gana",
    "gender": "L",
    "className": "X-F"
  },
  {
    "no": 16,
    "nis": "7719",
    "name": "I Wayan Eka Arta Wiguna",
    "gender": "L",
    "className": "X-F"
  },
  {
    "no": 17,
    "nis": "7720",
    "name": "Ni Kadek Dwi Febrianti",
    "gender": "P",
    "className": "X-F"
  },
  {
    "no": 18,
    "nis": "7721",
    "name": "Ni Kadek Mirah Astari Kumala Devi",
    "gender": "P",
    "className": "X-F"
  },
  {
    "no": 19,
    "nis": "7722",
    "name": "Ni Kadek Oca Darmawati",
    "gender": "P",
    "className": "X-F"
  },
  {
    "no": 20,
    "nis": "7723",
    "name": "Ni Kadek Pionita Oktari",
    "gender": "P",
    "className": "X-F"
  },
  {
    "no": 21,
    "nis": "7724",
    "name": "Ni Kadek Rimawati",
    "gender": "P",
    "className": "X-F"
  },
  {
    "no": 22,
    "nis": "7725",
    "name": "Ni Kadek Sinta Purnami",
    "gender": "P",
    "className": "X-F"
  },
  {
    "no": 23,
    "nis": "7726",
    "name": "Ni Kadek Trisna Diantari Putri",
    "gender": "P",
    "className": "X-F"
  },
  {
    "no": 24,
    "nis": "7727",
    "name": "Ni Kadek Widyantari",
    "gender": "P",
    "className": "X-F"
  },
  {
    "no": 25,
    "nis": "7728",
    "name": "Ni Kadek Wina Arista Evaliani",
    "gender": "P",
    "className": "X-F"
  },
  {
    "no": 26,
    "nis": "7729",
    "name": "Ni Kadek Yumi",
    "gender": "P",
    "className": "X-F"
  },
  {
    "no": 27,
    "nis": "7730",
    "name": "Ni Komang Aniasih",
    "gender": "P",
    "className": "X-F"
  },
  {
    "no": 28,
    "nis": "7731",
    "name": "Ni Komang Mila Sri Lestari",
    "gender": "P",
    "className": "X-F"
  },
  {
    "no": 29,
    "nis": "7732",
    "name": "Ni Komang Sri Darmayani",
    "gender": "P",
    "className": "X-F"
  },
  {
    "no": 30,
    "nis": "7733",
    "name": "Ni Komang Tristayani",
    "gender": "P",
    "className": "X-F"
  },
  {
    "no": 31,
    "nis": "7734",
    "name": "Ni Luh Rosiantari",
    "gender": "P",
    "className": "X-F"
  },
  {
    "no": 32,
    "nis": "7735",
    "name": "Ni Putu Agisya Cahyanti",
    "gender": "P",
    "className": "X-F"
  },
  {
    "no": 33,
    "nis": "7736",
    "name": "Ni Putu Dyah Nirwasintya",
    "gender": "P",
    "className": "X-F"
  },
  {
    "no": 34,
    "nis": "7737",
    "name": "Ni Putu Ratna Puspitasari",
    "gender": "P",
    "className": "X-F"
  },
  {
    "no": 35,
    "nis": "7738",
    "name": "Ni Wayan Dewi Ardani",
    "gender": "P",
    "className": "X-F"
  },
  {
    "no": 36,
    "nis": "7739",
    "name": "Ni Wayan Widya Antari Asih",
    "gender": "P",
    "className": "X-F"
  },
  {
    "no": 1,
    "nis": "7740",
    "name": "I Dewa Gede Eka Adi Pranata",
    "gender": "L",
    "className": "X-G"
  },
  {
    "no": 2,
    "nis": "7741",
    "name": "I Dewa Putu Agus Saputra",
    "gender": "L",
    "className": "X-G"
  },
  {
    "no": 3,
    "nis": "7742",
    "name": "I Gede Wija Krisna",
    "gender": "L",
    "className": "X-G"
  },
  {
    "no": 4,
    "nis": "7743",
    "name": "I Gusti Ayu Dwita Arisetya",
    "gender": "L",
    "className": "X-G"
  },
  {
    "no": 5,
    "nis": "7744",
    "name": "I Gusti Ayu Indah Pradnya Dewi",
    "gender": "P",
    "className": "X-G"
  },
  {
    "no": 6,
    "nis": "7745",
    "name": "I Gusti Bagus Nesta Pranata",
    "gender": "L",
    "className": "X-G"
  },
  {
    "no": 7,
    "nis": "7746",
    "name": "I Gusti Ngurah Agung Dira Sinatria",
    "gender": "L",
    "className": "X-G"
  },
  {
    "no": 8,
    "nis": "7747",
    "name": "I Kadek Adi Susila Putra",
    "gender": "L",
    "className": "X-G"
  },
  {
    "no": 9,
    "nis": "7748",
    "name": "I Kadek Budiarsa",
    "gender": "L",
    "className": "X-G"
  },
  {
    "no": 10,
    "nis": "7749",
    "name": "I Kadek Maha Aprilianta",
    "gender": "L",
    "className": "X-G"
  },
  {
    "no": 11,
    "nis": "7750",
    "name": "I Ketut Aditya Juli Putra Pratama",
    "gender": "L",
    "className": "X-G"
  },
  {
    "no": 12,
    "nis": "7751",
    "name": "I Komang Arta Mardiana",
    "gender": "L",
    "className": "X-G"
  },
  {
    "no": 13,
    "nis": "7752",
    "name": "I Komang Sumadana",
    "gender": "L",
    "className": "X-G"
  },
  {
    "no": 14,
    "nis": "7753",
    "name": "I Made Darma Putra",
    "gender": "L",
    "className": "X-G"
  },
  {
    "no": 15,
    "nis": "7754",
    "name": "I Putu Adi Artika Yasa",
    "gender": "L",
    "className": "X-G"
  },
  {
    "no": 16,
    "nis": "7755",
    "name": "I Putu Sudiarta",
    "gender": "L",
    "className": "X-G"
  },
  {
    "no": 17,
    "nis": "7756",
    "name": "I Wayan Dipa Permana",
    "gender": "L",
    "className": "X-G"
  },
  {
    "no": 18,
    "nis": "7757",
    "name": "Ni Kadek Agustini",
    "gender": "P",
    "className": "X-G"
  },
  {
    "no": 19,
    "nis": "7758",
    "name": "Ni Kadek Anggar Pradnya Dewi",
    "gender": "P",
    "className": "X-G"
  },
  {
    "no": 20,
    "nis": "7759",
    "name": "Ni Kadek Dwi Arditya Swari",
    "gender": "P",
    "className": "X-G"
  },
  {
    "no": 21,
    "nis": "7760",
    "name": "Ni Kadek Indah Pertiwi",
    "gender": "P",
    "className": "X-G"
  },
  {
    "no": 22,
    "nis": "7761",
    "name": "Ni Kadek Mas Ayu Dewi",
    "gender": "P",
    "className": "X-G"
  },
  {
    "no": 23,
    "nis": "7762",
    "name": "Ni Kadek Sinta Oktaviani",
    "gender": "P",
    "className": "X-G"
  },
  {
    "no": 24,
    "nis": "7763",
    "name": "Ni Kadek Wilya Aviari",
    "gender": "P",
    "className": "X-G"
  },
  {
    "no": 25,
    "nis": "7764",
    "name": "Ni Kadek Wiwik Juwita Utami Devi",
    "gender": "P",
    "className": "X-G"
  },
  {
    "no": 26,
    "nis": "7765",
    "name": "Ni Ketut Eva Cahyanti",
    "gender": "P",
    "className": "X-G"
  },
  {
    "no": 27,
    "nis": "7766",
    "name": "Ni Ketut Muliani Rosinta Dewi",
    "gender": "P",
    "className": "X-G"
  },
  {
    "no": 28,
    "nis": "7767",
    "name": "Ni Ketut Sukreni",
    "gender": "P",
    "className": "X-G"
  },
  {
    "no": 29,
    "nis": "7768",
    "name": "Ni Komang Putri Cahyani",
    "gender": "P",
    "className": "X-G"
  },
  {
    "no": 30,
    "nis": "7769",
    "name": "Ni Komang Sri Pinayanti",
    "gender": "P",
    "className": "X-G"
  },
  {
    "no": 31,
    "nis": "7770",
    "name": "Ni Luh Putu Feby Purwita",
    "gender": "P",
    "className": "X-G"
  },
  {
    "no": 32,
    "nis": "7771",
    "name": "Ni Nengah Anggreni",
    "gender": "P",
    "className": "X-G"
  },
  {
    "no": 33,
    "nis": "7772",
    "name": "Ni Putu Dian Mariani",
    "gender": "P",
    "className": "X-G"
  },
  {
    "no": 34,
    "nis": "7773",
    "name": "Ni Putu Eka Deviyanti",
    "gender": "P",
    "className": "X-G"
  },
  {
    "no": 35,
    "nis": "7774",
    "name": "Ni Wayan Febri Oka Yanti",
    "gender": "P",
    "className": "X-G"
  },
  {
    "no": 36,
    "nis": "7775",
    "name": "Ni Wayan Widya Pradnya Arya Tesya",
    "gender": "P",
    "className": "X-G"
  },
  {
    "no": 1,
    "nis": "7776",
    "name": "I Dewa Gede Deva",
    "gender": "L",
    "className": "X-H"
  },
  {
    "no": 2,
    "nis": "7777",
    "name": "I Dewa Putu Adiarta",
    "gender": "L",
    "className": "X-H"
  },
  {
    "no": 3,
    "nis": "7778",
    "name": "I Gede Agus Darma Andita",
    "gender": "L",
    "className": "X-H"
  },
  {
    "no": 4,
    "nis": "7779",
    "name": "I Gusti Bagus Ananda Satrya",
    "gender": "L",
    "className": "X-H"
  },
  {
    "no": 5,
    "nis": "7780",
    "name": "I Kadek Ari Krisna",
    "gender": "L",
    "className": "X-H"
  },
  {
    "no": 6,
    "nis": "7781",
    "name": "I Kadek Suryanta",
    "gender": "L",
    "className": "X-H"
  },
  {
    "no": 7,
    "nis": "7782",
    "name": "I Kadek Tu Purnama",
    "gender": "L",
    "className": "X-H"
  },
  {
    "no": 8,
    "nis": "7783",
    "name": "I Ketut Agus Kusuma Ardana",
    "gender": "L",
    "className": "X-H"
  },
  {
    "no": 9,
    "nis": "7784",
    "name": "I Ketut Mudiarta",
    "gender": "L",
    "className": "X-H"
  },
  {
    "no": 10,
    "nis": "7785",
    "name": "I Komang Dwi Permana Putra",
    "gender": "L",
    "className": "X-H"
  },
  {
    "no": 11,
    "nis": "7786",
    "name": "I Putu Agus Artawiguna",
    "gender": "L",
    "className": "X-H"
  },
  {
    "no": 12,
    "nis": "7787",
    "name": "I Putu Agus Widya Pradnyana",
    "gender": "L",
    "className": "X-H"
  },
  {
    "no": 13,
    "nis": "7788",
    "name": "I Putu Andika Ridana",
    "gender": "L",
    "className": "X-H"
  },
  {
    "no": 14,
    "nis": "7789",
    "name": "I Putu Risa",
    "gender": "L",
    "className": "X-H"
  },
  {
    "no": 15,
    "nis": "7790",
    "name": "I Putu Surya Gunawan",
    "gender": "L",
    "className": "X-H"
  },
  {
    "no": 16,
    "nis": "7791",
    "name": "I Wayan Sudiarta",
    "gender": "L",
    "className": "X-H"
  },
  {
    "no": 17,
    "nis": "7792",
    "name": "Ni Kadek Alena Cahyati",
    "gender": "P",
    "className": "X-H"
  },
  {
    "no": 18,
    "nis": "7793",
    "name": "Ni Kadek Ayudian Puspita Dewi",
    "gender": "P",
    "className": "X-H"
  },
  {
    "no": 19,
    "nis": "7794",
    "name": "Ni Kadek Dwi Setiawati",
    "gender": "P",
    "className": "X-H"
  },
  {
    "no": 20,
    "nis": "7795",
    "name": "Ni Ketut Mulianita Sari",
    "gender": "P",
    "className": "X-H"
  },
  {
    "no": 21,
    "nis": "7796",
    "name": "Ni Komang Ardiani",
    "gender": "P",
    "className": "X-H"
  },
  {
    "no": 22,
    "nis": "7797",
    "name": "Ni Komang Eca Dwiyanti",
    "gender": "P",
    "className": "X-H"
  },
  {
    "no": 23,
    "nis": "7798",
    "name": "Ni Komang Nadia Oktarisa",
    "gender": "P",
    "className": "X-H"
  },
  {
    "no": 24,
    "nis": "7799",
    "name": "Ni Komang Sutri",
    "gender": "P",
    "className": "X-H"
  },
  {
    "no": 25,
    "nis": "7800",
    "name": "Ni Luh Ade Dwik Anggreni",
    "gender": "P",
    "className": "X-H"
  },
  {
    "no": 26,
    "nis": "7801",
    "name": "Ni Luh Amla Sri Widya Ningsih",
    "gender": "P",
    "className": "X-H"
  },
  {
    "no": 27,
    "nis": "7802",
    "name": "Ni Luh Julianti",
    "gender": "P",
    "className": "X-H"
  },
  {
    "no": 28,
    "nis": "7803",
    "name": "Ni Luh Putu Desitayanti",
    "gender": "P",
    "className": "X-H"
  },
  {
    "no": 29,
    "nis": "7804",
    "name": "Ni Luh Putu Leonita",
    "gender": "P",
    "className": "X-H"
  },
  {
    "no": 30,
    "nis": "7805",
    "name": "Ni Nengah Puspita Dewi",
    "gender": "P",
    "className": "X-H"
  },
  {
    "no": 31,
    "nis": "7806",
    "name": "Ni Nyoman Ayu Juliantari",
    "gender": "P",
    "className": "X-H"
  },
  {
    "no": 32,
    "nis": "7807",
    "name": "Ni Putu Dinda Yanti",
    "gender": "P",
    "className": "X-H"
  },
  {
    "no": 33,
    "nis": "7808",
    "name": "Ni Putu Mega Oktavia Riskiani",
    "gender": "P",
    "className": "X-H"
  },
  {
    "no": 34,
    "nis": "7809",
    "name": "Ni Putu Wardani",
    "gender": "P",
    "className": "X-H"
  },
  {
    "no": 35,
    "nis": "7810",
    "name": "Ni Wayan Ayu Purnami Dewi",
    "gender": "P",
    "className": "X-H"
  }
];
