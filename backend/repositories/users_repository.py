import json
from typing import List, Optional

from fastapi import HTTPException

from config import config
from models import User


def load_users_from_db() -> List[dict]:
    """
    Load users from the JSON file specified in config.fake_db_path.

    :return: List of users as dictionaries.
    """
    with open(file=config.fake_db_path, mode="r", encoding="utf-8") as f:
        users = json.load(f)
    return users


class UsersRepository:
    """
    Repository for managing user data loaded from a JSON file.
    """

    def __init__(self, db: Optional[List[dict]] = None):
        """
        Initialize UsersRepository with given database or load from file by default.

        :param db: Optional list of user dictionaries. If None, loads from file.
        """
        self.db: List[dict] = db if db is not None else load_users_from_db()
        self._model = User

    def get_users(self) -> List[User]:
        """
        Get all users as a list of User model instances.

        :return: List of User objects.
        """
        return [self._model(**user) for user in self.db]

    def get_user(self, user_id: int) -> User:
        """
        Get a single user by their unique ID.

        :param user_id: User's unique identifier (not index).
        :return: User object if found.
        :raises HTTPException: 404 if user not found or multiple users with same ID.
        """
        filtered_users = [user for user in self.db if user.get("id") == user_id]

        if not filtered_users:
            raise HTTPException(status_code=404, detail="User not found")

        if len(filtered_users) > 1:
            raise HTTPException(status_code=404, detail="Multiple users found with the same ID")

        return self._model(**filtered_users[0])
