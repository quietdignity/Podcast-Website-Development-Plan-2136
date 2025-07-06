import React from 'react'
import { Helmet } from 'react-helmet-async'
import Door from '../components/Auth/Door'

const DoorPage = () => {
  return (
    <>
      <Helmet>
        <title>Admin Login - The Daily Note</title>
        <meta name="description" content="Admin login for The Daily Note" />
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>
      <Door />
    </>
  )
}

export default DoorPage