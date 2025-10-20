# 🎓 טבלת הגומר - לוח שנה אישי

לוח שנה אינטראקטיבי לספירת הימים עד תאריך הגמר (20.02.26) עם תמיכה בתאריכים עבריים, אירועים והתראות ב-Google Chat.

## ✨ פיצ'רים

- 📅 הצגת לוח שנה מ-20.10.25 עד 20.02.26
- 🕍 תאריכים עבריים ולועזיים
- ➕ הוספה, עריכה ומחיקה של אירועים
- 🔔 הודעות יומיות ב-Google Chat
- 🎨 עיצוב בצבעי זהב, שחור ולבן
- 🎓 תמונות ואייקונים של GRADUATE

## 🛠️ טכנולוגיות

**Backend:**
- FastAPI (Python)
- MongoDB
- APScheduler (תזמון)
- pyluach (המרת תאריכים עברי)

**Frontend:**
- React 18
- Vite
- TailwindCSS
- Axios

**DevOps:**
- Docker & Docker Compose
- MongoDB 7.0

## 📋 דרישות מקדימות

- Docker Desktop מותקן
- Git
- חיבור לאינטרנט

## 🚀 התקנה והרצה

### 1. שכפול הפרויקט

```bash
git clone <your-repo-url>
cd gomeret-calendar
```

### 2. הגדרת משתני סביבה

**Backend:**
```bash
cp backend/.env.example backend/.env
```

ערכי את `backend/.env` והוסיפי את ה-Google Chat Webhook URL שלך.

**Frontend:**
```bash
cp frontend/.env.example frontend/.env
```

### 3. הרצת הפרויקט

```bash
docker-compose up --build
```

הפרויקט יהיה זמין ב:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- API Docs: http://localhost:8000/docs

### 4. עצירת הפרויקט

```bash
docker-compose down
```

## 🔧 Google Chat Webhook Setup

1. פתחי את Google Chat
2. בחרי את ה-Space שבו תרצי לקבל התראות
3. לחצי על שם ה-Space → **Configure webhooks**
4. לחצי על **Add webhook**
5. תני שם (למשל "טבלת הגומר")
6. העתיקי את ה-URL שנוצר
7. הדביקי אותו ב-`backend/.env` במשתנה `GOOGLE_CHAT_WEBHOOK_URL`

## 📁 מבנה הפרויקט

```
gomeret-calendar/
├── backend/              # FastAPI backend
│   ├── app/
│   │   ├── main.py
│   │   ├── routes/
│   │   ├── services/
│   │   └── models.py
│   └── requirements.txt
├── frontend/             # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   └── App.jsx
│   └── package.json
└── docker-compose.yml
```

## 🌐 API Endpoints

- `GET /api/calendar?start=YYYY-MM-DD&end=YYYY-MM-DD` - קבלת לוח שנה
- `GET /api/events` - קבלת כל האירועים
- `GET /api/events/{id}` - קבלת אירוע ספציפי
- `POST /api/events` - יצירת אירוע חדש
- `PUT /api/events/{id}` - עדכון אירוע
- `DELETE /api/events/{id}` - מחיקת אירוע

## 🎨 עיצוב

הפרויקט משתמש בצבעים:
- 🟡 זהב (#D4AF37)
- ⚫ שחור (#000000)
- ⚪ לבן (#FFFFFF)

## 📅 תזמון הודעות

הודעה יומית נשלחת אוטומטית ב-08:00 (ניתן לשנות ב-`backend/.env`).

## 🐛 בעיות נפוצות

**Docker לא עולה:**
- ודאי ש-Docker Desktop פועל
- נסי: `docker-compose down && docker-compose up --build`

**MongoDB connection error:**
- ודאי שהפורט 27017 לא תפוס
- בדקי שהסיסמא ב-`docker-compose.yml` תואמת ל-`.env`

**Frontend לא מתחבר ל-Backend:**
- ודאי ש-`VITE_API_URL` ב-`frontend/.env` נכון
- בדקי שה-Backend רץ על http://localhost:8000

## 📝 פיתוח

**הרצה מקומית ללא Docker:**

Backend:
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

Frontend:
```bash
cd frontend
npm install
npm run dev
```

## 📞 תמיכה

יצרת שאלה או בעיה? פתחי issue ב-GitHub.

---

**Created with ❤️ for the big day! 🎓**