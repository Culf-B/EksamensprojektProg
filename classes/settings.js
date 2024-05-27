class Settings extends Window 
{
    constructor() 
    {
        super(0,0,200,200,[],[124,160,0]);

        // Weather
        this.weather = new Weather();

        //create sliders
        this.gSlider = createSlider(0.01,20,9.82,0.2);
        this.v0Slider = createSlider(0.1,20,10,1);
        this.thetaSlider = createSlider(0.1,89.9,45,1);
        this.timeSlider = createSlider(0,1,0,1);

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
        this.timeSlider.position(25,180);
        this.timeSlider.size(150);
        this.timeSlider.input(this.time.bind(this));

        //Create buttons
        this.startButton=createButton(`Start`);
        this.pauseButton=createButton(`Pause`);
        this.restartButton=createButton(`Restart`);
        //button settings
        this.startButton.position(47,140);
        this.startButton.size(50);
        this.pauseButton.position(47,140);
        this.pauseButton.size(50);
        this.pauseButton.hide();
        this.restartButton.position(103,140);
        this.restartButton.size(55);
        //button functions
        this.startButton.mousePressed(this.start.bind(this));
        this.pauseButton.mousePressed(this.pause.bind(this));
        this.restartButton.mousePressed(this.restart.bind(this));

        // Simulation stuff
        this.simulation = undefined;
        this.running = false;
        this.setupSettings();
    }

    update()
    {
        if (this.simulation != undefined)
        {
            if (this.running)
            {
                this.simulation.update();
                this.timeSlider.elt.value = this.simulation.getCurrentTime();
            }
            this.simulation.drawWindow();
        }
        //text
        this.surface.text(`tyngdeacceleration`,50,20);
        this.surface.text(`Start fart`,50,60);
        this.surface.text(`Vinkel`,50,100);

    }
    async setupSettings()
    {
        console.log("Log setup");
        this.g = this.gSlider.value();
        this.v0 = this.v0Slider.value();
        this.a = this.thetaSlider.value();
        
        this.currentWindSpeed = await this.weather.getWindData();

        this.simulation = new Simulation(this.v0, this.g, this.a, this.currentWindSpeed);
        this.timeSlider.elt.max = this.simulation.getEndtime();
        this.timeSlider.elt.step = this.simulation.getEndtime()/100;

    }
    start() 
    {
        console.log("logStart");
        this.running = true;
        this.startButton.hide();
        this.pauseButton.show();
    }
    pause()
    {
        console.log("logPause");
        this.running = false;
        this.startButton.show();
        this.pauseButton.hide();
    }
    restart()
    {
        console.log("logRestart");
        this.pause()
        this.setupSettings()
    }    
    time()
    {
        this.simulation.setTime(this.timeSlider.value());
        console.log(this.timeSlider.value());
        this.simulation.update(0);
        this.pause();
    }
}