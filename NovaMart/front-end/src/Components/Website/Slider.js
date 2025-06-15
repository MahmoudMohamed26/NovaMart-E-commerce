import "../../nouislider.css";
import noUiSlider from "nouislider";
import { useEffect, useRef, useState } from "react";

export default function Slider(props) {
  const sliderRef = useRef(null);
  // eslint-disable-next-line
  const [internalValues, setInternalValues] = useState([props.min, props.max]);

  useEffect(() => {
    if (!sliderRef.current) return;

    const slider = noUiSlider.create(sliderRef.current, {
      start: [props.min, props.max],
      connect: true,
      range: {
        min: 0,
        max: 4000,
      },
      tooltips: [true, true],
      format: {
        to: (value) => `$${Math.round(value)}`,
        from: (value) => Number(value.replace("$", "")),
      },
      pips: {
        mode: "values",
        values: [0, 1000, 2000, 3000, 4000],
        density: 20,
      },
    });

    slider.on("slide", (values) => {
      setInternalValues(values);
    });

    slider.on("set", (values) => {
      // Only update the props when the user stops sliding (after mouse release)
      props.setMin(parseInt(values[0].replace("$", "")));
      props.setMax(parseInt(values[1].replace("$", "")));
    });

    return () => slider.destroy();
  }, [props]);

  return (
    <div className="mt-16" ref={sliderRef}></div>
  );
}
