class Settings extends Window {
    constructor(tyngdeacceleration, starthastighed, vinkel) {
        super();
        //create sliders
        this.gSlider = tyngdeacceleration;
        this.v0 = starthastighed;
        this.theta = vinkel;

        //slider setting
        this.gSlider.position();
        this.gSlider.size();
        this.v0.position();
        this.v0.size();
        this.theta.position();
        this.theta.size();

        //Create buttons
        this.startButton=createButton(`Start`);
        this.pauseButton=createButton(`Pause`);
        this.stopButton=createButton(`Stop`);
        //button settings
        this.startButton.position();
        this.startButton.size();
        this.pauseButton.position();
        this.pauseButton.size();
        this.stopButton.position();
        this.stopButton.size();
        //button functions
        this.startButton.mousePressed(this.start);
        this.pauseButton.mousePressed(this.pause);
        this.stopButton.mousePressed(this.stop);

    }
    draw()
    {
        
        

    }
    start() 
    {
        console.log("logStart")
    }
    pause()
    {
        console.log("logPause")
        return false;
    }
    stop()
    {
        console.log("logStop")
    }    
}