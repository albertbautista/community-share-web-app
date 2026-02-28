from ninja import Schema, Field
from datetime import datetime

# Schemas for endpoint parameters would go here.

# InputSchemas define the expected format for posts, it validates the data (input) being sent by the user.

# OutputSchemas define what the user sees, it allows us to control what the output to the user is.
# E.g. we can hide or expose fields of our choosing for the user to see / not see

class PostInputSchema(Schema):
    title: str
    content: str

class AuthorSchema(Schema):
    username: str

class PostOutputSchema(Schema):
    id: int
    title: str
    content: str
    author: AuthorSchema
    created_at: datetime

class ErrorOutputSchema(Schema):
    error: str