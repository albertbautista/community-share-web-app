from ninja import Router
from .models import Post
from .schemas import PostInputSchema, PostOutputSchema
from django.shortcuts import get_object_or_404

# Endpoints here would route to the main api instance defined in src/config/api.py
# so instead of using @api.get/post/put/delete use @router.get/post/put/delete instead

# You can test endpoints at http://127.0.0.1:8000/api/docs  (Make sure server is running)

router = Router()

# Response status codes help us see if the endpoint requests were successful or not.


# ENDPOINTS

# Create a post
@router.post("/", response={201:PostOutputSchema}) # response status 201 Created
def create_post(request, data: PostInputSchema):
    post = Post(
        title=data.title,
        content=data.content,
    )
    post.save()
    return 201, post

# List all posts
@router.get("/", response=list[PostOutputSchema]) # response status is 200 OK by default
def list_posts(request):
    return Post.objects.all()

# Get a single post by its id 
@router.get("/{post_id}", response=PostOutputSchema) # response status is 200 OK by default
def get_post(request, post_id: int):
    post = get_object_or_404(Post, id=post_id)
    return post

@router.put("/{post_id}", response=PostOutputSchema) # response status is 200 OK by default
def update_post(request, post_id: int, data: PostInputSchema):
    post = get_object_or_404(Post, id=post_id)

    post.title = data.title
    post.content = data.content

    post.save()
    return post

# Delete a post by its id
@router.delete("/{post_id}", response={204: None}) # response status is 204 No Content
def delete_post(request, post_id: int):
    post = get_object_or_404(Post, id=post_id)
    post.delete()
    return 204, None  