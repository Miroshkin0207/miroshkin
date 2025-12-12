export default function getScore(req, res) {
    const cookieString = req.headers.cookie || ""
    if (cookieString == "") {
        return res.send("0")
    }
    const scoreIndex = cookieString.indexOf("score=")
    let score1 = scoreIndex != -1 ? cookieString.substring(scoreIndex + 6) : 0
    let score = ""
    for (let i = 0; i < score1.length; i++) {
        if (score1[i] == ";") {
            break
        }
        score += score1[i]
    }

    return res.send(score)
}