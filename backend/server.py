from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List
import uuid
from datetime import datetime, timezone
from contextlib import asynccontextmanager

import aiosqlite

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# SQLite database — path configurable so Render can point it at a persistent disk
DB_PATH = os.environ.get("SQLITE_PATH", str(ROOT_DIR / "plate_me.db"))

CORS_ORIGINS = [
    origin.strip().rstrip("/")
    for origin in os.environ.get(
        "CORS_ORIGINS",
        "http://localhost:3000,http://127.0.0.1:3000",
    ).split(",")
    if origin.strip()
]
if "*" in CORS_ORIGINS:
    raise RuntimeError("CORS_ORIGINS must contain explicit origins")


async def get_db() -> aiosqlite.Connection:
    db = await aiosqlite.connect(DB_PATH)
    db.row_factory = aiosqlite.Row
    await db.execute("PRAGMA journal_mode=WAL")
    await db.execute("PRAGMA foreign_keys=ON")
    return db


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Create schema on startup
    db = await get_db()
    await db.execute(
        """
        CREATE TABLE IF NOT EXISTS status_checks (
            id TEXT PRIMARY KEY,
            client_name TEXT NOT NULL,
            timestamp TEXT NOT NULL
        )
        """
    )
    await db.commit()
    await db.close()
    yield


app = FastAPI(lifespan=lifespan)
api_router = APIRouter(prefix="/api")


class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class StatusCheckCreate(BaseModel):
    client_name: str


@api_router.get("/")
async def root():
    return {"service": "Plate Me API", "status": "ok"}


@api_router.get("/health")
async def health():
    return {"status": "healthy", "timestamp": datetime.now(timezone.utc).isoformat()}


@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_obj = StatusCheck(**input.model_dump())
    db = await get_db()
    try:
        await db.execute(
            "INSERT INTO status_checks (id, client_name, timestamp) VALUES (?, ?, ?)",
            (status_obj.id, status_obj.client_name, status_obj.timestamp.isoformat()),
        )
        await db.commit()
    finally:
        await db.close()
    return status_obj


@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    db = await get_db()
    try:
        cursor = await db.execute(
            "SELECT id, client_name, timestamp FROM status_checks "
            "ORDER BY timestamp DESC LIMIT 1000"
        )
        rows = await cursor.fetchall()
    finally:
        await db.close()
    return [
        StatusCheck(
            id=row["id"],
            client_name=row["client_name"],
            timestamp=datetime.fromisoformat(row["timestamp"]),
        )
        for row in rows
    ]


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=CORS_ORIGINS,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["Accept", "Authorization", "Content-Type"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)
