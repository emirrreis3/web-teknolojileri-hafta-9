# Web Teknolojileri — Kampüs Etkinlik Rehberi (Sprint 9)
**Tam CRUD (PATCH, DELETE), Tarih Formatı (GG-AA-YYYY), Arama & Yaklaşan Etkinlikler**

* **Canlı Dağıtım (Vercel):** [https://web-teknolojileri-hafta-9.vercel.app/](https://web-teknolojileri-hafta-9.vercel.app/)
* **GitHub Reposu:** [https://github.com/emirrreis3/web-teknolojileri-hafta-9](https://github.com/emirrreis3/web-teknolojileri-hafta-9)

---

## Öğrenci Bilgileri
* **Adı Soyadı:** Emir Demir
* **Öğrenci Numarası:** 2416501048
* **Bölüm:** Bilgisayar Mühendisliği
* **Ders:** Web Teknolojileri ve Programlama
* **Özel Stil:** Font: `system-ui, sans-serif` | Renk Tonu (`--ton`): `328` (`2416501048 mod 360 = 328`) (Fuşya / Pembe)
* **Künye (Footer):** `Emir Demir · 2416501048 · 2026`

---

## Sprint 9 Yenilikleri ve Kazanımları

1. **Tam REST CRUD Döngüsü:**
   - `PATCH /events/:id`: Kısmi güncelleme (partial update). Sadece iletilen alanları günceller (`returnDocument: "after"` ve `runValidators: true`). Boş gövde (`{}`) ve korunan alanlar (`_id`, `createdAt`, `updatedAt`, `__v`) için `400 Bad Request`, bulunamayan ID için `404 Not Found` döner.
   - `DELETE /events/:id`: Belirtilen etkinliği veritabanından kalıcı olarak siler ve `204 No Content` (boş gövde) döner. İkinci kez silinmek istendiğinde `404 Not Found` döner.
2. **Tarih Standardizasyonu (`GG-AA-YYYY`):**
   - API ve JSON yanıtlarında `"15-10-2026"` formatı kullanılırken, MongoDB katmanında gerçek UTC `Date` tipi olarak saklanır.
   - `parseDate` ve `formatDate` yardımcı fonksiyonları ile şemada otomatik `setter` ve `getter` mekanizması işletilir. Hatalı tarih formatlarında sunucu çökmeden `400 Bad Request` döner.
3. **Arama ve Filtreleme (`GET /events?search=&category=`):**
   - Query string üzerinden metin araması (özel regex karakterleri kaçırılarak, büyük/küçük harf duyarsız `$options: "i"`) ve kategori filtrelemesi desteklenir.
4. **Yaklaşan Etkinlikler (`GET /events/upcoming`):**
   - Express router sırasında `/:id`'den önce tanımlanarak çakışma önlenmiştir.
   - `$gte: todayStart()` filtresi ile sadece bugünün ve geleceğin etkinlikleri artan tarihe göre listelenir; geçmiş etkinlikler elenir.
5. **Otomatik Newman Testleri:**
   - 18 istek ve 45 test assertion'ının tamamı yeşil (`0 Failed, %100 Başarı`).
   - Sonuçlar `backend/requests/run-results.json` dosyasına kaydedilmiştir.

---

## REST API Sözleşmesi

| Method | Yol (Path) | Açıklama | Başarılı Durum | Hata Durumu | Gövde (Body) / Parametre |
|---|---|---|---|---|---|
| `GET` | `/health` | Sağlık kontrolü ve öğrenci no | `200 OK` | — | — |
| `GET` | `/events` | Etkinlik listesi (arama ve kategori filtresi) | `200 OK` | `500` | Query: `?search=atölye` & `?category=Atölye` |
| `GET` | `/events/upcoming` | Yaklaşan etkinlikler (en yakın önce) | `200 OK` | `500` | — |
| `GET` | `/events/:id` | Tek etkinlik detayı | `200 OK` | `404 Not Found` | Parametre: `:id` |
| `POST` | `/events` | Yeni etkinlik oluşturma | `201 Created` | `400 Bad Request` | JSON Body: `title`, `category`, `capacity`, `date`, `time`, `location`, `description` |
| `PATCH` | `/events/:id` | Kısmi etkinlik güncelleme | `200 OK` | `400 / 404` | Parametre: `:id`, JSON Body: Güncellenecek alanlar |
| `DELETE` | `/events/:id` | Etkinlik silme | `204 No Content` | `404 Not Found` | Parametre: `:id` |

### Hata Yanıt Formatı (400 / 404)
```json
{
  "error": {
    "message": "Event not found"
  }
}
```

---

## Proje Klasör Yapısı

```
web-teknolojileri-sprint-9/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js       # Mongoose MongoDB Atlas bağlantısı
│   │   ├── controllers/
│   │   │   └── event-controller.js # CRUD & arama/filtreleme controller mantığı
│   │   ├── data/
│   │   │   └── seed-events.js    # 6 başlangıç etkinliği (2 geçmiş tarihli)
│   │   ├── models/
│   │   │   └── event-model.js    # Event Mongoose şeması (Date getter/setter, enum)
│   │   ├── routes/
│   │   │   └── event-routes.js   # Route tanımları (/upcoming önce, PATCH, DELETE)
│   │   ├── utils/
│   │   │   └── date.js           # parseDate, formatDate, todayStart yardımcıları
│   │   ├── app.js                # Express konfigürasyonu ve hata middleware'i
│   │   ├── seed.js               # İdempotent veritabanı tohumlama scripti
│   │   └── server.js             # Sunucu başlatıcı (Port 3000)
│   ├── requests/
│   │   ├── kampus-api.json       # Sprint 9 Postman test koleksiyonu
│   │   └── run-results.json      # Newman 45 test 0 hata çalıştırma raporu
│   ├── README.md                 # Backend özel dokümantasyonu
│   └── package.json
├── src/                          # Frontend React + TypeScript kaynak kodları
│   ├── components/               # UI bileşenleri (EventCard, EventList, EventFilter, Header, Navigation vb.)
│   ├── context/                  # React Context API global state yönetimi
│   ├── pages/                    # 10 adet sayfa bileşeni (Home, Events, Detail, Admin, Login vb.)
│   ├── types/                    # TypeScript arayüz ve tip tanımları
│   └── utils/                    # Frontend yardımcı fonksiyonları
├── dist/                         # Üretim derlemesi (Production build)
├── index.html                    # Ana HTML şablonu
├── package.json
└── README.md
```

---

## Kurulum ve Çalıştırma

Gereksinimler: **Node.js 18+** ve **npm**

### 1. Backend Servisi
```bash
cd backend

# Bağımlılıkları yükleyin
npm install

# Başlangıç verilerini veritabanına yükleyin (6 etkinlik)
npm run seed

# Geliştirme sunucusunu başlatın (http://localhost:3000)
npm run dev
```

### 2. Frontend Uygulaması
```bash
# Proje ana dizininde:
npm install
npm run dev
```
Geliştirme sunucusu `http://localhost:5173` adresinde çalışır.

---

## Testleri Çalıştırma (Newman CLI)

Backend sunucusu çalışırken (`http://localhost:3000`):

```bash
newman run https://webdersi.vercel.app/test.json
```

**Sonuç Özeti:**
```
Iterations: 1/1
Requests: 18/18
Assertions: 45/45 (0 Failed, 0 Error, %100 Başarı)
```
Tüm testler yeşil tik ile doğrulanmıştır.
