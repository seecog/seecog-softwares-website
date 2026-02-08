# Seecog Softwares Website

## Setup

### 1. Install dependencies
```bash
npm install
```

### 2. Configure environment
Copy `.env.example` to `.env` and set:
- `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASS` (MySQL)
- `SESSION_SECRET` (random string for session encryption)
- `ADMIN_EMAIL`, `ADMIN_PASSWORD` (for initial admin user)

### 3. Create MySQL database
```sql
CREATE DATABASE seecogsoftwares_website;
```

### 4. Run migrations
```bash
npm run migrate
```

### 5. Seed admin user and default profile
```bash
npm run seed
```

### 6. Start the server
```bash
npm start
```

## Admin Panel
- **Login:** `/admin/login`
- **Dashboard:** `/admin/dashboard` (after login)
- **Profile:** Basic Info, Social Media
- **Jobs:** CRUD, publish/unpublish
- **Applications:** View and download resumes

## Careers Page
- Public `/careers` shows published jobs from the database
- Candidates apply via form with resume upload (PDF/DOC/DOCX, max 5MB)