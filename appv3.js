window.onload = function(){
    //Declarations and initialisations of constants
    canvas = document.getElementById("canvas");
    cv = canvas.getContext("2d")
    const screenWidth = 1400
    const lineHeight = 400
    const lineWidth = 10
    const size_of_square = 50
    const maxSpacing = 2000
    const minSpacing = 500    
    const speed = 0.75
    var userHeight = 0    
    const userSize = 50
    const userGrav = 1/2
    var isLost = false
    
    //Drawing the initials
    cv.beginPath()
    cv.fillStyle = "white"
    cv.fillRect(0, lineHeight, screenWidth, lineWidth)
    cv.beginPath()
    cv.fillStyle = 'black'
    cv.fillRect(0, lineHeight-200-userSize, 150, 200+userSize)

    //Drawing moving obstacles
    var obstacleArray = [1300, 2500, 5000]
    var obsSize = 3
    var time = Date.now()
    var moveBack = 0
    cv.beginPath()
    cv.clearRect(400, 0, 800, 150)
    cv.font = "40px Georgia"
    cv.fillStyle = "white"
    cv.fillText("Score: " + Math.floor(moveBack), 500, 100)
    function DrawObs(){
        var timePassed = Date.now() - time
        time = Date.now()
        cv.beginPath()
        cv.clearRect(400, 0, 800, 150)
        cv.font = "40px Georgia"
        cv.fillStyle = "white"
        cv.fillText("Score: " + Math.floor(moveBack), 500, 100)
        moveBack+=timePassed*speed
        cv.clearRect(150+userSize, lineHeight-size_of_square, screenWidth, size_of_square)
        cv.clearRect(0, lineHeight-size_of_square, 150, size_of_square)
        if(userHeight>size_of_square){
            cv.clearRect(0, lineHeight-size_of_square, 150+size_of_square, size_of_square)
        }
        while(obstacleArray[0]<=moveBack){
            obstacleArray.shift()
            obstacleArray.push(obstacleArray[obsSize-2] + minSpacing + Math.floor(Math.random()*(maxSpacing-minSpacing)))
        }
        for(let i=0; i<obsSize; i++){
            cv.beginPath()
            cv.fillStyle = "white"
            cv.fillRect(obstacleArray[i]-moveBack, lineHeight-size_of_square, size_of_square, size_of_square)
        }
        if(obstacleArray[0]-moveBack>userSize+150 || obstacleArray[0]-moveBack<150-size_of_square || userHeight>size_of_square){
            window.requestAnimationFrame(DrawObs)
        }
        else{
            isLost = true
            whenLost()
        }
    }
    DrawObs()

    //Drawing moving user
    cv.beginPath()
    cv.clearRect(150, 0, userSize, lineHeight)
    cv.fillStyle = 'red'
    cv.fillRect(150, lineHeight-userHeight-userSize, userSize, userSize)
    document.addEventListener('keydown', event => {
        if(event.code === 'Space' && userHeight==0 && isLost===false){
            cv.clearRect(150, lineHeight-userSize, userSize, userSize)
            userHeight += 200
            var timeUser = Date.now()
            function DrawUser(){
                var timePassedUser = Date.now() - timeUser
                timeUser = Date.now()
                userHeight -= timePassedUser*userGrav
                userHeight = Math.max(userHeight, 0)
                cv.beginPath()
                cv.clearRect(150, 0, userSize, lineHeight-size_of_square)
                cv.fillStyle = 'red'
                cv.fillRect(150, lineHeight-userHeight-userSize, userSize, userSize)
                if(userHeight!=0 && isLost===false){
                    window.requestAnimationFrame(DrawUser)
                }
            }
            DrawUser()
        }
    })
    
    //whenLost
    function whenLost(){
        var btn = document.createElement('a')
        btn.setAttribute('href', "MainGame.html")
        btn.innerHTML = "Play Again"
        btn.style.color = "white"
        btn.style.fontSize = "40px"
        btn.style.fontFamily = "Georgia"
        btn.style.textDecoration = "none"
        document.getElementsByTagName('body')[0].appendChild(btn);
    }
}

