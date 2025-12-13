export default async function score(req, res) {
    let score
    try {
        score = await req.text()
        console.log(score)
    }
    catch {
        score = "0"
        console.log(score)
    }
    const secondsPerWeek = 60 * 60 * 24 * 7
    res.setHeader("Set-Cookie", `score=${score}; Max-Age=${secondsPerWeek}`)
    res.end()
}