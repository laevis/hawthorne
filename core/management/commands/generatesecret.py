import random
import string

from django.core.management.base import BaseCommand


class Command(BaseCommand):
  help = 'Creates a new secret key'

  def handle(self, *args, **options):
    output = ''
    for _ in range(64):
      output += random.choice(string.ascii_letters + string.digits)

    self.stdout.write(self.style.WARNING(
        'This key just got randomly generated, set the current secret key with this one below: [This is only needed once]'))
    self.stdout.write(output)
