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
    collectionRef.onSnapshot((snapshop) => {
      const collectionMap = convertCollectionsSnapshopToMaps(snapshop);
      updateCollections(collectionMap);
      this.setState({ isLoading: false });
    });
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
