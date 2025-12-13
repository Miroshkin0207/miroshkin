export default function getScore(req, res) {
    const cookieString = req.headers.cookie || ""
    console.log("cookieString = " + cookieString)
    if (cookieString == "") {
        return res.send("0")
    }
    const scoreIndex = cookieString.indexOf("score=")
    console.log("scoreIndex = " + scoreIndex)
    let scoreString = scoreIndex != -1 ? cookieString.substring(scoreIndex + 6) : 0
    let score = ""
    console.log("scoreString = " + scoreString)
    for (let i = 0; i < scoreString.length; i++) {
        if (scoreString[i] == ";") {
            break
        }
        score += scoreString[i]
    }
    console.log("score = " + score)
    return res.send(score)
}