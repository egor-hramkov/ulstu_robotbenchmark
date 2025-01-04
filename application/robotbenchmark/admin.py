from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser, Problem, TournamentUser, Tournament, ProblemUser, CommandQueue


@admin.register(CustomUser)
class CustomUserAdmin(UserAdmin):
    list_display = (
        'id', 
        'username', 
        'first_name', 
        'last_name', 
        'email', 
        'phone', 
        'telegram', 
        'organization', 
        'team', 
        'is_staff', 
        'is_active', 
    )

    list_display_links = search_fields = (
        'id', 
        'username', 
        'first_name', 
        'last_name', 
        'email', 
        'phone', 
        'telegram', 
        'organization', 
        'team', 
    )

    fieldsets = (
        (None, {'fields': ('username', 'password')}), 
        ('Personal info', {'fields': ('first_name', 'last_name', 'email', 'phone', 'telegram', 'organization', 'team')}), 
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}), 
        ('Important dates', {'fields': ('last_login', 'date_joined')}), 
    )

    add_fieldsets = (
        (None, {
            'classes': ('wide',), 
            'fields': ('username', 'password1', 'password2', 'first_name', 'last_name', 'email', 'phone', 'telegram', 'organization', 'team'), 
        }), 
    )

    ordering = ('id',)


@admin.register(Problem)
class ProblemAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'world_path', 'difficulty', 'image',
                    'author')  # Список полей, которые будут отображаться в списке объектов
    list_display_links = (
        'id', 'title', 'world_path', 'difficulty')  # Список полей, которые будут отображаться в списке объектов
    list_filter = ('id', 'title', 'author')  # Список полей, по которым можно будет фильтровать объекты
    search_fields = ('id', 'title', 'author')  # Список полей, по которым можно будет искать объекты
    ordering = ('id',)  # Сортировка объектов по умолчанию


@admin.register(ProblemUser)
class ProblemUserAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'problem','points','grades', 'tournament', 'launch_command', 'status')  # Список полей, которые будут отображаться в списке объектов
    list_display_links = ('id', 'problem', 'points', 'grades', 'tournament', 'launch_command', 'status')  # Список полей, которые будут отображаться в списке объектов
    list_filter = ('id', 'problem', 'points', 'status')  # Список полей, по которым можно будет фильтровать объекты
    search_fields = ('id', 'problem', 'points', 'launch_command', 'status')  # Список полей, по которым можно будет искать объекты
    ordering = ('id',)  # Сортировка объектов по умолчанию


@admin.register(Tournament)
class TournamentAdmin(admin.ModelAdmin):
    list_display = (
        'id', 'name', 'date_start', 'date_end',
        'is_blocked')  # Список полей, которые будут отображаться в списке объектов
    list_display_links = ('id', 'name')  # Список полей, которые будут отображаться в списке объектов
    list_filter = (
        'id', 'name', 'date_start', 'date_end',
        'is_blocked')  # Список полей, по которым можно будет фильтровать объекты
    search_fields = ('id', 'name', 'date_start')  # Список полей, по которым можно будет искать объекты
    ordering = ('id',)  # Сортировка объектов по умолчанию


@admin.register(TournamentUser)
class TournamentUserAdmin(admin.ModelAdmin):
    list_display = (
        'id', 'user', 'tournament', 'is_completed',
        'points')  # Список полей, которые будут отображаться в списке объектов
    list_display_links = (
        'id', 'tournament', 'is_completed', 'points')  # Список полей, которые будут отображаться в списке объектов
    list_filter = (
        'id', 'user', 'tournament', 'is_completed',
        'points')  # Список полей, по которым можно будет фильтровать объекты
    search_fields = ('id', 'user', 'tournament')  # Список полей, по которым можно будет искать объекты
    ordering = ('id',)  # Сортировка объектов по умолчанию


@admin.register(CommandQueue)
class CommandQueueAdmin(admin.ModelAdmin):
    list_display = ('id', 'command')  # Список полей, которые будут отображаться в списке объектов
    list_display_links = ('id', 'command')  # Список полей, которые будут отображаться в списке объектов
    search_fields = ('id', 'command')  # Список полей, по которым можно будет искать объекты
    ordering = ('id',)  # Сортировка объектов по умолчанию
