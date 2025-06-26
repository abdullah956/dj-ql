import graphene
import graphql_jwt
from .queries import Query
from .mutations.auth import AuthMutations
from .mutations.post import PostMutations

class Mutation(AuthMutations, PostMutations, graphene.ObjectType):
    token_auth = graphql_jwt.ObtainJSONWebToken.Field()

schema = graphene.Schema(query=Query, mutation=Mutation)
