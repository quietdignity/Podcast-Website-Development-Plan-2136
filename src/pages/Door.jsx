import React from 'react'
import { Helmet } from 'react-helmet-async'
import { Door } from '../components/Auth'

const DoorPage = () => {
  return (
    <>
      <Helmet>
        <title>Sign In - The Daily Note</title>
        <meta name="description" content="Sign in to your Daily Note account" />
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>
      <Door />
    </>
  )
}

export default DoorPage