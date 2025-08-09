from typing import Annotated, List

from pydantic import Field

from models import CamelModel


class User(CamelModel):
    id: Annotated[int, Field(ge=0, description="id of user")]
    username: Annotated[str, Field(description="username of user")]
    email: Annotated[str, Field(description="email of user")]
    age: Annotated[int, Field(ge=0, description="age of user")]
    is_active: Annotated[bool, Field(description="Is user active")]
    roles: Annotated[List[str], Field(description="Roles of user")]
