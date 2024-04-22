import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import 'react-lazy-load-image-component/src/effects/black-and-white.css';
import 'react-lazy-load-image-component/src/effects/opacity.css';

const Image = ({ src, alt, height, width, effect, transitionDelay }) => {

    return (
        <div>
            <LazyLoadImage
                alt={alt}
                effect={effect}
                wrapperProps={{
                    // If you need to, you can tweak the effect transition using the wrapper style.
                    style: { transitionDelay: transitionDelay || "1s" },
                }}
                src={src}
                height={height}
                width={width}
            />
        </div>
    )
};

export default Image;