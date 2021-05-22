import React from 'react';
import { useSelector } from "react-redux";
import classNames from 'classnames';
import { SectionProps } from '../utils/SectionProps';

const propTypes = {
    ...SectionProps.types
}

const defaultProps = {
    ...SectionProps.defaults
}

const ConfirmationView = ({ className, ...props }) => {
    const response = useSelector((state) => state.home.messageSubmitInfo);
    const outerClasses = classNames(
        'hero section center-content',
        className
    );

    const innerClasses = classNames(
        'hero-inner section-inner',
    );

    return (
        <section
            {...props}
            className={outerClasses}
        >
            <div className="container-sm">
                <div className={innerClasses}>
                    <div className="hero-content">
                        <div className="container-xs">
                            <p>
                                {response === null ? "" : response}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

ConfirmationView.propTypes = propTypes;
ConfirmationView.defaultProps = defaultProps;

export default ConfirmationView;