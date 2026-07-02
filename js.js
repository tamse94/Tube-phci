document.addEventListener("DOMContentLoaded", () => {
    const currentUrl = window.location.href;

    const redirectToDefault = () => {
        sessionStorage.removeItem('backup_tube'); // Hapus memori cadangan jika rusak
        const cleanUrl = window.location.origin + window.location.pathname;
        window.location.href = cleanUrl; 
    };

    let tubeParam = "";

    // 1. JARING PENGAMAN: Cek apakah ada parameter ?tube= di URL saat ini
    if (currentUrl.includes('?tube=')) {
        // Potong string Base64-nya secara bersih
        tubeParam = currentUrl.split('?tube=')[1];
        if (tubeParam.includes('#')) {
            tubeParam = tubeParam.split('#')[0];
        }
        tubeParam = tubeParam.trim();

        // KUNCI AMAN: Simpan ke memori sementara browser agar tidak hilang saat iklan me-refresh halaman
        if (tubeParam) {
            sessionStorage.setItem('backup_tube', tubeParam);
        }
    } else {
        // 2. KONDISI PASCA POPUP: Jika parameter ?tube= hilang dari URL akibat di-refresh iklan,
        // Ambil data cadangan yang sudah kita kunci di sessionStorage tadi
        tubeParam = sessionStorage.getItem('backup_tube');
    }

    // Jika di URL tidak ada, dan di memori juga kosong, biarkan halaman default bawaan sejak awal
    if (!tubeParam) return;

    try {
        // 3. Decode Base64 secara aman
        const decodedString = decodeURIComponent(escape(atob(tubeParam)));

        // Pisahkan judul dan gambar via '+'
        const separatorIndex = decodedString.indexOf('+');
        if (separatorIndex === -1 || separatorIndex === 0 || separatorIndex === decodedString.length - 1) {
            return redirectToDefault();
        }

        const title = decodedString.substring(0, separatorIndex);
        const imageUrl = decodedString.substring(separatorIndex + 1);

        // Validasi format URL gambar
        const urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?.*?$/i;
        if (!urlPattern.test(imageUrl)) {
            return redirectToDefault();
        }

        // 4. Tampilkan data kustom ke elemen HTML
        const titleElement = document.querySelector('.video-title');
        const thumbnailElement = document.querySelector('.video-thumbnail');

        if (titleElement && thumbnailElement) {
            titleElement.textContent = title;
            thumbnailElement.src = imageUrl;
        }

    } catch (error) {
        console.error("Gagal memuat data kustom:", error);
        redirectToDefault();
    }
});
