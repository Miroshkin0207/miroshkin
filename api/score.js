export const config = {
    api: {
        bodyParser: false
    }
}
export default async function score(req, res) {
    let scoreString = ""
    let score
    const secondsPerWeek = 60 * 60 * 24 * 7
    req.on("data", chunk => scoreString += chunk.toString())
    req.on("end", () => {
        score = scoreString || "0"
        res.setHeader("Set-Cookie", `score=${score}; Max-Age=${secondsPerWeek}`)
        res.end()
    })  
}