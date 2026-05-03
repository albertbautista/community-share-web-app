from ninja import Schema
from datetime import datetime
from typing import Optional

# Schemas for endpoint parameters would go here.

# InputSchemas define the expected format for posts, it validates the data (input) being sent by the user.

# OutputSchemas define what the user sees, it allows us to control what the output to the user is.
# E.g. we can hide or expose fields of our choosing for the user to see / not see

class PostInputSchema(Schema):
    title: str
    content: str
    job_type: Optional[str] = "other"
    location: Optional[str] = ""
    pay_rate: Optional[float] = None

class AuthorSchema(Schema):
    username: str

# New schema for accepted_by
class AcceptedBySchema(Schema):
    username: str

class PostOutputSchema(Schema):
    id: int
    title: str
    content: str
    job_type: str
    location: str
    pay_rate: Optional[float] = None
    image: Optional[str] = None
    status: str
    author: AuthorSchema
    accepted_by: Optional[AcceptedBySchema] = None
    accepted_at: Optional[datetime] = None
    created_at: datetime

    @staticmethod
    def resolve_image(obj):
        return obj.image.url if getattr(obj, "image", None) else None

class ErrorOutputSchema(Schema):
    error: str

class JobTypeCountSchema(Schema):
    job_type: str
    count: int