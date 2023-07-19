
export function collisionDetection(ball, gameObject){

    if (
        ball.posY + ball.size >= gameObject.posY
        && ball.posY <= gameObject.posY + gameObject.height
        && ball.posX >= gameObject.posX
        && ball.posX + ball.size <= gameObject.posX + gameObject.width
        ) {
            return true;
    } else {
        return false;
    }
}