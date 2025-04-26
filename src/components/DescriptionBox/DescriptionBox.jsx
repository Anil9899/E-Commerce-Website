import React from 'react';
import './DescriptionBox.css';

const DescriptionBox = () =>{
    return(
        <div className="descriptionbox">
          <div className='descriptionbox-navigator'>
            <div className="descriptionbox-nav-box">Description</div>
            <div className="descriptionbox-nav-box fade">Reviews(122)</div>
          </div>
           <div className="descriptionbox-description">
            <p>An e-commerce website is an online platform that facilities the buying and selling of products or servies over the internet
                It services as a vitual marketplace where bussines and individual can showcase thier products,interact with
                customers, and conduct transtions without the need of physical presence. E-commerce website gained immense 
                popularity due to their convience, accessibility, and the global reach they offer.
            </p>
            <p>E-commerce websites typically display products or servies along eith detailed description, images, prices and any 
                available variations(e.g., sizes,colors). Each product usually has its own dedicated page with revelent information.
            </p>
           </div>
        </div>
    )
};

export default DescriptionBox;