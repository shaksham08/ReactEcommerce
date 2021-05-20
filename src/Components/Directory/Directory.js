import React from "react";
import MenuItem from "../MenuItem/MenuItem";
import { selectDirectorySections } from "../../redux/directory/directory.selectors";
import { createStructuredSelector } from "reselect";

import { connect } from "react-redux";

import "./Directory.styles.scss";

function Directory({ sections }) {
  return (
    <div className="directory-menu">
      {sections.map(({ title, imageUrl, size, id }) => (
        <MenuItem key={id} title={title} size={size} imageUrl={imageUrl} />
      ))}
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  sections: selectDirectorySections,
});

export default connect(mapStateToProps)(Directory);
