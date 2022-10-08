import requests from './request'

// 课程信息请求
export const reqCourseList = () => requests({ url: "/goods/courseData", method: 'get' })
