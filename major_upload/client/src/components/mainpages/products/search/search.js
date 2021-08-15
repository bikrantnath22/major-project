import React, { useState } from "react";
import { DatePicker } from "antd";
import {  SearchOutlined } from "@ant-design/icons";
import './search.css' ;


import moment from "moment";
import { useHistory } from "react-router-dom";

// destructure values from ant components
const { RangePicker } = DatePicker;
// const { Option } = Select;



const Search = () => {
  // state
  const [search, setSearch] = useState("");
  const [date, setDate] = useState("");
//   const [bed, setBed] = useState("");
  // route
  const history = useHistory();

  const handleSubmit = () => {
    history.push(`/search-result?search=${search}&date=${date}`);
  };

  return (
    
      <div className="search-box" style={{ marginBottom:"10px", }}>
       <input
          placeholder="Location"
          value={search}
         
          onChange={e => setSearch(e.target.value.toLowerCase())}
         
        />
      
      
      <RangePicker className="date"
        onChange={(value, dateString) => setDate(dateString)}
        disabledDate={(current) =>
          current && current.valueOf() < moment().subtract(1, "days")
        }
        // className="w-100"
        style={{ height: "50px" , width:"30rem" ,marginLeft:"10px",marginRight:"10px"  }}
        // style={{ marginLeft: "10px" ,marginRight:"10px" }}
      />
      
      

        <SearchOutlined
        onClick={handleSubmit}
        className="btn btn-primary "
        style={{ marginLeft: "20px" ,width:"100px" ,height: "50px"}}
      />
      
      </div>

      // {/* <Select
      //   onChange={(value) => setBed(value)}
      //   className="w-100"
      //   size="large"
      //   placeholder="Number of beds"
       
      // >
      //   <Option key={1}>{1}</Option>
      //   <Option key={2}>{2}</Option>
      //   <Option key={3}>{3}</Option>
      //   <Option key={4}>{4}</Option>
      // </Select> */}

      
  );
};

export default Search;