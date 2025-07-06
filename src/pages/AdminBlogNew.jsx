import React from 'react'
import { Helmet } from 'react-helmet-async'
import PostEditor from '../components/BlogEditor/PostEditor'

const AdminBlogNew = () => {
  return (
    <>
      <Helmet>
        <title>New Post - The Daily Note Admin</title>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <PostEditor />
      </div>
    </>
  )
}

export default AdminBlogNew