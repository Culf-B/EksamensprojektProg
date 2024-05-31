class Settings extends Window 
{
    constructor() 
    {
        super(
            0,0,200,400, // Position and size
            [],
            [124,160,0] // Background color
        );
        // Weather
        this.weather = new Weather();
        this.windText = new updateableTxt("", 550, 0);
        this.addGraphicsObject(this.windText);
        

        //create sliders
        this.gSlider = createSlider(0.01,20,9.82,0.2);
        this.v0Slider = createSlider(0.1,20,10,1);
        this.thetaSlider = createSlider(0.1,89.9,45,1);
        this.timeSlider = createSlider(0,1,0,1);
        this.arealSlider = createSlider(1,25,0,1);
        this.airDensitySlider = createSlider (1,10,0,0.25);
        this.windDirSlider = createSlider (-1,1,0,1);
        this.massSlider = createSlider (0.1,100,0.1,1);

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
        this.timeSlider.position(25,375);
        this.timeSlider.size(150);
        this.timeSlider.input(this.time.bind(this));
        this.arealSlider.position(25,270);
        this.arealSlider.size(150);
        this.arealSlider.input(this.setupSettings.bind(this));
        this.airDensitySlider.position(25,180);
        this.airDensitySlider.size(150);
        this.airDensitySlider.input(this.setupSettings.bind(this));
        this.windDirSlider.position(25,320);
        this.windDirSlider.size(150);
        this.windDirSlider.input(this.setupSettings.bind(this),this.update.bind(this));
        this.massSlider.position(25,220);
        this.massSlider.size(150);
        this.massSlider.input(this.setupSettings.bind(this));

        // Slider describtions
        this.gSliderText = new updateableTxt("Tyngdeacceleration: " + this.gSlider.value() + "m/s^2", 20, 30);
        this.addGraphicsObject(this.gSliderText);
        this.v0SliderText = new updateableTxt("Start fart: " + this.v0Slider.value() + "m/s", 20, 70);
        this.addGraphicsObject(this.v0SliderText);
        this.thetaSliderText = new updateableTxt("Vinkel: " + this.thetaSlider.value() + "m/s^2", 20, 110);
        this.addGraphicsObject(this.thetaSliderText);
        this.timeSliderText = new updateableTxt("Tid: " + this.timeSlider.value() + "s", 20, 375);
        this.addGraphicsObject(this.timeSliderText);
        this.arealSliderText = new updateableTxt("Overflade Areal: " + this.arealSlider.value() + "m^2" , 20, 270);
        this.addGraphicsObject(this.arealSliderText);
        this.airDensityText = new updateableTxt("Luft Densitet: " + this.airDensitySlider.value() + "kg/m^3" , 20, 180);
        this.addGraphicsObject(this.airDensityText);
        this.windDirText = new updateableTxt("vind retning: " + this.windDirValue , 20, 320);
        this.addGraphicsObject(this.windDirText);
        this.massText = new updateableTxt("Masse: " + this.massSlider.value() + "kg" , 20, 220);
        this.addGraphicsObject(this.massText);
        //Create buttons
        this.startButton=createButton(`Start`);
        this.pauseButton=createButton(`Pause`);
        this.restartButton=createButton(`Restart`);
        //button settings
        this.startButton.position(47,340);
        this.startButton.size(50);
        this.pauseButton.position(47,340);
        this.pauseButton.size(50);
        this.pauseButton.hide();
        this.restartButton.position(103,340);
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
        this.updateTextSliders();
        if (this.simulation != undefined)
        {
            this.windText.updateText("Wind speed: " + this.simulation.getWindSpeed() + "m/s");
            if (this.running)
            {
                this.simulation.update();
            }
            this.simulation.drawWindow();
            this.timeSlider.elt.value = this.simulation.getCurrentTime();
        }
        else
        {
            this.windText.updateText("");
        }
        if (this.windDirSlider.value() == 1)
            {
                this.windDirValue = "Medvind"
            }
        else if (this.windDirSlider.value() == -1)
            {
                this.windDirValue = "Modvind"
            }
        else
            {
                this.windDirValue = "Vindstille"
            }

    }
    updateTextSliders()
    {
        this.gSliderText.updateText("Tyngdeacceleration: " + this.gSlider.value() + "m/s^2");
        this.v0SliderText.updateText("Start fart: " + this.v0Slider.value() + "m/s");
        this.thetaSliderText.updateText("Vinkel: " + this.thetaSlider.value() + "m/s^2");
        this.timeSliderText.updateText("Tid: " + round(this.timeSlider.value(), 3) + "s");
        this.arealSliderText.updateText("Overflade Areal: " + this.arealSlider.value() + "m^2");
        this.airDensityText.updateText("Luft Densitet: " + this.airDensitySlider.value() + "Kg/m^3");
        this.massText.updateText("Masse: " + this.massSlider.value() + "Kg" );
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
        this.running = true;
        this.startButton.hide();
        this.pauseButton.show();
    }
    pause()
    {
        this.running = false;
        this.startButton.show();
        this.pauseButton.hide();
    }
    restart()
    {
        this.simulation.setTime(0);
        this.simulation.update(0);
    }    
    time()
    {
        this.simulation.setTime(this.timeSlider.value());
        this.simulation.update(0);
        this.pause();
    }
}