import makeWASocket, {
    useMultiFileAuthState,
    DisconnectReason
} from "@whiskeysockets/baileys"

import pino from "pino"
import qrcode from "qrcode-terminal"

// ===================== PESAN =====================

function createMessage(name) {
    return `Halo kak ${name}, perkenalkan saya Muhammad Syarifudin Hidayat dari Prodi Teknologi Informasi.

Saat ini saya sedang melakukan pengumpulan data untuk keperluan penelitian saya dengan Ibu Wenty Dwi Yuniarti.
Sehubungan dengan itu, mohon kesediaannya untuk mengisi formulir pendataan alumni melalui link berikut:

https://docs.google.com/forms/d/e/1FAIpQLSeMHhuOfyXo2uQZ-1Lulk2DUh-7JqJF7Z1e0XvGIIDRXio3iQ/viewform?usp=dialog

Data yang dibutuhkan meliputi:
• NIM
• Nama lengkap
• Jenis kelamin
• Keikutsertaan organisasi mahasiswa
• Pekerjaan selama kuliah atau tidak
• Domisili saat kuliah (kos/rumah orang tua)
• IP Semester 1–4
• IPK Semester 4

Data yang kakak isi akan untuk dijamin kerahasiaannya.
Terima kasih banyak atas bantuannya 🙏`;
}

// ===================== DATA KONTAK =====================

const contacts = [
// ["Anggeline", "081477127199"],
// ["CHARIS KUSNANTO", "085741729379"],
// ["MUH INDRA WICAKSONO", "085891992019"],
// ["FLORA IMA MILENIA", "082135224244"],
// ["MUHAMMAD ZIDAN", "081284960595"],
// ["SITI MUSRIYATUL ILMIYAH", "085867916706"],
// ["FAIZAL NUR ROHMAN", "081215228213"],
// ["MAHENDRA ADRIANOVA RUSTIYONO", "082221887699"],
// ["DEWI RETNO ANGGRAINI", "089505252844"],
// ["ALFIAN HIDAYAT", "08158044404"], SUDAH

// ["RIZKI ADITYA PURNAMA", "0895416038556"],
// ["KHOLIFATUL ARDLIYAN", "081904898065"],
// ["MELI APRILIYANI", "088238655489"],
// ["SYIFA BRILLIANI ROCHIM", "088806202584"],
// ["ALBADRU MUH IZUL KHAQ", "089629055061"],
// ["ANNISA GITA RAHAYU", "087770339500"],
// ["MUHAMMAD SATRIA YUSUF", "087837988802"],
// ["FAYZA NAYLA RIYANA PUTRI", "085867853396"],
// ["ABDULLOH FAQIH", "087717282883"],
// ["MUHAMMAD ABDUR ROFI MAULIDIN", "081284745627"], SUDAH

// ["FADLURROHMAN AGIL", "083838715699"],
// ["INDRI AWALIA SEFIANI", "087733834890"],
// ["ABDURAHMAN", "0895358988660"],
// ["MIFTAKUN NIAM", "089643394089"],
// ["MUHAMMAD HAIKAL AUFAN", "089508563908"],
// ["SARAH WIJAYANTI", "0895323008279"],
// ["BAGUS SETIAWAN", "08983617841"],
// ["ABDULLOH AZZAM", "081935694594"],
// ["TASYA NABILA ARSY", "089502206827"],
// ["FALIS YUSUF HASSAN", "082218784349"],
// ["MUHAMMAD ANUULLAH RIANDANI", "085956528813"],
// ["SURYONO", "08812885189"],
// ["MUHAMMAD BIMO GINANTOKO", "08115129536"],
// ["VIORELLA AMANDA PUTRI", "081554361581"],
// ["NOVA RIO REDONDO", "08986478043"],
// ["INDAH ARUM SAFITRI", "081392293118"],
// ["LAILI ZANURA DAMAYANTI", "082229252887"],
// ["ALIM MUGHANIL KARIM", "08983936489"],
// ["ABDUL MUJIB", "087841994865"],
// ["LIBAN MUHYADIN MOHAMED", "081328262560"],
// ["FARIS NUR RAHMAN", "087880161715"],
// ["FAQIH IZZA ROSYADI", "081227930166"],
// ["MIFTAKHUL HUDA", "085247187599"],
// ["HASYIM YAHYA", "082146973042"],
// ["MUHAMMAD DHIYAUL ALLAM", "08886867714"],
// ["RAJA MUHAMMAD MUSA", "089669668358"],
// ["FAIDLUL IN'AM", "0895412555075"],
// ["ALIFIA FARA AZZAHRA", "081381406943"],
// ["HENDRI PUTRA IRAWAN", "085759170564"],
// ["DEKA IBRAHIM DAHIR", "081210942295"],
// ["FIRDAUS FAHMI", "087836323699"],
// ["ARI PRASETYO", "0895383030210"],
// ["AMIR YUSUF", "089669396584"],
// ["MUHAMMAD ILHAMI YAHYA", "081779078598"],
// ["DESI RAHMAWATI", "085701031981"],
// ["NURUL MUALIMAH", "082314629579"],
// ["REZA AZZINDANI NASHIRUDIN", "085155069121"],
// ["LISTYANINGRUM", "089503675116"],
// ["THOORIQ NUR ALI", "08999333005"],
// ["AHLIS AULIYA RAHMAN", "08886945887"],
// ["MUHAMMAD HISYAM ADNAN", "089619520371"],
// ["AZIZ MAULANA RAFIANSYAH", "085158849508"],
// ["KHUSNUL AMALIA", "087767646186"],
// ["LUQMANUL HAKIM", "083133080006"],
// ["AHMAD ILHAM MUSONNIF", "082140008263"],
// ["IVAN RIZKY SAPUTRA", "085702330305"],
// ["SRI MURNI", "0895410331712"],
// ["EGAFTA MUHAMMAD NAUFAL DZAKY", "085701274420"],
// ["AHMAD SYAUQI SYARIFUDDIN", "085727585608"],
// ["MIA PUTRI SETYAWATI", "089523529453"],
// ["AHMAD FANI MAULANA", "082313123711"],
// ["NAILUL INAYAH", "083148736108"],
// ["IBNU ALFIAN RACHMAT", "085929348887"],
// ["FARAH HANIN DHIYA AMANDA", "0895423938333"],
// ["AMAYUDA SAFEI", "085856262893"],
// ["PUTRI SEPTI PRATIWI", "089515167793"],
// ["NOVITA PURWANTI", "085817493684"],
// ["MOHAMAD KAHIS ALAYYA", "085742129092"],
// ["LINA SAYEKTI", "0895414988167"],
// ["ISTI NUR AZIZAH", "085713865257"],
// ["KHOIRUL ADIB", "081340247452"],
// ["ALIFATUL AZIFAH", "082332342508"],
// ["FAVIAN AGUNG RIZKI", "0895363130496"],
// ["DANI ZAINU ILAH", "0895330698544"],
// ["HILDA PUTRI ARDISYA", "085740663853"],
// ["KHUSARAH PRASETYANI", "081268777348"],
// ["FANIYA RIFQI FAUZI", "085291088166"],
// ["YOGA BAYU PRATAMA", "089519301235"],
// ["ROMAN FAUZAN", "082313175617"],
// ["MUHAMMAD AMIRUL SYACHRUDIN", "089669941150"],
// ["AKBAR SIDIQ PUTRA WIJAYA", "081390936283"],
// ["MAULANA JADID", "895360014390"],
// ["AJENG AYU KUSUMANINGTIAS", "082313687164"],
// ["ABDUL LATHIF MILHAS", "085786904530"],
// ["ADAM HUSNI FARROS", "08882431974"],
// ["ANINDHITA AKBARI ALIFIA HASNA", "081392051413"],
// ["MOCHAMMAD ALI RIDHO FATHONI", "083836489507"],
// ["IQBAL GIVARI", "081280803453"],
// ["FATHAN ARIFBILLAH", "088222514233"],
// ["MUHAMAD SYAKHIF AMAR", "081229833602"],
// ["WAHYU RIZQY SAPUTRA", "085747040953"],
// ["LINTANG AJI YOGA PRATAMA", "085892942057"],
// ["SAHRUL RAMADHANI", "088216214153"],
// ["PUTRI DINI RAMADLANI", "082137966566"],
// ["SHERLIEN ANGGIE PUSPITASARI", "083195399477"],
// ["RIEFANDA AYUNI SYAPUTRI", "0895378100669"],
// ["WINONA MAWARNI", "0895391133113"],
// ["PUTRI RAMANDHANI", "088233628104"],
// ["BAYU RAHMAD SAPUTRA", "085157032002"],
// ["MOH IRHAM", "082139579852"],
// ["HALIMATUS SA’DIYAH", "085693855189"],
// ["SALMA NABILA PRASASTI", "085878627340"],
// ["ACHMAD NUR FAIZ", "085161220528"],
// ["FAIQOTUZZAHRO", "089529133852"],
// ["AINUN FATIMAH", "085257708166"],
// ["ANDRI ADITYA", "089509401174"],
// ["GALIH IMAM SUWARSO", "082265025190"],
// ["RIFFAT IMAN HIRZI", "085700091637"],
];


// ===================== BOT UTAMA =====================

async function startBot() {
    const { state, saveCreds } = await useMultiFileAuthState('session')

    const sock = makeWASocket({
        logger: pino({ level: "silent" }),
        auth: state
    })

    sock.ev.on('creds.update', saveCreds)

    sock.ev.on("connection.update", async (update) => {
        const { connection, lastDisconnect, qr } = update

        if (qr) {
            console.log("\n🔵 Scan QR berikut untuk login:")
            qrcode.generate(qr, { small: true })
        }

        if (connection === "open") {
            console.log("🟢 Bot WhatsApp aktif!")

            // Kirim ke semua kontak
            for (const [name, number] of contacts) {
                await sendMessageTo(name, number, sock)
                await delay(5000) // jeda 5 detik biar aman
            }

            console.log("\n🎉 Semua pesan telah dikirim!")
        }

        if (connection === "close") {
            const shouldReconnect =
                lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut
            if (shouldReconnect) startBot()
        }
    })
}

// ===================== FUNGSI KIRIM PESAN =====================

async function sendMessageTo(name, number, sock) {
    const fullNumber = number.replace(/^0/, "62")
    const jid = fullNumber + "@s.whatsapp.net"
    const msg = createMessage(name)

    try {
        await sock.sendMessage(jid, { text: msg })
        console.log(`✔ Pesan terkirim ke ${name} (${jid})`)
    } catch (err) {
        console.log(`❌ Gagal mengirim ke ${name} (${jid}):`, err)
    }
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

startBot()
