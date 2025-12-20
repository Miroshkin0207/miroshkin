const script = document.createElement("script")
script.src = "https://cdn.jsdelivr.net/gh/scottschiller/Snowstorm/snowstorm.js"
script.onload = () => {
    snowStorm.snowCharacter = "•",
    snowStorm.excludeMobile = false
}
document.body.appendChild(script)