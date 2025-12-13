export default async function score(req, res) {
    try {
        const score = await req.text()
    }
    catch {
        const score = "0"
    }
    const secondsPerWeek = 60 * 60 * 24 * 7
    res.setHeader("Set-Cookie", `score=${score}; Max-Age=${secondsPerWeek}`)
    res.end()
}