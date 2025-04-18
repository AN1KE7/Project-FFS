document.addEventListener('DOMContentLoaded', () => {
    const character = document.getElementById('character');
    const gameContainer = document.getElementById('game-container');
    
    // Initial position
    let posX = gameContainer.clientWidth / 2;
    let posY = gameContainer.clientHeight / 2;
    
    // Movement speed
    const speed = 10;
    
    // Animation variables for walking effect
    let isWalking = false;
    let walkingInterval;
    
    // Update character position
    function updatePosition() {
        // Keep character within bounds
        if (posX < 30) posX = 30;
        if (posX > gameContainer.clientWidth - 30) posX = gameContainer.clientWidth - 30;
        if (posY < 60) posY = 60;
        if (posY > gameContainer.clientHeight - 60) posY = gameContainer.clientHeight - 60;
        
        character.style.left = `${posX}px`;
        character.style.top = `${posY}px`;
        character.style.transform = 'none'; // Remove the initial transform
    }
    
    // Walking animation
    function startWalking() {
        if (!isWalking) {
            isWalking = true;
            let step = 0;
            walkingInterval = setInterval(() => {
                step = (step + 1) % 2;
                
                const leftLeg = document.querySelector('.left-leg');
                const rightLeg = document.querySelector('.right-leg');
                const leftArm = document.querySelector('.left-arm');
                const rightArm = document.querySelector('.right-arm');
                
                if (step === 0) {
                    leftLeg.style.transform = 'rotate(15deg)';
                    rightLeg.style.transform = 'rotate(-15deg)';
                    leftArm.style.transform = 'rotate(-15deg)';
                    rightArm.style.transform = 'rotate(15deg)';
                } else {
                    leftLeg.style.transform = 'rotate(-15deg)';
                    rightLeg.style.transform = 'rotate(15deg)';
                    leftArm.style.transform = 'rotate(15deg)';
                    rightArm.style.transform = 'rotate(-15deg)';
                }
            }, 150);
        }
    }
    
    function stopWalking() {
        if (isWalking) {
            isWalking = false;
            clearInterval(walkingInterval);
            
            // Reset limb positions
            const limbs = document.querySelectorAll('.leg, .arm');
            limbs.forEach(limb => {
                limb.style.transform = 'none';
            });
        }
    }
    
    // Key states
    const keys = {
        ArrowUp: false,
        ArrowDown: false,
        ArrowLeft: false,
        ArrowRight: false
    };
    
    // Handle key press events
    document.addEventListener('keydown', (e) => {
        if (keys.hasOwnProperty(e.key)) {
            keys[e.key] = true;
            e.preventDefault();
            startWalking();
        }
    });
    
    // Handle key release events
    document.addEventListener('keyup', (e) => {
        if (keys.hasOwnProperty(e.key)) {
            keys[e.key] = false;
            e.preventDefault();
            
            // Check if any movement key is still pressed
            if (!Object.values(keys).some(val => val)) {
                stopWalking();
            }
        }
    });
    
    // Game loop
    function gameLoop() {
        if (keys.ArrowUp) posY -= speed;
        if (keys.ArrowDown) posY += speed;
        if (keys.ArrowLeft) {
            posX -= speed;
            character.style.transform = 'scaleX(-1)';
        }
        if (keys.ArrowRight) {
            posX += speed;
            character.style.transform = 'scaleX(1)';
        }
        
        updatePosition();
        requestAnimationFrame(gameLoop);
    }
    
    // Start the game loop
    gameLoop();
}); 