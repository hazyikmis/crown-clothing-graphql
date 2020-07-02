/* This repo copied from https://github.com/ZhangMYihua/graphql-lesson*/

RESOLVERs === (Queries & Mutations)
LocalCache is nice feature for Apollo!

- GraphQL.js: https://www.npmjs.com/package/graphql
- react-apollo: https://www.npmjs.com/package/react-apollo
- apollo-boost: https://www.npmjs.com/package/apollo-boost
- Apollo: https://www.apollographql.com/docs/react/

- Intro to Apollo Server: https://www.apollographql.com/docs/apollo-server/
- Hasura: https://hasura.io/
- Tutuorial: How to build a GraphQL Server: https://www.apollographql.com/blog/tutorial-building-a-graphql-server-cddaa023c035

# If we want to use GraphQL inside a component:
- tear out the ties with redux :)
- create a "container" component which uses(imports) "Query" from "react-apollo" and "gql" from "apollo-boost" and includes(imports)/returns :
- - either a simple spinner
- - or the component (provide the same props=data it requires)
- then refer to this container component from where it called rather than referring the original component, example:
>>//import CollectionsOverview from '../../components/collections-overview/collections-overview.component';

>>import {default as CollectionsOverview} from '../../components/collections-overview/collections-overview.container';

For detailed examples please check:
- /src/components/collections-overview
- /src/pages/collection
and
- /src/pages/shop

# Handling async code, how? Redux or GraphQL/Apollo? Together?
- Answer for together: no!
- Both have pros & cons
- Apollo is new and does not have community experience, might be a problem.

https://www.apollographql.com/docs/react/data/mutations/

https://www.apollographql.com/docs/react/caching/cache-configuration/

https://www.apollographql.com/docs/react/data/local-state/#local-resolvers

