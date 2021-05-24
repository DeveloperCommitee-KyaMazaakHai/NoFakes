import React from 'react';
import { useRouter } from 'next/router'
import { useSelector } from "react-redux";
import classNames from 'classnames';

const ConfirmationView = ({ className, ...props }) => {
    const router = useRouter();
    const newSubmission = router.query.newSubmission;
    const response = useSelector((state) =>
        newSubmission === "true" ? state.home.messageSubmitInfo : state.home.calculateResultInfo);
    console.log("response: ", response)
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

export default ConfirmationView;