const Locations = () => {
    return (

        <div className="mapaCont">
            <div><h1>NUESTRA UBICACIÓN</h1></div>
            <iframe
                src="https://www.google.com/maps/place/Ocean+Gym/@9.9798734,-84.7624375,15z/data=!4m6!3m5!1s0x8fa0316cd1bda3f9:0xb6112bf209eefd7b!8m2!3d9.9802966!4d-84.7574158!16s%2Fg%2F11t0rlkxnn?entry=ttu&g_ep=EgoyMDI0MDkzMC4wIKXMDSoASAFQAw%3D%3Dhttps://www.google.com/maps/place/Ocean+Gym/@9.9801191,-84.7632352,15.75z/data=!4m6!3m5!1s0x8fa0316cd1bda3f9:0xb6112bf209eefd7b!8m2!3d9.9802966!4d-84.7574158!16s%2Fg%2F11t0rlkxnn?entry=ttu&g_ep=EgoyMDI0MDkzMC4wIKXMDSoASAFQAw%3D%3D" 
                width="550"
                height="450"               
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
            ></iframe>
        </div>
    )
}

export default Locations;