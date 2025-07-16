import React, { useEffect, useState } from 'react'
import useFetch from '../../../hooks/useFetch';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export const BreadCrumb = ({categoryId}) => {
  const [categories, setCategories] = useState([]);
  const token = localStorage.getItem("jwt");
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_REACT_BACKEND_BASE_URL;
  
  const findRootCat = async (categoryId, tmpCat) =>{
    if(categoryId){
      try {   
        const url = `/api/category/${categoryId}`
        const response = await axios.get(
          BASE_URL + url,
          {
              headers: {
                  Authorization: "Bearer " + token,
              },
          }
        )
        const data = await response.data;
        console.log(data[0])
        if(data[0]){
          tmpCat.unshift({
            categoryId: data[0].categoryId,
            name: data[0].name
          })
          if(data[0].categoryParentId){
            await findRootCat(data[0].categoryParentId, tmpCat)
          } else {
            setCategories(tmpCat)
          }
        }
      } catch (error) {
        console.log(error)
      }
    }
  }
  
  useEffect(() => {
    if(categoryId){
      let tmpCat = []
      findRootCat(categoryId, tmpCat)
    } else {
      setCategories([])
    }
  }, [categoryId])

  return (
    <div class="breadcrumbs d-flex flex-row align-items-center">
        <ul>
            <li><a onClick={() => navigate('/categories')} >Home</a></li>
            {/* <li class="active"><a href="index.html"><i class="fa fa-angle-right" aria-hidden="true"></i>Men's</a></li> */}
            {
              categories.map((category, index) => (
                <li><a  onClick={()=> navigate(`/categories/${category.categoryId}`)} index={index}><i class="fa fa-angle-right" aria-hidden="true"></i>{category.name}</a></li>
              ))
            }
        </ul>
    </div>
  )
}
