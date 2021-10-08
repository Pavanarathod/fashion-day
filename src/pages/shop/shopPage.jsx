import React from "react";
import Collection from "../../components/preview/previewCollection";
import SHOP_DATA from "../../utils/shopData";

class ShopPage extends React.Component {
  state = {
    collection: SHOP_DATA,
  };

  render() {
    const { collection } = this.state;
    return (
      <div className="shop-page">
        {collection.map(({ id, ...otherCollectionProps }) => (
          <Collection key={id} {...otherCollectionProps} />
        ))}
      </div>
    );
  }
}

export default ShopPage;
