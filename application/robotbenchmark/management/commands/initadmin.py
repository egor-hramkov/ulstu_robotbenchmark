from django.contrib.auth import get_user_model
from django.core.management import BaseCommand


UserModel = get_user_model()


class Command(BaseCommand):
    help = 'Database superuser initialization'

    def handle(self, *args, **options):
        if not UserModel.objects.filter(username='ulstu-admin').exists():
            admin = UserModel.objects.create_superuser(username='ulstu-admin', password='ulstupass1@')
            admin.is_active = True
            admin.is_admin = True
            admin.save()
        print('Admin profile has been successfully created!')
