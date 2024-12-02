import axios from 'axios'
import React, { useState } from 'react'
import { FormattedMessage } from 'react-intl'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './register_hotel.css'

const RegisterHotel = () => {
  const API_URL = process.env.REACT_APP_API
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false) // Add loading state

  const handleSubmit = async e => {
    e.preventDefault()
    let userID = localStorage.getItem('userId')
    if (userID === null || userID === '') {
      toast.error('Login to register host account')
    } else {
      try {
        setLoading(true) // Set loading to true before making the request
        const response = await axios.get(
          `${API_URL}/api/v1/user/registerHost/${userID}`
        )

        if (response && response.status === 200) {
          navigate('/manage_hotel')
        }
      } catch (error) {
        toast.error('Error')
      } finally {
        setLoading(false) // Set loading to false after the request is done
      }
    }
  }
  return (
    <div className='register_hotel flex-container'>
      <ToastContainer />
      <div className='register_hotel_title'>
        <h1>
          <FormattedMessage
            id='register_hotel_title'
            defaultMessage='register_hotel_title'
          />
        </h1>
        <h4>
          <FormattedMessage
            id='register_hotel_desc'
            defaultMessage='register_hotel_desc'
          />
        </h4>
      </div>
      <div className='register_hotel_form'>
        <div className='register_hotel_container'>
          <h2>
            <FormattedMessage
              id='register_hotel_title'
              defaultMessage='register_hotel_title'
            />
          </h2>
          <p>
            <FormattedMessage
              id='register_hotel_desc'
              defaultMessage='register_hotel_desc'
            />
          </p>
          <form className='login-input' onSubmit={handleSubmit}>
            <button type='submit' disabled={loading}>
              {loading ? (
                <FormattedMessage
                  id='registering'
                  defaultMessage='registering'
                />
              ) : (
                <FormattedMessage id='register' defaultMessage='register' />
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default RegisterHotel
