const script = document.createElement("script")
script.src = "https://cdn.jsdelivr.net/gh/scottschiller/Snowstorm/snowstorm.js"
script.onload = () => {
    snowStorm.snowCharacter = "•"
    snowStorm.excludeMobile = false
    if (matchMedia("(max-width: 999px)").matches)
    {
        snowStorm.flakesMax = 30
    }
}
document.body.appendChild(script)