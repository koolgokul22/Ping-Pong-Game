const MAX_SPEED_OF_COMPUTER_PADDLE = 0.02;


export default class Paddle{
    constructor(paddleElem){
        this.paddleElem = paddleElem;
        this.reset();
    }

    get position(){
        return parseFloat(getComputedStyle(this.paddleElem).getPropertyValue("--position"));
    }

    set position(value){
        this.paddleElem.style.setProperty("--position", value);
    }

    update(delta, ballHeight){
        this.position += delta * MAX_SPEED_OF_COMPUTER_PADDLE * (ballHeight - this.position);

    }

    rect(){
        return this.paddleElem.getBoundingClientRect();
    }

    reset(){
        this.position = 50;
    }
}