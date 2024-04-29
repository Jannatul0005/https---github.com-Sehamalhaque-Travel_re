import React from 'react'
import ServiceCard from './ServiceCard'
import { Col } from 'reactstrap'
import weatherImg from '../assets/images/weather.png'
import guideImg from '../assets/images/guide.png'
import customizationImg from '../assets/images/customization.png'

const servicesData = [
   {
      imgUrl: weatherImg,
      title: `Calculate Weather`,
      desc: `Know before you step our.`,
      LinkUrl :"https://www.weather.gov/shv/calculator"
   },
   {
      imgUrl: guideImg,
      title: `Our Sponsered Tour Guide`,
      desc: `The best experience provided by locals `,
      LinkUrl :"https://www.showaround.com/"

   },
   {
      imgUrl: customizationImg,
      title: 'Hotel',
      desc: `Our partnered hotel .`,
      LinkUrl :"https://www.booking.com/country/bd.html"

   },
]

const ServiceList = () => {
   return <>
      {
         servicesData.map((item, index) => (
            <Col lg='3' md='6' sm='12' className='mb-4' key={index}>
               <ServiceCard item={item} />
            </Col>))
      }
   </>

}

export default ServiceList