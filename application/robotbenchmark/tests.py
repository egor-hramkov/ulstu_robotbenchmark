from django.contrib.auth.models import User
from django.test import TestCase, Client

from robotbenchmark.models import Problem, CommandQueue


class ProblemUserTestCase(TestCase):
    """Тесты для проверки работоспособности создания задачи пользователю"""

    c = Client()
    CREATE_PROBLEM_URL = "/api/users-problem/"
    GET_COMMAND_URL = "/api/commands/"

    def setUp(self):
        self.user = User.objects.create_user(username='test_for_task', password='abcdefasd', email="task@mail.ru")
        self.problem = Problem.objects.create(
            title="test problem",
            description="string",
            world_path="usr/test/mock/path",
            difficulty=1,
            author=self.user
        )

    def test_create_problem_user(self):
        """Тест на создание задачи пользователю"""
        self.c.login(username='test_for_task', password='abcdefasd')
        response = self.c.post(
            f"{self.CREATE_PROBLEM_URL}",
            {
                "is_completed": True,
                "points": 0,
                "user": self.user.id,
                "problem": self.problem.id
            },
            content_type="application/json",
        )
        assert response.status_code == 201

        check_command = CommandQueue.objects.all()
        assert len(check_command) > 0

        response = self.c.get(self.GET_COMMAND_URL)
        assert response.status_code == 200
        check_command = CommandQueue.objects.all()
        assert len(check_command) == 0
