from pydantic_settings import BaseSettings
from typing import ClassVar


class Settings(BaseSettings):
    SECRET_KEY: str = "labodc-secret-key"
    ALGORITHM: ClassVar[str] = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60
    DATABASE_URL: str = "postgresql://postgres:123456@localhost:5432/labodc"

    class Config:
        env_file = ".env"


settings = Settings()
