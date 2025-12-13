export default function getScore(req, res) {
    const cookieString = req.headers.cookie || ""
    if (cookieString == "") {
        return res.send("1")
    }

    const scoreIndex = cookieString.indexOf("score=")
    let scoreString = scoreIndex != -1 ? cookieString.substring(scoreIndex + 6) : 0
    let score = ""

    for (let i = 0; i < scoreString.length; i++) {
        if (scoreString[i] == ";") {
            break
        }
        score += scoreString[i]
    }

    return res.send(score)
}