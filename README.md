# Plate Me

Professional culinary plating inspiration, technique discovery, favorites, and mise en place tracking from Blue Collar Apps.

## Deploy to Render

Create a new Render Blueprint from this repository's `main` branch. The root `render.yaml` creates the FastAPI service and React static site.

Set these backend environment variables in Render:

```text
# SQLite is file-based — no database URL needed. SQLITE_PATH is set in render.yaml.
CORS_ORIGINS=https://plate-me.onrender.com
```

Set this frontend environment variable:

```text
REACT_APP_BACKEND_URL=https://plate-me-api.onrender.com
```

## Local development

Backend:

```bash
cd backend
cp .env.example .env
python -m venv .venv
. .venv/bin/activate
pip install -r requirements.txt
uvicorn server:app --reload
```

Frontend:

```bash
cd frontend
cp .env.example .env.local
npm install --legacy-peer-deps
npm start
```

## Launch checks

```bash
cd frontend
npm ci --legacy-peer-deps
CI=true npm run build

cd ../backend
python -m compileall -q .
```

Proprietary — All Rights Reserved © Blue Collar Apps Co.
