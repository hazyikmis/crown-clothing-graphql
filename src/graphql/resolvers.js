import { gql } from "apollo-boost";

//"extend type Mutation" provides us to define ad-hoc mutations
//means not pre-defined in the graphql schema
export const typeDefs = gql`
  extend type Mutation {
    ToggleCartHidden: Boolean!
  }
`;

//cartHidden stored in the client-side not on the back-end
const GET_CART_HIDDEN = gql`
  {
    cartHidden @client
  }
`;

export const resolvers = {
  Mutation: {
    //toggleCartHidden: (root, _args, _context, _info) => //cache belongs to _context
    toggleCartHidden: (root, _args, { cache }) => {
      //cartHidden is the property object inside the "data" below
      //const data = cache.readQuery({
      const { cartHidden } = cache.readQuery({
        query: GET_CART_HIDDEN,
        //variables: {}
      });
      cache.writeQuery({
        query: GET_CART_HIDDEN,
        data: { cartHidden: !cartHidden}
      });

      return !cartHidden;
    },
  },
};
