from starlette.testclient import TestClient


def test_get_all_users_should_return_200(client: TestClient) -> None:
    response = client.get("v1/users")
    assert response.status_code == 200


def test_get_user_should_return_200(client: TestClient) -> None:
    response = client.get("v1/users/1")
    assert response.status_code == 200
    assert response.json() == {'age': 28,
                               'email': 'jan.kowalski@example.com',
                               'id': 1,
                               'isActive': True,
                               'roles': ['user', 'admin'],
                               'username': 'jan_kowalski'} != {'email': '', 'id': 1}
