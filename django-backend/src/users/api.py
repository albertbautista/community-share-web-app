from ninja import Router
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from ninja_jwt.tokens import RefreshToken
from .schemas import RegisterInputSchema, LoginInputSchema, RegisterOutputSchema, TokenOutputSchema, ErrorOutputSchema

# Endpoints here would route to the main api instance defined in src/config/api.py
# so instead of using @api.get/post/put/delete use @router.get/post/put/delete instead

# You can test endpoints at http://127.0.0.1:8000/api/docs  (Make sure server is running)

router = Router()

# Using the built in User model to make new users (from django.contrib.auth.models import User).

@router.post("/signup", response = {201: RegisterOutputSchema, 400: ErrorOutputSchema})
def register(request, data: RegisterInputSchema):
    if User.objects.filter(username = data.username).exists():
        return 400, {"error": "Username already taken"} 
    
    # Creates a new user
    user = User.objects.create_user (
        email = data.email,
        username = data.username,
        password = data.password
    )
    return 201, user

@router.post("/signin", response = {200: TokenOutputSchema, 401: ErrorOutputSchema})
def login(request, data: LoginInputSchema):

    user = authenticate(username = data.username, password = data.password)
    if not user:
        return 401, {"error": "Invalid credentials"} 
    
    # Generates token
    refresh = RefreshToken.for_user(user)

    return 200, { 
        'access': str(refresh.access_token),
    }
