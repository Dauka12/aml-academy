import React from 'react'
import ContentLoader from "react-content-loader"

const CourseBlockSkeleton = () => {
  return (
    <ContentLoader
    className="course-card" 
    speed={2}
    width={470}
    height={500}
    viewBox="0 0 470 500"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="0" y="0" rx="0" ry="0" width="100%" height="100%" />
  </ContentLoader>
  )
}

export default CourseBlockSkeleton;