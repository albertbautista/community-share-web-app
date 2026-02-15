from ninja import NinjaAPI
from users.api import router as users_router
from posts.api import router as posts_router

# main API instance using Django Ninja API (Defined here for reusability) https://django-ninja.dev/
api = NinjaAPI()

# app routers (Route any apps to the api instance defined above)
# E.g. this means all routes in posts_router will be available under "/posts/""

api.add_router("/posts/", posts_router)
api.add_router("/users/", users_router)
