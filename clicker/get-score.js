export default function getScore(req, res) {
    const cookieString = req.headers.cookie || ""
    if (cookieString == "") {
        return res.send("0")
    }
    const scoreIndex = cookieString.indexOf("score=")
    let score = scoreIndex != -1 ? cookieString.substring(scoreIndex + 6) : 0

    return res.send(score)
}