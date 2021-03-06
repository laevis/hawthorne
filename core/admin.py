from django.contrib import admin

from core import models


class CountryAdmin(admin.ModelAdmin):
  list_display = ('code', 'name', 'created_at', 'updated_at')
  list_filter = ('created_at', 'updated_at')
  search_fields = ('name',)
  date_hierarchy = 'created_at'


class UserAdmin(admin.ModelAdmin):
  list_display = (
    'username',
    'namespace',
    'first_name',
    'last_name',
    'is_steam',
    'is_superuser',
    'is_staff',
    'is_active',
    'ip',
    'country',
  )
  list_filter = (
    'is_superuser',
    'is_staff',
    'is_active',
    'is_steam',
  )


class MainframeAdmin(admin.ModelAdmin):
  list_display = (
    'domain',
    'assigned',
    'token',
  )
  list_filter = ()


class TokenAdmin(admin.ModelAdmin):
  list_display = (
    'id',
    'created_at',
    'updated_at',
    'owner',
    'is_active',
    'is_anonymous',
    'is_supertoken',
  )
  list_filter = (
    'created_at',
    'updated_at',
    'owner',
    'is_active',
    'is_anonymous',
    'is_supertoken',
  )
  date_hierarchy = 'created_at'


class ServerPermissionAdmin(admin.ModelAdmin):
  list_display = (
    'can_reservation',
    'can_generic',
    'can_kick',
    'can_ban',
    'can_slay',
    'can_map',
    'can_config',
    'can_cvar',
    'can_chat',
    'can_vote',
    'can_password',
    'can_rcon',
    'can_cheat',
  )
  list_filter = (
    'created_at',
    'updated_at',
    'can_reservation',
    'can_generic',
    'can_kick',
    'can_ban',
    'can_slay',
    'can_map',
    'can_config',
    'can_cvar',
    'can_chat',
    'can_vote',
    'can_password',
    'can_rcon',
    'can_cheat',
  )
  date_hierarchy = 'created_at'


class RoleAdmin(admin.ModelAdmin):
  list_display = (
    'name',
    'flags',
    'immunity',
    'usetime',
    'is_supergroup',
  )
  list_filter = ('created_at', 'updated_at', 'flags', 'is_supergroup')
  search_fields = ('name',)
  date_hierarchy = 'created_at'


class ServerAdmin(admin.ModelAdmin):
  list_display = (
    'id',
    'created_at',
    'updated_at',
    'name',
    'ip',
    'port',
    'password',
  )
  list_filter = ('created_at', 'updated_at')
  search_fields = ('name',)
  date_hierarchy = 'created_at'


class BanAdmin(admin.ModelAdmin):
  list_display = (
    'id',
    'created_at',
    'updated_at',
    'user',
    'server',
    'created_by',
    'updated_by',
    'reason',
    'length',
    'resolved',
  )
  list_filter = (
    'created_at',
    'updated_at',
    'user',
    'server',
    'created_by',
    'updated_by',
    'resolved',
  )
  date_hierarchy = 'created_at'


class MutegagAdmin(admin.ModelAdmin):
  list_display = (
    'id',
    'created_at',
    'updated_at',
    'user',
    'server',
    'created_by',
    'updated_by',
    'type',
    'reason',
    'length',
    'resolved',
  )
  list_filter = (
    'created_at',
    'updated_at',
    'user',
    'server',
    'created_by',
    'updated_by',
    'resolved',
  )
  date_hierarchy = 'created_at'


def _register(model, admin_class):
  admin.site.register(model, admin_class)


_register(models.Country, CountryAdmin)
_register(models.User, UserAdmin)
_register(models.Token, TokenAdmin)
_register(models.ServerPermission, ServerPermissionAdmin)
_register(models.Role, RoleAdmin)
_register(models.Server, ServerAdmin)
# _register(models.Ban, BanAdmin)
# _register(models.Mutegag, MutegagAdmin)
_register(models.Mainframe, MainframeAdmin)
