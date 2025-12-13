export const config = {
    api: {
        bodyParser: false,
    }
}
export default async function score(req, res) {
    let score
    try {
        score = await req.text()
        console.log("Успех! score = " + score)
    }
    catch {
        score = "0"
        console.log("Неудача! score = " + score)
    }
    const secondsPerWeek = 60 * 60 * 24 * 7
    res.setHeader("Set-Cookie", `score=${score}; Max-Age=${secondsPerWeek}`)
    res.end()
}