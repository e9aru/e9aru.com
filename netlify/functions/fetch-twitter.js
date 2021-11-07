const fetch = require("node-fetch")

const URL = "https://api.twitter.com/2/users/2942001527"
const PROFILE_URL = `${URL}?user.fields=description,username,url,profile_image_url`
const TIMELINE_URL = `${URL}/tweets`

exports.handler = async (event, context) => {
  try {
    const headers = { Authorization: `Bearer ${process.env.TWITTER_TOKEN}` }
    // const profileRes = await fetch(PROFILE_URL, { headers })
    // const profile = await profileRes.json()
    const timelineRes = await fetch(TIMELINE_URL, { headers })
    const timeline = await timelineRes.json()

    return { statusCode: 200, body: JSON.stringify({ timeline }) }
  } catch (error) {
    console.error(error)
    return { statusCode: 500, body: "Failed fetch data" }
  }
}
