from ninja import Schema
from datetime import datetime

# Schemas for endpoint parameters would go here.

# PostInputSchema defines the expected format for posts, it validates the data (input) being sent by the user.

class PostInputSchema(Schema):
    title: str
    content: str

# PostOutputSchema defines what the user sees, it allows us to control what the output to the user is.
# E.g. we can hide or expose fields of our choosing for the user to see / not see

class PostOutputSchema(Schema):
    id: int
    title: str
    content: str
    created_at: datetime