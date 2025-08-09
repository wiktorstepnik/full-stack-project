from typing import List

from fastapi import APIRouter, Depends, status
from fastapi.params import Depends

from dependencies import authorization
from models import User
from repositories import UsersRepository

users_router = APIRouter(
    prefix="/users",
    tags=["users"],
    responses={status.HTTP_404_NOT_FOUND: {"description": "Not found"}},
    dependencies=[Depends(authorization)]
)


@users_router.get("/", status_code=status.HTTP_200_OK,
                  responses={
                      status.HTTP_200_OK: {"model": List[User],
                                           "description": "List of available users"},
                      status.HTTP_404_NOT_FOUND: {"description": "Not found"}})
async def get_users(users_repository: UsersRepository = Depends(UsersRepository)):
    return users_repository.get_users()


@users_router.get("/{user_id}", status_code=status.HTTP_200_OK,
                  responses={
                      status.HTTP_200_OK: {"model": User,
                                           "description": "User details"},
                      status.HTTP_404_NOT_FOUND: {"description": "Not found"}})
async def get_user(user_id: int, users_repository: UsersRepository = Depends(UsersRepository)):
    return users_repository.get_user(user_id)

