from pydantic_settings import BaseSettings


class AppConfig(BaseSettings):
    fake_db_path: str = "fakeDB/users_table"


config = AppConfig()
