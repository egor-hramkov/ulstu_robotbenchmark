from django.contrib.auth import get_user_model
from django.core.management import BaseCommand


UserModel = get_user_model()


class Command(BaseCommand):
    help = 'Database superuser initialization'

    def handle(self, *args, **options):
        if not UserModel.objects.filter(username='admin').exists():
            admin = UserModel.objects.create_superuser(username='admin', password='admin')
            admin.is_active = True
            admin.is_admin = True
            admin.save()
        print('Admin profile has been successfully created!')
