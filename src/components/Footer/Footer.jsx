import React from 'react'
import style from './Footer.module.scss'

export default function Footer() {
  return (
    <div className=' p-5 my-5 bg-main-light  '>
      <h3>Get The FreshCart App</h3>
      <p>we will send you a link open it on your phone to download the app </p>

      <form action="" method="get" className='d-md-flex my-4'>
        <input type="email" className='form-control w-75 my-3 my-md-0 mx-md-5' placeholder='Email'/>
        <button className='bg-main  w-25  text-white btn' type="submit">Share App Link</button>
      </form>

      <div className="d-md-flex justify-content-between py-4 my-3 border-secondary-subtle border-top border-bottom">
        <div className='d-flex mb-4 mb-md-0 '>
          <h6>payment partners</h6>
          <div className='mx-3'>
            <img className='mx-1' width={50} src={require('../../Assets/imgs/footer/amazon.png')} alt="" />
            <img className='mx-1' width={50} src={require('../../Assets/imgs/footer/AmericanExpress.png')} alt="" />
            <img className='mx-1' width={50} src={require('../../Assets/imgs/footer/masterCard.png')} alt="" />
            <img className='mx-1' width={50} src={require('../../Assets/imgs/footer/paypal.png')} alt="" />
          </div>
        </div>
        <div className='d-flex '>
          <h6>get deliveries with FreshCart</h6>
          <div className='mx-3'>
            <img className='mx-1' width={100} src={require('../../Assets/imgs/footer/appleStore.png')} alt="" />
            <img className='mx-1' width={100} src={require('../../Assets/imgs/footer/googlePlay.png')} alt="" />
          </div>

        </div>
      </div>
    </div>
  )
}
