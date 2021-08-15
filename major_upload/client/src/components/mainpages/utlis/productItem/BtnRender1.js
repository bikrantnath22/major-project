import React, {useContext,useEffect,useState} from 'react'
import {Link,useHistory} from 'react-router-dom'
import {GlobalState} from '../../../../GlobalState'

function BtnRender1({room,deleteRoom,date}) {
    const state = useContext(GlobalState)
    const [isAdmin] = state.userAPI.isAdmin
    const addCart = state.userAPI.addCart
    
  const history = useHistory();
  const [dates, setDates] = useState("");
  useEffect(() => {
    setDates(date);
  }, []);
  const viewRoomHandler = () => {
    console.log(dates) ;
    const pathDetail = {
      pathname: `/cart`,
      state:dates
    };
    history.push(pathDetail);
  };
    
    return (
        <div className="row_btn1">
            {
                      isAdmin ? 
                      <>
                          <Link id="btn_buy3" to="#!" 
                          onClick={() =>deleteRoom(room._id, room.images.public_id)}>
                              Delete
                          </Link>
                    {/* <Link id="btn_buy" to={`/edit_product/${product._id}`}>
                        Edit
                    </Link> */}
                </> :
                <>
                    
                    {/* <Link id="btn_view" to={`/detail/${product._id}`}>
                        View Rooms
                    </Link>  */}
                      
                        <button id="btn_buy1"  onClick={() => {viewRoomHandler(); addCart(room)}}>
                            Booked Your Room
                        </button> 
                   
                    {/* <Link id="btn_view" to={`/detail/${product._id}`}>
                        View Rooms
                    </Link>  */}
                </>
            }
                
        </div>
    )
}

export default BtnRender1