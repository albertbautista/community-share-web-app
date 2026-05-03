from ninja import Router, Query
from .models import Post, SavedPost
from .schemas import PostInputSchema, PostOutputSchema, ErrorOutputSchema, JobTypeCountSchema
from django.shortcuts import get_object_or_404
from django.db.models import Count
from ninja_jwt.authentication import JWTAuth

# Endpoints here would route to the main api instance defined in src/config/api.py
# so instead of using @api.get/post/put/delete use @router.get/post/put/delete instead

# You can test endpoints at http://127.0.0.1:8000/api/docs  (Make sure server is running)

router = Router()

def serialize_post(post: Post) -> dict:
    payload = PostOutputSchema.from_orm(post).model_dump()
    payload["image"] = post.image.url if post.image else None
    return payload


def serialize_posts(posts) -> list[dict]:
    return [serialize_post(post) for post in posts]
    
# ENDPOINTS
# Protected Endpoints require JWT authentication (Login)

# To test and use Protected Endpoints: 
# 1. You must successfully execute the login POST endpoint (Register a user first if you haven't already)
# 2. After logging in, you'll be given a response body with an access token
# 3. On the top right of the http://127.0.0.1:8000/api/docs/api/docs page, click on Authorize
# 4. Copy and paste the access token (without the double quotes) and click Authorize
# 5. Now you are now authorized to use Protected Endpoints.

# Get the most recent posts for landing page
@router.get("/recent", response={200: list[PostOutputSchema]})
def recent_posts(request, limit: int = Query(6, ge=1, le=50)):
    posts = Post.objects.select_related("author", "accepted_by").order_by("-created_at")[:limit]
    return 200, serialize_posts(posts)

# Get job types ordered by how many posts exist in each
@router.get("/job-types/popular", response={200: list[JobTypeCountSchema]})
def popular_job_types(request, limit: int = Query(6, ge=1, le=20)):
    rows = (
        Post.objects.exclude(job_type__isnull=True)
        .exclude(job_type__exact="")
        .values("job_type")
        .annotate(count=Count("id"))
        .order_by("-count")[:limit]
    )
    return 200, list(rows)

# Get all posts 
@router.get("/", response={200: list[PostOutputSchema]})
def get_posts(request):
    posts = Post.objects.select_related("author", "accepted_by").order_by("-created_at")
    return 200, serialize_posts(posts)

# Get all posts created by the user (PROTECTED)
@router.get("/my-posts", auth=JWTAuth(), response={200: list[PostOutputSchema]})
def get_my_posts(request):
    posts = Post.objects.select_related("author", "accepted_by").filter(author=request.user).order_by("-created_at")
    return 200, serialize_posts(posts)

# List saved posts (PROTECTED)
@router.get("/saved", auth=JWTAuth(), response={200: list[PostOutputSchema]})
def list_saved_posts(request):
    saved = (
        SavedPost.objects
        .filter(user=request.user)
        .select_related("post", "post__author", "post__accepted_by")
        .order_by("-created_at")
    )
    posts = [s.post for s in saved]
    return 200, serialize_posts(posts)

# Save a post (PROTECTED)
@router.post("/{post_id}/save", auth=JWTAuth(), response={201: dict})
def save_post(request, post_id: int):
    post = get_object_or_404(Post, id=post_id)
    saved, created = SavedPost.objects.get_or_create(user=request.user, post=post)
    return 201, {"saved": True, "created": created}


# Unsave a post (PROTECTED)
@router.delete("/{post_id}/save", auth=JWTAuth(), response={204: None, 404: ErrorOutputSchema})
def unsave_post(request, post_id: int):
    post = get_object_or_404(Post, id=post_id)
    deleted, _ = SavedPost.objects.filter(user=request.user, post=post).delete()
    if deleted == 0:
        return 404, {"error": "Post was not saved."}
    return 204, None

# Accept a post/job (PROTECTED)
@router.post("/{post_id}/accept", auth=JWTAuth(), response={200: PostOutputSchema, 400: ErrorOutputSchema, 403: ErrorOutputSchema})
def accept_post(request, post_id: int):
    post = get_object_or_404(Post, id=post_id)

    if post.author == request.user:
        return 403, {"error": "You cannot accept your own job."}

    if post.status != "open":
        return 400, {"error": "This job is no longer open."}

    post.accept(request.user)
    post.refresh_from_db()
    return 200, serialize_post(post)

# Unaccept / reopen a post/job (PROTECTED)
@router.post("/{post_id}/unaccept", auth=JWTAuth(), response={200: PostOutputSchema, 400: ErrorOutputSchema, 403: ErrorOutputSchema})
def unaccept_post(request, post_id: int):
    post = get_object_or_404(Post, id=post_id)

    if post.status != "accepted":
        return 400, {"error": "This job is not currently accepted."}

    if post.accepted_by != request.user and post.author != request.user:
        return 403, {"error": "You are not allowed to unaccept this job."}

    post.unaccept()
    post.refresh_from_db()
    return 200, serialize_post(post)

# Get a single post by its id
@router.get("/{post_id}", response={200: PostOutputSchema}) 
def get_post(request, post_id: int):
    post = get_object_or_404(Post.objects.select_related("author", "accepted_by"), id=post_id)
    return 200, serialize_post(post)

# Create a post (PROTECTED)
@router.post("/", auth=JWTAuth(), response={201: PostOutputSchema})
def create_post(request):
    title = request.POST.get("title", "")
    content = request.POST.get("content", "")
    job_type = request.POST.get("job_type", "other")
    location = request.POST.get("location", "")
    pay_rate_raw = request.POST.get("pay_rate")
    pay_rate = float(pay_rate_raw) if pay_rate_raw not in (None, "") else None
    image = request.FILES.get("image")

    post = Post.objects.create(
        title=title,
        content=content,
        job_type=job_type or "other",
        location=location or "",
        pay_rate=pay_rate,
        image=image,
        author=request.user,
    )

    print("POST:", request.POST)
    print("FILES:", request.FILES)

    return 201, serialize_post(post)

# Update a single post by its id (PROTECTED)
@router.put("/{post_id}", auth=JWTAuth(), response={200: PostOutputSchema, 400: ErrorOutputSchema, 403: ErrorOutputSchema})
def update_post(request, post_id: int):
    post = get_object_or_404(Post, id=post_id)

    if post.author != request.user:
         return 403, {"error": "You do not have permission to modify this post"}

    if post.status == "accepted":
         return 400, {"error": "Accepted jobs cannot be edited."}

    post.title = request.POST.get("title", post.title)
    post.content = request.POST.get("content", post.content)
    post.job_type = request.POST.get("job_type", post.job_type) or "other"
    post.location = request.POST.get("location", post.location) or ""

    pay_rate_raw = request.POST.get("pay_rate")
    post.pay_rate = float(pay_rate_raw) if pay_rate_raw not in (None, "") else None

    image = request.FILES.get("image")
    if image:
        post.image = image

    post.save()
    post.refresh_from_db()
    return 200, serialize_post(post)

# Delete a single post by its id (PROTECTED)
@router.delete("/{post_id}", auth=JWTAuth(), response={204: None, 400: ErrorOutputSchema, 403: ErrorOutputSchema}) 
def delete_post(request, post_id: int):
    post = get_object_or_404(Post, id=post_id)

    if post.author != request.user:
        return 403, {"error": "You do not have permission to delete this post."}

    if post.status == "accepted":
        return 400, {"error": "Accepted jobs cannot be deleted."}
    
    post.delete()
    return 204, None