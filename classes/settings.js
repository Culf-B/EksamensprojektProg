class Settings extends Window {
    constructor() {
        super(0,0,200,200,[],[124,160,0]);
        //create sliders
        this.gSlider = createSlider(0,20,9.8,0.2);
        this.v0 = createSlider(0,10,0,1);
        this.theta = createSlider(0,90,45,1);

        //slider setting
        this.gSlider.position(25,30);
        this.gSlider.size(150);
        this.v0.position(25,70);
        this.v0.size(150);
        this.theta.position(25,110);
        this.theta.size(150);

        //Create buttons
        this.startButton=createButton(`Start`);
        this.pauseButton=createButton(`Pause`);
        this.stopButton=createButton(`Stop`);
        this.saveButton=createButton(`save`)
        //button settings
        this.startButton.position(5,160);
        this.startButton.size(45);
        this.pauseButton.position(52,160);
        this.pauseButton.size(50);
        this.stopButton.position(103,160);
        this.stopButton.size(45);
        this.saveButton.position(150,160);
        this.saveButton.size(45);
        //button functions
        this.startButton.mousePressed(this.start);
        this.pauseButton.mousePressed(this.pause);
        this.stopButton.mousePressed(this.stop);
        this.saveButton.mousePressed(this.saveSettings);
        //text
        text(`Tynde acceleration`);

    }
    draw()
    {
        
        

    }
    saveSettings()
    {

        savedG = this.gSlider.value();
        savedV0 = this.v0.value();
        savedTheta = this.theta.value();

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