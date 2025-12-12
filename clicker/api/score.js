export default async function score(req, res) {
    const score = await req.text()
    const secondsPerWeek = 60 * 60 * 24 * 7
    res.setHeader("Set-Cookie", `score=${score}; Max-Age=${secondsPerWeek}`)
    res.end()
}