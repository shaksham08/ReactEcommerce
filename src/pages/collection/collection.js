import React from "react";
import { connect } from "react-redux";

import CollectionItem from "../../Components/CollectionItem/CollectionItem";

import { selectCollection } from "../../redux/shop/shop.selectors";

import withSpinner from "../../Components/withSpinner/withSpinner";

import "./collection.styles.scss";

const CollectionPage = ({ collection }) => {
  const { title, items } = collection;
  return (
    <div className="collection-page">
      <h2 className="title">{title}</h2>
      <div className="items">
        {items.map((item) => (
          <CollectionItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => ({
  collection: selectCollection(ownProps.match.params.collectionId)(state),
});

export default withSpinner(connect(mapStateToProps)(CollectionPage));
