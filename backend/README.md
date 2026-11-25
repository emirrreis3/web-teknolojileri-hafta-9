# Kampüs Etkinlik Rehberi — Express & MongoDB REST API (Sprint 9)

Bu servis, Kampüs Etkinlik Rehberi frontend uygulamasının bağlanacağı Node.js + Express + MongoDB (Mongoose ORM) tabanlı kalıcı veri katmanına sahip REST API backend servisidir.

## Öğrenci Bilgileri
* **Adı Soyadı:** Emir Demir
* **Öğrenci Numarası:** 2416501048
* **Bölüm:** Bilgisayar Mühendisliği

---

## Kurulum ve Çalıştırma

Gereksinimler: **Node.js 18+** ve **npm**

```bash
# Backend klasörüne geçin
cd backend

# Bağımlılıkları yükleyin
npm install

# Başlangıç verilerini veritabanına yükleyin (İdempotent seed scripti)
npm run seed

# Geliştirme modunda başlatın (nodemon ile otomatik yenileme)
npm run dev

# Üretim modunda başlatın
npm start
```

Sunucu varsayılan olarak `http://localhost:3000` adresinde çalışır.

---

## Ortam Değişkenleri (.env)

`backend/.env.example` dosyasını referans alarak bir `.env` dosyası oluşturun:

```env
PORT=3000
STUDENT_ID=2416501048
MONGODB_URI=mongodb+srv://<kullanici>:<sifre>@cluster0.ab12c.mongodb.net/kampus?retryWrites=true&w=majority
```

> **Önemli Güvenlik Kuralı:** `.env` ve `node_modules` dosyaları `.gitignore` ile korunmakta olup kesinlikle GitHub'a gönderilmemelidir.

---

## REST Sözleşmesi

| Method | Yol (Path) | Açıklama | Başarılı Durum Kodu | Hata Durum Kodu | Gövde (Body) / Parametre |
|---|---|---|---|---|---|
| `GET` | `/health` | Sağlık kontrolü ve öğrenci no | `200 OK` | - | - |
| `GET` | `/events` | MongoDB'deki etkinlikler | `200 OK` | `500` | Query: `?search=atölye` & `?category=Atölye` (opsiyonel) |
| `GET` | `/events/upcoming` | Yaklaşan etkinlikler (bugün ve sonrası, tarihe göre sıralı) | `200 OK` | `500` | - |
| `GET` | `/events/:id` | Tek etkinlik detayı | `200 OK` | `404 Not Found` | Parametre: `:id` (Geçersiz format veya bulunamayan ID 404 döner) |
| `POST` | `/events` | Yeni etkinlik ekleme | `201 Created` | `400 Bad Request` | JSON Body: `title`, `category`, `capacity` (min: 1), `date` ("GG-AA-YYYY"), `time`, `location`, `description` |
| `PATCH` | `/events/:id` | Kısmi etkinlik güncelleme (çalışıyor) | `200 OK` (güncel kayıt) | `400 / 404` | Parametre: `:id`, JSON Body: Güncellenecek alanlar |
| `DELETE` | `/events/:id` | Etkinlik silme (çalışıyor) | `204 No Content` (gövde yok) | `404 Not Found` | Parametre: `:id` |

### Hata Yanıt Formatı (400 / 404)
```json
{
  "error": {
    "message": "Event not found"
  }
}
```

---

## Postman & Newman Testleri

Sprint 9 otomatik test koleksiyonu: `https://webdersi.vercel.app/test.json`

Terminal üzerinden testleri koşturmak için:
```bash
newman run https://webdersi.vercel.app/test.json
```

Toplam 18 istek ve 45 test assertion'ı içermektedir (Tüm testler yeşil / passed).
Test sonuçları `backend/requests/run-results.json` dosyasına kaydedilmiştir.
