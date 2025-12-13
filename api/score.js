export default async function score(req, res) {
    let score
    try {
        score = await req.text()
    }
    catch {
        score = "0"
    }
    const secondsPerWeek = 60 * 60 * 24 * 7
    res.setHeader("Set-Cookie", `score=${score}; Max-Age=${secondsPerWeek}`)
    res.end()
}