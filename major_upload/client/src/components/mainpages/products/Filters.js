import React, {useContext} from 'react'
import {GlobalState} from '../../../GlobalState'
import {DatePicker} from 'antd'
import 'antd/dist/antd.css'
import moment from 'moment';





function Filters() {
    const state = useContext(GlobalState)
    const [categories] = state.categoriesAPI.categories

    const [category, setCategory] = state.productsAPI.category
    const [sort, setSort] = state.productsAPI.sort
    // const [search, setSearch] = state.productsAPI.search
    // const [startDate,setStartDate] =state.productsAPI.sort
    // const [endDate,setEndDate] =state.productsAPI.sort
    // const { RangePicker } = DatePicker;
    // const dateFormat = 'YYYY-MM-DD';


    const handleCategory = e => {
        setCategory(e.target.value)
        // setSearch('')
    }

    return (
        <div className="filter_menu">
            <div className="row">
                <span>Hotel Categories </span>
                <select name="category" value={category} onChange={handleCategory} >
                    <option value=''>Hotels</option>
                    {
                        categories.map(category => (
                            <option value={"category=" + category._id} key={category._id}>
                                {category.name}
                            </option>
                        ))
                    }
                </select>
                <span>Sort By: </span>
                <select value={sort} onChange={e => setSort(e.target.value)} >
                <option value=''>Newest</option>
                    <option value='sort=oldest'>Oldest</option>
                    <option value='sort=-sold'>Best sales</option>
                    <option value='sort=-price'>Price: Hight-Low</option>
                    <option value='sort=price'>Price: Low-Hight</option>
                </select>
            </div>
{/* 
             <input type="text" value={search} placeholder="Enter your City!"
            onChange={e => setSearch(e.target.value.toLowerCase())} /> */}


            
{/*            
            <RangePicker
            defaultValue={[moment('2021-06-25', dateFormat), moment('2021-08-25', dateFormat)]}
            // disabled={[false, true]}
            /> */}
          
{/* 
            <div className="row sort">
               
            </div>  */}
           
        </div>
    )
}

export default Filters