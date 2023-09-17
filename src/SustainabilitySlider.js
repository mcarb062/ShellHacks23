import ReactSlider from 'react-slider';
import React, { useState } from 'react';


function SustainabilitySlider() {
    const [value, setValue] = useState(50); // A value between 0 and 100 for demonstration

    return (
        <div>
            <h2>Informed Investment: Where Sustainability Meets Performance</h2>
            <ReactSlider
                value={value}
                onAfterChange={setValue}
                className="horizontal-slider"
                thumbClassName="thumb"
                trackClassName="track"
            />
        </div>
    );
}
export default SustainabilitySlider;
