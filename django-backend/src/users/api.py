from ninja import Router
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from ninja_jwt.tokens import RefreshToken

# Endpoints here would route to the main api instance defined in src/config/api.py
# so instead of using @api.get/post/put/delete use @router.get/post/put/delete instead

router = Router()

# We can use the built in User model to make new users (from django.contrib.auth.models import User).

# the users api would handle register and login, would also handle authentication here using "authenticate"
# and generate tokens with "RefreshToken" after a successful login
