from ninja import Schema

# Schemas for endpoint parameters would go here.

# InputSchemas define the expected format for posts, it validates the data (input) being sent by the user.

# OutputSchemas define what the user sees, it allows us to control what the output to the user is.
# E.g. we can hide or expose fields of our choosing for the user to see / not see

class RegisterInputSchema(Schema):
    email: str
    username: str
    password: str

class LoginInputSchema(Schema):
    username: str
    password: str

class RegisterOutputSchema(Schema):
    id: int
    username: str

class ErrorOutputSchema(Schema):
    error: str

class TokenOutputSchema(Schema):
    access: str