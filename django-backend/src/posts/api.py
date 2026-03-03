from ninja import Router
from .models import Post
from .schemas import PostInputSchema, PostOutputSchema, ErrorOutputSchema
from django.shortcuts import get_object_or_404
from ninja_jwt.authentication import JWTAuth

# Endpoints here would route to the main api instance defined in src/config/api.py
# so instead of using @api.get/post/put/delete use @router.get/post/put/delete instead

# You can test endpoints at http://127.0.0.1:8000/api/docs  (Make sure server is running)

router = Router()
    
# ENDPOINTS
# Protected Endpoints require JWT authentication (Login)

# To test and use Protected Endpoints: 
# 1. You must successfully execute the login POST endpoint (Register a user first if you haven't already)
# 2. After logging in, you'll be given a response body with an access token
# 3. On the top right of the http://127.0.0.1:8000/api/docs/api/docs page, click on Authorize
# 4. Copy and paste the access token (without the double quotes) and click Authorize
# 5. Now you are now authorized to use Protected Endpoints.


# Get all posts 
@router.get("/", response={200: list[PostOutputSchema]})
def get_posts(request):
    posts = Post.objects.order_by("-created_at")
    return 200, [PostOutputSchema.from_orm(post) for post in posts]

# Get all posts created by the user (PROTECTED)
@router.get("/my-posts", auth=JWTAuth(), response={200: list[PostOutputSchema]})
def get_my_posts(request):
    posts = Post.objects.filter(author=request.user).order_by("-created_at")
    return 200, [PostOutputSchema.from_orm(post) for post in posts]

# Get a single post by its id
@router.get("/{post_id}", response={200: PostOutputSchema}) 
def get_post(request, post_id: int):
    post = get_object_or_404(Post, id=post_id)
    return 200, PostOutputSchema.from_orm(post)

# Create a post (PROTECTED)
@router.post("/", auth=JWTAuth(), response={201: PostOutputSchema}) 
def create_post(request, data: PostInputSchema):
    post = Post.objects.create(
        title=data.title,
        content=data.content,
        author=request.user
    )
    return 201, PostOutputSchema.from_orm(post)

# Update a single post by its id (PROTECTED)
@router.put("/{post_id}", auth=JWTAuth(), response={200: PostOutputSchema, 403: ErrorOutputSchema})
def update_post(request, post_id: int, data: PostInputSchema):
    post = get_object_or_404(Post, id=post_id)

    if post.author != request.user:
         return 403, {"error": "You do not have permission to modify this post"}

    post.title = data.title
    post.content = data.content

    post.save()
    return 200, PostOutputSchema.from_orm(post)

# Delete a single post by its id (PROTECTED)
@router.delete("/{post_id}", auth=JWTAuth(), response={204: None, 403: ErrorOutputSchema}) 
def delete_post(request, post_id: int):
    post = get_object_or_404(Post, id=post_id)

    if post.author != request.user:
        return 403, {"error": "You do not have permission to delete this post."}
    
    post.delete()
    return 204, None