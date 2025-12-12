export default async function score(req, res) {
    const score = await req.text()
    const secondsInWeek = 60 * 60 * 24 * 7
    res.setHeader("Set-Cookie", `score=${score}; Max-Age=${secondsInWeek}`)
    res.end()
}