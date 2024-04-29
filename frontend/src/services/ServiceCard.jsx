import React from 'react'
import './service-card.css'

const ServiceCard = ({ item }) => {
   const { imgUrl, title, desc,LinkUrl } = item

   return (
      <a href={LinkUrl}>
         

    
      <div className='service__item'>
         <div className="service__img">
            <img src={imgUrl} alt="" />
         </div>
         <h6>{title}</h6>
         <p>{desc}</p>
      </div>

      </a>
   )
}

export default ServiceCard