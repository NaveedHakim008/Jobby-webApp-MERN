module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      height: {
        'PageMiddle': '45rem',
        'chartheight': '36rem',
        'imgheight': "47rem"
      },
      width: {
        "chartwidth": '34rem'
      },
      colors: {
        "transparent-green": "#d9e7e2",
        "btn-color": "#71a1f0"
      },
      backgroundImage: {
        "img1": "url('/images/interview.jpg')",
        "img2": "url('/images/jobfind.jpg')"
      },
      fontFamily: {
        'cursive': ['Pacifico']
      }
    },
    plugins: [],
  }
}