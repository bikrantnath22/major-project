import React, { useContext} from "react";

import { Link, useHistory } from "react-router-dom";
import { GlobalState } from "../../../../GlobalState";

function BtnRender({ product, deleteProduct }) {
  const state = useContext(GlobalState);
  const [isAdmin] = state.userAPI.isAdmin;
  // const addCart = state.userAPI.addCart;

  const history = useHistory();

  const viewRoomHandler = () => {
   
    const pathDetail = {
      pathname: `/detail/${product._id}`,
    };
    history.push(pathDetail);
  };

  return (
    <div className="row_btn">
      {isAdmin ? (
        <>
          <Link
            id="btn_buy"
            to="#!"
            onClick={() => deleteProduct(product._id, product.images.public_id)}
          >
            Delete
          </Link>
          <Link id="btn_buy2" to={`/edit_product/${product._id}`}>
            Edit
          </Link>
          <Link id="btn_buy" to={`/create_room/${product._id}`}>
            Add Room
          </Link>
          <Link id="btn_buy2" to={`/view_room/${product._id}`}>
            View Room
          </Link>
        </>
      ) : (
        <>
         
            <button id="btn_view" onClick={viewRoomHandler}>
              View Rooms
            </button>
          
          {/* <Link id="btn_buy" to="#!" onClick={() => addCart(product)}>
                        Booked Your Room
                    </Link>  */}
        </>
      )}
    </div>
  );
}

export default BtnRender;
