export const fetchBlogListURL = {
  url: '/blog/list',
  method: 'POST'
}

export const getBlogURL = id => {
  return {
    url: `/blog/${id}`,
    method: 'GET'
  }
}

export const getNextBlogURL = id => {
  return {
    url: `/blog/${id}?next=true`,
    method: 'GET'
  }
}
