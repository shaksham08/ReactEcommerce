import React from "react";
import { Route } from "react-router-dom";
import CollectionsOverview from "../../Components/collectionOverview/CollectionOverview";
import { createStructuredSelector } from "reselect";
import { fetchCollectionsStartAsync } from "../../redux/shop/shop.actions";
import {
  selectIsCollectionFetching,
  isCollectionsLoaded,
} from "../../redux/shop/shop.selectors";
import { connect } from "react-redux";

import CollectionPage from "../collection/collection";

class ShopPage extends React.Component {
  componentDidMount() {
    const { fetchCollectionsStartAsync } = this.props();
    fetchCollectionsStartAsync();
  }

  render() {
    const { match, isCollectionFetching, isCollectionsLoaded } = this.props;
    return (
      <div className="shop-page">
        <Route
          exact
          path={`${match.path}`}
          render={(routerProps) => (
            <CollectionsOverview
              isLoading={isCollectionFetching}
              {...routerProps}
            />
          )}
        />
        <Route
          path={`${match.path}/:collectionId`}
          render={(routerProps) => (
            <CollectionPage isLoading={!isCollectionsLoaded} {...routerProps} />
          )}
        />
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  isCollectionFetching: selectIsCollectionFetching,
  isCollectionsLoaded: isCollectionsLoaded,
});

const mapPropsToDispatch = (dispatch) => ({
  fetchCollectionsStartAsync: dispatch(fetchCollectionsStartAsync()),
});

export default connect(mapStateToProps, mapPropsToDispatch)(ShopPage);
