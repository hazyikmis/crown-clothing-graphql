import React from "react";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";

import CollectionPage from "./collection.component";
import Spinner from "../../components/spinner/spinner.component";

const GET_COLLECTION_BY_TITLE = gql`
  query getCollectionsByTitle($title: String!) {
    getCollectionsByTitle(title: $title) {
      id
      title
      items {
        id
        name
        price
        imageUrl
      }
    }
  }
`;

const CollectionPageContainer = ({ match }) => (
  <Query
    query={GET_COLLECTION_BY_TITLE}
    variables={{ title: match.params.collectionId }}
  >
    {({ loading, data }) => { //({ loading, data: {getCollectionsByTitle} }) //not GOOD, because when loading there is no data
      // console.log({loading});
      // console.log({error});
      // console.log({data});
      if (loading) return <Spinner />;
      //return <CollectionPage collection={data.getCollectionsByTitle} />;
      const { getCollectionsByTitle } = data;
      return <CollectionPage collection={getCollectionsByTitle} />;
    }}
  </Query>
);

export default CollectionPageContainer;

/*
 <Query
    query={GET_COLLECTION_BY_TITLE}
    variables={‌{ title: match.params.collectionId }}
  >
    {({ loading, data }) => {
      if (loading) return <Spinner />;
      const { getCollectionsByTitle } = data; <===== // Like so
      return <CollectionPage collection={getCollectionsByTitle} />;
    }}
  </Query>
*/
