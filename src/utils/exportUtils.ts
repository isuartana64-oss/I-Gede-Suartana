import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { ExamSchedule, StudentSession } from '../types';
import { Student } from '../data/schoolData';

export function exportExamReportToExcel(
  exam: ExamSchedule,
  targetStudents: Student[],
  sessions: StudentSession[]
): void {
  const sessionMap = new Map<string, StudentSession>();
  sessions.forEach(s => sessionMap.set(s.studentNis, s));

  const dataRows = targetStudents.map((st, index) => {
    const sess = sessionMap.get(st.nis);
    let statusLabel = 'Belum Mengakses';
    if (sess) {
      if (sess.status === 'selesai') statusLabel = 'Selesai';
      else if (sess.status === 'mengerjakan') statusLabel = 'Sedang Mengerjakan';
      else if (sess.status === 'terkunci_curang') statusLabel = 'Terkunci (Kecurangan)';
    }

    return {
      'No': index + 1,
      'NIS': st.nis,
      'Nama Siswa': st.name,
      'L/P': st.gender,
      'Kelas': st.className,
      'Status Pengerjaan': statusLabel,
      'Waktu Mulai': sess?.startedAt ? new Date(sess.startedAt).toLocaleTimeString('id-ID') : '-',
      'Waktu Selesai': sess?.completedAt ? new Date(sess.completedAt).toLocaleTimeString('id-ID') : '-',
      'Jumlah Pelanggaran Tab/Layar': sess?.violationsCount || 0,
      'Catatan Integritas': (sess?.violationsCount || 0) > 0 ? `${sess?.violationsCount}x keluar layar` : 'Tertib'
    };
  });

  const worksheet = XLSX.utils.aoa_to_sheet([
    ['SMA NEGERI 1 SELAT - LAPORAN KEHADIRAN & AKTIVITAS UJIAN'],
    [`Mata Pelajaran: ${exam.subject}`],
    [`Judul Ujian: ${exam.title}`],
    [`Guru Pengampu: ${exam.teacherName}`],
    [`Kelas: ${exam.targetClasses.join(', ')}`],
    [`Waktu Pelaksanaan: ${new Date(exam.startTime).toLocaleString('id-ID')} s.d ${new Date(exam.endTime).toLocaleString('id-ID')}`],
    ['']
  ]);

  XLSX.utils.sheet_add_json(worksheet, dataRows, { origin: 'A8' });
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Daftar Hadir Ujian');

  const safeTitle = `${exam.subject}_${exam.targetClasses.join('-')}`.replace(/[^a-zA-Z0-9_-]/g, '_');
  XLSX.writeFile(workbook, `Laporan_Ujian_SMAN1Selat_${safeTitle}.xlsx`);
}

function loadImage(src: string): Promise<HTMLImageElement | null> {
  return new Promise(resolve => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = src;
  });
}

export async function exportExamReportToPDF(
  exam: ExamSchedule,
  targetStudents: Student[],
  sessions: StudentSession[]
): Promise<void> {
  const doc = new jsPDF('p', 'mm', 'a4');
  const sessionMap = new Map<string, StudentSession>();
  sessions.forEach(s => sessionMap.set(s.studentNis, s));

  // Try adding official logo to Kop Surat
  try {
    const logoImg = await loadImage('/assets/aistudio/logo_smansel_6b130a51.png');
    if (logoImg) {
      doc.addImage(logoImg, 'PNG', 16, 11, 20, 22);
    }
  } catch {
    // ignore
  }

  // Kop Surat Resmi
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text('PEMERINTAH PROVINSI BALI', 112, 14, { align: 'center' });
  doc.text('DINAS PENDIDIKAN KEPEMUDAAN DAN OLAHRAGA', 112, 19, { align: 'center' });
  doc.setFontSize(13);
  doc.text('SMA NEGERI 1 SELAT', 112, 26, { align: 'center' });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.text('Alamat: Jl. Raya Duda - Selat, Kec. Selat, Kabupaten Karangasem, Bali 80862', 112, 32, { align: 'center' });
  
  // Garis Kop Surat
  doc.setLineWidth(0.8);
  doc.line(14, 36, 196, 36);
  doc.setLineWidth(0.3);
  doc.line(14, 37.2, 196, 37.2);

  // Judul Laporan
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text('BERITA ACARA & DAFTAR HADIR UJIAN ONLINE', 105, 45, { align: 'center' });

  // Info Ujian
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  const leftX = 14;
  doc.text(`Mata Pelajaran : ${exam.subject}`, leftX, 53);
  doc.text(`Judul Soal       : ${exam.title}`, leftX, 58);
  doc.text(`Guru Pengampu : ${exam.teacherName}`, leftX, 63);

  const rightX = 120;
  doc.text(`Kelas              : ${exam.targetClasses.join(', ')}`, rightX, 53);
  doc.text(`Waktu Mulai   : ${new Date(exam.startTime).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WITA`, rightX, 58);
  doc.text(`Waktu Selesai : ${new Date(exam.endTime).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WITA`, rightX, 63);

  // Table Data
  const tableData = targetStudents.map((st, i) => {
    const sess = sessionMap.get(st.nis);
    let status = 'Belum Hadir';
    if (sess) {
      if (sess.status === 'selesai') status = 'Selesai';
      else if (sess.status === 'mengerjakan') status = 'Sedang Mengerjakan';
      else if (sess.status === 'terkunci_curang') status = 'Terkunci';
    }

    return [
      (i + 1).toString(),
      st.nis,
      st.name,
      st.gender,
      st.className,
      status,
      sess?.startedAt ? new Date(sess.startedAt).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) : '-',
      (sess?.violationsCount || 0).toString() + 'x'
    ];
  });

  autoTable(doc, {
    startY: 68,
    head: [['No', 'NIS', 'Nama Siswa', 'L/P', 'Kelas', 'Status', 'Masuk', 'Pelanggaran']],
    body: tableData,
    theme: 'grid',
    headStyles: {
      fillColor: [59, 130, 246], // Pastel Sky Blue primary
      textColor: [255, 255, 255],
      fontSize: 8,
      halign: 'center',
    },
    bodyStyles: {
      fontSize: 8,
    },
    columnStyles: {
      0: { halign: 'center', cellWidth: 10 },
      1: { halign: 'center', cellWidth: 18 },
      2: { cellWidth: 65 },
      3: { halign: 'center', cellWidth: 10 },
      4: { halign: 'center', cellWidth: 16 },
      5: { halign: 'center', cellWidth: 26 },
      6: { halign: 'center', cellWidth: 16 },
      7: { halign: 'center', cellWidth: 20 },
    },
  });

  // Footer Signatures
  // @ts-expect-error autoTable adds lastAutoTable to doc
  const finalY = doc.lastAutoTable?.finalY || 200;
  let signatureY = finalY + 15;
  if (signatureY > 240) {
    doc.addPage();
    signatureY = 25;
  }

  const todayStr = new Date().toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  doc.setFontSize(9);
  doc.text(`Selat, ${todayStr}`, 145, signatureY);
  doc.text('Guru Pengampu / Pengawas,', 145, signatureY + 6);
  doc.text('Wakasek Kurikulum,', 20, signatureY + 6);

  doc.setFont('helvetica', 'bold');
  doc.text('I Gede Suartana, S.Pd.', 20, signatureY + 28);
  doc.setFont('helvetica', 'normal');
  doc.text('NIP. 19880406 202421 1 017', 20, signatureY + 33);

  doc.setFont('helvetica', 'bold');
  doc.text(exam.teacherName, 145, signatureY + 28);
  doc.setFont('helvetica', 'normal');
  doc.text(`NIP. ${exam.teacherNip}`, 145, signatureY + 33);

  const safeTitle = `${exam.subject}_${exam.targetClasses.join('-')}`.replace(/[^a-zA-Z0-9_-]/g, '_');
  doc.save(`Laporan_Ujian_SMAN1Selat_${safeTitle}.pdf`);
}
