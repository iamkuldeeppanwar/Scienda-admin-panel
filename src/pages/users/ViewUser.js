import React from 'react'
import { Col, Container, Image, Row } from 'react-bootstrap'
import { FaPhoneVolume, FaRegEnvelope } from 'react-icons/fa'
import { MotionDiv } from '../../components'

function ViewUser() {
  return (
    <MotionDiv >
        <h3 className='text-center my-3'>User Details</h3>
        <Row className='p-2' style={{backgroundColor:'rgba(238, 244, 255, 1)'}}>
            <Col className='text-end'>
                 <Image src='/images/profile.png' style={{aspectRatio:'1/1',height:'90px',borderRadius:'50%'}}/><br/>
              </Col>
              <Col>
                 <h3>John Doe</h3>
                <p className='m-0'><FaPhoneVolume/> +91987654321</p>
                 <p><FaRegEnvelope/> johndoe@gmail.com</p>
            </Col>
        </Row>
        <Row className='justify-content-center my-3'>
            <Col lg={4}>
            <p><span className='fw-bold'>Domain Selected:</span> Engineering</p>
            <p><span className='fw-bold'>Prof Name:</span> Sunny</p>
            <p><span className='fw-bold'>Prof Email:</span> sunny@gmail.com</p>
            <p><span className='fw-bold'>Area Of Speciality:</span> Mechanical Engineering</p>
            </Col>
            <Col lg={4}>
            <p><span className='fw-bold'>Plan Selected:</span> $299</p>
            <p><span className='fw-bold'>Plan Start Date:</span> 23 jan 2024</p>
            <p><span className='fw-bold'>Plan Validity:</span> 90days</p>
            </Col>
        </Row>
    </MotionDiv>
  )
}

export default ViewUser