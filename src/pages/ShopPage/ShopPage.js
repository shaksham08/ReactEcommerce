import React from "react";
import { Route } from "react-router-dom";
import CollectionsOverview from "../../Components/collectionOverview/CollectionOverview";
import {
  firestore,
  convertCollectionsSnapshopToMaps,
} from "../../Firebase/firebase.utils";
import { connect } from "react-redux";
import { updateCollections } from "../../redux/shop/shop.actions";

import CollectionPage from "../collection/collection";

class ShopPage extends React.Component {
  state = {
    isLoading: true,
  };
  unsubscribeFromSnapshot = null;
  componentDidMount() {
    const { updateCollections } = this.props;
    const collectionRef = firestore.collection("collections");

    //* This is subscriber and observer pattern of getting the data using sbscription
    // this.unsubscribeFromSnapshot = collectionRef.onSnapshot((snapshop) => {
    //   const collectionMap = convertCollectionsSnapshopToMaps(snapshop);
    //   updateCollections(collectionMap);
    //   this.setState({ isLoading: false });
    // });

    //* This is promise based pattern which firebase gives
    collectionRef.get().then((snapshop) => {
      const collectionMap = convertCollectionsSnapshopToMaps(snapshop);
      updateCollections(collectionMap);
      this.setState({ isLoading: false });
    });

    //* Now using Firestore as API call to fetch data (https://firebase.google.com/docs/firestore/use-rest-api#:~:text=Bearer%20%7BYOUR_TOKEN%7D%20.-,Making%20REST%20calls,would%20use%20the%20following%20structure.&text=To%20interact%20with%20this%20path,with%20the%20base%20API%20URL.)
    // fetch(
    //   "https://firestore.googleapis.com/v1/projects/crown-backend-48ffb/databases/(default)/documents/collections"
    // )
    //   .then((response) => response.json())
    //   .then((collections) => console.log(collections));
  }

  componentWillUnmount() {
    //this.unsubscribeFromSnapshot();
  }
  render() {
    const { match } = this.props;
    return (
      <div className="shop-page">
        <Route
          exact
          path={`${match.path}`}
          render={(routerProps) => (
            <CollectionsOverview
              isLoading={this.state.isLoading}
              {...routerProps}
            />
          )}
        />
        <Route
          path={`${match.path}/:collectionId`}
          render={(routerProps) => (
            <CollectionPage isLoading={this.state.isLoading} {...routerProps} />
          )}
        />
      </div>
    );
  }
}

const mapPropsToDispatch = (dispatch) => ({
  updateCollections: (collectionMap) =>
    dispatch(updateCollections(collectionMap)),
});

export default connect(null, mapPropsToDispatch)(ShopPage);
