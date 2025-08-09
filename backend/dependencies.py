from fastapi import APIRouter

from repositories.users_repository import UsersRepository


def authorization() -> bool:
    """
    Example auth dependency
    :return:
    """
    return True

