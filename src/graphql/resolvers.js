import { gql } from "apollo-boost";

import {addItemToCart, getCartItemCount} from "./cart.utils";

//"extend type Mutation" provides us to define ad-hoc mutations
//means not pre-defined in the graphql schema
export const typeDefs = gql`
extend type Item {
  quantity: Int
} 

extend type Mutation {
    ToggleCartHidden: Boolean!
    AddItemToCart(item: Item!): [Item]
  }
`;

//cartHidden stored in the client-side not on the back-end
const GET_CART_HIDDEN = gql`
  {
    cartHidden @client
  }
`;

const GET_CART_ITEMS = gql`
  {
    cartItems @client
  }
`;

const GET_ITEM_COUNT = gql`
  {
    itemCount @client
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

    addItemToCart: (_root, {item}, {cache}) => {
      const {cartItems} = cache.readQuery({
        query: GET_CART_ITEMS
      });

      const newCartItems = addItemToCart(cartItems, item);

      cache.writeQuery({
        query: GET_ITEM_COUNT,
        data: {itemCount: getCartItemCount(newCartItems)}
      })
      
      cache.writeQuery({
        query: GET_CART_ITEMS,
        data: {cartItems: newCartItems}
      });

    }
  },
};
