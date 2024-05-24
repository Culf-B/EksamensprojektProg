class Settings extends Window {
    constructor() {
        super(0,0,200,200,[],[124,160,0]);
        //create sliders
        this.gSlider = createSlider(0,20,9.82,0.2);
        this.v0Slider = createSlider(0,20,10,1);
        this.thetaSlider = createSlider(0,90,45,1);

        //slider setting
        this.gSlider.position(25,30);
        this.gSlider.size(150);
        this.gSlider.input(this.setupSettings.bind(this));
        this.v0Slider.position(25,70);
        this.v0Slider.size(150);
        this.v0Slider.input(this.setupSettings.bind(this));
        this.thetaSlider.position(25,110);
        this.thetaSlider.size(150);
        this.thetaSlider.input(this.setupSettings.bind(this));

        //Create buttons
        this.startButton=createButton(`Start`);
        this.pauseButton=createButton(`Pause`);
        this.stopButton=createButton(`Stop`);
        //button settings
        this.startButton.position(5,160);
        this.startButton.size(45);
        this.pauseButton.position(52,160);
        this.pauseButton.size(50);
        this.stopButton.position(103,160);
        this.stopButton.size(45);
        //button functions
        this.startButton.mousePressed(this.start.bind(this));
        this.pauseButton.mousePressed(this.pause.bind(this));
        this.stopButton.mousePressed(this.stop.bind(this));

        // Simulation stuff
        this.simulation = undefined;
        this.running = false;
        this.setupSettings();


        //text
    }

    update()
    {
        if (this.simulation != undefined)
        {
            if (this.running)
            {
                this.simulation.update();
            }
            this.simulation.drawWindow();
        }
        //text
        this.surface.text(`tyngdeacceleration`,50,20);
        this.surface.text(`Start fart`,50,60);
        this.surface.text(`Vinkel`,50,100);

    }
    setupSettings()
    {
        console.log("Log setup");
        this.g = this.gSlider.value();
        this.v0 = this.v0Slider.value();
        this.a = this.thetaSlider.value();
        
        this.simulation = new Simulation(this.v0, this.g, this.a);
    }
    start() 
    {
        console.log("logStart");
        this.running = true;
    }
    pause()
    {
        console.log("logPause");
        this.running = false;
    }
    stop()
    {
        console.log("logStop");
        this.running = false;
        this.simulation = undefined;
    }    
}