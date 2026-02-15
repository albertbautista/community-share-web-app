from django.contrib import admin
from .models import Post

admin.site.register(Post) # Registers the Post model in the admin site

# admin login at http://127.0.0.1:8000/admin
# Note: You must create a superuser first to login into the admin site
# To create a superuser, you must run the following command in the src directory:

#             python manage.py createsuperuser

# You can use the admin site to manage models